---
title: 'CSS笔记'
summary: CSS笔记
date: 2022-09-13T10:14:29+08:00
categories: 笔记
# draft: true
---
# CSS

## 基本概念

- CSS（Cascading Style Sheets）：层叠样式表、级联样式表，标记语言
- CSS 作用：美化网页，布局页面，实现结构与样式相分离
- 语法规范：选择器+若干样式声明
  - 选择器指定 HTML 标签，花括号内键值对声明样式
  - 多个键值对以分号分割
- CSS 引入方式
  - 行内样式表/内联样式表（行内式引入）
    - `<div style="color: pink;"></di>`
    - 标签 style 属性内设定 CSS 样式
    - 控制当前标签
    - 仅少量用于简单样式，权重高
  - 内部样式表/内嵌样式表（嵌入式引入）

    ```html
    <style>
      div{
        color: pink;
      }
    </style>
    ```

    - 将所有 CSS 代码放在 style 标签内
    - style 标签理论上可在任意位置，但习惯在 head 标签内
    - 控制当前整个页面
    - 练习时常用
  - 外部样式表（外链/链接式引入）
    - `<link rel="stylesheet" href="CSS 文件路径" />`
    - 外部创建 CSS 样式文件，HTML 文档中使用 link 标签引入
    - rel 指定当前文档与被链接文档关系 href 指定连接文档路径
    - 可控制多个页面
    - 开发中常用
- CSS 三大特性：层叠性、继承性、优先级
  - 层叠性
    - 样式冲突：相同选择器设置相同样式
    - 层叠性原则
      - 样式冲突：就近原则，后来居上
      - 样式不冲突：不层叠
  - 继承性
    - 子标签继承父标签某些样式
    - 可继承样式：文本（`text-` `font-` `line-`）颜色（`color`）
    - 行高继承：行高为不加单位 `1.5` 即 `文字大小*1.5` 继承后为 `子元素文字大小*1.5`
  - 优先级
    - 选择器相同：层叠性；选择器不同：依据选择器权重
    - 选择器权重
      | 选择器              | 权重    |
      | ------------------- | ------- |
      | 继承 *              | 0,0,0,0 |
      | 元素选择器          | 0,0,0,1 |
      | 类、伪类选择器      | 0,0,1,0 |
      | id 选择器           | 0,1,0,0 |
      | 行内样式 `style=""` | 1,0,0,0 |
      | `!important` 关键字 | 无穷大  |
      - `!important` 关键字：`color: white !important;`
      - 权重为 4 组数
      - 由左向右逐组判断，若相同判断下一组，若不同则大的为高优先级
      - 父级元素权重不会被子级继承
      - 复合选择器权重按组相加，不跨组进位
- CSS 注释：`/* 注释内容 */`
- Emmet 语法
  - 前身是 Zen coding 用缩写生成 HTML/CSS 代码
  - HTML
    - 标签名*个数 `$` 数字占位符，递增生成
    - 父标签名>子标签名 兄标签名+弟标签名
    - 标签名.类名 标签名#id
    - 标签名{内容}
  - CSS 属性单词首字母 数字 单位

## 选择器

- 分类：基础选择器（单个选择器组成）、复合选择器
- 基础选择器：标签选择器、类选择器、id 选择器、通配符选择器
  - 标签选择器（元素选择器）`标签名 {}`
  - 类选择器 `.类名 {}`
    - HTML 中使用 class 属性定义类名
    - 类名不能与标签名重复，用 `-` 分割单词
    - HTML 中可用空格分割定义多个类名 `class="name1 name2"`
  - id 选择器 `#id {}`
    - HTML 中使用 id 属性定义
    - 标签 id 不要重复
    - id 选择器一般用于页面唯一性元素，常搭配 JS 使用
  - 通配符选择器 `* {}`
    - 选择所有标签
- 复合选择器：后代选择器、子选择器、并集选择器、伪类选择器
  - 后代选择器（包含选择器）`选择器1 选择器2 {}`
    - 在 1 的后代中选择 2
    - 后代指所有包含的元素
    - 可增加多个选择器描绘父子关系
  - 子（元素）选择器 `选择器1 > 选择器2 {}`
    - 在 1 的子代中选择 2
  - 并集选择器 `选择器1, 选择器2 {}`
    - 选择 1 2 的并集
  - 伪类选择器
    - 链接伪类选择器：按照 LVHA 的顺序选择
      | 选择器    | 选择对象                                              |
      | --------- | ----------------------------------------------------- |
      | a:link    | 未被访问的链接                                        |
      | a:visited | 已被访问的链接（href 相同的两标签会被一同认作已访问） |
      | a:hover   | 鼠标悬停的链接                                        |
      | a:active  | 鼠标按下的链接                                        |
      - a 标签单独设置样式，常将 a 与 a:hover 搭配使用
    - :focus 伪类选择器 `input:focus {}`
      - 选择获得焦点的表单元素

## 样式属性

- 字体属性
  - 字体类型 `font-family`
    - 字体间用逗号分割，多单词组成的字体名加引号
    - 尽量使用系统默认自带字体
    - 常对 body 标签设置
  - 大小 `font-size`
    - 单位 px（像素）
    - 不同浏览器默认字号不同，应给定明确值，不使用默认
    - 常对 body 标签设置，此时标题不会被更改
  - 粗细 `font-weight`
    - 属性值：常用数字 无单位
      | 属性值  | 说明                       |
      | ------- | -------------------------- |
      | normal  | 默认常规                   |
      | bold    | 加粗                       |
      | 100-900 | normal=400 bold=700 无单位 |
  - 样式 `font-style`
    - 属性值：normal：默认常规，italic：斜体
  - 复合属性 `font`
    - `font: font-style font-weight font-size/line-height font-family;`
    - 属性顺序固定，font-size 和 font-family 必须保留，其余可省略
    - 例：
      - `font: italic 700 20px "Times New Roman", Times, serif;`
      - `font: 20px "Times New Roman", Times, serif;`
- 文本属性
  - 颜色 `color`
    - 属性值：常用十六进制
      | 属性值     | 说明                                 |
      | ---------- | ------------------------------------ |
      | 预定义颜色 | red green                            |
      | 十六进制   | #ff0000 #29d764 两两相同可缩写为三位 |
      | RGB        | rgb(255, 0, 0) rgb(50%, 0%, 0%)      |
  - 水平对齐 `text-align`
    - 属性值：left right center
    - 用于设置文本相对于盒子的水平对齐方式
    - 图片对齐方式在其父级标签设置
  - 装饰 `text-decoration`
    - 属性值：
      | 属性值       | 说明                                  |
      | ------------ | ------------------------------------- |
      | none         | 默认无装饰线、常用于取消 a 标签下划线 |
      | underline    | 下划线、a 标签自带                    |
      | overline     | 上划线                                |
      | line-through | 删除线                                |
  - 首行缩进 `text-indent`
    - 属性值：数值+单位
      - 数值可正可负，表示向右向左偏移
      - 单位：px（像素）em（相对单位，一个元素大小 font-size，常用）
  - 行间距 `line-height`
    - 属性值：数值+单位（px）
    - 行间距=上间距+文本高度+下间距
    - 文字行高=盒子高度，可实现文字在当前盒子内垂直居中
    - 行高<盒子高度，文字偏上；行高>盒子高度，文字偏下
  - 阴影 `text-shadow`
    - `text-shadow: h-shadow v-shadow blur color;`
    - 属性值
      | 属性值   | 说明                                    |
      | -------- | --------------------------------------- |
      | h-shadow | 必需，水平阴影的位置。允许负值          |
      | v-shadow | 必需，垂直阴影的位置。允许负值          |
      | blur     | 可选，模糊距离，阴影虚实                |
      | color    | 可选，阴影的颜色，常用 RGB(0, 0, 0, .3) |
- 显示属性
  - 显示模式 `display`
    - 属性值：block inline inline-block
- 背景属性
  - 背景颜色 `background-color`
    - 属性值：transparent（默认透明） 预定义颜色 十六进制 RGB
  - 背景图片 `background-image`
    - 属性值：none（默认无背景图）url(`url地址`)（指定图片路径，不加引号）
    - 常用于 logo、装饰性小图片、超大背景图、精灵图
    - 优点：便于控制位置
  - 背景平铺 `background-repeat`
    - 属性值：
      | 属性值    | 说明                       |
      | --------- | -------------------------- |
      | repeat    | 在横向和纵向上平铺（默认） |
      | no-repeat | 不平铺                     |
      | repeat-x  | 在横向平铺                 |
      | repeat-y  | 在纵向平铺                 |
  - 背景位置 `background-position`
    - 属性值：x y
      - 方位名词
        - x y 顺序无关
        - 只指定一个，测省略值默认为居中对齐（center）
      - 精确单位
        - x y 顺序固定
        - 只指定一个则为 x，y 默认垂直居中
      - 混合单位
        - x y 顺序固定
  - 背景附着 `background-attachment`
    - 属性值：scroll（默认滚动）fixed（固定在显示区域）
    - 常用于制作视差滚动效果
  - 复合属性 `background`
    - 属性顺序不固定
    - 常用顺序：背景颜色 背景图片地址 背景平铺 背景图像滚动 背景图片位置
    - 例：`background: transparent url(image.jpg) repeat-y fixed top;`
    - 可使用属性值 `rgba(0,0,0,0)` 最后一位 alpha 改变背景色透明度，取值在 0~1，整数部分的 0 可省略
- 盒子模型
  - 页面布局三大核心：盒子模型、浮动、定位
  - border 边框
    - 相关属性
      | 属性名          | 属性值                                  | 说明                   |
      | --------------- | --------------------------------------- | ---------------------- |
      | border-width    | 数值+px                                 | 边框粗细               |
      | border-style    | none solid dashed（虚线）dotted（点线） | 边框样式               |
      | border-color    | 预定义颜色 十六进制 RGB                 | 边框颜色               |
      | border-collapse | collapse                                | 边框合并（多用于表格） |
      | border-radius   | 数值 百分比                             | 设定圆的半径           |
      - border-width 影响实际大小，不算在 width/height 内
      - border-radius
        - 圆形：正方形边长的一半，或 50%
        - 圆角矩形：高度的一半
        - 属性值个数：
          | 属性值个数 | 语义               |
          | ---------- | ------------------ |
          | 1          | 四角               |
          | 2          | 左上左下、右上右下 |
          | 4          | 四角分别设置       |
        - 选定角边框 `border-top-left-radius` `border-top-right-radius` `border-bottom-left-radius` `border-bottom-right-radius`
    - 复合属性 `border`
      - 属性顺序不固定
      - 常用顺序：粗细、样式、颜色
      - 例：`border: 1px solid red;`
    - 选定边框 `border-top` `border-left` `border-right` `border-bottom`
      - 存在层叠性
  - padding 内边距 `padding`
    - 属性值：调整内边距大小
      | 属性值个数 | 语义        |
      | ---------- | ----------- |
      | 1          | 上下左右    |
      | 2          | 上下 左右   |
      | 3          | 上 左右 下  |
      | 4          | 上 右 下 左 |
    - 影响盒子实际大小，不算在 width/height 内
    - 巧用 padding 撑开盒子，不设置固定宽度可实现根据内容变化大小的盒子且内边距相同
    - 选定边框 `padding-top` `padding-left` `padding-right` `padding-bottom`
  - margin 外边距 `margin`
    - 属性值：调整外边距大小
      | 属性值个数 | 语义        |
      | ---------- | ----------- |
      | 1          | 上下左右    |
      | 2          | 上下 左右   |
      | 3          | 上 左右 下  |
      | 4          | 上 右 下 左 |
    - 选定边框 `margin-top` `margin-left` `margin-right` `margin-bottom`
    - 盒子水平居中
      - 块级盒子
        - 指定宽度 `width`
        - 左右外边距为 auto
          - `margin: 0 auto;`
          - `margin: auto;`
          - `margin-left: auto;` `margin-right: auto;`
      - 行内（快）元素
        - 给父级加 `text-align: center;`
    - 外边距合并
      - 相邻块元素（兄弟）垂直外边距合并
        - 元素间距 = max(box1.margin_botton, box2.margin_top)
        - 只给一个盒子设置外边距即可避免
      - 嵌套块元素（父子）垂直外边距塌陷
        - 父外边距 = max(father.margin_top, son.margin_top)\
        - 解决方法
          - 父元素添加上边框
          - 父元素定义上内边距
          - 父元素定义 overflow 属性为 hidden
          - 浮动、固定、绝对定位等
  - 内外边距总结
    - 行内元素尽量不设置上下内外边距，可设置左右，转换显示方式后可以
    - 清除内外边距

      ```css
      * {
          margin: 0;
          padding: 0;
      }
      ```

  - 盒子阴影 `box-shadow`
    - `box-shadow: h-shadow v-shadow blur spread color inset;`
    - 不占用空间，不影响布局
    - 属性值
      | 属性值   | 说明                                    |
      | -------- | --------------------------------------- |
      | h-shadow | 必需，水平阴影的位置。允许负值          |
      | v-shadow | 必需，垂直阴影的位置。允许负值          |
      | blur     | 可选，模糊距离，阴影虚实                |
      | spread   | 可选，阴影的尺寸                        |
      | color    | 可选，阴影的颜色，常用 RGB(0, 0, 0, .3) |
      | inset    | 可选，改为内部阴影，外部阴影时必须省略  |

<!-- 169 -->