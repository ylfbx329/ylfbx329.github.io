---
title: 'End-to-End Video Scene Graph Generation With Temporal Propagation Transformer'
summary: 利用时间传播变换器生成端到端视频场景图
date: 2024-07-24T15:52:00+08:00
categories: 文献阅读
---

## Abstract

现有视频场景图生成采用多步策略：帧级别目标检测、关系识别和时间关联。忽略步骤间的相互作用，导致次优解
提出一种端到端的视频场景图生成框架，基于一种新的时间传播Transformer架构（TPT），统一了目标检测、目标跟踪和关系识别
使用查询传播模块（QPM）在时间维度上拓展了detr，实现跨帧的检测实例关联
利用时间动态编码器（TDE），通过关注先前帧的历史运动状态，动态丰富用于关系识别的检测实例特征
设计关系传播策略（RP），增强相邻帧之间关系识别结果的时间一致性
在VidHOI和 Action Genome benchmarks的实验结果显示TPT领先SOTA

## QPM


