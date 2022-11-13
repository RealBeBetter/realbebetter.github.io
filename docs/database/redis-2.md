---
title: 【Redis】Redis高级（Linux环境）Redis持久化、事务、删除策略
date: 2021-12-27 20:56:21
tags:
- Database
- Redis
---

## 六、Redis安装

### 基于Linux环境安装Redis

首先需要安装Linux环境，下载VMware虚拟机软件，之后安装运行即可

安装激活之后，我们开始安装系统，也就是Linux环境
。我们先前往对应的官网下载CentOS的镜像文件，之后在VMware里面安装镜像文件，之后启动虚拟机，即可进入Linux环境。

安装完Linux环境后，我们一般都是使用SecureCRT来连接虚拟机，用命令行对Linux进行操作。设置用户名，去获取到虚拟机的IP地址之后，利用SSH2连接虚拟机即可。

### 基于CentOS7环境下的安装Redis

下载安装包

```
wget http://download.redis.io/releases/redis-4.0.0.tar.gz
```

解压

```
tar -xvf 文件名.tar.gz
```

编译

```
make
```

安装

```
make install
```

运行界面如下所示：

![image-20210530221200701](https://img-blog.csdnimg.cn/img_convert/ac0d3d0a630e4b1a1ed74ed4c3daa71e.png)

![image-20210530221423526](https://img-blog.csdnimg.cn/img_convert/f326240b28c69c7d447dbce984c3119a.png)

安装成功之后的界面如图所示：

![image-20210530222529761](https://img-blog.csdnimg.cn/img_convert/4deb826a173c5d0f1a674c80f468bc9a.png)

安装成功之后进入相关的目录，之后克隆一个会话窗口，添加进入redis-cli文件；到这一步就可以正常使用Redis了、

![image-20210530223104902](https://img-blog.csdnimg.cn/img_convert/b7dacf51b77d99c25c5d42fbe254c099.png)

### Redis指定端口启动

**由指定端口号创建Redis服务器端**

进入指定文件夹

```
cd redis-4.0.0/
```

进入指定src目录

```
cd src
```

由指定端口创建服务端

```
redis-server --port 6380
```

![image-20210530223241726](https://img-blog.csdnimg.cn/img_convert/2ea2a229053edfdd52195580df8296a3.png)

**进入指定端口号的服务**

进入指定文件夹

```
cd redis-4.0.0/
```

进入指定src目录

```
cd src
```

由指定端口进入客户端

```
redis-cli -p 6380
```

![image-20210530223547882](https://img-blog.csdnimg.cn/img_convert/6854777ab95cccad5fdf829a3afa5b90.png)

### 指定配置文件环境启动Redis

首先进入Redis的src目录，之后使用命令

```
cat redis.conf
```

查看redis的配置文件信息；但是因为这样的查看，信息过于复杂，所以我们需要将这些信息进行过滤查看。使用命令：

```
cat redis.conf | grep -v "#" | grep -v "^$"
```

然后我们将这其中的信息复制到一个新的文件中

```
cat redis.conf | grep -v "#" | grep -v "^$" > redis-6379.conf
```

这一步进行完毕之后，可以看到在目录下新增的配置文件

![image-20210530224604863](https://img-blog.csdnimg.cn/img_convert/0ea81b88aa9c309ab333235d5ed81ff8.png)

接下来我们需要编译这个新建的配置文件，使用命令

```
vim redis-6379.conf
```

选择其中不需要的项目，双击D键删除不需要的行

创建日志文件保存目录的时候，需要用`mkdir dictionaryName`创建新的文件夹

最后保留所需要的项目，切换成INSERT模式进行修改；用`:wq`命令保存（按下ESC键切换之后输入）

![image-20210530230323894](https://img-blog.csdnimg.cn/img_convert/fe5be6aaff2198b486da19251af9b263.png)

之后结束编写文件。接下来就可以使用命令

```
redis-server redis-6379.conf
```

在后台启动server服务器端，用指令

```
ps -ef | grep redis-
```

查看redis的启动情况

![image-20210530230550245](https://img-blog.csdnimg.cn/img_convert/3184ae3a357e91f2d1b2f68e25e54090.png)

之后在另一个窗口，可以看到Redis的启动情况，用指令进入客户端看看是否能够真正运行指令即可

![image-20210530230738821](https://img-blog.csdnimg.cn/img_convert/347542d86f2c0bca662952fc52e640f3.png)

### 配置文件启动目录管理

需求：在下面的目录中创建一个专门存放conf文件的目录

![image-20210530231050632](https://img-blog.csdnimg.cn/img_convert/1991ecf20168c3170806faf91843ea4e.png)

①在该目录下使用指令创建名为conf的目录

```
mkdir conf
```

②使用指令将文件redis-6379.conf移动到conf目录下

```
mv redis-6379.conf conf
```

![image-20210530231315036](https://img-blog.csdnimg.cn/img_convert/a52649ab3a94b544a73fe9866481ae81.png)

③要是想创建多个redis服务，直接使用命令将文件复制到同一个文件夹

```
cp redis-6379.conf redis-6380.conf
```

④将redis-6380.conf文件重新编译，修改其中的端口号以及logfile的名称

```
vim redis-6380.conf
```

### Redis服务启动

默认配置启动

```
redis-server
redis-server --port 6379
redis-server --port 6380
.....
```

指定配置文件启动

```
redis-server redis.conf
redis-server redis-6379.conf
redis-server redis-6380.conf ....
redis-server conf/redis-6379.conf
redis-server config/redis-6380.conf ....
```

### Redis客户端启动

默认连接

```
redis-cli
```

连接指定服务器

```
redis-cli -h 127.0.0.1
redis-cli -p 6379
redis-cli -h 127.0.0.1 -p 6379
```

### Redis服务端基本配置

```
daemonize yes
```

以守护进程方式启动，使用本启动方式，redis将以服务的形式存在，日志将不再打印到命令窗口中

```
port 6***
```

设定当前服务启动端口号

```
dir "/自定义目录/redis/data"
```

设定当前服务文件保存位置,包含日志文件、持久化文件等

```
logfile "6***.log”
```

设定日志文件名，便于查阅

## 七、持久化

### 持久化简介

- 什么是持久化
  - 利用永久性存储介质将数据进行保存，在特定的时间将保存的数据进行恢复的工作机制称为持久化。
  - 简单来说，就是将内存中的数据存放到可以长久保存的磁盘中去
- 为什么要进行持久化
  - 防止数据的意外丢失，确保数据安全性

- 持久化过程保存什么
  - 将当前数据状态进行保存，快照形式，存储数据结果，存储格式简单，关注点在数据
  - 将数据的操作过程进行保存，日志形式，存储操作过程，存储格式复杂，关注点在数据的操作过程

![image-20210530232612661](https://img-blog.csdnimg.cn/img_convert/c0ed5add28952eae5813d36b4b794ebd.png)

### RDB

命令

```
save
```

作用：手动执行一次保存操作

![image-20210530233010159](https://img-blog.csdnimg.cn/img_convert/c540ff5ff5cb3b91480a7cf5627b1040.png)

![image-20210530233549826](https://img-blog.csdnimg.cn/img_convert/42aa303650f9b175f84997e9b3ab215a.png)

其中.rdb结尾的文件就是RDB格式保存的快照形式。

#### save指令相关配置

- dbfilename dump.rdb
  说明：设置本地数据库文件名，默认值为dump.rdb
  经验：通常设置为`dump-端口号.rdb`
- dir
  说明：设置存储.rdb文件的路径
  经验：通常设置成存储空间较大的目录中，目录名称data
- rdbcompression yes
  说明：设置存储至本地数据库时是否压缩数据，默认为yes，采用LZF压缩
  经验：通常默认为开启状态，如果设置为no，可以节省CPU运行时间，但会使存储的文件变大(巨大)
- rdbchecksum yes
  说明：设置是否进行RDB文件格式校验，该校验过程在写文件和读文件过程均进行
  经验：通常默认为开启状态，如果设置为no，可以节约读写性过程约10%时间消耗，但是存储一定的数据损坏风险

#### 数据恢复过程

重新利用配置文件启动服务端的时候，会在启动的时候加载之前保存的持久化数据

#### save指令工作原理

**注意**

***save指令的执行会阻塞当前Redis服务器***，直到当前RDB过程完成为止，有可能会造成长时间阻塞，线上环境不建议使用。

![image-20210530235913553](https://img-blog.csdnimg.cn/img_convert/a7befee71903c0331fa4a6fb9f503f9e.png)

**解决方案**

将数据保存的过程后台操作

命令

```
bgsave
```

作用：手动启动后台保存操作，但不是立即执行

#### bgsave指令工作原理

![image-20210531000309395](https://img-blog.csdnimg.cn/img_convert/095c00943b70f3cc6a4eafdbdd034e62.png)

**注意**

***bgsave命令是针对save阻塞问题做的优化***。Redis内部所有涉及到RDB操作都采用bgsave的方式，save命令可以放弃使用。

**相关配置**

- ```
  stop-writes-on-bgsave-error yes
  ```

  说明：后台存储过程中如果出现错误现象，是否停止保存操作
  经验：通常默认为开启状态

配置

```
save second changes
```

- 作用：满足限定时间范围内key的变化数量达到指定数量即进行持久化

- 参数

  - second：监控时间范围
  - changes：监控key的变化量

- 位置：在conf文件中进行配置

- 范例

  ```
  save 900 1			// 15 分钟内变化1次
  save 300 10
  save 60 10000
  ```

- 原理

![image-20210531002534234](https://img-blog.csdnimg.cn/img_convert/50dfd5ea6e64f6eec483609eb104fd8c.png)

- 注意
  - save配置要根据实际业务情况进行设置，频度过高或过低都会出现性能问题，结果可能是灾难性的
  - save配置中对于second与changes设置通常具有互补对应关系，尽量不要设置成包含性关系
  - save配置启动后执行的是bgsave操作

#### RDB三种启动方法对比

![image-20210531002617082](https://img-blog.csdnimg.cn/img_convert/628307bd492f8118a63a0be8e4d118c0.png)

其中save配置，运行的还是bgsave指令，只不过方法不一样。

#### RDB特殊启动方式

- 全量复制

- 服务器运行过程中重启

  ```
  debug reload
  ```

- 关闭服务器时指定保存数据

  ```
  shutdown save
  ```

#### RDB优点

- RDB是一个紧凑压缩的二进制文件，存储效率较高
- RDB内部存储的是redis在某个**时间点**的数据快照，非常适合用于数据备份，复制等场景
- RDB恢复数据的速度要比AOF快很多
- 应用：服务器中每X小时执行bgsave备份，并将RDB文件拷贝到远程机器中，用于灾难恢复

#### RDB缺点

- RDB方式无论是执行指令还是利用配置，无法做到实时持久化，具有较大的可能性丢失数据
- bgsave指令每次运行要执行fork操作创建子进程，要牺牲掉一些性能
- Redis的众多版本中未进行RDB文件格式的版本统一，有可能出现各版本服务之间数据格式无法兼容现象

### AOF

**RDB存储带来的弊端**

- 存储数据量较大，效率较低
  - 基于快照思想，每次读写都是全部数据，当数据量巨大时，效率非常低
- 大数据量下的IO性能较低
- 基于fork创建子进程，内存产生额外消耗
- 宕机带来的数据丢失风险

**解决方案**

- 不写全数据，仅记录部分数据
- 改记录数据为记录操作过程
- 对所有操作均进行记录，排除丢失数据的风险

#### AOF概念

- AOF(append only file)持久化：以独立日志的方式记录每次写命令，重启时再重新执行AOF文件中命令达到恢复数据的目的。与RDB相比，可以简单描述为**改记录数据为记录数据产生的过程**
- AOF的主要作用是解决了数据持久化的实时性，目前已经是**Redis持久化的主流方式**

#### AOF写数据过程

![image-20210531004115933](https://img-blog.csdnimg.cn/img_convert/782aa0032bb1431609ec4be9f334f35a.png)

**AOF写数据三种策略（appendfsync）**

- always(每次)
  - 每次写入操作均同步到AOF文件中，**数据零误差，性能较低**，不建议使用。
- everysec (每秒)
  - 每秒将缓冲区中的指令同步到AOF文件中，**数据准确性较高，性能较高，建议使用**，也是默认配置
  - 在系统突然宕机的情况下丢失1秒内的数据
- no (系统控制)
  - 由操作系统控制每次同步到AOF文件的周期，整体过程**不可控**

#### AOF配置

- 配置

  - ```
    appendonly yes|no
    ```

- 作用

  - 是否开启AOF持久化功能，默认为不开启状态

- 配置

  - ```
    appendfsync always|everysec|no
    ```

- 作用

  - AOF写数据策略

- 其他配置

  - ```
    appendfilename filename
    ```

- 作用

  - AOF持久化文件名，默认文件名为appendonly.aof，建议配置为`appendonly-端口号.aof`

- 配置

  - ```
    dir
    ```

- 作用

  - AOF持久化文件保存路径，与RDB持久化文件保持一致即可

#### AOF写数据遇到的问题

如果遇到多条指令同时重复写，但是最终生效的指令可以将之合并，AOF将如何解决？

![image-20210531005759572](https://img-blog.csdnimg.cn/img_convert/2ee6c21ca566c0f6785572d770b4ec43.png)

解决方案：AOF重写

随着命令不断写入AOF，文件会越来越大，为了解决这个问题，Redis引入 了AOF重写机制压缩文件体积。AOF文件重写是将Redis进程内的数据转化为写命令同步到新AOF文件的过程。简单说就是将对同一个数据的若千个条命令执行结果转化成最**终结果数据对应的指令进行记录**。

**AOF作用**

> 降低磁盘占用量，提高磁盘利用率
> 提高持久化效率，降低持久化写时间，提高IO性能
> 降低数据恢复用时，提高数据恢复效率

#### AOF重写规则

- 进程内已超时的数据不再写入文件
- 忽略无效指令，重写时使用进程内数据直接生成，这样新的AOF文件只保留最终数据的写入命令
  如del key1、hdel key2、srem key3、set key4 111、set key4 222等
- 对同一数据的多条写命令合并为一条命令
  如lpush list1 a、Ipush list1 b、lpush list1 c可以转化为：lpush list1abc
  为防止数据量过大造成客户端缓冲区溢出，对list、 set. hash、 zset等类型,每条指令最多写入64个元素

**AOF重写方式**

手动重写

```
bgrewriteaof
```

自动重写

```
auto-aof-rewrite-min-size size
auto-aof-rewrite-percentage percentage
```

自动重写触发比对参数（运行指令info Persistence获取具体信息）

```
aof_current_size
aof_base_size
```

自动重写触发条件

```
aof_current_size > auto-aof-rewrite-min-size
```

![image-20210531010930472](https://img-blog.csdnimg.cn/img_convert/aa2a22bafd0b0419228fead41df82c6d.png)

**bgrewriteaof指令的运行原理**

![image-20210531010716066](https://img-blog.csdnimg.cn/img_convert/42c65e2c5ccfaa5590582d7c315ccf47.png)

与之前的bgsave指令相似。

**AOF重写的工作原理**

![image-20210531011558953](https://img-blog.csdnimg.cn/img_convert/0c9a748a0a62feb38cea6dbca4ef6791.png)

![image-20210531011716732](https://img-blog.csdnimg.cn/img_convert/77d7dbf9b6343f467f16f70a6ef6dd00.png)

### RDB和AOF的区别

![image-20210531011801740](https://img-blog.csdnimg.cn/img_convert/dab6c6ed8aec0535b28f026d840d239b.png)

**RDB和AOF的选择**

- 对数据非常敏感，建议使用默认的AOF持久化方案
  - AOF持久化策略使用everysec，每秒钟fsync一次。该策略redis仍可以保持很好的处理性能，当出现问题时，最多丢失0-1秒内的数据。
  - 注意：由于AOF文件存储体积较大，且恢复速度较慢
- 数据呈现阶段有效性，建议使用RDB持久化方案
  - 数据可以良好的做到阶段内无丢失(该阶段是开发者或运维人员手工维护的)，且恢复速度较快，阶段点数据恢复通常采用RDB方案
  - 注意：利用RDB实现紧凑的数据持久化会使Redis降的很低
- 综合比对
  - RDB与AOF的选择实际上是在做一种权衡，每种都有利有弊
  - **如不能承受数分钟以内的数据丢失，对业务数据非常敏感，选用AOF**
  - **如能承受数分钟以内的数据丢失，且追求大数据集的恢复速度，选用RDB**
  - **灾难恢复选用RDB**
  - 双保险策略，同时开启RDB和AOF，重启后，Redis优先使用AOF来恢复数据，降低丢失数据的量

### 持久化应用场景

> Tips 1: redis用于控制数据库表主键id，为数据库表主键提供生成策略，保障数据库表的主键唯一性（不建议）
> Tips 3: redis应用于各种结构型和非结构型高热度数据访问加速（不建议）
> Tips 4: redis 应用于购物车数据存储设计（不建议）
> Tips 5: redis应用于抢购，限购类、限量发放优惠卷、激活码等业务的数据存储设计
> Tips 6: redis 应用于具有操作先后顺序的数据控制
> Tips 7: redis 应用于最新消息展示
> Tips 9: redis应用于同类信息的关联搜索，二度关联搜索，深度关联搜索（不建议）
> Tips 12: redis 应用于基于黑名单与白名单设定的服务控制（根据情况）
> Tips 13: redis 应用于计数器组合排序功能对应的排名
> Tips 15: redis 应用于即时任务/消息队列执行管理（RabbitMQ解决）
> Tips 16: redis 应用于按次结算的服务控制（根据重要性，重要的话就持久化）

## 八、事务

### 事务简介

Redis执行指令过程中，多条连续执行的指令被干扰、打断、插队该怎么解决？

redis事务就是一个命令执行的队列，将一系列预定义命令包装成一 个整体 (一个队列)。当执行时，一次性按照添加顺序依次执行，中间不会被打断或者干扰。

事务：**一个队列中，一次性、顺序性、排他性的执行一系列命令**

![image-20210531013608749](https://img-blog.csdnimg.cn/img_convert/e9b657ddd5916039b7acf104254383d2.png)

### 事务基本操作

一个事务中的一个队列中，有一个事务的边界概念，代表了该事务的开始和结束

- 开启事务

  - ```
    multi
    ```

- 作用

  - 设定事务的开启位置，此指令执行后，后续的所有指令均加入到事务中

- 执行事务

  - ```
    exec
    ```

- 作用
  - 设定事务的结束位置，同时执行事务。与multi成对出现， 成对使用

事务的执行结果

![image-20210531014202895](https://img-blog.csdnimg.cn/img_convert/10b28666cf8f95291a5653ce7a02dbca.png)

开启事务之后，会将`multi`和`exec`之间的内容添加进队列，这个时候redis返回的值是一个`queued`，表示已经队列化了。执行完`exec`指令之后，会将事务中的各个指令都按照入队的顺序打印执行结果。

注意：**加入事务的命令暂时进入到任务队列中，并没有立即执行，只有执行`exec`命令才开始执行**

事务相当于先定义，之后定义完毕整套事务，执行exec指令之后统一执行

但是，如果事务的执行过程中出现错误，该如何解决呢？

- 取消事务

  - ```
    discard
    ```

- 作用

  - 终止当前事务的定义，发生在multi之后，exec之前

![image-20210531014700215](https://img-blog.csdnimg.cn/img_convert/63ea4d968dfb043a31f05f3212fd31b0.png)

当执行了`discard`指令之后，相当于从`multi`指令开始一直到`discard`指令之间定义的事务都全部作废。

#### 事务的工作流程

![image-20210531120735277](https://img-blog.csdnimg.cn/img_convert/aeebcd1fcab0cc5168973d3acf813cb2.png)

**注意事项**

如果事务中的语句存在**语法错误**，该如何解决呢？

- 语法错误
  - 指命令书写格式有误
- 处理结果
  - 如果定义的事务中所包含的命令存在语法错误，**整体事务中所有命令均不会执行**。包括那些语法正确的命令。

定义事务的过程中，命令执行出现错误怎么办？

- 运行错误
  - 指命令格式正确，但是无法正确的执行。例如对list进行incr操作
- 处理结果
  - 能够**正确运行的命令会执行，运行错误的命令不会被执行**
  - 注意：**已经执行完毕的命令对应的数据不会自动回滚，需要程序员自己在代码中实现回滚**。

**手动进行事务回滚**

- 记录操作过程中被影响的数据之前的状态
  - 单数据：string
  - 多数据：hash、list、set、zset
- 设置指令恢复所有的被修改的项
  - 单数据：直接set（注意周边属性，例如时效）
  - 多数据：修改对应值或整体克隆复制

### 锁

#### 监听锁

**业务场景**

天猫双11热卖过程中，对已经售罄的货物追加补货，4个业务员都有权限进行补货。补货的操作可能是一系列的操作，牵扯到多个连续操作，如何保障不会重复操作？

**业务分析**

多个客户端有可能同时操作同一组数据，并且该数据一旦被操作修改后，将不适用于继续操作

在操作之前锁定要操作的数据，一旦发生变化，终止当前操作

**解决方案**

- 对 key 添加监视锁，在执行exec前如果key发生了变化，终止事务执行

  - ```
     watch key1 [key2……] 
    ```

- 取消对所有 key 的监视

  - ```
    unwatch
    ```

**建议**

redis 应用基于状态控制的批量任务执行

**操作注意**

必须在开启事务之前对**key**开启监听锁，在开启事务之后，中途不可以开启监听锁。

![image-20210531122532913](https://img-blog.csdnimg.cn/img_convert/85bb87f83d68e4e004045b2501cd5b48.png)

#### 分布式锁

**业务场景**

天猫双11热卖过程中，对已经售罄的货物追加补货，且补货完成。客户购买热情高涨，3秒内将所有商品购买完毕。本次补货已经将库存全部清空，如何避免最后一件商品不被多人同时购买？【超卖问题】

**业务分析**

- 使用watch监控一个key有没有改变已经不能解决问题，此处要监控的是具体数据
- 虽然redis是单线程的，但是多个客户端对同一数据同时进行操作时，如何避免不被同时修改？

**解决方案（分布式锁）**

- 使用 setnx 设置一个公共锁

  - ```
    setnx lock-key value
    ```

- 利用setnx命令的返回值特征，有值则返回设置失败，无值则返回设置成功
  - 对于返回设置成功的，拥有控制权，进行下一步的具体业务操作
  - 对于返回设置失败的，不具有控制权，排队或等待操作完毕通过**del操作**释放锁
- 注意：上述解决方案是一种设计概念，依赖规范保障，具有风险性

**建议**

redis 应用基于分布式锁对应的场景控制

#### 锁限时

**业务场景**

- 依赖分布式锁的机制，某个用户操作时对应客户端宕机，且此时已经获取到锁。如何解决？

**业务分析**

- 由于锁操作由用户控制加锁解锁，必定会存在加锁后未解锁的风险
- 需要解锁操作不能仅依赖用户控制，系统级别要给出对应的保底处理方案

**解决方案**

- 使用 expire 为锁key添加时间限定，到时不释放，放弃锁

  - ```
    expire lock-key second
    pexpire lock-key milliseconds
    ```

- 由于操作通常都是微秒或毫秒级，因此该锁定时间不宜设置过大。具体时间需要业务测试后确认。

  - 例如：持有锁的操作最长执行时间127ms，最短执行时间7ms。
  - 测试百万次最长执行时间对应命令的最大耗时，测试百万次网络延迟平均耗时
  - 锁时间设定推荐：最大耗时*120%+平均网络延迟*110%
  - 如果业务最大耗时<<网络平均延迟，通常为2个数量级，取其中单个耗时较长即可

## 九、删除策略

### 过期数据

- Redis是一种内存级数据库，所有数据均存放在内存中，内存中的数据可以通过TTL指令获取其状态
  - XX ：具有时效性的数据
  - -1 ：永久有效的数据
  - -2 ：已经过期的数据 或 被删除的数据 或 未定义的数据

### 数据删除策略

1. 定时删除
  1. 节约内存，无占用
  2. 不分时段占用CPU资源，频度高
  3. 拿时间换空间
2. **惰性删除**
  1. 内存占用严重
  2. 延时执行，CPU利用率高
  3. 拿空间换时间
3. **定期删除**
  1. 内存定期随机清理
  2. 每秒花费固定的CPU资源维护内存
  3. 随机抽查，重点抽查

#### 时效性数据的存储策略

![image-20210531124923178](https://img-blog.csdnimg.cn/img_convert/3aa643b884f05857b8f9d9e0e42aede9.png)

#### 数据删除策略的目标

在内存占用与CPU占用之间寻找一种平衡，顾此失彼都会造成整体redis性能的下降，甚至引发服务器宕机或 内存泄露

#### 定时删除

- 创建一个定时器，当key设置有过期时间，且过期时间到达时，由定时器任务立即执行对键的删除操作
- 优点：节约内存，到时就删除，快速释放掉不必要的内存占用
- 缺点：CPU压力很大，无论CPU此时负载量多高，均占用CPU，会影响redis服务器响应时间和指令吞吐量
- 总结：用处理器性能换取存储空间（拿时间换空间）

#### 惰性删除

- 数据到达过期时间，不做处理。等下次访问该数据时
  - 如果未过期，返回数据
  - 发现已过期，删除，返回不存在
- 优点：节约CPU性能，发现必须删除的时候才删除
- 缺点：内存压力很大，出现长期占用内存的数据
- 总结：用存储空间换取处理器性能（拿时间换空间）

#### 定期删除

两种方案都走极端，有没有折中方案？

- Redis启动服务器初始化时，读取配置server.hz的值，默认为10
- 每秒钟执行server.hz次`serverCron()`-> `activeExpireCycle()`-> `databasesCron()`
- `activeExpireCycle()`对每个`expires[*]`逐一进行检测，每次执行250ms/server.hz（进行轮询访问）
- 对某个`expires[*]`检测时，随机挑选W个key检测
  - 如果key超时，删除key
  - 如果一轮中删除的key的数量>`W*25%`，循环该过程
  - 如果一轮中删除的key的数量≤`W*25%`，检查下一个`expires[*]`，0-15循环
  - W取值=ACTIVE_EXPIRE_CYCLE_LOOKUPS_PER_LOOP属性值
- 参数current_db用于记录`activeExpireCycle()` 进入哪个expires[*] 执行
- 如果`activeExpireCycle()`执行时间到期，下次从current_db继续向下执行

定期删除的本质

- 周期性轮询redis库中的时效性数据，采用随机抽取的策略，利用过期数据占比的方式控制删除频度
- 特点1：CPU性能占用设置有峰值，检测频度可自定义设置
- 特点2：内存压力不是很大，长期占用内存的冷数据会被持续清理
- 总结：周期性抽查存储空间 `expireIfNeeded()` （随机抽查，重点抽查）

### 逐出算法

#### 新数据进入检测

- Redis使用内存存储数据，在执行每一个命令前，会调用freeMemoryIfNeeded()检测内存是否充足。如果内存不满足新加入数据的最低存储要求，redis要临时删除一些数据为当前指令清理存储空间。清理数据的策略称为逐出算法。
- 注意：逐出数据的过程不是100%能够清理出足够的可使用的内存空间，如果不成功则反复执行。当对所有数据尝试完毕后，如果不能达到内存清理的要求，将出现错误信息。

![image-20210531135018488](https://img-blog.csdnimg.cn/img_convert/605bbd404169d750623dcc497c36d162.png)

#### 影响数据逐出的相关配置

- 最大可使用内存

  - ```
    maxmemory
    ```

  - 占用物理内存的比例，默认值为0，表示不限制。生产环境中根据需求设定，通常设置在50%以上。

- 每次选取待删除数据的个数

  - ```
    maxmemory-samples
    ```

  - 选取数据时并不会全库扫描，导致严重的性能消耗，降低读写性能。因此采用随机获取数据的方式作为待检测删除数据

- 删除策略

  - ```
    maxmemory-policy
    ```

  - 达到最大内存后的，对被挑选出来的数据进行删除的策略

**删除策略的配置**

- 检测易失数据（可能会过期的数据集server.db[i].expires ）
  - ① volatile-lru：挑选最近最久未使用的数据淘汰
  - ② volatile-lfu：挑选最近使用次数最少的数据淘汰
  - ③ volatile-ttl：挑选将要过期的数据淘汰
  - ④ volatile-random：任意选择数据淘汰
- 检测全库数据（所有数据集server.db[i].dict ）
  - ⑤ allkeys-lru：挑选最近最久未使用的数据淘汰
  - ⑥ allkeys-lfu：挑选最近使用次数最少的数据淘汰
  - ⑦ allkeys-random：任意选择数据淘汰
- 放弃数据驱逐
  - ⑧ no-enviction（驱逐）：禁止驱逐数据（redis4.0中默认策略），会引发错误OOM（Out Of Memory）

![image-20210531135818254](https://img-blog.csdnimg.cn/img_convert/4af70abdfb40d90e5144c32cc35b1f5e.png)

#### 调优策略

使用INFO命令输出监控信息，查询缓存 hit 和 miss 的次数，根据业务需求调优Redis配置

![image-20210531135708069](https://img-blog.csdnimg.cn/img_convert/36875d32ce29624d1238aa03bcacfc14.png)

## 十、redis.conf

### 服务器基础配置

设置服务器以守护进程的方式运行

```
daemonize yes|no
```

绑定主机地址

```
bind 127.0.0.1
```

设置服务器端口号

```
port 6379
```

设置数据库数量

```
databases 16
```

**日志配置**

设置服务器以指定日志记录级别

```
loglevel debug|verbose|notice|warning
```

日志记录文件名

```
logfile 端口号.log
```

注意：日志级别开发期设置为**verbose**即可，生产环境中配置为notice，简化日志输出量，降低写日志IO的频度

### 客户端配置

设置同一时间最大客户端连接数，默认无限制。当客户端连接到达上限，Redis会关闭新的连接

```
maxclients 0
```

客户端闲置等待最大时长，达到最大值后关闭连接。如需关闭该功能，设置为 0

```
timeout 300
```

**多服务器快捷配置**

导入并加载指定配置文件信息，用于快速创建redis公共配置较多的redis实例配置文件，便于维护

```
include /path/server-端口号.conf
```

## 十一、高级数据类型

### Bitmaps

存储需求：用一个比一个字节还小的单位来存储数据，一个字节是8位；我们需要用一个位来存储数据，一般用来存储0/1的数据，用来区分是/否这样的判断数据。这个时候我们实际上用的是`string`来存储数据的类型，只是调用一个Btimaps的API而已。

#### 基础操作

获取指定key对应偏移量上的bit值

```
getbit key offset
```

设置指定key对应偏移量上的bit值，value只能是1或0

```
setbit key offset value
```

设置操作，将其中某个位置上的值设置为指定的值，其实就是将指定位置上的值设置之后，将之间的值进行补零操作。

#### 扩展操作

**业务场景**

电影网站有下面的需求

- 统计每天某一部电影是否被点播
- 统计每天有多少部电影被点播
- 统计每周/月/年有多少部电影被点播
- 统计年度哪部电影没有被点播

**解决方案**

- 对指定key按位进行交、并、非、异或操作，并将结果保存到destKey中

  - ```
    bitop op destKey key1 [key2...]
    ```

  - and：交

  -  or：并

  - not：非

  - xor：异或

- 统计指定key中1的数量

  - ```
    bitcount key [start end]
    ```

**建议**：redis 应用于信息状态统计

### HyperLogLog

- 原始方案：set
  - 存储每个用户的id（字符串）
- 改进方案：Bitmaps
  - 存储每个用户状态（bit）
- 全新的方案：Hyperloglog

#### 基数

- 基数是数据集去重后元素个数
- HyperLogLog 是用来做基数统计的，运用了LogLog的算法
- 例如：{1, 3, 5, 7, 5, 7, 8} 基数集： {1, 3, 5 ,7, 8} 基数：5
- {1, 1, 1, 1, 1, 7, 1} 基数集： {1,7} 基数：2

#### 基本操作

添加数据

```
pfadd key element [element ...]
```

统计数据

```
pfcount key [key ...]
```

合并数据

```
pfmerge destkey sourcekey [sourcekey...]
```

**建议**：redis 应用于独立信息统计

**相关说明**

- 用于进行基数统计，不是集合，不保存数据，只记录数量而不是具体数据
- 核心是基数估算算法，最终数值存在一定误差
- 误差范围：基数估计的结果是一个带有 0.81% 标准错误的近似值
- 耗空间极小，每个hyperloglog key占用了12K的内存用于标记基数
- pfadd命令不是一次性分配12K内存使用，会随着基数的增加内存逐渐增大
- pfmerge命令合并后占用的存储空间为12K，无论合并之前数据量多少

### GEO

**业务场景**

**建议**：redis 应用于地理位置计算

#### 基本操作

添加坐标点

```
geoadd key longitude latitude member [longitude latitude member ...]
```

获取坐标点

```
geopos key member [member ...]
```

![image-20210531150217319](https://img-blog.csdnimg.cn/img_convert/dc2b230e986a2fe170a7ee6c4e1173a9.png)

计算坐标点距离

```
geodist key member1 member2 [unit]
```

![image-20210531150246398](https://img-blog.csdnimg.cn/img_convert/986ab7fd77ca0a95b9ac0800f45d4746.png)

#### 扩展操作

添加坐标点

```
georadius key longitude latitude radius m|km|ft|mi [withcoord] [withdist] [withhash] [count count]
```

获取坐标点

```
georadiusbymember key member radius m|km|ft|mi [withcoord] [withdist] [withhash] [count count]
```

计算经纬度

```
geohash key member [member ...]
```
