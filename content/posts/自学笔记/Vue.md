---
title: 'Vue 学习笔记'
summary: Vue 学习记录，参考尚硅谷 Vue3 教程
date: 2026-11-17T08:00:00+08:00
categories: 自学笔记
---

## 创建项目

```sh
npm create vue@latest
cd <your-project-name>
npm install
npm run dev
```

仅启用 TypeScript 语法，其他附加项可后续自行配置

## 项目目录

- `node_modules` 包依赖
- `public/favicon.ico` 网站图标
- `src` 主要代码目录
  - `main.ts`
- `env.d.ts`
- `index.html` 项目入口文件
- `package.json`
- `package-lock.json`
- `tsconfig.app.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`

### index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

`<div id="app"></div>` 提供渲染位置

`<script type="module" src="/src/main.ts"></script>` 以模块形式引入主脚本文件 `src/main.ts`

### src/main.ts

```ts
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

`createApp()` 创建应用，`App` 为根组件，`mount()` 将创建完成的应用渲染在 id 为 `app` 的标签中

### src/App.vue

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
```

`<template>` 为页面，`<script>` 为逻辑，`<style>` 为样式

## AIP 风格

选项式 API：Vue 2，配置风格，功能被拆散在各个配置项中
组合式 API：Vue 3，函数风格，功能集中编写，搭配 `<script setup>` 使用，**推荐**

