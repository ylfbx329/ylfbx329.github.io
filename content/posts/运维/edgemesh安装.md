---
title: 'Edgemesh安装'
summary: Edgemesh安装
date: 2023-01-21T11:02:09+08:00
categories: 运维
# draft: true
---
# 实验环境

- VMware Workstation 16 Pro
- 3 台虚拟机
- CentOS-7-x86_64-Minimal-2009
- 4核8G，100G硬盘
- docker 20.10.2
- k8s v1.21.4
- kubeedge v1.12.1

# 安装说明

- 更新时间：2023.1.19

# 准备工作

清除所有节点的污点

```bash
kubectl taint nodes --all node-role.kubernetes.io/master-
```

给 k8s API 服务打标签

```bash
kubectl label services kubernetes service.edgemesh.kubeedge.io/service-proxy-name=""
```

设置边缘 Kube-API 端点  
云节点

```bash
kubectl edit configmap cloudcore -n kubeedge

# 在 data.cloudcore.yaml 中修改 modules.dynamicController.enable 为 true
modules:
  ...
  dynamicController:
    enable: true
```

边缘节点

```bash
vim /etc/kubeedge/config/edgecore.yaml

modules:
  ...
  edged:
    ...
    tailoredKubeletConfig:
      ...
      clusterDNS:
      - 169.254.96.16
      clusterDomain: cluster.local
  ...
  metaManager:
    ...
    metaServer:
      enable: true
```

重启 cloudcore 和 edgecore

```bash
# 在云节点运行
kubectl delete po cloudcore-7879bd4b5b-5jgt6 -n kubeedge

# 在边缘节点运行
systemctl restart edgecore.service
```

测试

```bash
# 在边缘节点运行
curl 127.0.0.1:10550/api/v1/services

[root@edge2 ~]# curl 127.0.0.1:10550/api/v1/services
{"apiVersion":"v1","items":[{"apiVersion":"v1","kind":"Service","metadata":{"creationTimestamp":"2023-01-12T14:40:48Z","labels":{"component":"apiserver","provider":"kubernetes"},"managedFields":[{"apiVersion":"v1","fieldsType":"FieldsV1","fieldsV1":{"f:metadata":{"f:labels":{".":{},"f:component":{},"f:provider":{}}},"f:spec":{"f:clusterIP":{},"f:ipFamilyPolicy":{},"f:ports":{".":{},"k:{\"port\":443,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}}},"f:sessionAffinity":{},"f:type":{}}},"manager":"kube-apiserver","operation":"Update","time":"2023-01-12T14:40:48Z"}],"name":"kubernetes","namespace":"default","resourceVersion":"203","uid":"e2a43244-ad84-454e-9097-4009b007490d"},"spec":{"clusterIP":"10.96.0.1","clusterIPs":["10.96.0.1"],"ipFamilies":["IPv4"],"ipFamilyPolicy":"SingleStack","ports":[{"name":"https","port":443,"protocol":"TCP","targetPort":6443}],"sessionAffinity":"None","type":"ClusterIP"},"status":{"loadBalancer":{}}},{"apiVersion":"v1","kind":"Service","metadata":{"annotations":{"prometheus.io/port":"9153","prometheus.io/scrape":"true"},"creationTimestamp":"2023-01-12T14:40:49Z","labels":{"k8s-app":"kube-dns","kubernetes.io/cluster-service":"true","kubernetes.io/name":"CoreDNS"},"managedFields":[{"apiVersion":"v1","fieldsType":"FieldsV1","fieldsV1":{"f:metadata":{"f:annotations":{".":{},"f:prometheus.io/port":{},"f:prometheus.io/scrape":{}},"f:labels":{".":{},"f:k8s-app":{},"f:kubernetes.io/cluster-service":{},"f:kubernetes.io/name":{}}},"f:spec":{"f:clusterIP":{},"f:ports":{".":{},"k:{\"port\":53,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}},"k:{\"port\":53,\"protocol\":\"UDP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}},"k:{\"port\":9153,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}}},"f:selector":{".":{},"f:k8s-app":{}},"f:sessionAffinity":{},"f:type":{}}},"manager":"kubeadm","operation":"Update","time":"2023-01-12T14:40:49Z"}],"name":"kube-dns","namespace":"kube-system","resourceVersion":"236","uid":"5270f748-23d6-4b98-92e1-382a399f549c"},"spec":{"clusterIP":"10.96.0.10","clusterIPs":["10.96.0.10"],"ipFamilies":["IPv4"],"ipFamilyPolicy":"SingleStack","ports":[{"name":"dns","port":53,"protocol":"UDP","targetPort":53},{"name":"dns-tcp","port":53,"protocol":"TCP","targetPort":53},{"name":"metrics","port":9153,"protocol":"TCP","targetPort":9153}],"selector":{"k8s-app":"kube-dns"},"sessionAffinity":"None","type":"ClusterIP"},"status":{"loadBalancer":{}}},{"apiVersion":"v1","kind":"Service","metadata":{"annotations":{"kubectl.kubernetes.io/last-applied-configuration":"{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"labels\":{\"k8s-app\":\"metrics-server\"},\"name\":\"metrics-server\",\"namespace\":\"kube-system\"},\"spec\":{\"ports\":[{\"name\":\"https\",\"port\":443,\"protocol\":\"TCP\",\"targetPort\":\"https\"}],\"selector\":{\"k8s-app\":\"metrics-server\"}}}\n"},"creationTimestamp":"2023-01-12T20:58:20Z","labels":{"k8s-app":"metrics-server"},"managedFields":[{"apiVersion":"v1","fieldsType":"FieldsV1","fieldsV1":{"f:metadata":{"f:annotations":{".":{},"f:kubectl.kubernetes.io/last-applied-configuration":{}},"f:labels":{".":{},"f:k8s-app":{}}},"f:spec":{"f:ports":{".":{},"k:{\"port\":443,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}}},"f:selector":{".":{},"f:k8s-app":{}},"f:sessionAffinity":{},"f:type":{}}},"manager":"kubectl-client-side-apply","operation":"Update","time":"2023-01-12T20:58:20Z"}],"name":"metrics-server","namespace":"kube-system","resourceVersion":"27809","uid":"1aebd89f-a259-410f-92ab-9865f2b967c1"},"spec":{"clusterIP":"10.108.37.156","clusterIPs":["10.108.37.156"],"ipFamilies":["IPv4"],"ipFamilyPolicy":"SingleStack","ports":[{"name":"https","port":443,"protocol":"TCP","targetPort":"https"}],"selector":{"k8s-app":"metrics-server"},"sessionAffinity":"None","type":"ClusterIP"},"status":{"loadBalancer":{}}},{"apiVersion":"v1","kind":"Service","metadata":{"annotations":{"meta.helm.sh/release-name":"cloudcore","meta.helm.sh/release-namespace":"kubeedge"},"creationTimestamp":"2023-01-12T19:34:40Z","labels":{"app.kubernetes.io/managed-by":"Helm","k8s-app":"kubeedge","kubeedge":"cloudcore"},"managedFields":[{"apiVersion":"v1","fieldsType":"FieldsV1","fieldsV1":{"f:metadata":{"f:annotations":{".":{},"f:meta.helm.sh/release-name":{},"f:meta.helm.sh/release-namespace":{}},"f:labels":{".":{},"f:app.kubernetes.io/managed-by":{},"f:k8s-app":{},"f:kubeedge":{}}},"f:spec":{"f:ports":{".":{},"k:{\"port\":10000,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}},"k:{\"port\":10001,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}},"k:{\"port\":10002,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}},"k:{\"port\":10003,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}},"k:{\"port\":10004,\"protocol\":\"TCP\"}":{".":{},"f:name":{},"f:port":{},"f:protocol":{},"f:targetPort":{}}},"f:selector":{".":{},"f:k8s-app":{},"f:kubeedge":{}},"f:sessionAffinity":{},"f:type":{}}},"manager":"keadm","operation":"Update","time":"2023-01-12T19:34:40Z"}],"name":"cloudcore","namespace":"kubeedge","resourceVersion":"21728","uid":"6db7d751-d24d-499e-95dc-294ad2264850"},"spec":{"clusterIP":"10.102.183.75","clusterIPs":["10.102.183.75"],"ipFamilies":["IPv4"],"ipFamilyPolicy":"SingleStack","ports":[{"name":"cloudhub","port":10000,"protocol":"TCP","targetPort":10000},{"name":"cloudhub-quic","port":10001,"protocol":"TCP","targetPort":10001},{"name":"cloudhub-https","port":10002,"protocol":"TCP","targetPort":10002},{"name":"cloudstream","port":10003,"protocol":"TCP","targetPort":10003},{"name":"tunnelport","port":10004,"protocol":"TCP","targetPort":10004}],"selector":{"k8s-app":"kubeedge","kubeedge":"cloudcore"},"sessionAffinity":"None","type":"ClusterIP"},"status":{"loadBalancer":{}}}],"kind":"ServiceList","metadata":{"resourceVersion":"32645"}}
```

# 安装 edgemesh

下载 EdgeMesh

```bash
git clone https://github.com/kubeedge/edgemesh.git
cd edgemesh
```

安装 CRDs

```bash
kubectl apply -f build/crds/istio/
```

部署 edgemesh-agent
修改配置文件

```bash
vim ./build/agent/resources/04-configmap.yaml

# 设置中继节点
        relayNodes:
        - nodeName: cloud
          advertiseAddress:
          - 192.168.0.201
```

```bash
kubectl apply -f build/agent/resources/
```

检验部署结果

```bash
kubectl get all -n kubeedge -o wide
```
