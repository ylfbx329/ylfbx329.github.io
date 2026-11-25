---
title: 'CSS学习笔记'
summary: CSS学习记录，主要为《Pink老师前端》课程内容
date: 2022-09-13T10:14:29+08:00
categories: 自学笔记
# draft: true
---
## 基本概念

CSS（Cascading Style Sheets）：层叠样式表

CSS 分类
- 内联样式表（行内样式表）：写在开始标签的 `style` 属性中，仅控制当前标签
  - `<div style="color: pink;"></di>`
- 内部样式表：将所有 CSS 代码放在 `<style>` 标签内，控制当前整个页面
  ```html
  <style>
    div{
      color: pink;
    }
  </style>
  ```
  - `<style>` 标签理论上可在任意位置，但习惯在 `<head>` 标签内
- 外部样式表：创建单独 CSS 样式文件，HTML 文档中使用 link 标签引入
  - `<link rel="stylesheet" href="CSS 文件路径"/>`

语法规范：选择器 + 若干样式声明
- 选择器选择 HTML 元素
- 花括号内用键值对声明样式
- 多个键值对以分号分割

CSS 注释：`/* 注释内容 */`

CSS 三大特性：层叠性、继承性、优先级
- 层叠性：同一 HTML 元素被相同选择器设置了不同样式时后定义的样式生效（后来居上、就近原则）
- 继承性：子标签继承父标签某些样式，大多为文本相关
- 优先级：选择器权重为4个数，从前到后比较，相同则比较下一个
  - 继承，通配符选择器：`0 0 0 0`
  - 标签、伪元素选择器：`0 0 0 1`
  - 类、伪类、属性选择器：`0 0 1 0`
  - id 选择器：`0 1 0 0`
  - 内联样式：`1 0 0 0`
  - `!important`：`无限大`
  - 多个选择器时逐个数累加，不跨数进位

## 选择器

### 基础选择器

标签选择器（类型/元素选择器）：`标签名 {}`
- 选择所有该标签的 HTML 元素

类选择器：`.类名 {}`
- HTML 元素使用 `class` 属性定义类名
- HTML 元素可有多个类名，用空格分割
- 类名不能与标签名重复，用 `-` 分割单词

id 选择器：`#id {}`
- HTML 元素使用 `id` 属性定义类名
- 同一 HTML 文档中元素的 id 不要重复

通配符选择器：`* {}`
- 选择所有 HTML 元素

### 关系选择器

后代选择器：`选择器1 选择器2 {}`
- 选择某个元素的后代元素，不限层级
- 可增加多个选择器更细致地描绘父子关系

子代选择器：`选择器1 > 选择器2 {}`
- 选择某个元素的直接子元素，仅一层

邻接兄弟选择器：`选择器1 + 选择器2 {}`
- 选择某个元素后紧挨着的兄弟元素

通用兄弟选择器：`选择器1 ~ 选择器2 {}`
- 选择某个元素后的所有兄弟元素

### 分组选择器

```css
选择器1,
选择器2 {

}
```

用逗号组合多个选择器，也称并集选择器

### 伪类选择器

选择处于特定状态或结构位置的元素，符号为 `:`

链接伪类：必须按照 LVHA 的顺序书写，颠倒不生效
- `a:link` 默认的，未访问链接
- `a:visited` 已被访问的链接
- `a:hover` 鼠标悬停时的链接
- `a:active` 鼠标按下瞬时的链接

用户行为伪类（动态伪类）
- `选择器:hover` 鼠标悬停
- `选择器:focus` 表单控件获取焦点

结构伪类
- `选择器:first-child` 一组兄弟元素中的第一个元素
- `选择器:last-child` 一组兄弟元素中的最后一个元素
- `选择器:nth-child(n)` 一组兄弟元素中的第 n 个
  - 数字：从 1 开始
  - 关键字：`odd` 奇数，`even` 偶数
  - 公式：`3n` `n + 2` `-n + 3` 此时 n 从 0 开始计算

表单伪类
- `选择器:disable` 表单禁用
- `选择器:checked` 单复选按钮选中状态

### 伪元素选择器

选择元素的特定部分，符号为 `::`

- `选择器::first-line` 首行
- `选择器::first-letter` 首字母
- `选择器::placeholder` `<input>` 或 `textarea` 的 `placeholder`
- `选择器::before` 和 `选择器::after`
  - 在选择器选择的元素前插入伪元素，内联元素
  - 必须加 `content` 属性，表示元素内容，可为空字符串

### 属性选择器

- `选择器[属性]` 包含指定属性的元素
- `选择器[属性=值]` 属性值等于指定值的元素
- `选择器[属性^=值]` 属性值以指定字符串开头的元素
- `选择器[属性$=值]` 属性值以指定字符串结尾的元素
- `选择器[属性*=值]` 属性值包含指定子串的元素

## 文本样式

字体样式
- 字体颜色：`color`
  - 关键字 `red`、`blue`
  - 十六进制 `#FFFFFF` `#FFF`
  - rgb `rgb(255, 0, 0)` `rgba(255, 0, 0, 0.5)`（0 透明，1 不透明）
- 字体族：`font-family`
  - 逗号分割的字体名列表，靠前优先，渲染从前到后第一个可用字体
  - 网页建议使用无衬线字体
    - 无衬线字体：黑体、微软雅黑
    - 衬线字体：宋体、仿宋
- 字体大小：`font-size`
  - 单位 `px` 像素
- 字体风格：`font-style`
  - `normal` 普通字体，`italic` 斜体
- 字体粗体：`font-weight`
  - 关键字：`normal` 正常粗细，`bold` 加粗
  - 数字：取值 100-900，`400` 正常，`700` 加粗，常用
- 字体装饰：`text-decoration`
  - `none` 无装饰，`underline` 下划线，`overline` 上划线，`line-through` 删除线

文本布局
- 文本对齐：`text-align`
  - 设置**块级盒子**的**水平对齐**方式
  - `left` 左对齐，`right` 右对齐，`center` 水平居中，`justify` 两端对齐
- 首行缩进：`text-indent`
  - 设置**块级盒子**的缩进
  - 单位 `px` 像素，`em` 当前字体大小
- 字间距：`letter-spacing`
  - 单位 `px` 像素
- 行高：`line-height`
  - 行高设置为盒子高度，可使单行文本垂直居中
  - 单位 `px` 像素，无单位则为当前字体大小的倍数

简写：`font: font-style font-weight font-size / line-height font-family;`
- `font-size` 和 `font-family` 必须保留，其余可省略

## 盒子模型

块级盒子（区块盒子）
- 一行一个
- `width` 和 `height` 属性有效
- 宽度默认等于父级
- 内外边距、边框会撑大盒子
- 如：`<div>`、`<h1>`、`<p>`、`<ul>`、`<table>`

内联盒子（行内盒子）
- 一行多个
- `width` 和 `height` 属性无效
- 垂直方向内外边距无效，水平方向有效
- 如：`<span>`、`<strong>`、`<em>`、`<a>`

盒子模型（针对块级盒子）
- 盒子内容：大小由内容或指定高宽决定
- 内边距：内容到边框的距离
- 边框
- 外边距：盒子与其他元素间的距离

盒子尺寸计算方式：`box-sizing`
- `content-box` 默认，`width` 等于内容宽度
- `border-box` `width` = `border` + `padding` + 内容宽度

### 边框

设置所有边框：`border: 粗细 样式 颜色;`
- 样式：`none` 无边框，`solid` 实线，`dashed` 虚线，`dotted` 点线

分别设置四个边框
- `border-top: 粗细 样式 颜色;`
- `border-left: 粗细 样式 颜色;`
- `border-right: 粗细 样式 颜色;`
- `border-bottom: 粗细 样式 颜色;`

圆角：`border-radius`
- `0` 无圆角，`px` 像素，`%` 百分比（`50%` 为圆形）
- 多个值：顺时针
  - `border-radius: 左上和右下角 右上和左下角`
  - `border-radius: 左上角 右上和左下角 右下角`
  - `border-radius: 左上角 右上角 右下角 左下角`

### 内边距

统一设置：顺时针
- `padding 上下左右内边距`
- `padding 上下内边距 左右内边距`
- `padding 上内边距 左右内边距 下内边距`
- `padding 上内边距 右内边距 下内边距 左内边距`

分别设置四个内边距
- `padding-top`
- `padding-left`
- `padding-right`
- `padding-bottom`

### 外边距

对于行内盒子，上下方向的外边距无效

统一设置：顺时针
- `margin 上下左右外边距`
- `margin 上下外边距 左右外边距`
- `margin 上外边距 左右外边距 下外边距`
- `margin 上外边距 右外边距 下外边距 左外边距`

分别设置四个外边距
- `margin-top`
- `margin-left`
- `margin-right`
- `margin-bottom`

块级盒子水平居中：`margin: 0 auto`
- 盒子必须有宽度
- `auto` 实际是让该方向的外边距占满页面，左右都为 `auto` 则左右均占满，表现为居中

外边距折叠：相邻兄弟块级元素垂直外边距合并，值为较大的一个
- 为避免错误，只设置一个盒子的外边距

外边距塌陷：嵌套父子块级元素中给子元素设置垂直外边距会使父盒子塌陷移动
- 解决方法：
  - 给父盒子加边框
  - 给父盒子加内边距
  - 给父盒子加 `overflow: hidden`

### 背景

背景颜色：`background-color`
背景图片：`background-image: url()`
背景平铺：`background-repeat`
- `repeat` 默认，`no-repeat` 不平铺，`repeat-x` 横向平铺，`repeat-y` 纵向平铺
背景位置：`background-position: x y;`
- 关键词：`top`、`bottom`、`left`、`right`、`center` 默认
- 数值：`px` 像素，`%` 百分比
背景大小：`background-size`
- 关键词：`cover` 拉伸裁剪图片以覆盖整个盒子，`contain` 拉伸图片撑满盒子短边但不会超出
- 数值：`w h` 宽高，单位 `px` 像素，`%` 百分比
背景滚动：`background-attachment`
- `scroll` 默认，随盒子一起滚动，`fixed` 屏幕位置固定，不随盒子滚动

简写：`background: 颜色 图片 平铺 位置/大小 滚动;`
- 位置和大小之间必须有 `/`
 
背景渐变
- 线性渐变：`background-image: linear-gradient(方向, 颜色 [位置], 颜色 [位置])`
  - 方向：关键字 `to right`，数值 `deg` 角度
  - 位置：`%` 百分比
- 径向渐变：`background-image: ratio-gradient()`

文字渐变
```css
.text {
    background: linear-gradient(to right, #409eff, #67c23a);
    /* 裁剪背景，仅保留文字区域 */
    background-clip: text;
    /* 裁剪背景，兼容性写法 */
    -webkit-background-clip: text;
    /* 设置文字为透明 */
    color: transparent;
}
```

### 阴影

`box-shadow: x轴偏移量 y轴偏移量 模糊半径 扩散半径 颜色 inset;`
- `x轴偏移量` 和 `y轴偏移量` 必填
- `inset` 默认不写，为外阴影，添加后为内阴影

## 过渡

`transition: 过渡属性 过渡时间`
- `过渡属性`：`all` 默认，可省略
- `过渡时间`：单位 `s` 秒
- 写在过渡对象中

## 样式初始化

消除各标签的自带样式

自己维护一个小的初始化 CSS 文件，或者引入 [normalize.css](https://necolas.github.io/normalize.css/)

## 精灵图

CSS 精灵图（CSS Sprites）：将多个小图标合并到一张大图上，减少请求次数

给盒子添加背景图片，配合 `background-position` 定位小图标

## 布局

标准流：块级元素、内联元素

显示属性：`display`
- `block` 块级元素
- `inline` 内联元素
- `inline-block`：一行多个，可设置宽高、外边距
  - 元素之间有间隔，可对父元素设置字号为 0 并重新设置子元素字号以去除
  - 要精细布局，还是用 flex 或 grid

### 浮动

对块级子元素使用，使其脱离文档流，浮动到父级元素顶部显示
间隔使用 `margin` 解决，需要小心计算并设置，防止每行最后一个盒子掉下来

`float`
- `left` 靠左浮动
- `right` 靠右浮动
- `none` 默认值，不浮动

浮动弊端：脱离文档流后，可以理解为处于一个单独的上级图层了，不占原图层位置，若父元素不便设置高度，则高度被清零，导致下方内容上移，从而叠层

解决办法：清除浮动
- 额外标签法：在最后一个浮动后添加块级盒子，设置 `clear: both;`
- 单伪元素清除法：给父元素后加伪元素
  ```css
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
  ```
- 双伪元素清除法：给父元素前后添加伪元素
  ```css
  .clearfix::after,
  .clearfix::before {
    content: "";
    display: table;
  }
  .clearfix::after {
    clear: both;
  }
  ```
- `overflow` 清除浮动：给父元素设置 `overflow: hidden`，会溢出隐藏，不常用

### 弹性

视窗大小改变时盒子大小会适应性变化，也成为伸缩布局

特点：
- 父控子，属性写在父元素中，且不能隔代
- 父元素称容器，子元素称项目
- 主轴默认为水平方向，交叉轴默认为垂直方向
- 主轴控制项目排列方式，交叉轴控制项目移动方向

**容器属性（父元素）**

开启弹性布局 `display: flex;`，项目按照主轴方向排列显示，元素可设置高宽
- 若子元素大小固定则固定大小显示（推荐）
- 若子元素无大小，则高度拉伸到撑满
- 若子元素大小超过父元素，则会被压缩

主轴对齐方式 `justify-content`
- `flex-start` 左对齐
- `flex-end` 右对齐
- `center` 居中对齐
- `space-between` 两端对齐 `A--B--C`
- `space-around` 每个盒子左右空间相等 `-A--B--C-`
- `space-evenly` 每个空隙都一样大 `--A--B--C--`

交叉轴对齐方式 `align-items` **只对单行有效**
- `flex-start` 顶端对齐
- `flex-end` 底端对齐
- `center` 居中对齐
- `stretch` 默认，子元素无大小时拉伸到与父元素相同

改变主轴方向 `flex-direction`
- `row` 默认，水平方向，从左到右
- `row-reverse` 水平方向，从右到左
- `column` 垂直方向，从上到下
- `column-reverse` 垂直方向，从下到上

换行 `flex-wrap`
- `nowrap` 默认，不换行，会压缩子元素
- `wrap` 按照子元素宽度自动换行
- `reverse` 按照主轴反转所有行

交叉轴对齐方式 `align-content` **仅对多行生效**
- `flex-start` 上对齐
- `flex-end` 下对齐
- `center` 居中对齐
- `space-between` 两端对齐 `A--B--C`
- `space-around` 每个盒子上下空间相等 `-A--B--C-`
- `space-evenly` 每个空隙都一样大 `--A--B--C--`

**项目属性（子元素）**

`flex`

















## 样式属性

- 文本属性
  - 阴影 `text-shadow`
    - `text-shadow: h-shadow v-shadow blur color;`
    - 属性值
      | 属性值   | 说明                                    |
      | -------- | --------------------------------------- |
      | h-shadow | 必需，水平阴影的位置。允许负值          |
      | v-shadow | 必需，垂直阴影的位置。允许负值          |
      | blur     | 可选，模糊距离，阴影虚实                |
      | color    | 可选，阴影的颜色，常用 RGB(0, 0, 0, .3) |
- 盒子模型
  - 页面布局三大核心：盒子模型、浮动、定位
  - border 边框
    - 相关属性
      | 属性名          | 属性值   | 说明                   |
      | --------------- | -------- | ---------------------- |
      | border-collapse | collapse | 边框合并（多用于表格） |
    - 盒子水平居中
      - 行内（快）元素
        - 给父级加 `text-align: center;`
