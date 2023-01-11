---
title: 【容器】Docker 入门
date: 2023-01-12
tags:
- Container
- Cloud-Native
---

Docker 使用 Google 公司推出的 Go 语言进行开发实现，基于 Linux 内核的 cgroup、namespace 以及 OverlayFS 类的 Union FS 等技术，对进程进行封装隔离，属于操作系统层面的虚拟化技术。由于隔离的进程独立于宿主和其它的隔离的进程，因此也称其为容器。

> [https://vuepress.mirror.docker-practice.com/introduction/what/](https://vuepress.mirror.docker-practice.com/introduction/what/)

简单来说，Docker 是一个在软件层面的实现，能为应用程序提供屏蔽计算机硬件以及操作系统层面的虚拟化。

## Docker 来源

在 Docker 和虚拟机 Virtual Machine 未诞生之时，相同的程序在部署时，会需要关注各种软件的兼容性问题。不仅在计算机硬件层面的兼容问题，还在于计算机操作系统层面的兼容问题。

![image.png](https://img-blog.csdnimg.cn/img_convert/565676e6ee26046d6a9c67516ac48de5.png)

相同的软件部署在不同的环境下，呈现的结果可能会有极大差异。

在这种环境下，虚拟机产生了。我们通过虚拟机，可以做到屏蔽操作系统层面的实现，也可以针对不同水平的硬件环境，在硬件这种物理层面进行模拟。

![image.png](https://img-blog.csdnimg.cn/img_convert/60f4e0133a934972043bca02e0337fee.png)

但是如果我们只是想要部署运行一个应用程序，使用虚拟机会显得太过于笨重。因为通常情况下，虚拟机不仅要针对硬件环境模拟，还要针对全套的操作系统环境进行模拟。对于应用程序的部署来说，会有虚拟机模拟的大幅度性能损耗，也不方便部署。

于是 Docker 的产生就解决了这个问题。只需要在不同的操作系统中，安装 Docker 这一软件，我们就能实现操作系统层面的硬件环境的屏蔽。且相对于虚拟机，更加轻便小巧，性能损耗也更小。

![image.png](https://img-blog.csdnimg.cn/img_convert/c98351bbbba42025fb3275cea3429414.png)

## Docker 简介

在 Docker 中，有一些非常重要的概念。

![image.png](https://img-blog.csdnimg.cn/img_convert/47ace07c506ded35ad23b3b106939f8f.png)

- Dockerfile：用于创建容器，是一个自动化脚本。使用 Dockerfile 可以很方便地根据镜像创建容器。
- Image：镜像。提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像**不包含**任何动态数据，其内容在构建之后也不会被改变。
- Container：容器。镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的命名空间（NameSpace），因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间等。

![image.png](https://img-blog.csdnimg.cn/img_convert/85a12fff336758ec277f57b4756d961a.png)

## Docker 安装

> 使用环境：使用 `cat /proc/version` 命令查看。
>
> Cent OS7 64位：Linux version 3.10.0-693.el7.x86_64 (builder@kbuilder.dev.centos.org) (gcc version 4.8.5 20150623 (Red Hat 4.8.5-16) (GCC) ) #1 SMP Tue Aug 22 21:09:27 UTC 2017

使用命令安装：

```shell
# 安装 gnome-terminal
sudo yum install gnome-terminal

# 删除残留文件
sudo yum remove docker-desktop

# 完整清理 docker 数据和配置
rm -r $HOME/.docker/desktop
sudo rm /usr/local/bin/com.docker.cli
sudo apt purge docker-desktop

# 清除旧版本的下载残留
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

设置安装的 Docker 使用的存储库：

```shell
# 官方推荐
sudo yum install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 建议使用
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

![image.png](https://img-blog.csdnimg.cn/img_convert/bee4682095f5b715d87b9ba354a0ed34.png)

![image.png](https://img-blog.csdnimg.cn/img_convert/421c34fc5888933be5b2a068ef2fce8e.png)

设置仓库源地址：

```shell
# aliyun 镜像
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 清华镜像
sudo yum-config-manager \
    --add-repo \
    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
```

安装  Docker Engine-Community，此处安装的是默认版本。

```shell
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

**要安装特定版本的 Docker Engine-Community，请在存储库中列出可用版本，然后选择并安装：**列出并排序您存储库中可用的版本。此示例按版本号（从高到低）对结果进行排序。

```shell
yum list docker-ce --showduplicates | sort -r

# 运行结果
docker-ce.x86_64            3:20.10.9-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.8-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.7-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.6-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.5-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.4-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.3-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.2-3.el7                    docker-ce-stable 
docker-ce.x86_64            3:20.10.22-3.el7                   docker-ce-stable 
```

通过其完整的软件包名称安装特定版本，该软件包名称是软件包名称（docker-ce）加上版本字符串（第二列），从第一个冒号（:）一直到第一个连字符，并用连字符（-）分隔。例如：docker-ce-18.09.1。

```shell
sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```

接下来就可以使用 docker 了：

![image.png](https://img-blog.csdnimg.cn/img_convert/636e287270712d5db54d0dcbc5ae7f13.png)

其他命令：

```shell
# 启动 docker
sudo systemctl start docker
# 运行容器
sudo docker run hello-world
# 删除安装包
yum remove docker-ce
# 删除所有相关文件
rm -rf /var/lib/docker
```

> 安装参考资料：
>
> [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
>
> [https://www.runoob.com/docker/centos-docker-install.html](https://www.runoob.com/docker/centos-docker-install.html)

## DockerFile 文件

```shell
# 规定程序需要的运行环境，格式<Name>:<Version/Tag>
FROM python:3.8-slim-buster
# 规定程序的工作目录
WORKDIR /app
# 将源程序文件复制到目标目录
COPY . .
# RUN 表示创建镜像时需要运行的程序相关命令
RUN pip3 install -r requirements.txt
# 运行CMD指令
CMD ["python3", "app.py"]
```

按照既定的规则编写好 DockerFile 之后，我们就可以通过 DockerFile 创建指定的镜像。

[Dockerfile.txt](https://www.yuque.com/attachments/yuque/0/2023/txt/29554606/1673162389282-126e0bab-67d2-47b4-bb9d-9fa3df17d741.txt?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2023%2Ftxt%2F29554606%2F1673162389282-126e0bab-67d2-47b4-bb9d-9fa3df17d741.txt%22%2C%22name%22%3A%22Dockerfile.txt%22%2C%22size%22%3A329%2C%22type%22%3A%22text%2Fplain%22%2C%22ext%22%3A%22txt%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22ucc9195b7-1a06-48ad-8aab-92409d0ae70%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22u4275df2d%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D)

> 注意：DockerFile 是创建镜像使用的。文件无任何后缀。

使用命令创建镜像：

```shell
# -t 指定镜像的名字
# 最后一个参数表示 DockerFile 所在的目录
docker build -t <ImageName> <DockerFile Path>

# 例如
docker build -t my-app .
```

使用命令启动容器：

```shell
# 通过 -p 指定机器端口和容器端口进行映射
# -d 指定镜像名称
docker run -p <MachinePort>:<ContainerPort> -d <ImageName>
```

之后我们可以在 Docker-Desktop 程序中看到启动的容器。

> Docker 中容器和镜像的关系：
>
> - Java 中的一个类，可以借助这个类创建非常多的对象，也称为实例。
> - 类比于镜像和容器，镜像就是 Class，容器就是 Object。我们借助镜像可以创建非常多的容器，一个个容器就相当于实例。
> - 在针对某些容器进行操作，可以理解为我们向对象进行了各种赋值等操作；与此同时，对象/容器就有了各自的一些属性/数据。所以，我们需要持久化的是容器，而不是镜像。

其他命令：

```shell
# 列举所有的容器
docker ps
# 停止容器
docker stop <containerId>
# 重启容器
docker restart <containerId>
# 删除容器
docker rm <containerId>
# 启动一个远程 shell
docker exec -it <containerId> /bin/bash
```

## Docker 持久化

需要注意的是，删除容器，会导致其中的数据全部丢失。相当于计算机中删除了虚拟机，那么在虚拟机中创建和修改的数据都会全部丢失。

如果想要数据不丢失，我们需要将 Docker 的 Container 中的数据进行持久化。

为了实现容器中数据的持久化保存和备份，我们可以使用 Docker 中的 `Volumes` 数据卷来实现。

![image.png](https://img-blog.csdnimg.cn/img_convert/c6cf9b4bdec9487ee4f52d1820c531b4.png)

> 参考文档：[https://docs.docker.com/storage/volumes/](https://docs.docker.com/storage/volumes/)

![image.png](https://img-blog.csdnimg.cn/img_convert/0104c95fcb99c6da6f214fd94574fed3.png)

volume 就相当于在本地主机和不同容器之间的一个共享文件夹。在某一个容器上修改了数据，会对应反映在共同关联在该 volumn 的其他容器上。

创建 volume 数据卷：

```shell
# 创建数据卷
docker volume create <VolumeName>

# 启动或运行容器
# 这里的 <FilePath> 是指定将 volume 挂载 mounted 到机器的目标路径
docker run -dp 80:5000 -v <VolumeName>:<FilePath> <ImageName>
```

## Docker 多容器部署

为了实现应用程序和数据的分布式部署，我们可以创建多个容器。这样可以提高系统的可用性，也能加快启动和恢复时间。

创建 docker-compose.yml 文件：

```yaml
version: "1"

services:
  web:
    build: .
    ports:
      - "80:5000"

  db:
    image: "mysql"
    environment:
      MYSQL_DATABASE: app-db
      MYSQL_ROOT_PASSWORD: secret
    volumes:
      - app-data:/var/lib/mysql

volumes:
  my-app-data:
    /etc/app
```

[docker-compose.yml](https://www.yuque.com/attachments/yuque/0/2023/yml/29554606/1673162321673-581ef3a3-2585-4157-8dd1-83e10197555d.yml?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2023%2Fyml%2F29554606%2F1673162321673-581ef3a3-2585-4157-8dd1-83e10197555d.yml%22%2C%22name%22%3A%22docker-compose.yml%22%2C%22size%22%3A281%2C%22type%22%3A%22%22%2C%22ext%22%3A%22yml%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u535e76cf-7a03-4f1c-9f19-62542a36e2a%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22ub541056c%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D)

编写好文件之后，直接运行：

```shell
# -d 表示 detach 在后台运行
# 整个命令表示在后台运行所有yml文件中的所有容器
docker compose up -d
```

```shell
# 停止并删除所有容器，这里并不会删除 volumes 数据卷
# 如果需要删除所有的 volumes 数据卷，可以加上 --volumes 参数
docker compose down
```

## Docker 与 Kubernates

Kubernates 能取代的是 Docker 中的容器引擎 Container-Engine，并不能取代 Docker。两者并非一个层面的东西。

![image.png](https://img-blog.csdnimg.cn/img_convert/2b9bfd5ccf904da3ff6d6aa0e7a54bcf.png)
Kubernates 更多做的是容器编排。即在部署容器的时候，相比原有的 Docker-Container-Engine 可以更好地做到负载均衡、故障转移等。

[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-gSi3aduW-1673453139200)(null)]

> 参考资料：[https://kubernetes.io/docs/concepts/overview/components](https://kubernetes.io/docs/concepts/overview/components/)/

在 Cluster 集群部署中，Kubernates 所做的就是将各个容器分发到一个集群中运行，并进行全自动化的管理，包括应用的部署和升级。

![image.png](https://img-blog.csdnimg.cn/img_convert/4ade70091c5fad7548cf5fbc0bc8be62.png)

> 参考资料：
>
> 【Docker 10分钟快速入门】 [https://www.bilibili.com/video/BV1s54y1n7Ev/?share_source=copy_web&vd_source=6de80ff9f17ce8c00bfb41f8d5c0afef](https://www.bilibili.com/video/BV1s54y1n7Ev/?share_source=copy_web&vd_source=6de80ff9f17ce8c00bfb41f8d5c0afef)

> 更多 Docker 相关资料：
>
> [https://docs.docker.com/](https://docs.docker.com/)
>
> [https://yeasy.gitbook.io/docker_practice](https://yeasy.gitbook.io/docker_practice)
>
> [https://vuepress.mirror.docker-practice.com](https://vuepress.mirror.docker-practice.com/)
