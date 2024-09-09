---
title: 'CentOS 7 网卡消失'
summary: 解决CentOS 7 网卡消失
date: 2022-09-08T10:12:22+08:00
categories: 未分类
# draft: true
---
在 root 权限下按顺序执行以下代码

```sh
systemctl stop NetworkManager
systemctl disable NetworkManager
systemctl start network.service
service network restart
```

之后使用 ifconfig 查看即可
————————————————
版权声明：本文为CSDN博主「此id已存在」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：<https://blog.csdn.net/yanghenpi/article/details/83146930>
