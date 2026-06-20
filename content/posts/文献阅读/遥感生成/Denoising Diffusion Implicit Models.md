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

## 方法

将前向过程按反向方向重写（联合分布可使用任意顺序拆解）构造一组前向分布：
$$
\begin{aligned}
q_\sigma(x_{1:T} \mid x_0) &:= q_\sigma(x_T \mid x_0)\prod_{t=2}^Tq_\sigma(x_{t-1} \mid x_t,x_0)\\
q_\sigma(x_T \mid x_0) &= \mathcal{N}(\sqrt{\alpha_T}x_0,(1-\alpha_T)I)\\
\end{aligned}
$$
其中，$\sigma\in\mathbb{R}_{\ge 0}^T$ 为分布的索引

由一步加噪公式得：
$$
\begin{aligned}
x_t &= \sqrt{\alpha_t}x_0+\sqrt{1-\alpha_t}\epsilon_t, && \epsilon_t\sim\mathcal{N}(0,1)\\
\epsilon_t &= \frac{x_t-\sqrt{\alpha_t}x_0}{\sqrt{1-\alpha_t}}
\end{aligned}
$$
于是设 $x_{t-1}$ 由干净图像、去除 $x_t$ 的噪声方向、额外的随机噪声组成：
$$
x_{t-1} = \sqrt{\alpha_{t-1}}x_0+C_t\epsilon_t+\sigma_tz, z\sim\mathcal{N}(0,1)
$$
由于 $\epsilon_t\sim\mathcal{N}(0,1),z\sim\mathcal{N}(0,1)$ 且独立，则只给定 $x_0$ 时的边缘分布为：
$$
q_\sigma(x_{t-1} \mid x_0) = \mathcal{N}(\sqrt{\alpha_{t-1}}x_0,(C_t^2+\sigma_t^2)I)
$$
要使其边缘分布满足 DDPM 提出的 $q_\sigma(x_t \mid x_0) = \mathcal{N}(\sqrt{\alpha_t}x_0,(1-\alpha_t)I)$ 则有：
$$
\begin{aligned}
C_t^2+\sigma_t^2 &= 1-\alpha_{t-1}\\
C_t &= \sqrt{1-\alpha_{t-1}-\sigma_t^2}
\end{aligned}
$$
带回 $x_{t-1}$ 的构成公式得：
$$
x_{t-1} = \sqrt{\alpha_{t-1}}x_0+\sqrt{1-\alpha_{t-1}-\sigma_t^2}\cdot\frac{x_t-\sqrt{\alpha_t}x_0}{\sqrt{1-\alpha_t}}+\sigma_tz, z\sim\mathcal{N}(0,1)
$$
此时对应给定 $x_0,x_t$ 的条件分布为：
$$
q_\sigma(x_{t-1} \mid x_t,x_0) = \mathcal{N}(\sqrt{\alpha_{t-1}}x_0+\sqrt{1-\alpha_{t-1}-\sigma_t^2} \cdot \frac{x_t-\sqrt{\alpha_t}x_0}{\sqrt{1-\alpha_t}},\sigma_t^2I)
$$
当 $\sigma \rightarrow 0$ 时，若 $x_0,x_t$ 已知则 $x_{t-1}$ 唯一确定

生成过程：从 $x_0$ 一步加噪到 $x_t$ 送入去噪模型 $\epsilon_\theta^{(t)}(\cdot)$ 再计算 $x_0$ 的公式为：
$$
f_\theta^{(t)}(x_t) := \frac{x_t-\sqrt{1-\alpha_t}\epsilon_\theta^{(t)}(x_t)}{\sqrt{\alpha_t}}
$$
生成过程 $p_\theta^{(t)}(x_{t-1} \mid x_t)$ 可定义为：
$$
p_\theta^{(t)}(x_{t-1} \mid x_t) =
\begin{cases}
\mathcal{N}(f_\theta^{(1)}(x_1),\sigma_1^2I) & \text{if }t=1\\
q_\sigma(x_{t-1} \mid x_t,f_\theta^{(t)}(x_t)) & \text{otherwise}\\
\end{cases}
$$
带入 $x_{t-1}$ 公式得：
$$
x_{t-1} = \sqrt{\alpha_{t-1}}\cdot\frac{x_t-\sqrt{1-\alpha_t}\epsilon_\theta^{(t)}(x_t)}{\sqrt{\alpha_t}}+\sqrt{1-\alpha_{t-1}-\sigma_t^2}\cdot\epsilon_\theta^{(t)}(x_t)+\sigma_t\epsilon_t
$$
当 $\sigma_t=\sqrt{\frac{1-\alpha_{t-1}}{1-\alpha_t}}\sqrt{1-\frac{\alpha_t}{\alpha_{t-1}}}$ 时退回到 DDPM，当 $\sigma_t=0$ 时，为 DDIM

> - 期望公式：
>   - 连续变量：$E[X] = \int xp(x)\mathrm{d}x$
>   - 函数：$E[g(X)] = \int g(x)p(x)\mathrm{d}x$
> - Jensen 不等式：
>   - 若 $f$ 为凸函数，则 $f(\mathbb{E}[Z]) \le \mathbb{E}[f(Z)]$
>   - 若 $f$ 为凹函数，则 $f(\mathbb{E}[Z]) \ge \mathbb{E}[f(Z)]$

目标函数：最大化 $\log p_\theta(x_0)$ 但 $p_\theta(x_0) = \int p_\theta(x_{0:T})\mathrm{d}x_{1:T}$ 不好计算，引入前向分布 $q(x_{1:T} \mid x_0)$ 有：
$$
\begin{aligned}
\log p_\theta(x_0) &= \log\int p_\theta(x_{0:T})\mathrm{d}x_{1:T}\\
&= \log\int q_\sigma(x_{1:T} \mid x_0)\frac{p_\theta(x_{0:T})}{q_\sigma(x_{1:T} \mid x_0)}\mathrm{d}x_{1:T}\\
&= \log\mathbb{E}_{x_{0:T} \sim q_\sigma(x_{0:T})}[\frac{p_\theta(x_{0:T})}{q_\sigma(x_{1:T} \mid x_0)}] && 期望公式\\
&\ge \mathbb{E}_{x_{0:T} \sim q_\sigma(x_{0:T})}[\log p_\theta(x_{0:T}) - \log q_\sigma(x_{1:T} \mid x_0)] && Jensen 不等式
\end{aligned}
$$
转为最小化形式：
$$
\begin{aligned}
J_\sigma(\epsilon_\theta) &:= \mathbb{E}_{x_{0:T} \sim q_\sigma(x_{0:T})}[\log q_\sigma(x_{1:T} \mid x_0) - \log p_\theta(x_{0:T})]\\
&= \mathbb{E}_{x_{0:T} \sim q_\sigma(x_{0:T})}[\log q_\sigma(x_T \mid x_0) + \sum_{t=2}^T\log q_\sigma(x_{t-1} \mid x_t,x_0) -\sum_{t=1}^T\log p_\theta^{(t)}(x_{t-1} \mid x_t) - \log p_\theta(x_T)] && 拆解联合分布
\end{aligned}
$$
去噪参数化的目标函数为：
$$
L_\gamma(\epsilon_\theta) := \sum_{t=1}^T\gamma_t\mathbb{E}_{x_0 \sim q(x_0),\epsilon_t\sim\mathcal{N}(0,1)}[||\epsilon_\theta^{(t)}(\sqrt{\alpha_t}x_0+\sqrt{1-\alpha_t}\epsilon_t)-\epsilon_t||_2^2]
$$
二者的关系为 $\forall \sigma>0, \exist \gamma\in\mathbb{R}_{>0}^T, C\in\mathbb{R} \text{ s.t. } J_\sigma=L_\gamma+C$

## 具体实现

- 预训练模型均与 DDPM 相同
- 时间步 $\tau_i$ 的选择策略（选择使 $\tau_{-1}$ 接近 $T$ 的常数 $c$）：
  - 线性：$\tau_i=\lfloor ci \rfloor$
  - 平方：$\tau_i=\lfloor ci^2 \rfloor$
