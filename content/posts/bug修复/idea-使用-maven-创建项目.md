---
title: 'IntelliJ IDEA 使用 Maven 创建项目正确流程'
summary: IntelliJ IDEA 使用 Maven 创建项目正确流程记录
date: 2022-10-31T10:16:47+08:00
categories: bug修复
# draft: true
---
新创建的项目结构不正确，应该先写 pom.xml 文件，然后执行 maven 的重新加载所有 maven 项目，之后再添加 web 框架支持等内容
