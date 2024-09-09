---
title: 'K8s 部署（CentOS）'
summary: K8s 部署（CentOS）
date: 2023-01-13T10:55:37+08:00
categories: 运维
# draft: true
---
# 实验环境

- VMware Workstation 16 Pro
- 3 台虚拟机
- CentOS-7-x86_64-Minimal-2009
- 4核8G，100G硬盘

# 部署说明

更新时间：2023.1.10

[k8s 官网](https://kubernetes.io/)  
[k8s 官方文档](https://kubernetes.io/docs/home/)

安装内容：k8s-v1.21.4

节点设置
| 主机名 | IP            |
| ------ | ------------- |
| cloud  | 192.168.0.201 |
| edge1  | 192.168.0.202 |
| edge2  | 192.168.0.203 |

说明：无特殊说明，所有操作都要所有节点执行一遍

# 部署步骤

## 前置准备

配置网络
编辑网卡文件，使宿主机-虚拟机、虚拟机-公网、虚拟机之间能够相互 ping 通  
确保各节点 MAC 地址和 product_uuid 唯一

系统设置

```bash
# 关闭防火墙
systemctl disable firewalld.service
systemctl stop firewalld.service

# 禁用 swap、SELINUX
swapoff -a && sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
setenforce 0 && sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config

# 设置主机名
hostnamectl set-hostname cloud
hostnamectl set-hostname edge1
hostnamectl set-hostname edge2

# 设置 hosts
cat <<EOF | tee -a /etc/hosts
192.168.0.201 cloud
192.168.0.202 edge1
192.168.0.203 edge2
EOF
```

安装依赖

```bash
iptables-services wget vim git gcc
net-tools nc lsof telnet
conntrack ntpdate ntp ipvsadm ipset jq sysstat libseccomp telnet-server tftp-server

yum install -y iptables-services wget vim git gcc
yum update -y
```

升级内核（CentOS-7）
其他系统版本请参考 [ELRepo 官网](http://elrepo.org/tiki/HomePage)

```bash
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
yum install -y https://www.elrepo.org/elrepo-release-7.el7.elrepo.noarch.rpm
yum --enablerepo=elrepo-kernel install -y kernel-lt

# 查看所有内核版本
awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg

[root@localhost ~]# awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg
0 : CentOS Linux (5.4.228-1.el7.elrepo.x86_64) 7 (Core)
1 : CentOS Linux (3.10.0-1160.el7.x86_64) 7 (Core)
2 : CentOS Linux (0-rescue-d255fe3e70394622bff949bae44c6178) 7 (Core)

# 设置默认从新内核启动
grub2-set-default 'CentOS Linux (5.4.228-1.el7.elrepo.x86_64) 7 (Core)'
grub2-set-default 'CentOS Linux (3.10.0-1160.81.1.el7.x86_64) 7 (Core)'

# 重启
reboot

# 检查内核版本
uname -r

[root@edge2 ~]# uname -r
5.4.228-1.el7.elrepo.x86_64
```

加载模块

```bash
# 查询 br_netfilter 模块是否被加载
lsmod | grep br_netfilter

# 加载 br_netfilter
sudo modprobe br_netfilter
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF
sudo sysctl --system
```

设置 iptables

```bash
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system

# 清空 iptables 所有规则并保存
iptables -F
service iptables save
systemctl start iptables
systemctl enable iptables
```

## 安装 docker

安装 docker 请参考[此博客](https://blog.csdn.net/weixin_50926053/article/details/128608128)

配置 docker
设置 cgroup driver 为 systemd

```bash
vim /etc/docker/daemon.json

# 添加以下设置，注意与之前内容用逗号分隔
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}

# 重启 docker
sudo systemctl enable docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 安装 kubeadm

添加阿里云镜像

```bash
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF
```

安装 kubelet kubeadm kubectl

```bash
# 查看版本
yum list kubelet kubeadm kubectl --showduplicates --disableexcludes=kubernetes

sudo yum install kubelet-1.21.4 kubeadm-1.21.4 kubectl-1.21.4 --disableexcludes=kubernetes
```

关于 cgroup driver  
k8s-1.21 已将 systemd 作为默认 cgroup driver，前提是 docker 也同时使用 systemd  
详见：[1.21.0 更新文档](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.21.md#urgent-upgrade-notes)

## 拉取集群镜像

查看所需镜像  
--kubernetes-version 不指定版本则默认为 "stable-1"

```bash
kubeadm config images list --kubernetes-version 1.21.4
```

创建拉镜像脚本

```bash
vim k8s_images.sh
```

脚本内容如下，不同版本自行替换

```sh
#!/bin/bash

# kubeadm config images list --kubernetes-version 1.21.4 输出如下
# k8s.gcr.io/kube-apiserver:v1.21.4
# k8s.gcr.io/kube-controller-manager:v1.21.4
# k8s.gcr.io/kube-scheduler:v1.21.4
# k8s.gcr.io/kube-proxy:v1.21.4
# k8s.gcr.io/pause:3.4.1
# k8s.gcr.io/etcd:3.4.13-0
# k8s.gcr.io/coredns/coredns:v1.8.0

# coredns 单独处理一下
images=(
    kube-apiserver:v1.21.4
    kube-controller-manager:v1.21.4
    kube-scheduler:v1.21.4
    kube-proxy:v1.21.4
    pause:3.4.1
    etcd:3.4.13-0
    coredns:v1.8.0
)

for imageName in ${images[@]} ; do
    docker pull registry.aliyuncs.com/google_containers/$imageName
    docker tag registry.aliyuncs.com/google_containers/$imageName k8s.gcr.io/$imageName
    docker rmi registry.aliyuncs.com/google_containers/$imageName
done
```

添加执行权限并执行

```bash
chmod +x k8s_images.sh
./k8s_images.sh

# 处理 coredns 命名
docker tag k8s.gcr.io/coredns:v1.8.0 k8s.gcr.io/coredns/coredns:v1.8.0
docker rmi k8s.gcr.io/coredns:v1.8.0

# 检查镜像
docker images

[root@cloud ~]# docker images
REPOSITORY                           TAG        IMAGE ID       CREATED         SIZE
k8s.gcr.io/kube-apiserver            v1.21.4    cef7457710b1   17 months ago   126MB
k8s.gcr.io/kube-controller-manager   v1.21.4    2c25d0f89db7   17 months ago   120MB
k8s.gcr.io/kube-scheduler            v1.21.4    993d3ec13feb   17 months ago   50.6MB
k8s.gcr.io/kube-proxy                v1.21.4    ef4bce0a7569   17 months ago   103MB
k8s.gcr.io/pause                     3.4.1      0f8457a4c2ec   24 months ago   683kB
k8s.gcr.io/coredns/coredns           v1.8.0     296a6d5035e2   2 years ago     42.5MB
k8s.gcr.io/etcd                      3.4.13-0   0369cf4303ff   2 years ago     253MB
```

## 初始化集群（以下步骤仅在主节点操作）

启动 kubelet

```bash
sudo systemctl enable --now kubelet
```

初始化命令  
选用 [flannel](https://github.com/flannel-io/flannel) 网络模型

```bash
kubeadm init \
 --kubernetes-version=v1.21.4 \
 --apiserver-advertise-address=192.168.0.201 \
 --pod-network-cidr=10.244.0.0/16
```

按照输出的提示操作

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

cat <<EOF | tee /etc/profile.d/kubernetes.sh
export KUBECONFIG=/etc/kubernetes/admin.conf
EOF
source /etc/profile
```

取消主节点隔离

```bash
kubectl taint nodes --all node-role.kubernetes.io/master-
```

记录提示的的 work 节点加入命令

```bash
kubeadm join 192.168.0.201:6443 --token caaya2.p1hjnobvly547yk2 \
        --discovery-token-ca-cert-hash sha256:e00b7c217313041255dc842bcfdbfe9a43b09696d9d1f5b05be21dcff9cf075c 
```

安装 flannel

```bash
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/v0.20.2/Documentation/kube-flannel.yml
```

网络不可访问时，手动创建配置文件

```bash
vim kube-flannel.yml
kubectl apply -f kube-flannel.yml
```

首次使用时会自动拉取镜像，速度较慢，大约4分钟后 flannel 和 coredns 正常 Running

kube-flannel.yml 内容如下  
详见 [flannel 文档](https://github.com/flannel-io/flannel#deploying-flannel-manually)

```bash
---
kind: Namespace
apiVersion: v1
metadata:
  name: kube-flannel
  labels:
    pod-security.kubernetes.io/enforce: privileged
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: flannel
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - get
- apiGroups:
  - ""
  resources:
  - nodes
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - ""
  resources:
  - nodes/status
  verbs:
  - patch
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: flannel
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: flannel
subjects:
- kind: ServiceAccount
  name: flannel
  namespace: kube-flannel
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: flannel
  namespace: kube-flannel
---
kind: ConfigMap
apiVersion: v1
metadata:
  name: kube-flannel-cfg
  namespace: kube-flannel
  labels:
    tier: node
    app: flannel
data:
  cni-conf.json: |
    {
      "name": "cbr0",
      "cniVersion": "0.3.1",
      "plugins": [
        {
          "type": "flannel",
          "delegate": {
            "hairpinMode": true,
            "isDefaultGateway": true
          }
        },
        {
          "type": "portmap",
          "capabilities": {
            "portMappings": true
          }
        }
      ]
    }
  net-conf.json: |
    {
      "Network": "10.244.0.0/16",
      "Backend": {
        "Type": "vxlan"
      }
    }
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: kube-flannel-ds
  namespace: kube-flannel
  labels:
    tier: node
    app: flannel
spec:
  selector:
    matchLabels:
      app: flannel
  template:
    metadata:
      labels:
        tier: node
        app: flannel
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: kubernetes.io/os
                operator: In
                values:
                - linux
      hostNetwork: true
      priorityClassName: system-node-critical
      tolerations:
      - operator: Exists
        effect: NoSchedule
      serviceAccountName: flannel
      initContainers:
      - name: install-cni-plugin
       #image: flannelcni/flannel-cni-plugin:v1.1.0 for ppc64le and mips64le (dockerhub limitations may apply)
        image: docker.io/rancher/mirrored-flannelcni-flannel-cni-plugin:v1.1.0
        command:
        - cp
        args:
        - -f
        - /flannel
        - /opt/cni/bin/flannel
        volumeMounts:
        - name: cni-plugin
          mountPath: /opt/cni/bin
      - name: install-cni
       #image: flannelcni/flannel:v0.20.2 for ppc64le and mips64le (dockerhub limitations may apply)
        image: docker.io/rancher/mirrored-flannelcni-flannel:v0.20.2
        command:
        - cp
        args:
        - -f
        - /etc/kube-flannel/cni-conf.json
        - /etc/cni/net.d/10-flannel.conflist
        volumeMounts:
        - name: cni
          mountPath: /etc/cni/net.d
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
      containers:
      - name: kube-flannel
       #image: flannelcni/flannel:v0.20.2 for ppc64le and mips64le (dockerhub limitations may apply)
        image: docker.io/rancher/mirrored-flannelcni-flannel:v0.20.2
        command:
        - /opt/bin/flanneld
        args:
        - --ip-masq
        - --kube-subnet-mgr
        resources:
          requests:
            cpu: "100m"
            memory: "50Mi"
          limits:
            cpu: "100m"
            memory: "50Mi"
        securityContext:
          privileged: false
          capabilities:
            add: ["NET_ADMIN", "NET_RAW"]
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        - name: EVENT_QUEUE_DEPTH
          value: "5000"
        volumeMounts:
        - name: run
          mountPath: /run/flannel
        - name: flannel-cfg
          mountPath: /etc/kube-flannel/
        - name: xtables-lock
          mountPath: /run/xtables.lock
      volumes:
      - name: run
        hostPath:
          path: /run/flannel
      - name: cni-plugin
        hostPath:
          path: /opt/cni/bin
      - name: cni
        hostPath:
          path: /etc/cni/net.d
      - name: flannel-cfg
        configMap:
          name: kube-flannel-cfg
      - name: xtables-lock
        hostPath:
          path: /run/xtables.lock
          type: FileOrCreate
```

加入边节点

# 测试集群

```bash
# 查看节点
kubectl get nodes -o wide

# 查看 pod
kubectl get pods -A -o wide

# 查看服务
kubectl get svc -A -o wide

# 查看日志
kubectl logs -f pod-name
```

# 重置集群

# 常用命令
