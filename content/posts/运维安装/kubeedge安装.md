---
title: 'Kubeedge 安装'
summary: Kubeedge 安装详细教程
date: 2023-01-21T10:56:29+08:00
categories: 运维安装
# draft: true
---
# 实验环境

- VMware Workstation 16 Pro
- 3 台虚拟机
- CentOS-7-x86_64-Minimal-2009
- 4核8G，100G硬盘
- docker 20.10.2
- k8s v1.21.4

# 安装说明

- 更新时间：2023.1.19

# 安装 keadm

[下载 keadm](https://github.com/kubeedge/kubeedge/releases)

以 keadm-v1.12.1-linux-amd64.tar.gz 为例

```bash
wget https://github.com/kubeedge/kubeedge/releases/download/v1.12.1/keadm-v1.12.1-linux-amd64.tar.gz
tar -zxvf keadm-v1.12.1-linux-amd64.tar.gz
cp keadm-v1.12.1-linux-amd64/keadm/keadm /usr/local/bin/keadm
```

# 安装 cloudcore

初始化

```bash
keadm init --advertise-address=192.168.0.201 --profile version=v1.12.1 --kube-config=/root/.kube/config --set iptablesManager.mode="external"
```

可能报错 `execute keadm command failed:  timed out waiting for the condition`
参见[官网说明](https://kubeedge.io/en/docs/setup/debug/#timed-out-waiting-for-the-condition)

修改 kube-proxy 和 kube-flannel 的节点亲和性，不调度到边缘节点

```bash
kubectl patch daemonset kube-proxy -n kube-system -p '{"spec": {"template": {"spec": {"affinity": {"nodeAffinity": {"requiredDuringSchedulingIgnoredDuringExecution": {"nodeSelectorTerms": [{"matchExpressions": [{"key": "node-role.kubernetes.io/edge", "operator": "DoesNotExist"}]}]}}}}}}}'

kubectl patch daemonset kube-flannel-ds -n kube-flannel -p '{"spec": {"template": {"spec": {"affinity": {"nodeAffinity": {"requiredDuringSchedulingIgnoredDuringExecution": {"nodeSelectorTerms": [{"matchExpressions": [{"key": "node-role.kubernetes.io/edge", "operator": "DoesNotExist"}]}]}}}}}}}'
```

启用查看边缘 pod 日志功能
查看 k8s 的 ca.crt ca.key 文件

```bash
ls /etc/kubernetes/pki/
```

声明环境变量

```bash
export CLOUDCOREIPS="192.168.0.201"
```

生成 CloudStream 证书

```bash
mkdir -p /etc/kubeedge/
cd /etc/kubeedge/
wget https://raw.githubusercontent.com/kubeedge/kubeedge/master/build/tools/certgen.sh
chmod +x /etc/kubeedge/certgen.sh
/etc/kubeedge/certgen.sh stream
```

安装 Metrics Server  
下载配置文件

```bash
cd ~
wget https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml -O metrics-server.yaml
```

修改配置文件，参考 [Metrics Server GitHub](https://github.com/kubernetes-sigs/metrics-server#installation) 和 [KubeEdge 文档](https://kubeedge.io/en/docs/setup/keadm/#support-metrics-server-in-cloud)

```bash
vim metrics-server.yaml

kind: Deployment
spec:
  template:
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: kubernetes.io/hostname
                operator: In
                values:
                - cloud
      containers:
      - args:
        - --kubelet-insecure-tls
      hostNetwork: true
```

根据配置文件拉取镜像

```bash
docker pull registry.aliyuncs.com/google_containers/metrics-server:v0.6.2
docker tag registry.aliyuncs.com/google_containers/metrics-server:v0.6.2 k8s.gcr.io/metrics-server/metrics-server:v0.6.2
docker rmi registry.aliyuncs.com/google_containers/metrics-server:v0.6.2
```

应用配置文件

```bash
kubectl apply -f metrics-server.yaml
```

# 加入边缘节点

边缘节点关闭 kubelet

```bash
systemctl stop kubelet
systemctl disable kubelet
```

获取 token 并加入集群

```bash
# 在云节点获取 token
keadm gettoken

# 使用 token 将边缘节点加入集群
keadm join --cloudcore-ipport=192.168.0.201:10000 --token=a867ade568c71cfe6f7bc62c84243f4b0b1243709fd8504081d195b82c97fd87.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzM2MjY3ODR9.qtMaMwJvB9sRvwQvP8LBQ1qL9W6vrotpq8d_wyu4YaA --kubeedge-version=v1.12.1 --cgroupdriver systemd
```

修改配置文件

```bash
vim /etc/kubeedge/config/edgecore.yaml
modules:
  ···
  edgeStream:
    enable: true
```

重启 edgecore

```bash
# 在边缘节点运行
systemctl restart edgecore.service
```

# 常用命令

编辑 cloudcore 配置 `kubectl edit configmap cloudcore -n kubeedge`  
重启 cloudcore `kubectl delete po cloudcore-7879bd4b5b-5jgt6 -n kubeedge`
重启 edgecore `systemctl restart edgecore.service`
