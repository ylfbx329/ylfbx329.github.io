---
title: 'CentOS 7 ifcfg-ens33 网卡配置文件'
summary: CentOS 7 ifcfg-ens33 网卡配置文件存档，虚拟机使用
date: 2023-01-28T11:03:10+08:00
categories: 文件存档
# draft: true
---
```bash
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens33
UUID=426bebd7-111f-4404-9e06-389235124512
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.0.201
NETMASK=255.255.255.0
GATEWAY=192.168.0.1
DNS1=114.114.114.114
```
