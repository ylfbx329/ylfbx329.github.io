---
title: 'HyperTransformer: A Textural and Spectral Feature Fusion Transformer for Pansharpening'
summary: HyperTransformer：用于全色锐化的纹理和光谱特征融合变换器
date: 2023-12-20T13:08:00+08:00
categories: 文献阅读
---

> ## Abstract
>
> 三个模块：两个PAN和HSI（高光谱）空间特征提取器、多头柔性注意力模块、空间-光谱特征融合模块
>
> <https://github.com/wgcban/HyperTransformer>

## Introduction

Hyperspectral (HS) pansharpening重要且有用

HS pansharpening早期使用component substitution (CS)、multi-resolution analysis (MRA)、Bayesian、variational将PAN的空间细节转换到LR-HSI上，容易导致空谱失真，限制表示能力

DCNN能学习图像特征，SOTA方法直接将PAN的空间和纹理细节转移到LR-HSI中，导致特征融合困难和低效，导致空谱失真。图像级别的级联（figure1-a）、特征级别的级联（figure1-b），没有有效利用跨特征的PAN和LR-HSI的空间依赖关系、PAN的长跨度细节。依赖极深的卷积可能能够恰当融合纹理和空间特征，但是感受野太小，不具有全局感受野

提出HyperTransformer（figure1-c），有注意力机制提取跨特征的PAN和LR-HSI的空间依赖。四个模块：两个特征提取模块FE-PAN和FE-HSI、注意力机制、纹理-空间特征融合模块TSFF，首先提取特征，再用LR-HSI、PAN↓↑、PAN特征作为Q K V，计算高级纹理和空间相似特征表示，作为LR-HSI的特征，再混合骨干网络的LR-HSI特征形成全色锐化后的HSI。除了常规的L1损失外，引入两个损失函数，感知损失和转移感知损失。
