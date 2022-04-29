---
title: 【MySQL】MySQL的安装和使用
date: 2021-09-12 16:36:16
tags:
- Database
- MySQL
---

## 一、安装准备

安装之前，我们先登录  [官网](https://dev.mysql.com/downloads/mysql/5.5.html#downloads)  获取下载文件。

![image-20201202205754325](https://s2.loli.net/2022/04/01/D4Yy7TZOSqkXf9b.png)

选择相应系统版本之后，进入下一步的下载选项。

![image-20201202205922908](https://s2.loli.net/2022/04/01/AJKnw2al5teTOmr.png)

其中，MySQL ZIP Archive是压缩版本，需要自己配置；MySQL MSI Installer是安装版本，安装过程中自动配置，我们下载这个版本使用。

下面以 `mysql-installer-web-community-8.0.22.0.msi` 这个版本为例。

## 二、安装步骤

点击打开之后会有MySQL安装向导界面弹出。

![img](https://s2.loli.net/2022/04/01/exbJZGhlyfId7ot.png)

弹出这个界面之后，会紧接着弹出安装配置选项。这个时候需要进行选择。

![image-20201202211529644](https://s2.loli.net/2022/04/01/L9rSbQYvJDzkdcw.png)

这个时候选择第一个**Developer Default**默认选项即可。点击下一步。

![img](https://s2.loli.net/2022/04/01/pgyCedPiYRG1wQH.png)

勾选需要的组件之后，点击**Execute**进入下一步。

进度条加载完毕之后，会弹出用户协议，勾选即可。

![image-20201202212040652](https://s2.loli.net/2022/04/01/kpq1xdl3soHXUFn.png)

![image-20201202212126292](https://s2.loli.net/2022/04/01/KDva1reqsBRoTCH.png)

之后成功之后进行勾选确定即可。这个时候会返回之前的界面，点击**Next**进入下一步。

根据提示安装需要的组件。

![image-20201202212404543](https://s2.loli.net/2022/04/01/br8tS2gLxskqKFc.png)

下载之后，会开始进行下一步的安装。

![img](https://s2.loli.net/2022/04/01/uZnHVA35S4QBrXf.jpg)

等待安装完成之后，在安装完毕的页面中，点击**Next**进入下一页。

![img](https://s2.loli.net/2022/04/01/x9E4CIq8ZsRaUjg.png)

在**Product Configuration**页面点击**Next**。

![image-20201204192953735](https://s2.loli.net/2022/04/01/AJHeW1m8nKQbgoL.png)

之后在**Type and Networking**页面选择符合自己需要的即可，我们这里按照默认选择。

![img](https://s2.loli.net/2022/04/01/iuHhjJFwq5TAL1M.png)

在下面的页面中我们选择默认的选项即可，**Next**下一步。

![img](https://s2.loli.net/2022/04/01/YE2wLmrvWBZzTSg.jpg)

之后我们进入**Accounts and Roles**页面，开始创建root用户，设置root用户的密码。

同时如果有添加**User**的需要，可以在右下角选择**Add User**的选项。

![img](https://s2.loli.net/2022/04/01/lKGYj2gOovRF8a6.png)

设置密码之后，下面的页面按照默认选项即可。

![img](https://s2.loli.net/2022/04/01/jFaGX5hkKxwYlMZ.png)

最后在Apply Configuration页面中确定，等待所有的步骤确认即可。

![img](https://s2.loli.net/2022/04/01/6hvVDsqxHlCKazk.png)

到这一步为止，MySQL的安装就此完成，点击**Finish**即可完成。

## 三、使用步骤

点击**Finish**之后，MySQL会让用户确认之前的配置选项，完成之后进入下一步。

![img](https://s2.loli.net/2022/04/01/m8IUk9B2oPRQSbT.png)

这个时候，若是之前的步骤无误，直接输入之前设置的root用户的密码即可。点击**check**，会发现之前的选项后面会出现绿色的确认标志。点击下一步即可。

![QQ截图20201204194436](https://s2.loli.net/2022/04/01/fXOdNeMs62njYpo.png)

之后进入下一个页面中，点击**Execute**等待完成点击**Finish**即可。

![QQ截图20201204194621](https://s2.loli.net/2022/04/01/Ay7wYplDrvVBMg9.png)

安装完毕页面，会出现一个**Copy Log to Clipboard**的选项，选择是否复制日志到粘贴板，这个时候根据需要选择。

【日志部分内容】

1: Download of product 'mysql-server' started from http://cdn.mysql.com/Downloads/MySQL-8.0/mysql-8.0.22-winx64.msi
1: Download of package 'MySQL Server 8.0.22' succeeded
2: Action 19:18:42: INSTALL.
2: 1: MySQL Workbench 8.0 CE 2: {90AB709E-8C47-4765-B654-5005B3739938}

![QQ截图20201204194800](https://s2.loli.net/2022/04/01/jFi54TOVHPQeypW.png)

默认勾选两个选项，会打开**MySQL Workbench**和**MySQL Shell**。打开之后，页面如下：

我们选择在Workbench下操作，Workbench中页面如下：

![QQ截图20201204195515](https://s2.loli.net/2022/04/01/RyeCFvzmfW4DJ9s.png)

点击**MySQL Connections**下面的选项，输入之前的root用户密码。

![QQ截图20201204195633](https://s2.loli.net/2022/04/01/QWMKo136Szh5rYV.png)

点击之后，即登录成功。登录成功页面如下所示。

![QQ截图20201204195715](https://s2.loli.net/2022/04/01/lqG61Bcp4mVCa5Y.png)

## 四、使用测试

在其中的Query 1窗格中，输入相应的SQL语句，点击左边的闪电符号，运行所有SQL语句，完成对应的操作。

![image-20201204200018988](https://s2.loli.net/2022/04/01/R85S1zm2CorW9Ae.png)

按照语句，操作结果如下图所示。创建数据库成功：

![QQ截图20201204200146](https://s2.loli.net/2022/04/01/KhzWw5fpRTo9LXb.png)

使用SQL语句创建表格，在Query中输入以下语句，操作如下：

![QQ截图20201204200518](https://s2.loli.net/2022/04/01/gQ49dcE5n1yWlCT.png)

语句运行结果：

![QQ截图20201204200719](https://s2.loli.net/2022/04/01/bQwEi2qRm3zKgkI.png)

操作完成之后，我们输入查询语句，点击运行之后，查询结果显示如下：

![QQ截图20201204200851](https://s2.loli.net/2022/04/01/zgDYMWZRHjwdEcA.png)

表格创建成功，数据查询成功。

**1.1 DDL数据定义语言**

1)、定义:用于描述数据库中要存储实现实体的语言,简单说就是创建数据库和表、删除数据库和表、摧毁数据库和表

2)、常见的关键字:CREATE、DROP、ALTER、TRUNCATE

**1.2 TPL事务处理语言**

1)、定义:它的语句能确保被DML语句影响的表的所有行及时得以更新

2)、常见的关键字:BEGIN TRANSACTION，COMMIT、ROLLBACK

**1.3 DCL数据控制语言**

1)、定义:它的语句通过GRANT或REVOKE获得许可，确定单个用户和用户组对数据库对象的访问。某些RDBMS可用GRANT或REVOKE控制对表单个列的访问

2)、常见的关键字:GRANT、REVOKE

**1.4 DML数据操作语言**

1)、定义:其语句包括动词INSERT，UPDATE和DELETE。它们分别用于添加，修改和删除表中的行

2)、常见的关键字: INSERT、UPDATE、DELETE
