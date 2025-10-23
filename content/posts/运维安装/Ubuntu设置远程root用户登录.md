---
title: 'Ubuntu 设置远程 root 用户登录'
summary: Ubuntu 设置远程 root 用户登录方法记录
date: 2023-09-20T12:42:22+08:00
categories: 运维安装
# draft: true
---
使用普通用户登录系统
设置root密码 `sudo passwd root`
修改ssh文件 `sudo vi /etc/ssh/sshd_config`
修改 PermitRootLogin 属性为 yes `PermitRootLogin yes`
重启SSH `sudo service ssh restart`
可以使用root用户登录了
