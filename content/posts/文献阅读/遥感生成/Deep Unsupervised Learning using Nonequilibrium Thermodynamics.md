---
title: 'ICML 15 | Deep Unsupervised Learning using Nonequilibrium Thermodynamics'
summary: 
date: 2026-05-30T8:00:00+08:00
categories: 文献阅读
---

# ICML 15 | Deep Unsupervised Learning using Nonequilibrium Thermodynamics

> 论文链接：http://proceedings.mlr.press/v37/sohl-dickstein15.html
> 代码链接：https://github.com/Sohl-Dickstein/Diffusion-Probabilistic-Models
> 作者单位：斯坦福大学

## 动机

概率模型（probabilistic models）一直在易处理与灵活性之间平衡

我们定义一个逐渐将一种分布转换为另一分布的马尔科夫链，生成式马尔科夫链即使用 diffusion 过程将一个简单的已知分布转换为目标数据分布

在此框架下模型用于估计单一 diffusion 过程中的微小扰动，从而降低处理难度；此外，任一平滑的目标分布均存在 diffusion 过程，因此此方法灵活度较高

## 方法

前向过程（diffusio 过程）：将目标数据分布转换为简单已知分布
逆向过程：在有限的时间步下，从简单分布中生成目标数据分布

### 前向过程 $q(x^{(0 \cdots T)})$

目标数据分布 $q(x^{(0)})$，简单已知分布 $\pi(y)$，马尔可夫 diffusion 核 $T_\pi(y \mid y';\beta)$，$\beta$ 为扩散速率，前向过程可以表示为：
$$
\begin{aligned}
\pi(y) &= \int \mathrm{d}y' T_\pi(y \mid y';\beta) \pi(y') \\
q(x^{(t)} \mid x^{(t-1)}) &= T_\pi(x^{(t)} \mid x^{(t-1)};\beta_t) \\
q(x^{(0 \cdots T)}) &= q(x^{(0)}) \prod_{t=1}^{T} q(x^{(t)} \mid x^{(t-1)})
\end{aligned}
$$

### 后向过程 $p(x^{(0 \cdots T)})$

> - 条件概率公式：$p(x \mid y) = \frac{p(x,y)}{p(y)}$
>   链式展开：$p(x_1, \cdots ,x_n) = p(x_1)\prod_{i=2}^{n}p(x_i \mid x_1, \cdots ,x_{i-1})$ 
> - 边缘概率公式：$p(x) = \int p(x,y) \mathrm{d}y$
> - 贝叶斯公式：$p(x \mid y) = \frac{p(y \mid x) p(x)}{p(y)}$

对于高斯扩散，在时间步数 $T$ 足够大、每一步扩散速率 $\beta$ 足够小时，前向扩散过程接近连续扩散过程。此时其反向转移可以近似采用与前向转移相同的分布族进行建模。因此，若前向扩散变换 $q(x^{(t)} \mid x^{(t-1)})$ 是高斯形式，则反向生成变换 $p(x^{(t-1)} \mid x^{(t)})$ 也可被视为高斯分布。后向过程可表示为：
$$
\begin{aligned}
p(x^{(T)}) &= \pi(x^{(T)}) \\
p(x^{(0 \cdots T)}) &= p(x^{(T)}) \prod_{t=1}^{T} p(x^{(t-1)} \mid x^{(t)})
\end{aligned}
$$

对于高斯扩散，仅需学习反向马尔可夫变换中高斯分布的均值 $f_\mu(x^{(t)},t)$ 与方差 $f_\Sigma(x^{(t)},t)$ 即可，本文使用 MLP 对以上两函数进行学习

对于目标数据分布 $p(x^{(0)})$ 有：
$$
\begin{aligned}
p(x^{(0)}) &= \int \mathrm{d}x^{(1 \cdots T)} p(x^{(0 \cdots T)}) && 边缘概率公式\\
&= \int \mathrm{d}x^{(1 \cdots T)} p(x^{(0 \cdots T)}) \frac{q(x^{(1 \cdots T)} \mid x^{(0)})}{q(x^{(1 \cdots T)} \mid x^{(0)})}\\
&= \int \mathrm{d}x^{(1 \cdots T)} q(x^{(1 \cdots T)} \mid x^{(0)}) \frac{p(x^{(0 \cdots T)})}{q(x^{(1 \cdots T)} \mid x^{(0)})}\\
&= \int \mathrm{d}x^{(1 \cdots T)} q(x^{(1 \cdots T)} \mid x^{(0)}) \frac{p(x^{(T)}) \prod_{t=1}^{T} p(x^{(t-1)} \mid x^{(t)})}{\prod_{t=1}^{T} q(x^{(t)} \mid x^{(t-1)})} && 分子分母条件概率链式展开，结合马尔可夫性化简\\
&= \int \mathrm{d}x^{(1 \cdots T)} q(x^{(1 \cdots T)} \mid x^{(0)}) p(x^{(T)}) \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}\\
\end{aligned}
$$

### 训练目标

> - 似然：概率是根据规则预测结果，似然是根据结果推测规则
>   $P(x \mid \theta)$ 中固定 $\theta$，变化 $x$ 则为概率函数；固定 $x$（已知观测数据），$\theta$ 未知则为似然函数 $L(\theta \mid x)$
> - Jensen 不等式：
>   若 $f$ 为凸函数，则 $f(\mathbb{E}[Z]) \le \mathbb{E}[f(Z)]$
>   若 $f$ 为凹函数，则 $f(\mathbb{E}[Z]) \ge \mathbb{E}[f(Z)]$
> - 连续变量的熵（微分熵）：$H_p(X) = -\int p(x) \log p(x) \mathrm{d}x$
>   条件熵：$H_p(Y|X) = - \int p(x,y) \log p(y|x) \mathrm{d}x\mathrm{d}y$
>   两个分布的交叉熵：$H(q,p) = -\int q(x) \log p(x) \mathrm{d}x$
> - KL散度：$D_{KL}(P || Q) = \int p(x) \ln \frac{p(x)}{q(x)} \,dx$

最大化对数似然：
$$
\begin{aligned}
L &= \int \mathrm{d}x^{(0)} q(x^{(0)}) \log p(x^{(0)}) && 按照真实数据分布 q(x^{(0)}) 加权平均\\
&= \int \mathrm{d}x^{(0)} q(x^{(0)}) \log [\int \mathrm{d}x^{(1 \cdots T)} q(x^{(1 \cdots T)} \mid x^{(0)}) p(x^{(T)}) \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}]\\
&\ge K = \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [p(x^{(T)}) \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] && Jensen 不等式\\
& 处理t=T\\
&= \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \sum_{t=1}^{T} \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] + \int \mathrm{d}x^{(T)} q(x^{(T)}) \log p(x^{(T)})\\
&= \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \sum_{t=1}^{T} \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] + \int \mathrm{d}x^{(T)} q(x^{(T)}) \log \pi(x^{(T)})\\
&= \sum_{t=1}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] - H_p(x^{(T)}) && q 与 \pi 的交叉熵为常数且等于 p 的熵\\
\end{aligned}
$$
为避免边缘效应，设定 $p(x^{(0)} \mid x^{(1)}) = q(x^{(1)} \mid x^{(0)}) \frac{\pi(x^{(0)})}{\pi(x^{(1)})} = T_\pi(x^{(0)} \mid x^{(1)}; \beta_1)$，则有：
$$
\begin{aligned}
K &= \sum_{t=1}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] - H_p(x^{(T)})\\
& 处理 t = 1；简化书写，令 A = \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}]\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] + \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) \log [\frac{p(x^{(0)} \mid x^{(1)})}{q(x^{(1)} \mid x^{(0)})}] - H_p(x^{(T)})\\
&= A + \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) \log [\frac{q(x^{(1)} \mid x^{(0)}) \pi(x^{(0)})}{q(x^{(1)} \mid x^{(0)}) \pi(x^{(1)})}] - H_p(x^{(T)}) && 带入设定\\
&= A + \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) [\log \pi(x^{(0)}) - \log \pi(x^{(1)})] - H_p(x^{(T)})\\
&= A + \int \mathrm{d}x^{(0)} [\int \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)})] \log \pi(x^{(0)}) - \int \mathrm{d}x^{(1)} [\int \mathrm{d}x^{(0)} q(x^{(0)},x^{(1)})] \log \pi(x^{(1)}) - H_p(x^{(T)})\\
&= A + \int \mathrm{d}x^{(0)} q(x^{(0)}) \log \pi(x^{(0)}) - \int \mathrm{d}x^{(1)} q(x^{(0)}) \log \pi(x^{(1)}) - H_p(x^{(T)}) && 逆向边缘概率公式\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] - H_p(x^{(T)}) && 均为H_p(x^{(T)})，两项相消\\
& 写为KL散度形式；简化书写，令 B = \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})}]\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)},x^{(0)})}] - H_p(x^{(T)}) && 马尔可夫性质，加一项条件不影响概率\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})} \frac{q(x^{(t-1)} \mid x^{(0)})}{q(x^{(t)} \mid x^{(0)})}] - H_p(x^{(T)}) && 贝叶斯公式\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})}] + \sum_{t=2}^{T} [\int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log q(x^{(t-1)} \mid x^{(0)}) - \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log q(x^{(t)} \mid x^{(0)})] - H_p(x^{(T)})\\
&= B + \sum_{t=2}^{T} [\int \mathrm{d}x^{(0)}\mathrm{d}x^{(t-1)} q(x^{(0)},x^{(t-1)}) \log q(x^{(t-1)} \mid x^{(0)}) - \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) \log q(x^{(t)} \mid x^{(0)})] - H_p(x^{(T)}) && 逆向边缘概率公式\\
&= B + \sum_{t=2}^{T} [H_q(x^{(t)} \mid x^{(0)}) - H_q(x^{(t-1)} \mid x^{(0)})] - H_p(x^{(T)}) && 条件熵\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})}] + H_q(x^{(T)} \mid x^{(0)}) - H_q(x^{(1)} \mid x^{(0)}) - H_p(x^{(T)})\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t-1)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t-1)},x^{(t)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})}] + H_q(x^{(T)} \mid x^{(0)}) - H_q(x^{(1)} \mid x^{(0)}) - H_p(x^{(T)}) && 逆向边缘概率公式\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t-1)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)})q(x^{(t-1)} \mid x^{(0)},x^{(t)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})}] + H_q(x^{(T)} \mid x^{(0)}) - H_q(x^{(1)} \mid x^{(0)}) - H_p(x^{(T)}) && 逆向条件概率公式\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) \int \mathrm{d}x^{(t-1)} q(x^{(t-1)} \mid x^{(0)},x^{(t)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})}] + H_q(x^{(T)} \mid x^{(0)}) - H_q(x^{(1)} \mid x^{(0)}) - H_p(x^{(T)})\\
&= -\sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) D_{KL}(q(x^{(t-1)} \mid x^{(t)},x^{(0)}) || q(x^{(t-1)} \mid x^{(t)},x^{(0)})) + H_q(x^{(T)} \mid x^{(0)}) - H_q(x^{(1)} \mid x^{(0)}) - H_p(x^{(T)})\\
\end{aligned}
$$

以上，训练目标为寻找能够最大化此对数似然的下界的逆马尔可夫变换，即：
$$
\hat{p}(x^{(t-1)}|x^{(t)})=\argmax_{p(x^{(t-1)}|x^{(t)})}-\sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) D_{KL}(q(x^{(t-1)} \mid x^{(t)},x^{(0)}) || q(x^{(t-1)} \mid x^{(t)},x^{(0)})) + H_q(x^{(T)} \mid x^{(0)}) - H_q(x^{(1)} \mid x^{(0)}) - H_p(x^{(T)})
$$

### $\beta$ 设置

在高斯分布情况下，设定 $\beta_1$ 为较小初始值，$\beta_{2 \cdots T}$ 为可学习参数，同时保持噪声不变，从而实现可微

### 条件生成

普通生成乘以条件约束即为条件生成：
$$
\tilde{p}(x^{(0)}) \propto p(x^{(0)})r(x^{(0)})
$$

要想条件化首先要将各时间步的边缘分布条件化：
$$
\tilde{p}(x^{(t)}) = \frac{1}{\tilde{z}_t} p(x^{(t)})r(x^{(t)})
$$
其中，$\tilde{z}_t$ 为归一化参数

随后再对后向扩散核条件化，原始后向扩散核为：
$$
p(x^{(t)}) = \int \mathrm{d}x^{(t+1)} p(x^{(t)} \mid x^{(t+1)})p(x^{(t+1)})
$$
条件化后为：
$$
\begin{aligned}
\tilde{p}(x^{(t)}) &= \int \mathrm{d}x^{(t+1)} \tilde{p}(x^{(t)} \mid x^{(t+1)})\tilde{p}(x^{(t+1)})\\
\frac{p(x^{(t)})r(x^{(t)})}{\tilde{z}_t} &= \int \mathrm{d}x^{(t+1)} \tilde{p}(x^{(t)} \mid x^{(t+1)}) \frac{p(x^{(t+1)})r(x^{(t+1)})}{\tilde{z}_{t+1}} && 带入条件化边缘概率\\
p(x^{(t)})\frac{}{} &= \int \mathrm{d}x^{(t+1)} \tilde{p}(x^{(t)} \mid x^{(t+1)}) \frac{\tilde{z}_t r(x^{(t+1)})}{\tilde{z}_{t+1}r(x^{(t)})}p(x^{(t+1)})\\
\end{aligned}
$$
与原始后向扩散核对比有，积分函数相等：
$$
\begin{aligned}
\tilde{p}(x^{(t)} \mid x^{(t+1)}) \frac{\tilde{z}_t r(x^{(t+1)})}{\tilde{z}_{t+1}r(x^{(t)})}p(x^{(t+1)}) &= p(x^{(t)} \mid x^{(t+1)})p(x^{(t+1)})\\
\tilde{p}(x^{(t)} \mid x^{(t+1)}) &= \frac{\tilde{z}_{t+1}r(x^{(t)})}{\tilde{z}_t r(x^{(t+1)})}p(x^{(t)} \mid x^{(t+1)})\\
\end{aligned}
$$
对于固定的 $x^{(t+1)}$ 上式为关于 $x^{(t)}$ 的条件分布，此时 $\frac{\tilde{z}_{t+1}}{\tilde{z}_t r(x^{(t+1)})}$ 为常数，故上式可写作：
$$
\tilde{p}(x^{(t)} \mid x^{(t+1)}) = \frac{1}{\tilde{z}_t(x^{(t+1)})}p(x^{(t)} \mid x^{(t+1)})r(x^{(t)})
$$
其中，$\tilde{z}_t(x^{(t+1)})$ 为依赖于 $x^{(t+1)}$ 的归一化参数

条件化后，后向扩散核仍为高斯分布，证明暂略

若 $r(x^{(t)})$ 平滑，则条件化可近似为改变后向扩散核的均值；若 $r(x^{(t)})$ 可以精确相乘，就直接做闭式乘法，这适用于图像修复

在选择 $r(x^{(t)})$ 时需要其在过程中缓慢变化，可从以下两种形式中选其一：
$$
\begin{aligned}
r(x^{(t)}) &= r(x^{(0)})\\
r(x^{(t)}) &= r(x^{(0)})^{\frac{T-t}{T}}\\
\end{aligned}
$$

### 后向过程的熵

后向过程的熵 $H_q(x^{(t-1)} \mid x^{(t)})$ 有以下上下界，证明暂略：
$$
H_q(x^{(t)} \mid x^{(t-1)}) + H_q(x^{(t-1)} \mid x^{(0)}) - H_q(x^{(t)} \mid x^{(0)}) \le H_q(x^{(t-1)} \mid x^{(t)}) \le H_q(x^{(t)} \mid x^{(t-1)})
$$