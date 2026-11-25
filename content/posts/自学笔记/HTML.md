---
title: 'HTML学习笔记'
summary: HTML学习记录，主要为《Pink老师前端》课程内容，2026年更新
date: 2022-08-03T10:09:01+08:00
categories: 自学笔记
# draft: true
---
## 基本概念

网页与网站
- 网页：通常为 HTML 格式文件，使用浏览器阅读，是构成网站的基本元素，.htm/.html 后缀
- 网站：网页的集合

HTML（HyperText Markup Language）：超文本标记语言
- 超文本：图片、声音等超越文本限制的内容，超链接文本

常用浏览器：IE、Firefox、Chrome、Safari、Opera
- 浏览器内核（渲染引擎）：读取 HTML 文档，整理讯息，计算显示方式并显示页面
  | 浏览器                | 内核    | 备注                       |
  | --------------------- | ------- | -------------------------- |
  | IE                    | Trident | 已停止支持的旧浏览器       |
  | firefox               | Gecko   | 火狐浏览器内核             |
  | Safari                | Webkit  | 苹果浏览器内核             |
  | Chrome / Edge / Opera | Blink   | Blink 其实是 WebKit 的分支 |
- 国产浏览器多采用 Webkit/Blink 内核

Web 标准：W3C（World Wide Web Consortium）等标准化组织制定和维护的一系列规范，用于保证 Web 技术的兼容性、互操作性和一致性。
- 构成：结构、表现、行为
  | 标准 | 说明                             |
  | ---- | -------------------------------- |
  | 结构 | 整理分类网页元素、HTML           |
  | 表现 | 设置网页元素外观样式、CSS        |
  | 行为 | 网页模型的定义和交互、JavaScript |
- 最佳体验方案：结构、样式、行为相分离

## HTML 文档

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
</head>
<body></body>
</html>
```

`<!DOCTYPE html>` 文档类型声明，表明使用 HTML5 显示网页，位于文档开头，不是 HTML 标签

`<html>` 包含页面所有内容，根标签；`lang="en"` 声明整个文档的主要语言，有助于浏览器和搜索引擎正确处理页面内容，不会强制限制内容语言，中文为 `zh-CN`

`<head>` 包含文档元数据

`<meta/>` 设置文档元数据；`charset="UTF-8"` 指定文档的字符编码为 UTF-8，必须写以防止乱码；`name` 指定元数据的名称；`content` 指定对应元数据的值

`<title>` 网页标题

`<body>` 包含页面的主体内容

## 标签与元素

标签别名：标记

标签语法规范
- 标签是由尖括号包围的关键词 `<html>`
- 不区分大小写，建议全小写

元素结构：开始标签、内容、结束标签

空元素：没有内容和结束标签，如 `<br/>`

标签/元素关系：并列关系、包含关系

## 块级元素与内联元素

块级元素
- 独占一行
- 可嵌套其他元素
- 如：`<h1>`、`<p>`、`<div>`
- 注：`<p>` 不要包含其他块级元素

内联元素（行内元素）
- 一行多个
- 不能嵌套块级元素
- 如：`<strong>`、`<em>`、`<a>`

## 标题与段落标签

标题标签
- `<h1>` 到 `<h6>` 为六级标题标签
- 独占一行，文本加粗显示
- `<h1>` 最好文档唯一，单文档最好不超过三个标题层级

段落标签
- `<p>` 表示文本段落
- 独占一行，长文本会自动换行
- 不要包含其他块级元素

## 强调与重要性标签

加粗：`<strong>` 或 `<b>`
斜体：`<em>` 或 `<i>`
下划线：`<ins>` 或 `<u>`
删除线：`<del>` 或 `<s>`

推荐带有语义的前一版本

## 注释标签

`<!--  -->` HTML 注释

## 图像标签

`<img src="" alt=""/>`
- `src` 指定图像路径，可以为相对路径、绝对路径（盘符路径、URL 路径）
- `alt` 图像无法显示时的替代文字
- `width` `height` 图像宽高
- `title` 鼠标悬停提示，存在无障碍问题，不建议使用

常见图片格式
- JPEG
- PNG
- GIF
- WebP
- AVIF
- svg
- HEIC

## 视频和音频标签

视频标签：`<video src="" autoplay controls loop muted poster=""></video>`
- `src` 指定视频路径
- `controls` 显示浏览器自带视频控件，此处使用 HTML 5 特性，属性名和值相同时，可省略属性值
- `width` `height` 视频宽高
- `muted` 静音播放
- `autoplay` 自动播放，必须先设置静音
- `loop` 循环播放
- `poster` 指定封面路径

常见视频格式
- MP4
- WebM
- Ogg

兼容性写法
```html
<video controls>
    <source src="video.mp4" type="video/mp4"/>
    <source src="video.webm" type="video/webm"/>
    <source src="video.ogg" type="video/ogg"/>
    <p>您的浏览器不支持 HTML 5 视频标签，请升级浏览器</p>
</video>
```

将 `src` 属性改为 `<source/>` 标签，浏览器自上而下检查视频格式是否支持，显式写 `type` 可以避免加载视频，加速判断
均不支持则显示最终的 `<p>` 标签

音频标签：`<audio src="" autoplay controls loop muted></audio>`
- `src` 指定音频路径
- `controls` 显示浏览器自带音频控件
- `muted` 静音播放
- `autoplay` 自动播放，浏览器**禁用**音频自动播放
- `loop` 循环播放

常见音频格式
- MP3
- Wav
- Ogg

兼容性写法
```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg"/>
    <source src="audio.wav" type="audio/wav"/>
    <source src="audio.ogg" type="audio/ogg"/>
    <p>您的浏览器不支持 HTML 5 音频标签，请升级浏览器</p>
</audio>
```

## 超链接标签

`<a href="" target="" title=""></a>`
- `href` 指定超文本引用或目标地址
- `target` 指定打开页面的方式；`_self` 默认值，在当前页面打开；`_blank` 在新标签页打开
- `title` 鼠标悬停提示，存在无障碍问题，不建议使用

链接分类
- 内部链接：指向网站内部页面
- 外部链接：指向其他网站
- 空链接：`#` 临时占位，没有实际地址
- 下载链接：文件名作为连接
- 邮件链接：`mailto:xxx@xxx.com`
- 锚点链接：长页面内部跳转
  - 设置锚点 id `<h1 id="title_1">Title</h1>`
  - 设置链接 `<a href="#title_1">jump to</a>`

## 网站结构标签

有语义标签
- `<header>` 网页页眉
- `<nav>` 导航栏
- `<main>` 主体内容，网页唯一
- `<article>` 文章相关
- `<section>` 分块
- `<aside>` 侧边栏
- `<footer>` 页面页脚

无语义标签
- `<div>` 块级元素
- `<span>` 内联元素（行内元素）

## 列表标签

无序列表
```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

`<ul>` 列表容器，子元素只能为 `<li>` 不可为其他标签或文字
`<li>` 列表项，内部可放其他 HTML 元素

有序列表
```html
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ol>
```

`<ol>` 列表容器，子元素只能为 `<li>` 不可为其他标签或文字

描述列表
```html
<dl>
    <dt>Item A</dt>
    <dd>Describe 1</dd>
    <dd>Describe 2</dd>
    <dd>Describe 3</dd>
</dl>
```

`<dl>` 列表容器，子元素只能为 `<dt>` 和 `<dd>` 不可为其他标签或文字
`<dt>` 被描述项，左对齐
`<dd>` 描述项，缩进，内部可放其他 HTML 元素
一个 `<dt>` 对应多个 `<dd>`

## 表格标签

```html
<table>
    <thead>
    <tr>
        <th></th>
        <th></th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    </tfoot>
</table>
```

基本标签
- `<table>` 定义表格
- `<tr>` 定义行
- `<td>` 定义单元格
- `<th>` 定义表头单元格，文字加粗居中

结构标签
- `<thead>` 定义表格头部
- `<tbody>` 定义表格主体
- `<tfoot>` 定义表格尾部

合并单元格
- 找目标单元格：左上
- 编写目标单元格属性
  - 跨行 `rowspan="合并格数"`
  - 跨列 `colspan="合并格数"`
- 删除多余单元格

## 表单

### 表单容器

`<form action=""></form>`
- `action` 提交的目标服务器 URL 地址

### 表单控件

输入控件：`<input type="" name="" value="" accept="" accesskey="" autocomplete="" checked maxlength="" multiple  placeholder=""/>`
- 根据 `type` 值不同有不同控件类型
  - `type="text"` 单行文本框
  - `type="password"` 密码框
  - `type="radio"` 单选框
  - `type="checkbox"` 复选框
  - `type="file"` 文件域
- `placeholder` 提示信息
- `name` 用于区分控件，同组单复选相同，提交时为该控件值的键
- `maxlength` 允许的最大字符数
- `accesskey` 获取焦点快捷键，如：`accesskey="s"` 则 Windows：Alt + s，Mac：Control + Option + s
- `autocomplete` 是否允许浏览器根据历史输入进行自动填充，值为 `on` 或 `off`，默认 `on`
- `value` 控件值，一般用于单复选框
- `checked` 默认选中
- `multiple` 允许选择多个文件
- `accept` 允许的文件类型，用逗号分隔，如：`accept=".exe,.jpg,.png"`

多行文本框：`<textarea name="" placeholder="" rows="" cols=""></textarea>`
- `name` 用于区分控件，提交时为该控件值的键
- `placeholder` 提示信息
- `rows` `cols` 显示行列数，默认为 2 和 20

下拉菜单
```html
<select name="">
    <option value="opt_1" selected>Option 1</option>
    <option value="opt_2">Option 2</option>
    <option value="opt_3">Option 3</option>
</select>
```

`<select>` 菜单容器
`<option>` 选项标签，每个选项一个 `value`，`selected` 默认选中

按钮：`<button type="" disabled></button>`
- `type` 默认为 `submit`，触发表单提交，作为非提交按钮是应设置 `type="button"`
- `disabled` 禁用按钮

### 辅助标签

信息说明，提高可访问性，点击文字即可选中控件

```html
<!-- 给控件设置 id，使用 for 引用 -->
<label for="username">用户名：</label>
<input id="username" type="text"/>

<!-- 直接用 label 标签包裹控件 -->
<label>
    用户名：<input type="text"/>
</label>
```

## 字符实体

显示保留字符和不可见字符

以 `&` 开头，`;` 结尾

- `&nbsp;` 不换行空格
- `&lt;` <
- `&gt;` >
