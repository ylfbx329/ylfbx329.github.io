---
title: 'ICML 21 | Improved denoising diffusion probabilistic models'
summary: 
date: 2026-06-30T8:00:00+08:00
categories: 文献阅读
---

# ICML 21 | Improved denoising diffusion probabilistic models

> 论文链接：http://proceedings.mlr.press/v139/nichol21a.html
> 代码链接：https://github.com/openai/improved-diffusion
> 作者单位：OpenAI

## 方法

DDPM 的 Log-likelihood 一直不高，该指标高往往表示生成模型能够覆盖更多中数据分布，本文通过一系列方法提高该指标

### 学习方差

本文发现 DDPM 的两种方差形式 $\sigma_t^2 = \beta_t$ 或 $\sigma_t^2 = \tilde{\beta}_t = \frac{1-\bar{\alpha}_{t-1}}{1-\bar{\alpha}_t}\beta_t$ 仅在接近 $t=1$ 附近时有显著差别，而损失值也在接近 $t=1$ 时快速下降

则通过学习在这两个方差间插值的形式进行优化，设：
$$
\Sigma_\theta(x_t,t)=\text{exp}(v\log\beta_t+(1-v)\log\tilde{\beta}_t)
$$
模型学习并输出插值系数 $v$，损失函数因此变为：
$$
\begin{aligned}
L_{hybrid}&=L_{simple}+\lambda L_{vlb}\\
L_{vlb}&=\begin{cases}
    −\log p_\theta(x_0 \mid x_1),&&t=0\\
    D_{KL}(q(x_{t−1} \mid x_t, x_0) || p_\theta(x_{t−1} \mid x_t)),&&t>0
\end{cases}
\end{aligned}
$$
其中 $\lambda=0.001$，且在计算 $L_{vlb}$ 时，均值会被梯度截断，仅更新方差计算相关参数

### 优化噪声 Schedule

$\beta_t$ 线性增加，在后半段图像基本均为噪声

优化为余弦形式
$$
\begin{aligned}
\beta_t &= 1-\alpha_t = 1-\frac{\bar{\alpha}_t}{\bar{\alpha}_{t-1}}\\
\bar{\alpha}_t &= \frac{f(t)}{f(0)}\\
f(t) &= \cos(\frac{t/T+s}{1+s}\cdot\frac{\pi}{2})^2
\end{aligned}
$$
其中 $s=0.008$ 用于防止头尾处噪声变化过于极端，使之整体变化稳定

### 降低梯度噪声

$L_{hybrid}$ 和 $L_{vlb}$ 损失下降不稳定，使用重要性采样的单独 $L_{vlb}$ 作为损失函数，公式为：
$$
L_{vlb} = \mathbb{E}_{t \sim p_t}[\frac{L_t}{p_t}], p_t\propto\sqrt{\mathbb{E}[L_t^2]}, \sum p_t=1
$$
训练初始使用均匀采样，对每个 $t$ 维护最近 10 个损失的平均值作为采样概率，重点采样高损失的 $t$

但是，此方法会牺牲生成质量，所以最终依旧使用原始的均匀采样 $t$ 的 $L_{hybrid}$ 作为损失函数

### 采样加速

直接使用子序列 $S$ 进行采样，插值时直接对应计算，此采样方法包含头尾即 $0,S_i,T$，对应的 DDIM 则可能不包含尾部即 $0,S_i,T-T/K+1$，$K$ 为序列 $S$ 长度

### 模型大小扩展

通过扩大模型通道数提高了计算量，模型性能 FID 遵循 log 形式降低，但损失 NLL 降低形式较弱