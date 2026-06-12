---
title: '遥感生成'
summary: 
date: 2026-04-23T8:00:00+08:00
categories: 文献阅读
---

# 论文思路

1. RS2Change：以单幅遥感影像为基础，通过SAM等模型构建多模态控制条件，基于多模态条件生成第二时相图像，从而构造变化检测数据集
   - 代表方法：ChangeBridge、Changen2
2. Any2Change：以“语义分割、目标检测、实例分割”类型的数据集为基础，利用数据集内在条件，构造统一的生成框架，生成第二时相图像，从而将其转变为变化检测数据集
   - 代表方法：rs-paint、HySCDG
3. Noise2Change：设计生成方式，从噪声中生成语义分割图等中间产物，再逐步生成双时相图像及对应变化掩码，从而构造变化检测数据集
   - 代表方法：Noise2Change

# 数据集

- Awesome链接：https://github.com/wenhwu/awesome-remote-sensing-change-detection

- LEVIR-CD
  - 链接：http://chenhao.in/LEVIR/
- LEVIR-CD+
- LEVIR-CC
  - 链接：https://github.com/Chen-Yang-Liu/LEVIR-CC-Dataset
- Hi-UCD
  - 链接：https://rsidea.whu.edu.cn/Hi-UCD_dataset.htm
- Hi-CNA
  - 链接：https://rsidea.whu.edu.cn/Hi-CNA_dataset.htm
- WUSU
  - 链接：https://rsidea.whu.edu.cn/resource_wusu_sharing.htm
- WHU-CD
- SYSU-CD
- MCLC-CD
- JL1-CD
- SECOND

# 对比方法

# 文献阅读

## 遥感图像变化生成

### TPAMI 26 | Generating Any Changes in the Noise Domain

> 论文链接：https://doi.org/10.1109/TPAMI.2025.3643733
> 代码链接：https://github.com/chiangliu/noise2change
> 作者单位：湖南大学

- 模型：从噪声域模拟变化，兼顾变化多样性和总体一致性。训练两个生成模型，A模型生成T1影像的语义分割图，根据预设地物比例构建T2影像语义分割图生成目标L，使用A模型生成T2影像的语义分割图，生成过程利用生成目标L逐步扰动采样噪声。B模型通过T1 T2影像的低分辨率语义掩码生成高分辨率语义掩码和对应影像，变化标签通过语义掩码得到
- 数据：Noise2Change-27k

### CVPR 26 | ChangeBridge: Spatiotemporal Image Generation with Multimodal Controls for Remote Sensing

> 论文链接：https://doi.org/10.48550/arXiv.2507.04678
> 代码链接：https://github.com/zhenghuizhao/ChangeBridge
> 作者单位：武汉大学

- 模型：利用Diffusion Bridge模型从事前影像生成事后影像，接受坐标文本、实例布局、语义分割图条件

### TPAMI 25 | Changen2: Multi-Temporal Remote Sensing Generative Change Foundation Model

> 论文链接：https://ieeexplore.ieee.org/document/10713915
> 代码链接：https://github.com/Z-Zheng/pytorch-change-models
> 作者单位：斯坦福大学

- 模型：从事前影像提取边界轮廓、语义分割图作为条件图，编辑条件图以模拟事件发生，通过事前影像和事后模拟条件图生成事后影像，基于双时相条件图计算变化掩码，并利用变化掩码调整事后分割图，使其仅在变化区域与事前图像不同
- 数据：
  - Changen2-S1-15k：建筑变化监测，模型训练源为xView2
  - Changen2-S9-27k：语义变化检测，模型训练源为OpenEarthMap
  - Changen2-S0-1.2M：无类别变化检测，模型训练源为fMoW

### ISPRS 25 | Open-vocabulary generative vision-language models for creating a large-scale remote sensing change detection dataset

> 论文链接：https://doi.org/10.1016/j.isprsjprs.2025.04.023
> 代码链接：http://gpcv.whu.edu.cn/data
> 作者单位：武汉大学

- 模型：两个SD
  - CLIP文本到RS图像
  - 掩码图像修复

### CVPR 25 | The Change You Want To Detect: Semantic Change Detection In Earth Observation With Hybrid Data Generation

> 论文链接：https://doi.org/10.1109/CVPR52734.2025.00211
> 代码链接：https://yb23.github.io/projects/cywd/
> 作者单位：古斯塔夫·埃菲尔大学

- 模型：HySCDG：基于FLAIR土地覆盖数据集和 BD TOPO 地理对象实例数据，构建遥感影像、语义分割图、实例对象掩码，随机选择实例对象对其掩码进行稍微扩展，并加入随机掩码区域，与遥感影像组合形成掩码图像；将实例对象在语义分割图中的最大凸包作为变化掩码，修改对应区域语义分割图中的类别作为语义分割图条件，构建文本描述（地物类型、时间地点）条件；SD接受掩码图像输入，以变化后的语义分割图和文本描述作为条件，生成变化后图像。
- 数据：FSC-180k

### ICLRW Oral 25 | Tackling Few-Shot Segmentation in Remote Sensing via Inpainting Diffusion Model

> 论文链接：https://doi.org/10.48550/arXiv.2503.03785
> 代码链接：https://github.com/SteveImmanuel/rs-paint
> 作者单位：TelePIX

- 模型：目标检测数据集的原始图像I、标签掩码M、目标地物包围框patch P作为训练素材，SD模型接受掩码后的原始图像作为输入，目标地物patch作为条件，SD恢复掩码掉的部分，输出目标为原始图像。通过控制不同的条件，生成地物的不同变体，实现少样本分割性能的提升

### WACV 24 | SyntheWorld: A Large-Scale Synthetic Dataset for Land Cover Mapping and Building Change Detection

> 论文链接：https://ieeexplore.ieee.org/abstract/document/10483785
> 代码链接：https://github.com/JTRNEO/SyntheWorld
> 作者单位：东京大学

- 数据生成方法：基于Blender进行建模，通过随机网格划分、规则放置、随机地形生成、可控纹理生成等手段，构建城市和自然两种场景，并施加变化，得到语义变化图
- 数据：SyntheWorld

## 遥感图像生成

### AAAI 26 | Any2RSI: Controllable Remote Sensing Text-to-Image Generation via Any Control and Enriched Description

> 论文链接：https://doi.org/10.1609/aaai.v40i15.38283
> 代码链接：https://github.com/House-yuyu/Any2RSI
> 作者单位：武汉大学

- 模型：文本到遥感图像生成，支持软边界轮廓、硬边界轮廓、语义分割图作为条件输入
- 数据：RST2I-110K，115000个图像-文本对

### arXiv 26 | GeoDiT: Point-Conditioned Diffusion Transformer for Satellite Image Synthesis

> 论文链接：https://doi.org/10.48550/arXiv.2603.02172
> 作者单位：华盛顿大学

- 模型：点+点描述作为条件生成遥感图像，以DiT为主体架构，对注意力模块进行修改

## 自然图像变化生成

### WACV 25 | Improving Zero-Shot Object-Level Change Detection by Incorporating Visual Correspondence

> 论文链接：https://doi.org/10.1109/WACV61041.2025.00855
> 代码链接：https://github.com/anguyen8/image-diff
> 作者单位：奥本大学

- 模型：变化检测模型
- 数据生成方法：收集OpenImages中的图像，使用LaMa移除图像中的一个物体，筛选被移除物体边界框占1%-4%的图像，施加[-10, 10]度旋转后随机裁剪，形成视角差异
- 数据：OpenImages-Inpainted

### WACV 23 | The Change You Want to See

> 论文链接：https://doi.org/10.1109/WACV56688.2023.00398
> 代码链接：https://www.robots.ox.ac.uk/~vgg/research/cyws
> 作者单位：牛津大学

- 模型：变化检测模型
- 数据生成方法：使用LaMa对COCO中的多个对象进行剔除，组合不同剔除对象的图片形成变化对，采用包含共同剔除对象的变化对和粘贴有额外对象的变化对来对抗剔除产生的伪影和噪声
- 数据：COCO-Inpainted

## 自然图像生成

### ICLR 21 | Denoising Diffusion Implicit Models

> 论文链接：https://openreview.net/forum?id=St1giarCHLP
> 代码链接：https://github.com/ermongroup/ddim
> 作者单位：斯坦福大学

### NeurIPS 20 | Denoising Diffusion Probabilistic Models

> 论文链接：https://proceedings.neurips.cc/paper/2020/hash/4c5bcfec8584af0d967f1ab10179ca4b-Abstract.html
> 代码链接：https://github.com/hojonathanho/diffusion
> 作者单位：加州大学伯克利分校

### ICML 15 | Deep Unsupervised Learning using Nonequilibrium Thermodynamics

> 论文链接：http://proceedings.mlr.press/v37/sohl-dickstein15.html
> 代码链接：https://github.com/Sohl-Dickstein/Diffusion-Probabilistic-Models
> 作者单位：斯坦福大学

