---
title: 'Diffusion models for spatio-temporal-spectral fusion of homogeneous Gaofen-1 satellite platforms'
summary: 同构高分一号卫星平台时空谱融合的扩散模型
date: 2024-07-02T16:45:00+08:00
categories: 文献阅读
---

## 方法

### 用于融合的去噪网络

#### 多尺度融合模块

![多尺度融合模块](./imgs/MSF.png)

- 训练阶段，噪声图像为目标时刻PAN和MS空谱融合后的加噪声图像
- 测试阶段，噪声图像为纯噪声

MSF模块的每个分支通道数均为12？

#### 