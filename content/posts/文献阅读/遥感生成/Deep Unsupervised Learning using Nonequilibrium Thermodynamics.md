---
title: 'ICML 15 | Deep Unsupervised Learning using Nonequilibrium Thermodynamics'
summary: 
date: 2026-05-30T8:00:00+08:00
categories: 文献阅读
---

> 论文链接：http://proceedings.mlr.press/v37/sohl-dickstein15.html
> 代码链接：https://github.com/Sohl-Dickstein/Diffusion-Probabilistic-Models
> 作者单位：斯坦福大学

> 数学基础：
> - 条件概率公式：$p(x \mid y) = \frac{p(x,y)}{p(y)}$
>   链式展开：$p(x_1, \cdots ,x_n) = p(x_1)\prod_{i=2}^{n}p(x_i \mid x_1, \cdots ,x_{i-1})$ 
> - 边缘概率公式：$p(x) = \int p(x,y) \mathrm{d}y$
> - 贝叶斯公式：$p(x \mid y) = \frac{p(y \mid x) p(x)}{p(y)}$
> - 似然：概率是根据规则预测结果，似然是根据结果推测规则
>   $P(x \mid \theta)$ 中固定 $\theta$，变化 $x$ 则为概率函数；固定 $x$（已知观测数据），$\theta$ 未知则为似然函数 $L(\theta \mid x)$
> - 期望公式：
>   - 连续变量：$E[X] = \int xp(x)\mathrm{d}x$
>   - 函数：$E[g(X)] = \int g(x)p(x)\mathrm{d}x$
> - Jensen 不等式：
>   - 若 $f$ 为凸函数，则 $f(\mathbb{E}[Z]) \le \mathbb{E}[f(Z)]$
>   - 若 $f$ 为凹函数，则 $f(\mathbb{E}[Z]) \ge \mathbb{E}[f(Z)]$
> - 连续变量的熵（微分熵）：$H_p(X) = -\int p(x) \log p(x) \mathrm{d}x$
>   条件熵：$H_p(Y|X) = - \int p(x,y) \log p(y|x) \mathrm{d}x\mathrm{d}y$
>   两个分布的交叉熵：$H(q,p) = -\int q(x) \log p(x) \mathrm{d}x$
> - KL散度：$D_{KL}(p || q) = \int p(x) \ln \frac{p(x)}{q(x)} \,dx$

## 动机

概率模型（probabilistic models）一直在易处理与灵活性之间平衡

我们定义一个逐渐将一种分布转换为另一分布的马尔科夫链，生成式马尔科夫链即使用 diffusion 过程将一个简单的已知分布转换为目标数据分布

在此框架下模型用于估计单一 diffusion 过程中的微小扰动，从而降低处理难度；此外，任一平滑的目标分布均存在 diffusion 过程，因此此方法灵活度较高

## 方法

前向过程（diffusion 过程）：将目标数据分布转换为简单已知分布
逆向过程：在有限的时间步下，从简单分布中生成目标数据分布

### 前向过程 $q(x^{(0 \cdots T)})$

目标数据分布 $q(x^{(0)})$，简单已知分布 $\pi(y)$，有马尔可夫 diffusion 核 $T_\pi(y \mid y';\beta)$，表示从状态 $y'$ 扩散一步后转移到 $y$ 的条件概率分布，$\beta$ 为扩散速率，$\pi(y)$ 为扩散过程的不变分布，即到达分布 $\pi(y)$ 后再进行扩散转移时概率分布不变，也就是 $T_\pi(y \mid y';\beta)$ 满足 $\pi(y) = \int \mathrm{d}y' T_\pi(y \mid y';\beta) \pi(y')$

> 证明如下：
> 扩散前 $y' \sim \pi(y')$，扩散转移后 $y \sim T_\pi(y \mid y';\beta)$
> 扩散转移后 $y$ 的边缘分布为：$$p(y) = \int p(y \mid y')p(y')\mathrm{d}y'= \int T_\pi(y \mid y';\beta)\pi(y')\mathrm{d}y'$$ 因为扩散转移后概率分布不变，即 $p(y) = \pi(y')$，则有 $$\pi(y) = \int \mathrm{d}y' T_\pi(y \mid y';\beta) \pi(y')$$

前向过程可以表示为：
$$
\begin{aligned}
q(x^{(t)} \mid x^{(t-1)}) &= T_\pi(x^{(t)} \mid x^{(t-1)};\beta_t) \\
q(x^{(0 \cdots T)}) &= q(x^{(0)}) \prod_{t=1}^{T} q(x^{(t)} \mid x^{(t-1)})
\end{aligned}
$$

注意：前向过程的终点 $q(x^{(T)}) \approx \pi(x)$ 并不能保证严格服从简单分布

### 后向过程 $p(x^{(0 \cdots T)})$

对于高斯扩散，在时间步数 $T$ 足够大、每一步扩散速率 $\beta$ 足够小时，前向扩散过程接近连续扩散过程。此时其反向转移可以近似采用与前向转移相同的分布族进行建模。因此，若前向扩散变换 $q(x^{(t)} \mid x^{(t-1)})$ 是高斯形式，则反向生成变换 $p(x^{(t-1)} \mid x^{(t)})$ 也可被视为高斯分布。后向过程可表示为：
$$
\begin{aligned}
p(x^{(T)}) &= \pi(x^{(T)}) \\
p(x^{(0 \cdots T)}) &= p(x^{(T)}) \prod_{t=1}^{T} p(x^{(t-1)} \mid x^{(t)})
\end{aligned}
$$

对于高斯扩散，仅需学习反向马尔可夫变换中高斯分布的均值 $f_\mu(x^{(t)},t)$ 与方差 $f_\Sigma(x^{(t)},t)$ 即可，本文使用 MLP 对以上两函数进行学习

### 训练目标

最大化对数似然：$L = \int \mathrm{d}x^{(0)} q(x^{(0)}) \log p(x^{(0)})$（按照真实数据分布 $q(x^{(0)})$ 加权平均）

我们要寻找其下界

对于目标数据分布 $p(x^{(0)})$ 有：
$$
\begin{aligned}
p(x^{(0)}) &= \int \mathrm{d}x^{(1 \cdots T)} p(x^{(0 \cdots T)}) && 边缘概率公式\\
&= \int \mathrm{d}x^{(1 \cdots T)} p(x^{(0 \cdots T)}) \frac{q(x^{(1 \cdots T)} \mid x^{(0)})}{q(x^{(1 \cdots T)} \mid x^{(0)})}\\
&= \int \mathrm{d}x^{(1 \cdots T)} q(x^{(1 \cdots T)} \mid x^{(0)}) \frac{p(x^{(0 \cdots T)})}{q(x^{(1 \cdots T)} \mid x^{(0)})}\\
&= \int \mathrm{d}x^{(1 \cdots T)} q(x^{(1 \cdots T)} \mid x^{(0)}) \frac{p(x^{(T)}) \prod_{t=1}^{T} p(x^{(t-1)} \mid x^{(t)})}{\prod_{t=1}^{T} q(x^{(t)} \mid x^{(t-1)})} && 分子分母条件概率链式展开，结合马尔可夫性化简\\
&= \int \mathrm{d}x^{(1 \cdots T)} q(x^{(1 \cdots T)} \mid x^{(0)}) p(x^{(T)}) \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}
\end{aligned}
$$

带入得
$$
\begin{aligned}
L &= \int \mathrm{d}x^{(0)} q(x^{(0)}) \log [\int \mathrm{d}x^{(1 \cdots T)} q(x^{(1 \cdots T)} \mid x^{(0)}) p(x^{(T)}) \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}]\\
&= \mathbb{E}_{q(x^{(0)})} [\log [\mathbb{E}_{q(x^{(1 \cdots T)} \mid x^{(0)})} [p(x^{(T)}) \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}]]]\\
&\ge \mathbb{E}_{q(x^{(0)})} [\mathbb{E}_{q(x^{(1 \cdots T)} \mid x^{(0)})} [\log [p(x^{(T)}) \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}]]] && 对内层使用 Jensen 不等式\\
&= \mathbb{E}_{q(x^{(0 \cdots T)})} [\log [p(x^{(T)}) \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}]] && 条件概率合并期望\\
&= \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [{\color{red}p(x^{(T)})} \prod_{t=1}^{T} \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] && 展开期望\\
&= \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \sum_{t=1}^{T} \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] + {\color{red} \int \mathrm{d}x^{(T)} q(x^{(T)}) \log p(x^{(T)})} && 处理t=T\\
&= \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \sum_{t=1}^{T} \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] + \int \mathrm{d}x^{(T)} q(x^{(T)}) \log {\color{blue}\pi(x^{(T)})}
\end{aligned}
$$

设最后一项 $\int \mathrm{d}x^{(T)} q(x^{(T)}) \log \pi(x^{(T)}) = C$ 带入高斯分布概率密度公式并简化 $x^{(T)}$ 为 $x$ 有：
$$
\begin{aligned}
C &= \int \mathrm{d}x q(x) \log (\frac{1}{\sqrt{2\pi}} e^{-x^2/2})\\
&= \int \mathrm{d}x q(x) (-\frac{1}{2} \log 2\pi - \frac{1}{2}x^2)\\
&= -\frac{1}{2} \log 2\pi \int \mathrm{d}x q(x) - \frac{1}{2} \int \mathrm{d}x q(x) x^2\\
&= -\frac{1}{2} \log 2\pi - \frac{1}{2} {\color{red}\int \mathrm{d}x q(x) x^2} && q 为概率，积分为 1
\end{aligned}
$$

对于高斯分布 $\pi \sim \mathcal{N}(0,1)$，熵为：
$$
\begin{aligned}
H_\pi(x) &= -\int \mathrm{d}x \pi(x) \log \pi(x)\\
&= -\int \mathrm{d}x \pi(x) \log (\frac{1}{\sqrt{2\pi}} e^{-x^2/2})\\
&= \frac{1}{2} \log 2\pi + \frac{1}{2} {\color{red}\int \mathrm{d}x \pi(x) x^2}
\end{aligned}
$$

由于 $q(x)$ 不严格等于 $\pi(x)$，故考虑 $\int \mathrm{d}x q(x) x^2$ 整体，即 $\mathbb{E}_q[x^2]$
对于高斯假设 $q(x^{(t)} \mid x^{(t-1)}) = \mathcal{N}(x^{(t)}; \sqrt{1-\beta_t}x^{(t-1)}, \beta_t\mathbf{I})$ 即：
$$
\begin{aligned}
x^{(t)} &= \sqrt{1-\beta_t}x^{(t-1)} + \sqrt{\beta_t}\epsilon_t\\
{x^{(t)}}^2 &= (\sqrt{1-\beta_t}x^{(t-1)} + \sqrt{\beta_t}\epsilon_t)^2 && 同时平方\\
{x^{(t)}}^2 &= (1-\beta_t){x^{(t-1)}}^2 + 2\sqrt{\beta_t(1-\beta_t)}x^{(t-1)}\epsilon_t + \beta_t\epsilon_t^2\\
\mathbb{E}[{x^{(t)}}^2] &= (1-\beta_t)\mathbb{E}[{x^{(t-1)}}^2] + 2\sqrt{\beta_t(1-\beta_t)}\mathbb{E}[x^{(t-1)}\epsilon_t] + \beta_t\mathbb{E}[\epsilon_t^2] && 取平均
\end{aligned}
$$

由于标准高斯噪声 $\epsilon_t$ 与 $x^{(t-1)}$ 独立，且 $\mathbb{E}[\epsilon_t]=0$，$\mathbb{E}[\epsilon_t^2]=1$，则有：
$$
\begin{aligned}
\mathbb{E}[{x^{(t)}}^2] &= (1-\beta_t)\mathbb{E}[{x^{(t-1)}}^2] + 0 + 1\beta_t\\
&= (1-\beta_t)\mathbb{E}[{x^{(t-1)}}^2] + \beta_t
\end{aligned}
$$

此时，若有 $\mathbb{E}[{x^{(0)}}^2]=1$，则对于 $\forall t, \mathbb{E}[{x^{(t)}}^2] = 1-\beta_t + \beta_t = 1$
> 现代 Diffusion 已不再严格要求 $\mathbb{E}[{x^{(0)}}^2]=1$ 而是通过将最后一项 $C$ 看作无参常数而省略

故对数似然下界的最后一项 $C$ 有：
$$
\begin{aligned}
C &= \int \mathrm{d}x^{(T)} q(x^{(T)}) \log \pi(x^{(T)})\\
&= -\frac{1}{2} \log 2\pi - \frac{1}{2} {\color{red}\int \mathrm{d}x q(x) x^2}\\
&= -\frac{1}{2} \log 2\pi - \frac{1}{2}
\end{aligned}
$$

由于标准高斯分布的 $\mathbb{E}_\pi[x^2] = 1$，则熵有：
$$
\begin{aligned}
H(\pi) &= \frac{1}{2} \log 2\pi + \frac{1}{2} {\color{red}\int \mathrm{d}x \pi(x) x^2}\\
&= \frac{1}{2} \log 2\pi + \frac{1}{2}
\end{aligned}
$$

故 $C = -H_\pi(x) = -H_p(x)$，带入，继续化简对数似然下界：
$$
\begin{aligned}
L &\ge \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \sum_{t=1}^{T} \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] + \int \mathrm{d}x^{(T)} q(x^{(T)}) \log {\color{blue}\pi(x^{(T)})}\\
&= \sum_{t=1}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] - H_p(x^{(T)})\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] - H_p(x^{(T)}) + \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) \log [\frac{p(x^{(0)} \mid x^{(1)})}{q(x^{(1)} \mid x^{(0)})}] && 处理 t=1
\end{aligned}
$$

由于 $x^{(0)}$ 是数据端点，为了避免该特殊端点在训练目标中产生一个单独的边界项，不再学习 $p(x^{(0)}\mid x^{(1)})$，而是将其固定为扩散核 $T_\pi$ 关于平稳分布 $\pi$ 的时间反演核：
$$
p(x^{(0)}\mid x^{(1)})=T_\pi^R(x^{(0)}\mid x^{(1)})
$$

为了定义这个时间反演核，考虑一个辅助的平衡马尔可夫链，其平稳分布为 $\pi$，转移核为 $T_\pi$。因为该辅助链从平稳分布出发 $r(x^{(0)}) = \pi(x^{(0)})$，且经过一步 $T_\pi$ 转移后仍保持平稳分布，因此 $r(x^{(1)})=\pi(x^{(1)})$，时间反演核定义为该平衡链中反方向的条件分布，有：
$$
\begin{aligned}
p(x^{(0)} \mid x^{(1)}) &= T_\pi^R(x^{(0)} \mid x^{(1)})\\
&= r(x^{(0)} \mid x^{(1)})\\
&= \frac{r(x^{(0)}) r(x^{(1)} \mid x^{(0)})}{r(x^{(1)})} && 贝叶斯\\
&= \frac{\pi(x^{(0)}) T_\pi(x^{(1)} \mid x^{(0)})}{\pi(x^{(1)})} && 辅助链定义\\
&= T_\pi(x^{(1)}\mid x^{(0)}) \frac{\pi(x^{(0)})}{\pi(x^{(1)})}\\
&= q(x^{(1)}\mid x^{(0)})\frac{\pi(x^{(0)})}{\pi(x^{(1)})} && 前向扩散过程定义
\end{aligned}
$$

将 $p(x^{(0)} \mid x^{(1)}) = q(x^{(1)}\mid x^{(0)})\frac{\pi(x^{(0)})}{\pi(x^{(1)})}$ 带入，继续化简对数似然下界：
$$
\begin{aligned}
L &\ge \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] - H_p(x^{(T)}) + \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) \log [\frac{\color{red}p(x^{(0)} \mid x^{(1)})}{q(x^{(1)} \mid x^{(0)})}]\\
&= A + \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) \log [\frac{\color{red}q(x^{(1)} \mid x^{(0)}) \pi(x^{(0)})}{q(x^{(1)} \mid x^{(0)}) {\color{red}\pi(x^{(1)})}}] && 令 A = \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})}] - H_p(x^{(T)})\\
&= A + \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) [\log \pi(x^{(0)}) - \log \pi(x^{(1)})]\\
&= A + \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) \log \pi(x^{(0)}) - \int \mathrm{d}x^{(0)} \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) \log \pi(x^{(1)})\\
&= A + \int \mathrm{d}x^{(0)} [\int \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)}) \log \pi(x^{(0)})] - \int \mathrm{d}x^{(1)} [\int \mathrm{d}x^{(0)} q(x^{(0)},x^{(1)}) \log \pi(x^{(1)})] && 分步积分\\
&= A + \int \mathrm{d}x^{(0)} \log \pi(x^{(0)}) [\int \mathrm{d}x^{(1)} q(x^{(0)},x^{(1)})] - \int \mathrm{d}x^{(1)} \log \pi(x^{(1)}) [\int \mathrm{d}x^{(0)} q(x^{(0)},x^{(1)})] && 提出无关积分项\\
&= A + \int \mathrm{d}x^{(0)} q(x^{(0)}) \log \pi(x^{(0)}) - \int \mathrm{d}x^{(1)} q(x^{(1)}) \log \pi(x^{(1)}) && 逆向边缘概率公式
\end{aligned}
$$

如前所证，在高斯假设下，若 $\mathbb{E}_q[{x^{(0)}}^2] = 1$，则对于 $\forall t$ 有：
$$
\begin{aligned}
\int \mathrm{d}x^{(t)} q(x^{(t)}) \log \pi(x^{(t)}) &= -\frac{1}{2} \log 2\pi - \frac{1}{2} \int \mathrm{d}x^{(t)} q(x^{(t)}) {x^{(t)}}^2\\
&= -\frac{1}{2} \log 2\pi - \frac{1}{2}
\end{aligned}
$$

因此，当 $t=0$ 和 $t=1$ 时 $\int \mathrm{d}x^{(0)} q(x^{(0)}) \log \pi(x^{(0)}) = \int \mathrm{d}x^{(1)} q(x^{(1)}) \log \pi(x^{(1)})$ 两项相消，对数似然下界为：
$$
\begin{aligned}
L &\ge A = \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t)} \mid x^{(t-1)})} - H_p(x^{(T)}) && 写为KL散度形式\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log \frac{p(x^{(t-1)} \mid x^{(t)})}{\color{red}q(x^{(t)} \mid x^{(t-1)},x^{(0)})} - H_p(x^{(T)}) && 马尔可夫性质，加一项条件不影响概率\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log [\frac{p(x^{(t-1)} \mid x^{(t)})}{\color{red}q(x^{(t-1)} \mid x^{(t)},x^{(0)})} \frac{\color{red}q(x^{(t-1)} \mid x^{(0)})}{\color{red}q(x^{(t)} \mid x^{(0)})}] - H_p(x^{(T)}) && 贝叶斯公式\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})} + \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log \frac{q(x^{(t-1)} \mid x^{(0)})}{q(x^{(t)} \mid x^{(0)})} - H_p(x^{(T)})\\
&= B + \sum_{t=2}^{T} [\int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log q(x^{(t-1)} \mid x^{(0)}) - \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log q(x^{(t)} \mid x^{(0)})] && 令 B = \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})} - H_p(x^{(T)})\\
&= B + \sum_{t=2}^{T} [\int \mathrm{d}x^{(0)}\mathrm{d}x^{(t-1)} q(x^{(0)},x^{(t-1)}) \log q(x^{(t-1)} \mid x^{(0)}) - \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) \log q(x^{(t)} \mid x^{(0)})] && 边缘化\\
&= B + \sum_{t=2}^{T} [- H_q(x^{(t-1)} \mid x^{(0)}) + H_q(x^{(t)} \mid x^{(0)})] && 条件熵定义\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0 \cdots T)} q(x^{(0 \cdots T)}) \log \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})} - H_q(x^{(1)} \mid x^{(0)}) + H_q(x^{(T)} \mid x^{(0)}) - H_p(x^{(T)}) && 展开求和，逐项抵消\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t-1)}\mathrm{d}x^{(t)} {\color{red}q(x^{(0)}, x^{(t-1)}, x^{(t)})} \log \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})} + C && 边缘化，令 C = - H_q(x^{(1)} \mid x^{(0)}) + H_q(x^{(T)} \mid x^{(0)}) - H_p(x^{(T)})\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t-1)}\mathrm{d}x^{(t)} {\color{red}q(x^{(t)}, x^{(0)}) q(x^{(t-1)} \mid x^{(t)}, x^{(0)})} \log \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})} + C && 链式分解\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) \int \mathrm{d}x^{(t-1)} q(x^{(t-1)} \mid x^{(t)}, x^{(0)}) \log \frac{p(x^{(t-1)} \mid x^{(t)})}{q(x^{(t-1)} \mid x^{(t)},x^{(0)})} + C && 分步积分，提出无关项\\
&= \sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) (-D_{KL}(q(x^{(t-1)} \mid x^{(t)},x^{(0)}) || p(x^{(t-1)} \mid x^{(t)}))) + C && KL散度定义\\
&= -\sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) D_{KL}(q(x^{(t-1)} \mid x^{(t)},x^{(0)}) || p(x^{(t-1)} \mid x^{(t)})) - H_q(x^{(1)} \mid x^{(0)}) + H_q(x^{(T)} \mid x^{(0)}) - H_p(x^{(T)})
\end{aligned}
$$

以上，训练目标为寻找能够最大化此对数似然的下界的逆马尔可夫变换，即：
$$
\hat{p}(x^{(t-1)}|x^{(t)}) = \underset{p(x^{(t-1)}|x^{(t)})}{\arg\max} -\sum_{t=2}^{T} \int \mathrm{d}x^{(0)}\mathrm{d}x^{(t)} q(x^{(0)},x^{(t)}) D_{KL}(q(x^{(t-1)} \mid x^{(t)},x^{(0)}) || p(x^{(t-1)} \mid x^{(t)})) - H_q(x^{(1)} \mid x^{(0)}) + H_q(x^{(T)} \mid x^{(0)}) - H_p(x^{(T)})
$$

### $\beta$ 设置

在高斯分布情况下，设定 $\beta_1$ 为较小初始值，$\beta_{2 \cdots T}$ 为可学习参数，同时保持噪声不变，从而实现可微

### 条件生成

普通生成乘以条件约束即为条件生成：
$$\tilde{p}(x^{(0)}) \propto p(x^{(0)})r(x^{(0)})$$

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
p(x^{(t)})\frac{}{} &= \int \mathrm{d}x^{(t+1)} \tilde{p}(x^{(t)} \mid x^{(t+1)}) \frac{\tilde{z}_t r(x^{(t+1)})}{\tilde{z}_{t+1}r(x^{(t)})}p(x^{(t+1)})
\end{aligned}
$$
与原始后向扩散核对比有，积分函数相等：
$$
\begin{aligned}
\tilde{p}(x^{(t)} \mid x^{(t+1)}) \frac{\tilde{z}_t r(x^{(t+1)})}{\tilde{z}_{t+1}r(x^{(t)})}p(x^{(t+1)}) &= p(x^{(t)} \mid x^{(t+1)})p(x^{(t+1)})\\
\tilde{p}(x^{(t)} \mid x^{(t+1)}) &= \frac{\tilde{z}_{t+1}r(x^{(t)})}{\tilde{z}_t r(x^{(t+1)})}p(x^{(t)} \mid x^{(t+1)})
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
r(x^{(t)}) &= r(x^{(0)})^{\frac{T-t}{T}}
\end{aligned}
$$

### 后向过程的熵

后向过程的熵 $H_q(x^{(t-1)} \mid x^{(t)})$ 有以下上下界，证明暂略：
$$
H_q(x^{(t)} \mid x^{(t-1)}) + H_q(x^{(t-1)} \mid x^{(0)}) - H_q(x^{(t)} \mid x^{(0)}) \le H_q(x^{(t-1)} \mid x^{(t)}) \le H_q(x^{(t)} \mid x^{(t-1)})
$$