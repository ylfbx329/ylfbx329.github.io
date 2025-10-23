# 个人网站源码存储库

## 简要说明

- Hugo 计划半年或一年更新一次
- PaperMod 主题随时更新
- `assets\css\extended`下css文件会自动加载

## 常用指令

- 创建站点（指定配置文件为`yaml`格式）：`hugo new site <site-name> --format yaml`
- 创建博文：`hugo new content content/posts/<post-name>.md`
- 构建站点：
  - 不包含草稿：`hugo server`
  - 包含草稿：`hugo server -D`
  - 忽略缓存：`hugo server --ignoreCache`
  - 指定使用的配置文件：`hugo --config <name>.toml`
- 更新主题：`git submodule update --remote --merge`
- 合并配置文件，从左到右优先：`hugo --config a.toml,b.yaml,c.json`
- 生成 chroma 代码高亮 css：`hugo gen chromastyles --style=<style-name> > assets/css/extended/chroma.css`

## 实现功能

- [x] 良好中文适配
  - 在`hugo.yaml`添加如下设置
    ```yaml
    languageCode: zh-cn
    defaultContentLanguage: zh
    ```
- [x] Hugo原生数学公式渲染（参考[Hugo文档](https://gohugo.io/content-management/mathematics/)）
  - 在`hugo.yaml`添加如下设置
    ```yaml
    params:
      math: true
    markup:
      goldmark:
        extensions:
          passthrough:
            delimiters:
              block:
              - - \[
                - \]
              - - $$
                - $$
              inline:
              - - \(
                - \)
              - - $   # 自定义符号
                - $
            enable: true
    ```
  - 创建`layouts\partials\math.html`
    ```html
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
    <script>
      MathJax = {
        tex: {
          displayMath: [['\\[', '\\]'], ['$$', '$$']],  // block
          inlineMath: [['\\(', '\\)'], ['$', '$']]      // inline // 自定义符号
        },
        loader: {
          load: ['ui/safe']
        },
      };
    </script>
    ```
  - 在`layouts\_default\baseof.html`的`<head> </head>`中引入
    ```html
    <head>
      ...
      {{ if .Param "math" }}
        {{ partialCached "math.html" . }}
      {{ end }}
      ...
    </head>
    ```
- [x] 自定义关于页
  - 参考`themes\PaperMod\layouts\_default\list.html`中关于profileMode的渲染策略，创建`layouts\_default\profile.html`
    ```html
    {{- define "main" }}
    {{- partial "index_profile.html" . }}
    {{- end }}
    ```
  - 创建`content\profile.md`设置layout为profile
    ```md
    ---
    title: "关于我"
    layout: "profile"
    ---
    ```
- [x] 修复面包屑导航翻译不完全的bug
  - 创建`content\posts\_index.md`设置title
- [ ] 代码高亮（未完全实现）
  - 相关设置
    ```yaml
    params:
      assets:
        # [PaperMod] 关闭 Highlight.js 的代码高亮（使用 Hugo 的 Chroma）
        disableHLJS: true
    # [PaperMod] 代码高亮相关
    # pygmentsUseClasses: false
    markup:
      # [hugo] 代码高亮设置
      highlight:
        noClasses: false
        guessSyntax: true
        lineNos: true
        style: github-dark
    ```
  - 生成css`hugo gen chromastyles --style=github-dark  > assets/css/extended/chroma.css`
  - 自定义css
    ```css
    .chroma {
      background-color: unset;
    }
    ```
- [x] 字体
  - 正文：英文新罗马，中文霞鹜文楷
  - 代码：英文 JetBrains Mono，中文霞鹜文楷
  - 引入字体
    - 在`layouts\partials\extend_head.html`引入霞鹜文楷
      ```html
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont/style.css" />
      ```
    - 在`assets\css\extended\font.css`引入 JetBrains Mono
      ```css
      @font-face {
        font-family: 'JetBrains Mono';
        src: url('https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/webfonts/JetBrainsMono-Regular.woff2') format('woff2'),
          url('https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      ```
    - 在`assets\css\extended\font.css`设置字体样式
      ```css
      body {
        font-family: "Times New Roman", "LXGW WenKai", serif;
      }

      code,
      pre {
        font-family: "JetBrains Mono", "LXGW WenKai Mono", monospace;
        /* JetBrains Mono 优化 */
        -webkit-font-feature-settings: "liga" on, "calt" on;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
      ```
- [ ] 评论
- [ ] RSS