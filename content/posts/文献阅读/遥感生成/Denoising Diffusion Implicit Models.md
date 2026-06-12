---
title: 'ICLR 21 | Denoising Diffusion Implicit Models'
summary: 
date: 2026-06-11T8:00:00+08:00
categories: 文献阅读
---

# ICLR 21 | Denoising Diffusion Implicit Models

> 论文链接：https://openreview.net/forum?id=St1giarCHLP
> 代码链接：https://github.com/ermongroup/ddim
> 作者单位：斯坦福大学

## 背景

DDPM 中，将参数 $T$ 设为一个大值能使生成过程更接近高斯分布，实现更好的性能，但会导致生成速度过慢

而 DDPM 的最终损失：$L(\theta):=\mathbb{E}_{t,x_0,\epsilon}[||\epsilon-\epsilon_\theta(\sqrt{\bar{\alpha}_t}x_0+\sqrt{1-\bar{\alpha}_t}\epsilon,t)||^2]$ 仅需按照一步加噪公式，从 $q(x_t \mid x_0)$ 中采样一个 $x_t$，与联合分布 $q(x_{1:T} \mid x_0)$ 无关，

## 非马尔可夫过程的变分推断

将前向过程按反向方向重写（联合分布可使用任意顺序拆解）构造一组前向分布：
$$
\begin{aligned}
q_\sigma(x_{1:T} \mid x_0) &:= q_\sigma(x_T \mid x_0)\prod_{t=2}^Tq_\sigma(x_{t-1} \mid x_t,x_0)\\
q_\sigma(x_T \mid x_0) &= \mathcal{N}(\sqrt{\alpha_T}x_0,(1-\alpha_T)I)\\
q_\sigma(x_{t-1} \mid x_t,x_0) &= \mathcal{N}(\sqrt{\alpha_{t-1}}x_0+\sqrt{1-\alpha_{t-1}-\sigma_t^2} \cdot \frac{x_t-\sqrt{\alpha_t}x_0}{\sqrt{1-\alpha_t}},\sigma_t^2I)
\end{aligned}
$$
其中，$\sigma\in\mathbb{R}_{\ge 0}^T$ 为分布的索引，当 $\sigma \rightarrow 0$ 时，若给定 $x_0,x_t$ 则 $x_{t-1}$ 固定