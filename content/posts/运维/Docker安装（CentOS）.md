---
title: 'Docker安装（CentOS）'
summary: Docker安装（CentOS）
date: 2023-01-09T10:54:14+08:00
categories: 运维
# draft: true
---
# 实验环境

- 腾讯云轻量应用服务器
- CentOS 7.6 64bit

# 安装说明

更新时间：2023.1.9

[docker 官网](https://www.docker.com/)  
[docker 官方文档](https://docs.docker.com/)

安装内容：Docker Engine

> Docker Engine is an open source containerization technology for building and containerizing your applications. Docker Engine acts as a client-server application with:
>
> - A server with a long-running daemon process dockerd.
> - APIs which specify interfaces that programs can use to talk to and instruct the Docker daemon.
> - A command line interface (CLI) client docker.
>
> The CLI uses Docker APIs to control or interact with the Docker daemon through scripting or direct CLI commands. Many other Docker applications use the underlying API and CLI. The daemon creates and manage Docker objects, such as images, containers, networks, and volumes.

声明：本文按照官方文档操作

# 安装步骤

## 前置准备

系统要求（CentOS）：

- 系统版本：CentOS 7、CentOS 8 (stream)、CentOS 9 (stream)
- 存储库：启用 centos-extras（CentOS 默认启用）
- 存储驱动：推荐使用 overlay2（默认）

卸载旧版本  
docker 曾命名为 docker、docker-engine等，现在 Docker Engine 名为 `docker-ce`
安装前先卸载之前的版本和依赖，`/var/lib/docker/` 目录下的镜像、容器等内容将会被保留

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

## 安装 Docker Engine

设置存储库

```bash
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

查看 docker-ce 版本

```bash
yum list docker-ce --showduplicates | sort -r

[root@localhost ~]# yum list docker-ce --showduplicates | sort -r
Loading mirror speeds from cached hostfile
Loaded plugins: fastestmirror, langpacks
Installed Packages
docker-ce.x86_64            3:20.10.9-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.8-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.7-3.el7                    docker-ce-stable
```

安装最新版 Docker Engine、CLI、Containerd、Docker Compose
GPG key `060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35`

```bash
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

安装特定版本
`<VERSION_STRING>` 为从第一个冒号到第一个连字符之间的部分
示例：根据上面的查询结果，可安装版本有 `docker-ce-20.10.9` `docker-ce-20.10.8` `docker-ce-20.10.7` 等

```bash
sudo yum install -y docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io docker-compose-plugin
```

提示：安装完成后会创建一个 docker 用户组

```bash
[root@localhost ~]# cat /etc/group | grep docker
docker:x:991:
```

# 配置和测试

使用腾讯云 Docker 镜像源加速镜像下载

```bash
mkdir -p /etc/docker
vim /etc/docker/daemon.json
```

写入以下内容

```json
{
   "registry-mirrors": [
       "https://mirror.ccs.tencentyun.com"
  ]
}
```

设置开机启动

```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

启动 docker

```bash
sudo systemctl start docker
```

测试是否安装成功，运行 hello-world 镜像

```bash
sudo docker run hello-world

[root@localhost ~]# sudo docker run hello-world
...
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

# 卸载 Docker Engine

卸载 Docker Engine、CLI、Containerd、Docker Compose

```bash
sudo yum remove docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

删除映像、容器、卷

```bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

# 常用命令

重新加载配置 `systemctl daemon-reload`
重启 docker `systemctl restart docker`  
查看镜像 `docker image ls`
查看容器 `docker ps`
