---
title: 【Oracle】Oracle 12c版本创建数据库连接遇到的问题汇总
date: 2020-09-21 23:29:12
tags:
- Database
- Oracle
---

### 1.执行请求的操作时遇到错误: Listener refused the connection with the following error: ORA-12505, TNS:listener doe......

这次的错误情况是因为本地变量没有创建，打开高级系统设置，在本地环境变量中创建新的环境变量。

用户名：**oracle_sid**

值：~~XSCJ~~（设置成自己连接时候创建的sid填入的值）

之后这个问题得到了解决。

------

### 2.状态: 失败 -测试失败: ORA-28000: 帐户已被锁定

这次的问题是因为账户被锁定。这个时候我们需要去解锁账户。解决方法步骤如下：

1. 打开**SQL Plus**，输入：`/as sysdba`

2. 之后连接成功就输入解锁代码：`alter user USERNAME account unlock;`，输入之后按下回车，出现操作已完成即代表已经成功。

   <!--这里的代码用来解锁账户-->

------

### 3.ora-01017: 用户名/口令无效; 登录被拒绝

这个时候碰见这个情况的解锁方法就是，修改密码之后重新登录。按照之前的步骤，首先打开**SQL Plus**，输入下面的代码（每输入一行回车）：

```
/as sysdba
alter user USERNAME identified by NEWPASSWORD;
```

输入新的密码之后要记住，之后再在**SQL Developer**口令处重新修改登录即可。
