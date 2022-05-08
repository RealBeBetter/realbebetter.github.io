---
title: 【Zookeeper】分布式技术Zookeeper
date: 2021-06-28 21:56:23
tags:
- Java
- Frame
---

## 一、Zookeeper概述

### 概念

Zookeeper是Apache基金组织下的一个开源项目，是Apache Hadoop下的一个子项目，是一个树形目录服务。

Zookeeper直译动物园管理员，管理由Hadoop（大象）、Hive（蜜蜂）、Pig（小猪）的管理员，简称zk。

Zookeeper是一个分布式的、开源的分布式应用程序的协调服务。

### 主要功能

- 配置管理：可以简化配置信息变更带来的配置复杂度。子服务的配置信息变更，只需要修改配置中心的配置即可完成批量对子服务配置信息的变更。
- 分布式锁
  - 单机环境下，只需要对需要加锁的应用程序加锁即可，每次使用的时候只需要对自身进行加锁和解锁，但是在分布式环境下，多台机器的环境下，这样的模式不再适用
  - 分布式环境下，多个服务需要对数据进行修改操作，需要引入一把公共的锁，这把公共的锁就是分布式锁。
  - 服务每次需要修改数据的时候，先去访问分布式锁，看看分布式锁有没有被其他人访问到，如果有就等待分布式锁释放，如果没有，就拿走并给自己访问的线程加锁。
- 集群管理
  - 在dubbo的环境下，进行远程RPC调用时，作为注册中心使用
  - 消费者需要调用提供者所提供的服务，从注册中心获取提供者的地址进行调取服务

## 二、Zookeeper的命令操作

### Zookeeper数据模型

- ZooKeeper是一个树形目录服务，其数据模型和Unix的文件系统目录树很类似，拥有一个层次化结构。
- 这里面的每一个节点都被称为：ZNode，每个节点上都会保存自己的**数据**和**节点信息**。
- 节点可以拥有子节点，同时也允许少量(1MB)数据存储在该节点之下。
- 节点可以分为四大类：
  - PERSISTENT持久化节点
  - EPHEMERAL临时节点：-e
  - PERSISTENT SEQUENTIAL持久化顺序节点：-s
  - EPHEMERAL SEQUENTIAL临时顺序节点：-es

![image-20210713174933188](https://s2.loli.net/2022/04/01/KXFYdAVrQsToiHw.png)

![image-20210713175010398](https://s2.loli.net/2022/04/01/9PtxWA2bTyJOvln.png)

### Zookeeper服务端常用命令

- 启动ZooKeeper服务：`./zkServer.sh start`
  - 多台设备环境下，启动：`zkCli.sh -server 127.0.0.1:2181`
- 查看ZooKeeper服务状态：`./zkServer.sh status`
- 停止ZooKeeper服务：`./zkServer.sh stop`
- 重启ZooKeeper服务：`./zkServer.sh restart`

![image-20210713175356266](https://s2.loli.net/2022/04/01/Rh4WUgKsHakoTxG.png)

![image-20210713175428990](https://s2.loli.net/2022/04/01/uHaejn5dFyQz6EU.png)

### Zookeeper客户端常用命令

#### 基本CRUD

启动本地客户端命令：

```
[root@192 bin]# ./zkCli.sh
```

启动远程客户端命令：

```
./zkCli.sh -server localhost:2181
```

![image-20210715151744286](https://s2.loli.net/2022/04/01/fOdlgR35eSohjxw.png)

启动Zookeeper之后可以发现默认的节点有：

![image-20210713175929672](https://s2.loli.net/2022/04/01/zmvKAoJQISsManC.png)

创建节点的方式 ：

```
create /nodePath [data]
```

创建子节点：

```
create /parentNode/childNode [data]
```

因为Zookeeper中的节点不仅可以保存节点信息，还可以保存数据。获取数据的方式：

```
get /nodePath
```

如果要修改/设置节点中的数据，使用`set`指令：

```
set /nodePath data
```

**删除节点**只需要将`create`命令换成`delete`即可，规则一致。

当节点下有子节点时，也就是该节点为非空状态，这个时候如果使用`delete`指令无效，需要使用`deleteall`指令。

#### 创建节点

使用相同的命令创建，区别只在于是否添加参数`-e`（临时节点）、`-s`（持久化顺序节点）、`-es`（临时顺序节点）

```
create -s /app1	[data]
```

查看节点详细信息：

```
ls -s /nodePath
```

## 三、Zookeeper的Java API操作

### Curator概述

Curator是Apache ZooKeeper的Java客户端库

常见的ZooKeeper Java API：

- 原生Java API
- ZkClient
- Curato

Curator项目的目标是简化KooKeeper客户端的使用。Curator最初是Netfix研发的，后来捐献了Apache基金会，目前是Apache的顶级项目。官网链接：http://curator.apache.org/

### Curator API基本操作

![image-20210713174933188](https://s2.loli.net/2022/04/01/KXFYdAVrQsToiHw.png)

需要使用Java API对Zookeeper进行操作，首先需要将API同Client的操作一样，首先建立与服务器的连接。

准备工作：

首先在pom.xml文件中导入所需要的依赖包：

```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <!--curator坐标-->
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-framework</artifactId>
        <version>5.1.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-recipes</artifactId>
        <version>5.1.0</version>
    </dependency>
    <!--日志-->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>1.7.30</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.7.30</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>14</source>
                <target>14</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

之后创建一个log4j.properties文件：

```properties
# 设置
log4j.rootLogger = off,stdout

# 输出信息到控制台
log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target = System.out
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n
```

#### 建立连接

建立连接一共有两个方法，建议使用链式编程的方式，更加简便而且易于指定名称空间，可以隔离以后的操作。

```java
/**
 * 创建连接
 */
@Test
public void testConnect() {
    // 一共有两种方式创建连接
    // 1. 工厂模式创建，直接传入需要使用的参数创建工厂类对象，之后交由工厂类对象创建客户端对象
    /**
     * connectString(connectString)             连接字符串，ip地址+端口号
     * sessionTimeoutMs(sessionTimeoutMs).      会话超时时间，单位毫秒
     * connectionTimeoutMs(connectionTimeoutMs).连接超时时间，单位毫秒
     * retryPolicy(retryPolicy).                重连策略
     */
    RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000, 10);
    /*CuratorFramework client = CuratorFrameworkFactory.newClient("192.168.0.104:2181",
            60 * 1000, 15 * 1000, retryPolicy);*/

    // 2. 链式编程的方式创建
    CuratorFramework client = CuratorFrameworkFactory.builder().connectString("192.168.0.104:2181")
            .sessionTimeoutMs(60 * 1000).connectionTimeoutMs(15 * 1000)
            .retryPolicy(retryPolicy).namespace("test").build();

    // 开启连接
    client.start();
    String version = Version.getVersion();      // 获取zk版本
    System.out.println(version);
}
```

对于重试策略，一共有如下几种实现类：

![image-20210715144811161](https://s2.loli.net/2022/04/01/9ByZSwoT2pR5U16.png)

编码完成之后，进行测试，结果如下：

![image-20210715145700430](https://s2.loli.net/2022/04/01/MsfLBQxzESq2aub.png)

#### CRUD操作

编写创建操作的时候，一开始遇见了下面的问题：

出现问题：运行创建操作的时候，控制台一直处于转圈等待状态

解决办法：关闭Linux的防火墙即可解决，在CentOS的命令行关闭防火墙即可

具体步骤：

- 输入下面的命令行查看防火墙状态：

- ```
  systemctl status firewalld.service
  ```

- ![image-20210715161041758](https://s2.loli.net/2022/04/01/SML1pJs6rhqFuD8.png)

- 输入下面的命令关闭防火墙：

- ```
  systemctl stop firewalld.service
  ```

- ![image-20210715161105114](https://s2.loli.net/2022/04/01/1me5durbg3kzWpB.png)

- 永久禁用防火墙（删除防火墙服务）：

- ```
  systemctl disable firewalld.service
  ```

- ![image-20210715161126906](https://s2.loli.net/2022/04/01/v8LsfVRClz2bSuU.png)

**创建操作**

创建操作简单分为四种类型：

一、基本创建：

```java
@Test
public void testCreate1() throws Exception {
    // 1. 基本创建
    String path = client.create().forPath("/app1");
    // 如果创建节点的时候没有指定数据，将会把ip地址作为默认的节点数据
    System.out.println(path);
}
```

![image-20210715161446466](https://s2.loli.net/2022/04/01/8oHfztPCwYFqspS.png)

二、创建数据节点：

```java
@Test
public void testCreate2() throws Exception {
    // 2. 基本创建，带有数据
    String path = client.create().forPath("/app2", "Hello".getBytes());
    // 如果创建节点的时候指定数据，需要的是byte[]
    System.out.println(path);
}
```

三、创建临时节点：

```java
@Test
public void testCreate3() throws Exception {
    // 3. 设置节点类型
    // 默认类型：持久化；此处创建的是临时节点
    String path = client.create().withMode(CreateMode.EPHEMERAL).forPath("/app3");
    // 临时节点在会话关闭的时候便会自动删除，不会保留，所以需要注释关闭操作才能看见
    System.out.println(path);
}
```

四、创建多级节点：

```java
@Test
public void testCreate4() throws Exception {
    // 4. 创建多级节点
    // creatingParentsIfNeeded()：如果父节点不存在将会创建
    String path = client.create().creatingParentsIfNeeded().forPath("/app4/p1");
    System.out.println(path);
}
```

**查询操作**

查询操作一共分为三类：

一、查询数据 get

```java
@Test
public void testGet1() throws Exception {
    // 1. 查询数据 get
    byte[] data = client.getData().forPath("/app1");
    System.out.println(new String(data));
}
```

二、查询子节点：ls

```java
@Test
public void testGet2() throws Exception {
    // 查询子节点：ls
    List<String> list = client.getChildren().forPath("/app4/p1");
    System.out.println(list);
}
```

三、查询节点详细信息：ls -s

```java
@Test
public void testGet3() throws Exception {
    Stat stat = new Stat();
    System.out.println(stat);
    // 查询节点的状态信息：ls -s
    byte[] path = client.getData().storingStatIn(stat).forPath("/app1");
    // 因为zk版本问题，之前可以实现使用get获取数据和状态信息，但是现在只能获取到数据信息
    // 而客户端并没有进行相应的改变，所以还是使用getData方法，并且将状态信息存储到Stat类中
    System.out.println(stat);
}
```

**修改操作**

修改操作分为两类：

一、普通修改操作：

```java
@Test
public void testSet() throws Exception {
    client.setData().forPath("/app1", "Hello".getBytes());
    byte[] bytes = client.getData().forPath("/app1");
    System.out.println(new String(bytes));
}
```

二、根据数据版本进行修改：

```java
@Test
public void testSetForVersion() throws Exception {
    // 根据数据版本进行修改，可以在进行修改时判定是否有其他用户进行了修改操作，保证数据安全
    Stat status = new Stat();
    byte[] bytes = client.getData().storingStatIn(status).forPath("/app1");
    int version = status.getVersion();
    System.out.println(new String(bytes));
    System.out.println(version);
    client.setData().withVersion(version).forPath("/app1", "World".getBytes());
}
```

**删除操作**

删除操作一共分为四种类型：

一、普通的单节点删除：

```java
@Test
public void testDelete1() throws Exception {
    // 1. 删除单个节点操作
    client.delete().forPath("/app1");
}
```

二、带有子节点的节点的删除：

```java
@Test
public void testDelete2() throws Exception {
    // 2. 删除带有子节点的节点
    client.delete().deletingChildrenIfNeeded().forPath("/app4");
}
```

三、必须成功的删除操作：

```java
@Test
public void testDelete3() throws Exception {
    // 3. 必须成功的删除操作：防止网络抖动造成的失败，本质就是重试
    client.delete().guaranteed().forPath("/app2");
}
```

四、回调删除：

```java
@Test
public void testDelete4() throws Exception {
    // 4. 回调
    client.delete().guaranteed().inBackground(new BackgroundCallback() {
        @Override
        public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
            System.out.println("删除执行...");
            System.out.println(curatorEvent);
        }
    }).forPath("/app1");
}
```

#### watch事件监听

- ZooKeeper允许用户在指定节点上注册一些Watcher，并且在一些特定事件触发的时候，ZooKeeper 服务端会将事件通知到感兴趣的客户端上去，该机制是ZooKeeper实现分布式协调服务的重要特性。
- ZooKeeper中引入了Watcher机制来实现了发布订阅功能，能够让多个订阅者同时监听某一个对象，当一个对象自身状态变化时，会通知所有订阅者。
- ZooKeeper原生支持通过注册Watcher来进行事件监听，但是其使用并不是特别方便，需要开发人员自己反复注册Watcher，比较繁琐。
- Curator引入了Cache来实现对ZooKeeper服务端事件的监听。
- ZooKeeper提供了三种Watcher：
  - NodeCache：只是监听某一个特定的节点
  - PathChildrenCache：监控一个ZNode的子节点
  - TreeCache：可以监控整个树上的所有节点，类似于PathChildrenCache和NodeCache的组合

**NodeCache**

给单个节点注册监听器，需要保证该节点一直保持运行状态，所以在测试代码中需要加上死循环部分。

```java
/**
 * 测试 nodeCache：给指定单个节点注册监听器
 * @throws Exception
 */
@Test
public void testNodeCache() throws Exception {
    // 1. 创建NodeCache对象
    final NodeCache nodeCache = new NodeCache(client, "/app1");
    // 2. 注册监听
    /*nodeCache.getListenable().addListener(() -> {
        System.out.println("节点发生变化了");
    });*/
    nodeCache.getListenable().addListener(new NodeCacheListener() {
        @Override
        public void nodeChanged() throws Exception {
            System.out.println("节点发生变化了");
            // 获取修改后的节点数据
            byte[] data = nodeCache.getCurrentData().getData();
            System.out.println(new String(data));
        }
    });
    // 3. 开启监听
    // 设置为true，则开启监听时，加载缓冲数据
    nodeCache.start(true);

    while (true) {

    }

}
```

当操作zkCli对节点数据进行修改的时候，监听器会监听到修改或删除操作，在控制台打印相关信息：

![image-20210718102253786](https://s2.loli.net/2022/04/01/pbG724qPgyemQDB.png)

**PathChildrenCache**

PathChildrenCache监听的是一个节点下的所有子节点，不包括该节点本身。

```java
/**
 * 测试 PathChildrenCache：监听某个节点的所有子节点
 * @throws Exception
 */
@Test
public void testPathChildrenCache() throws Exception {
    // 1. 创建PathChildrenCache对象
    final PathChildrenCache pathChildrenCache = new PathChildrenCache(client, "/app2", true);
    // 2. 注册监听
    pathChildrenCache.getListenable().addListener(new PathChildrenCacheListener() {
        @Override
        public void childEvent(CuratorFramework client, PathChildrenCacheEvent event) throws Exception {
            System.out.println("子节点变化了");
            System.out.println(event);
            // 监听子节点的变化类型，并且拿到修改后的数据状态
            // 1. 获取类型
            PathChildrenCacheEvent.Type type = event.getType();
            // 2. 判断类型是否是update
            if (PathChildrenCacheEvent.Type.CHILD_UPDATED.equals(type)) {
                byte[] data = event.getData().getData();
                System.out.println(new String(data));
            }
        }
    });
    // 3. 开启监听
    pathChildrenCache.start();
    while (true) {

    }

}
```

对于该节点下的所有子节点进行操作，都会触发该监听器。根据不同类型的操作，会对应有不同的类型。

```java
public enum Type{ 
    CHILD_ADDED,
    CHILD_UPDATED,
    CHILD_REMOVED,
    CONNECTION_SUSPENDED,
    CONNECTION_RECONNECTED,
    CONNECTION_LOST,
    INITIALIZED
}
```

最终运行结果如下所示：

![image-20210718104257258](https://s2.loli.net/2022/04/01/BKcIw5me3nvGsFH.png)

**TreeCache**

TreeCache监听的是节点本身及其所有子节点，相当于前两种监听器的结合。使用方法类似，只需要将对象修改即可。

```java
/**
 * 测试 TreeCache：监听某个节点本身及其所有子节点
 * @throws Exception
 */
@Test
public void testTreeCache() throws Exception {
    // 1. 创建TreeCache对象
    TreeCache treeCache = new TreeCache(client, "/app2");
    // 2. 注册监听
    treeCache.getListenable().addListener(new TreeCacheListener() {
        @Override
        public void childEvent(CuratorFramework client, TreeCacheEvent event) throws Exception {
            System.out.println("节点发生改变");
            System.out.println(event);
            TreeCacheEvent.Type type = event.getType();
        }
    });

    // 3. 开启监听
    treeCache.start();
    while (true) {

    }
}
```

#### 分布式锁的实现

##### 概念

- 在我们进行单机应用开发级并发同步的时候，我们往往采用synchronized或者Lock的方式来解决多线程间的代码同步问题，这时多线程的运行都是在同一个JVM之下，没有任何问题。
- 但当我们的应用是分布式集群工作的情况下，属于多JVM下的工作环境，跨JVM之间已经无法通过多线程的锁解决同步问题。那么就需要一种更加高级的锁机制来处理这种**跨机器的进程之间的数据同步**问题——这就是分布式锁。
- 分布式锁其实是通过分布式锁组件来实现。原先的单机环境下，加锁和开锁都是在同一个JVM中完成。分布式环境中，由于负载均衡等机制的实现，已经很难判定服务究竟会往哪一台机器发送，所以加锁就需要用一把“公共的锁”来完成。每次需要修改数据的时候，就向公共的锁获取；这个时候其他机器中的进程想要进行数据修改也必须先向公共锁先获取，这个时候发现这把锁已经被拿走，所以只能进行等待锁释放。这个过程就能完成数据的安全同步问题，最终实现跨机器的进程数据同步问题。

分布式锁的几种常见类型：参考文章 [分布式锁的几种实现类型](https://www.cnblogs.com/austinspark-jessylu/p/8043726.html)

- 基于数据库实现分布式锁：悲观锁、乐观锁
  - 本质思想就是在数据库中创建一个表，用来存放一条特殊的数据。该数据要进行唯一性约束，如果有多个请求同时提交到数据库的话，数据库会保证只有一个操作可以成功，那么我们就可以认为操作成功的那个线程获得了该方法的锁，可以执行方法体内容。
    - 在数据操作完成之前创建这条数据（加锁）
    - 在数据操作完成之后删除这条数据（释放锁）
    - 其他线程操作数据之前先查询该数据的情况：存在，表示上锁状态，无法进行操作，等待完成；反之，加锁进行数据操作。
  - 劣势：
    - 数据库本身的性能比较低，实现该锁的时候需要占用大量的资源，延长等待时机。
    - 数据库是一个单点，一旦数据库挂了，则将导致锁的不可用。
    - 没有失效时间，一旦操作失败，将导致后续等待的进程无法获得锁。
    - 非阻塞的，因为数据的insert操作，一旦插入失败就会直接报错。没有获得锁的线程并不会进入排队队列，要想再次获得锁就要再次触发获得锁操作。
    - 非重入的，同一个线程在没有释放锁之前无法再次获得该锁。因为数据中数据已经存在了。
  - 解决：
    - 准备多个数据库，在数据操作之前进行双向备份
    - 失效时间，设置一个超时，每隔一段时间自动清理数据库中的数据
    - 非阻塞，while循环直到insert操作完成
    - 非重入，在数据库表中加个字段，记录当前获得锁的机器的主机信息和线程信息，那么下次再获取锁的时候先查询数据库，如果当前机器的主机信息和线程信息在数据库可以查到的话，直接把锁分配给他就可以了
- 基于缓存实现分布式锁：Redis、Memcache
  - redis实现分布式锁并不非常可靠。原因是多机环境下，要实现分布式锁需要先进行数据的同步，一旦master挂了，那么将会导致多个slave都获取到锁。
  - redis锁的优势就是高性能，速度快。
- 基于Zookeeper实现分布式锁：curator
  - 性能相对来说比较高，而且是最为可靠的方式。

##### Zookeeper分布式锁的原理

核心思想：当客户端要获取锁，则创建节点；使用完锁，则删除该节点。

![image-20210718112802792](https://s2.loli.net/2022/04/01/lJqFINUMeuk8Ec3.png)

- 客户端获取锁时，在lock节点下创建**临时顺序**节点。
  - 临时：多个客户端都需要拿到锁的情况下，将锁分配给某个客户端之后，一旦该客户端发生意外情况，导致该节点一直存在无法被删除（锁无法被释放），会导致其他机器一直处于阻塞状态。所以需要创建的是临时节点，而非持久化节点。
    - 一旦发生意外宕机，则该客户端和Server之间的连接会断开，会话结束，最终临时节点会自动删除，锁释放。
  - 顺序：需要区分客户端的获取锁的顺序，锁在使用的时候需要寻找最小的节点，所以先进行排序，也就是利用顺序节点。
- 然后获取lock下面的所有子节点，客户端获取到所有的子节点（getChildren）之后，如果发现自己创建的子节点序号最小，那么就认为该客户端获取到了锁。使用完锁后，将该节点删除。
- 如果发现自己创建的节点并非Iock所有子节点中最小的，说明自己还没有获取到锁，此时客户端需要找到此自己小的那个节点，同时对其注册事件监听器，监听删除事件。该操作相当于lock3监听lock2，lock2监听lock1，监听的对象是删除事件。
- 如果发现比自己小的那个节点被删除，则客户端的Watcher会收到相应通知，此时再次判断自己创建的节点是否是lock子节点中序号最小的，如果是则获取到了锁，如果不是则重复以上步骤继续获取到比自己小的一个节点并注册监听。

Curator一共提供了5种分布式锁API：

- InterProcessSemaphoreMutex：分布式排它锁（非可重入锁）
  - 可重入：某个线程已经获得某个锁，可以再次获取锁而不会出现死锁
- InterProcessMutex：分布式可重入排它锁
- InterProcessReadWriteLock：分布式读写锁
- InterProcessMultiLock：将多个锁作为单个实体管理的容器
- InterProcessSemaphoreV2：共享信号量

### 模拟12306售票

对于各级代理商的服务来说，加锁并不现实。其二，票务资源属于12306，所以加锁需要加载资源方。

![image-20210718115049202](https://s2.loli.net/2022/04/01/SyuHdhna416bEkf.png)

一、创建Ticket类

```java
public class Ticket12306 implements Runnable {

    // 数据库的票数
    private int tickets = 10;

    // 创建分布式锁对象
    private InterProcessMutex lock;

    // 在构造方法内部初始化分布式锁
    public Ticket12306() {
        RetryPolicy retryPolicy = new ExponentialBackoffRetry(3000, 10);
        // 链式编程的方式创建
        CuratorFramework client = CuratorFrameworkFactory.builder()
                .connectString("192.168.0.107:2181")    // 连接字符串
                .sessionTimeoutMs(60 * 1000)    // 会话超时
                .connectionTimeoutMs(15 * 1000) // 连接超时
                .retryPolicy(retryPolicy)       // 重试策略
                .build();

        // 开启连接
        client.start();

        lock = new InterProcessMutex(client, "/lock");
    }

    @Override
    public void run() {
        while (true) {
            try {
                // 获取锁
                lock.acquire(3, TimeUnit.SECONDS);
                if (tickets > 0) {
                    // 打印访问到的线程
                    System.out.println(Thread.currentThread() + ":" + tickets);
                    tickets--;
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                // 释放锁
                try {
                    lock.release();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
```

二、创建客户端，并模拟调用

```java
public class CuratorLockTest {

    public static void main(String[] args) {
        Ticket12306 ticket12306 = new Ticket12306();

        // 创建客户端
        Thread t1 = new Thread(ticket12306, "携程");
        Thread t2 = new Thread(ticket12306, "飞猪");

        t1.start();
        t2.start();
    }

}
```

## 四、Zookeeper集群搭建

### Zookeeper集群介绍

#### Leader选举过程

- Serverid：服务器ID
  - 比如有三台服务器，编号分别是1、2、3，编号越大在选择算法中的权重越大。
- Zxid：数据ID
  - 服务器中存放的最大数据ID，值越大说明数据越新，在选举算法中数据越新权重越大。
- 在Leader选举的过程中，如果某台ZooKeeper获得了超过半数的选票，则此ZooKeeper就可以成为Leader了。

![image-20210718121032139](https://s2.loli.net/2022/04/01/PKyjgJ6ZBITrsWV.png)

在以上这五台机器中，如果按顺序启动，那么将会是三号机器当选Leader。三台机器启动，将会是二号机器当选Leader。

### Zookeeper集群搭建

搭建集群首先要准备集群环境：

一、安装JDK

二、安装Zookeeper

三、创建目录： `mkdir /usr/local/zookeeper-cluster`

四、使用命令`cp -r`将原先的Zookeeper复制三份到指定目录之下

```shell
cp -r /opt/zookeeper/apache-zookeeper-3.7.0-bin /usr/local/zookeeper-cluster/zookeeper-1
cp -r /opt/zookeeper/apache-zookeeper-3.7.0-bin /usr/local/zookeeper-cluster/zookeeper-2
cp -r /opt/zookeeper/apache-zookeeper-3.7.0-bin /usr/local/zookeeper-cluster/zookeeper-3
```

五、创建data目录

```shell
mkdir /usr/local/zookeeper-cluster/zookeeper-1/data
mkdir /usr/local/zookeeper-cluster/zookeeper-2/data
mkdir /usr/local/zookeeper-cluster/zookeeper-3/data
```

六、修改zookeeper的默认配置文件，将zoo_sample.cfg文件修改为zoo.cfg文件

```shell
mv /usr/local/zookeeper-cluster/zookeeper-1/conf/zoo_sample.cfg /usr/local/zookeeper-cluster/zookeeper-1/conf/zoo.cfg
mv /usr/local/zookeeper-cluster/zookeeper-2/conf/zoo_sample.cfg /usr/local/zookeeper-cluster/zookeeper-2/conf/zoo.cfg
mv /usr/local/zookeeper-cluster/zookeeper-3/conf/zoo_sample.cfg /usr/local/zookeeper-cluster/zookeeper-3/conf/zoo.cfg
```

七、配置每一个zoo.cfg的dataDir和clientPort，将端口分别修改为2181、2182、2183

```shell
vim /usr/local/zookeeper-cluster/zookeeper-1/conf/zoo.cfg

clientPort=2181
dataDir=/usr/local/zookeeper-cluster/zookeeper-1/data
```

```shell
vim /usr/local/zookeeper-cluster/zookeeper-2/conf/zoo.cfg

clientPort=2182
dataDir=/usr/local/zookeeper-cluster/zookeeper-2/data
```

```shell
vim /usr/local/zookeeper-cluster/zookeeper-3/conf/zoo.cfg

clientPort=2183
dataDir=/usr/local/zookeeper-cluster/zookeeper-3/data
```

配置集群：让集群之间相互知道对方的存在

一、在每个zookeeper的 data目录下创建一个 myid文件，内容分别是1、2、3。这个文件就是记录每个服务器的ID

```shell
echo 1 >/usr/local/zookeeper-cluster/zookeeper-1/data/myid
echo 2 >/usr/local/zookeeper-cluster/zookeeper-2/data/myid
echo 3 >/usr/local/zookeeper-cluster/zookeeper-3/data/myid
```

二、在每一个zookeeper的zoo.cfg配置客户端访问端口(clientPort) 和集群服务器IP列表。集群服务器IP列表如下：

```shell
vim /usr/local/zookeeper-cluster/zookeeper-1/conf/zoo.cfg
vim /usr/local/zookeeper-cluster/zookeeper-2/conf/zoo.cfg
vim /usr/local/zookeeper-cluster/zookeeper-3/conf/zoo.cfg

server.1=192.168.0.104:2881:3881
server.2=192.168.0.104:2882:3882
server.3=192.168.0.104:2883:3883
```

解释：`server.服务器ID=服务器IP地址:服务器之间通信端口:服务器之间投票选举端口`

三、启动集群，就是分别启动每个实例

```shell
/usr/local/zookeeper-cluster/zookeeper-1/bin/zkServer.sh start
/usr/local/zookeeper-cluster/zookeeper-2/bin/zkServer.sh start
/usr/local/zookeeper-cluster/zookeeper-3/bin/zkServer.sh start
```

![image-20210718141534051](https://s2.loli.net/2022/04/01/icIFrKj6eB19S4h.png)

查询每个实例的运行状况：

```shell
/usr/local/zookeeper-cluster/zookeeper-1/bin/zkServer.sh status
/usr/local/zookeeper-cluster/zookeeper-2/bin/zkServer.sh status
/usr/local/zookeeper-cluster/zookeeper-3/bin/zkServer.sh status
```

可以通过该命令查询到不同的状况。根据运行以及启动顺序，可以得出第二个启动的机器为leader角色，其余两个为follower

```shell
Mode: follower
Mode: leader
```

单机环境下，模式mode的值为：

```shell
Mode: standalone
```

### Zookeeper故障测试

初始状态：三台机器正常运行，此时二号机器被选举为Leader。

一、停掉三号机器，这个时候集群正常工作

二、再把一号机器停止，此时只剩下二号机器，集群将不会正常运行

三、此时再启动一号机器，这个时候集群又能正常继续工作，且二号机器依然为Leader

四、此时我们将二号机器停掉（停止Leader），此时剩下一号和三号机器，三号将会被选举为Leader

### Zookeeper集群角色

在ZooKeeper集群服中务中有三个角色：

- Leader领导者：
  - 处理事务请求，调度数据同步
  - 集群内部各服务器的调度者
- Follower跟随者：
  - 处理客户端非事务请求，转发事务请求给Leader服务器
  - 参与Leader选举投票
- Observer观察者
  - 处理客户端非事务请求，转发事务请求给Leader服务器
