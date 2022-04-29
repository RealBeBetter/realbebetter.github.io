---
title: 【Dubbo】Dubbo的概述、快速入门
date: 2021-05-22 21:56:23
tags:
- Java
- Frame
---

## 一、大型互联网项目架构目标

### 传统项目和互联网项目

传统项目指的是在一定范围内限定人群使用的项目，比如各种小范围的管理系统。
互联网项目指的是在互联网上面发布使用的项目，比如各种商用应用网站。

- 人数上：互联网项目面向的是全体网民，而传统项目面向的大多是企业内部用户
- 数量级：互联网大型项目的用户数量级可达数亿，而传统项目最多上万左右
- 容忍度：互联网项目的用户对于项目的使用大多是零容忍，而传统项目的用户容忍度更高
- 用户体验：互联网项目讲究用户体验：美观、功能、速度、稳定性；传统项目的用户体验要求更低

互联网项目的特点

- 用户多，流量大，并发高
- 海量数据，易受攻击
- 功能繁琐，变更快

衡量一个网站速度是否快

- 打开一个新页面一瞬间完成；页面内跳转一刹那间完成
- 一瞬间为0.36秒，一刹那为0.018秒

### 大型互联网项目架构目标

衡量网站的性能指标

- 响应时间：指执行一个请求从开始到最后收到响应数据所花费的总体时间
- 并发数：指系统同时能处理的请求数量。
  - 并发连接数：指的是客户端向服务器发起请求，建立了TCP连接。每秒钟服务器连接的总TCP数量
  - 请求数：也称为QPS(Query Per Second)指每秒多少请求
  - 并发用户数：单位时间内有多少用户
- 吞吐量：指单位时间内系统能处理的请求数量
  - QPS： Query Per Second每秒查询数
  - TPS： Transactions Per Second每秒事务数
  - 一个事务是指一个客户机向服务器发送请求然后服务器做出反应的过程。客户机在发送请求时开始计时，收到服务器响应后结束计时，以此来计算使用的时间和完成的事务个数。
  - 一个页面的一次访问，只会形成一个TPS；但一次页面请求，可能产生多次对服务器的请求，就会有多个QPS
- `QPS>=并发连接数>= TPS`

目标

- 高性能：提供快速的访问体验
- 高可用：网站服务一直可以正常访问
- 可伸缩：通过硬件增加/减少，提高/降低处理能力
- 高可扩展：系统间耦合低，方便的通过新增/移除方式，增加/减少新的功能/模块
- 安全性：提供网站安全访问和数据加密，安全存储等策略
- 敏捷性：随需应变，快速响应

### 集群和分布式

集群：相当于很多人一起干一样的事情

分布式：相当于很多人一起完成整个事情的不同流程，类似于流水线

在实际项目中，集群和分布式是并存的。集群和分布式的使用，能够提高项目的性能，并且能够实现负载均衡。

### 分布式架构演进

![image-20210717105001868](https://s2.loli.net/2022/04/01/XQG5JixtjfrClLh.png)

Dubbo是SOA时代的产物，SpringCloud是微服务时代的产物

#### 分布式架构

- 分布式架构是指在垂直架构的基础上,将公共业务模块抽取出来,作为独立的服务供其他调用者消费，以实现服务的共享和重用。
- RPC：Remote Procedure Call远程过程调用。有非常多的协议和技术来都实现了RPC的过程。比如：HTTP REST风格，Java RMI规范、WebService SOAP协议、Hession等等。

垂直架构存在的问题：重复的功能太多
分布式架构存在的问题：一旦服务提供方发生改变，所有消费方都需要变更

#### SOA架构

![image-20210717105021613](https://s2.loli.net/2022/04/01/plO8vjT9g5Dm4yx.png)

- SOA：(Service-Oriented Architecture，面向服务的架构)是一个组件模型，它将应用程序的不同功能单元(称为服务)进行拆分，并通过这些服务之间定义良好的接口和契约联系起来
- ESB：(Enterprise Service Bus)企业服务总线，服务中介。主要是提供了一个服务于服务之间的交互。ESB包含的功能有负载均衡，流量控制，加密处理，服务的监控，异常处理，监控告急等等。

#### 微服务架构

![image-20210717105039488](https://s2.loli.net/2022/04/01/P1nB7aW2lciwMNt.png)

微服务架构就是将项目拆分成多个微服务组件，每个组件只访问自己的数据库即可。组件之间互不干扰，可以独立开发、设计、运行。

- 微服务架构是在SOA上做的升华，微服务架构强调的一个重点是”业务需要彻底的组件化和服务化”，原有的单个业务系统会拆分为多个可以独立开发、设计、运行的小应用。这些小应用之间通过服务完成交互和集成。
- 微服务架构 = 80%的SOA服务架构思想 + 100%的组件化架构思想 + 80%的领域建模思想

特点

- 服务实现组件化：开发者可以自由选择开发技术，不需要协调其他团队
- 服务之间交互一般使用REST API
- 去中心化：每个微服务有自己私有的数据库持久化业务数据
- 自动化部署：把应用拆分成为一个个独立的单个服务，方便自动化部署、测试、运维

## 二、Dubbo概述

- Dubbo是阿里巴巴公司开源的一个高性能、轻量级的**Java RPC**（Remote Procedure Call）框架
- 致力于提供高性能和透明化的**RPC远程服务调用方案**，以及**SOA服务治理方案**
- [Dubbo官方网站](https://dubbo.apache.org/)

Dubbo的架构图

![image-20210915160232669](https://s2.loli.net/2022/04/01/wRWu6DMpnYqerTj.png)

根据架构图，我们可以得知一些Dubbo的启动信息。

1. 首先服务提供方，将自己的服务放在一个容器中，然后start启动该项目
2. 启动之后，将服务注册到Registry注册中心，相当于告诉注册中心提供方已经提供好服务可供调用了
3. 消费者向注册中心申请订阅这个服务，之后由注册中心查看服务提供方的服务是否注册，如果注册了就notify通知消费者
4. 这个时候消费者就可以invoke调用提供方提供的服务了，这个服务调用属于RPC远程服务调用，归属于Dubbo管理
5. 整个服务调用过程中，Monitor监视器会监控服务调用的一些信息，比如次数count

- Provider：暴露服务的服务提供方
- Container：服务运行容器
- Consumer：调用远程服务的服务消费方
- Registry：服务注册与发现的注册中心
- Monitor：统计服务的调用次数和调用时间的监控中心

## 三、Dubbo快速入门

### Zookeeper安装

Dubbo官方提供的注册中心参考手册，推荐使用的是Zookeeper注册中心

安装Zookeeper需要在Linux环境下进行安装。首先去[下载链接](https://mirrors.bfsu.edu.cn/apache/zookeeper/zookeeper-3.7.0/apache-zookeeper-3.7.0-bin.tar.gz)下载好Zookeeper，之后放在特定的文件夹中。然后启动CRT，登录之后按Alt+P，进入文件上传。输入命令`put -r 文件路径名`，命令完成之后，就代表文件已经成功上传到Linux中。
接下来我们要将Zookeeper安装到特定的目录下。`cd /opt`之后，使用`mkdir zookeeper`创建新的目录。使用命令`mv 源路径名 目的路径名`将Zookeeper文件移动过去。这个时候我们只需要解压刚刚下载好的Zookeeper文件即可。使用命令`tar -zxvf apache...`解压文件，解压完毕就等于安装完成。

使用之前，我们还需要做一些准备工作。首先，进入bin目录下，查看所有的解压之后的文件。准备为Zookeeper创建一份新的存放数据的文件夹。在`[root@localhost zookeeper]# mkdir zkdata`下创建名为zkdata的文件夹。进入conf目录下，将其中的zoo_sample.cfg文件复制一份，命名为zoo.cfg。使用命令`vim zoo.cfg`编译该文件，修改其中的dataDir的内容为`dataDir=/opt/zookeeper/zkdata`。

![image-20210614153122475](https://s2.loli.net/2022/04/01/EWeSn3Au4F78bcp.png)

Zookeeper服务启动流程：首先，进入安装路径下的bin目录，这个时候会看到很多标成绿色的文件。其中，zkServer.sh文件就是Zookeeper的启动执行文件，使用命令`./zkServer.sh start`启动Zookeeper服务。对应的停止命令就是将`start`改成`stop`命令。

![image-20210614153802284](https://s2.loli.net/2022/04/01/RTIykFhpDJHL8jQ.png)

启动之后，会看到如下的提示：

![image-20210614154025743](https://s2.loli.net/2022/04/01/E6eOYSuilfMX39Z.png)

使用命令`./zkServer.sh status`可以查看到zookeeper的状态：

![image-20210614154329147](https://s2.loli.net/2022/04/01/GtaxFoskTLiCVXU.png)

其中，有一些参数的含义需要了解。Client port客户端端口号为2181，客户端地址为localhost，Mode模式为单节点。

### Dubbo快速入门

实现步骤

- 创建服务提供者Provider模块
- 创建服务消费者Consumer模块
- 在服务提供者模块编写UserServicelmpl提供服务
- 在服务消费者中的UserController远程调用UserServicelmpl提供的服务
- 分别启动两个服务，测试

一、创建新的空项目，之后创建两个模块。一个为dubbo-service，一个为dubbo-web。首先在service中添加依赖

```xml
<dependencies>
    <!--Servlet 3.0 规范的坐标-->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
    </dependency>
    <!-- Spring 的坐标 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
    <!--SpringMVC 的坐标-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>

    <!-- 日志 -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>1.7.30</version>
    </dependency>

    <!--Dubbo 的 起步依赖-->
    <dependency>
        <groupId>org.apache.dubbo</groupId>
        <artifactId>dubbo</artifactId>
        <version>2.7.4.1</version>
    </dependency>
    <!--Zookeeper 的客户端实现-->
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-framework</artifactId>
        <version>5.1.0</version>
    </dependency>
    <!--Zookeeper 的客户端实现-->
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-recipes</artifactId>
        <version>5.1.0</version>
    </dependency>
</dependencies>
```

创建service包，创建UserService接口，并创建对应的实现类

```java
public interface UserService {
    public String sayHello();
}
```

```java
@Service
public class UserServiceImpl implements UserService {

    public String sayHello() {
        return "Hello Dubbo!~";
    }
}
```

创建对应的Spring配置文件applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="service"/>

</beans>
```

二、在dubbo-web项目中创建新的controller包，创建UserController类

```java
@RestController
@RequestMapping("/user")
public class UserController {

    // 注入UserService
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello() {
        return userService.sayHello();
    }
}
```

创建spring-mvc.xml配置文件

```cml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/cache"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/cache http://www.springframework.org/schema/cache/spring-cache.xsd">

    <mvc:annotation-driven/>
    <context:component-scan base-package="controller"/>

</beans>
```

之后创建web.xml文件，配置servlet

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         id="WebApp_ID" version="3.0">

    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <!-- 配置springMVC配置文件所在位置 -->
            <param-value>classpath*:spring/spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <!-- 拦截请求中带有do的请求 -->
        <url-pattern>*.do</url-pattern>
    </servlet-mapping>

</web-app>
```

### Dubbo第一个程序

要实现一个简单的Dubbo框架，首先要实现服务提供者和服务消费者的独立，要使得这两个程序都能独立运行。

所以相比于上面的程序，我们首先要将两者的模块中添加webapp部分，并且配置好对应的web.xml部分。

我们设定dubbo-service框架是服务的提供者，dubbo-web的框架是服务的消费者。所以前者我们配置Spring部分，后者我们配置SpringMVC部分。在开发中，由于两者可以独立运行，所以两者应该能够独立开发，这个时候为了实现这一特性，我们采用抽取公共接口的方法来实现。

一、UserService模块中，添加实现类UserServcieImpl

```java
@Service    // 导入的是Dubbo提供的Service注解，不是Spring提供的注解
// 将这个类提供的方法（服务）对外发布。将访问的地址IP、端口、路径注册到注册中心
public class UserServcieImpl implements UserService {
    @Override
    public String sayHello() {
        return "Hello Dubbo!";
    }
}
```

配置Spring的配置文件applicationContext.xml，主要是配置Dubbo的相关信息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <!--dubbo配置-->
    <!--1. 配置dubbo项目的名称，唯一-->
    <dubbo:application name="dubbo-service"/>
    <!--2. 配置dubbo项目的注册中心-->
    <dubbo:registry address="zookeeper://192.126.123.81:2181"/>
    <!--3. 配置dubbo项目的包扫描-->
    <dubbo:annotation package="service.impl"/>
</beans>
```

该模块中web.xml文件的配置，主要是配置Spring的监听器

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         id="WebApp_ID" version="3.0">

    <!--spring的配置-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath*:spring/applicationContext.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

</web-app>
```

pom.xml配置文件后面的都相似，只写一次

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>dubbo-service</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <!-- 这里的{jdk_version}填入你的jdk版本 -->
        <maven.compiler.target>14</maven.compiler.target>
        <maven.compiler.source>14</maven.compiler.source>
    </properties>

    <dependencies>
        <!--Servlet 3.0 规范的坐标-->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
        </dependency>
        <!-- Spring 的坐标 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.0.5.RELEASE</version>
        </dependency>
        <!--SpringMVC 的坐标-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.0.5.RELEASE</version>
        </dependency>

        <!-- 日志 -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.30</version>
        </dependency>

        <!--Dubbo 的 起步依赖-->
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.7.4.1</version>
        </dependency>
        <!--Zookeeper 的客户端实现-->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>5.1.0</version>
        </dependency>
        <!--Zookeeper 的客户端实现-->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>5.1.0</version>
        </dependency>

        <!--添加公共接口依赖-->
        <dependency>
            <groupId>org.example</groupId>
            <artifactId>dubbo-interface</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!--Tomcat 插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <port>9000</port>
                    <path>/</path>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

二、dubbo-web模块中，我们主要配置的是controller部分

UserController类配置如下：

```java
@RestController
@RequestMapping("/user")
public class UserController {

    /*
    * 1. 从Zookeeper注册中心获取到userService的URL
    * 2. 进行远程调用RPC
    * 3. 将结果封装为一个远程的代理对象。给变量赋值
    * */

    // 远程注入 UserService
    @Reference
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello() {
        return userService.sayHello();
    }

}
```

spring-mvc.xml文件的配置如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/cache" xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/cache http://www.springframework.org/schema/cache/spring-cache.xsd http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <mvc:annotation-driven/>
    <context:component-scan base-package="controller"/>

    <!--1. 给Dubbo配置Name-->
    <dubbo:application name="dubbo-web"/>
    <!--2. 配置注册中心-->
    <dubbo:registry address="zookeeper://192.168.123.81:2181"/>
    <!--3. 配置包扫描范围-->
    <dubbo:annotation package="controller"/>

</beans>
```

之后就是在web.xml中配置好Servlet部分

```xml
<!--SpringMVC的配置-->
<servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <!-- 配置springMVC配置文件所在位置 -->
        <param-value>classpath*:spring/spring-mvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <!-- 拦截请求中带有do的请求 -->
    <url-pattern>*.do</url-pattern>
</servlet-mapping>
```

三、抽取公共接口，创建模块dubbo-interface

整个项目中一共只有一个接口UserService，我们将这个接口的定义以及它的实现类均创建好

```java
public interface UserService {
    String sayHello();
}
```

```java
@Service    // 导入的是Dubbo提供的Service注解，不是Spring提供的注解
// 将这个类提供的方法（服务）对外发布。将访问的地址IP、端口、路径注册到注册中心
public class UserServiceImpl implements UserService {
    public String sayHello() {
        return "Hello Dubbo!";
    }
}
```

使用的时候，如何让service以及web模块获取到这一公共接口部分？

- 在各自的pom.xml部分中的依赖里添加下面的部分，这样就可以将公共接口部分的模块当作一个jar包导入依赖

```xml
<!--添加公共接口依赖-->
<dependency>
    <groupId>org.example</groupId>
    <artifactId>dubbo-interface</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

## 四、Dubbo高级特性

### 序列化

如果两个机器之间想要传输Java对象，就应该对该Java对象进行序列化操作。

具体操作就是在定义Java对象的时候实现序列化接口 `implements Serializable`。

- dubbo内部已经将序列化和反序列化的过程内部封装了
- 我们只需要在定义pojo类时实现Serializable接口即可
- 一般会定义一个公共的pojo模块，让生产者和消费者都依赖该模块

之后在生产者消费者模式中，都要为所有的pojo类对象实现序列化接口。这样才能方便pojo类对象在生产者和消费者的设备之间进行传递。

### 地址缓存

注册中心宕机了，服务能正常访问吗？

- 可以，因为dubbo服务消费者在第一次调用时，会将服务提供方地址缓存到本地（地址缓存），以后在调用则不会访问注册中心
- 因为存在notify机制，所以在服务提供者地址发生改变的时候，注册中心会通知服务消费者
- 所以，在注册中心不能使用的情况下，之前已经注册过的服务因为地址缓存的缘故还能继续使用，而这之后新增的服务由于没有注册，则不能正常访问到

### 超时与重试

![image-20210713135959846](https://s2.loli.net/2022/04/01/wx6ITn1D5cNQGzt.png)

超时机制

- 服务消费者在调用服务提供者的时候发生了阻塞、等待的情形，这个时候，服务消费者会直等待下去。
- 在某个峰值时刻，大量的请求都在同时请求服务消费者，会造成线程的大量堆积，势必会造成雪崩。
- dubbo利用超时机制来解决这个问题，设置一个超时时间， 在这个时间段内，无法完成服务访问,则自动断开连接。
- dubbo默认使用timeout来配置超时时间，默认是1000，单位为毫秒。
- 配置超时应该配置在服务提供方上，因为在编写业务的时候，能够预计到的是服务提供方查询所需要数据花费的时间会有多长，根据情况能更加准确地配置，所以配置在提供方上。

重试机制

- 设置了超时时间，在这个时间段内，无法完成服务访问，则自动断开连接。
- 如果出现网络抖动，则这一次请求就会失败。
- Dubbo提供重试机制来避免类似问题的发生。
- 通过retries属性来设置重试次数，默认为2次。如果包括第一次连接次数，则默认情况下不配置将一共连接3次

### 多版本

![image-20210713144610671](https://s2.loli.net/2022/04/01/L9BnWPCdi6xKZkX.png)

- 灰度发布：当出现新功能时，会让一部分用户先使用新功能，用户反馈没问题时，再将所有用户迁移到新功能，相当于小范围测试
- dubbo中使用version属性来设置和调用同一个接口的不同版本

### 负载均衡

![image-20210713150049379](https://s2.loli.net/2022/04/01/mdJrSWefphDq3wb.png)

负载均衡首先要有集群，才能够实现负载均衡。主要是针对服务提供方进行，当有大量的服务消费者需要调用服务时，将请求均衡发送到集群中，交由多台机器共同完成大量请求。

Dubbo一共提供了四种负载均衡的策略：

- Random：按权重随机，默认值。按权重设置随机概率

  - 权重值配置：在Service的实现类上加上weight属性值，默认是0

  - ![image-20210713145535839](https://s2.loli.net/2022/04/01/nJKTgEGfs6uDNSp.png)

  - 使用的时候在服务消费者方注入UserService的时候，配置Reference注解的时候加上：

    ```java
    // 注入UserService
    @Reference(version = "1.0", loadbalance = "random") // Version 多版本注入
    private UserService userService;
    ```

  - ![image-20210713145853059](https://s2.loli.net/2022/04/01/M4xjORnhoIVULbv.png)

- RandomRobin：按权重轮询

- LeastActive：最少活跃调用数，相同活跃数的随机，活跃数指调用前后计数差

  - 使慢的提供者收到更少请求，因为越慢的提供者的调用前后计数差会越大

- ConsistentHash：一致性 Hash，相同参数的请求总是发到同一提供者

### 集群容错

Dubbo容错模式策略：

- Failover Cluster：失败重试，默认值。当出现失败,重试其它服务器，默认重试2次，使用retries配置。一般用于读操作
- Failfast Cluster：快速失败，发起一次调用，失败立即报错。通常用于写操作，写操作不适用于多次重试，容易造成数据库异常
- Failsafe Cluster：失败安全，出现异常时，直接忽略。返回一个空结果。
- Failback Cluster：失败自动恢复，后台记录失败请求，定时重发。重要的服务可以调用该容错模式
- Forking Cluster：并行调用多个服务器，只要一个成功即返回
- Broadcast Cluster：广播调用所有提供者，逐个调用，任意一台报错则报错

配置方式：

在服务消费者方注入提供者方的接口的时候，使用`@Reference`注解配置

```java
@Reference(version = "v1.0",    // Version 多版本注入
        loadbalance = "random", cluster = "failover")       // 配置集群容错
```

### 服务降级

如果机器的占用率过高，服务的运行存在隐患，就需要进行服务降级。服务降级的目的是为了释放不必要的服务，以保证核心的服务能够正常运行的机制。

服务降级方式：

- `mock=force:return+null`：表示消费方对该服务的方法调用都直接返回null值，不发起远程调用。用来屏蔽不重要服务不可用
  时对调用方的影响。
- `mock=fail:return+null`：表示消费方对该服务的方法调用在失败后，再返回null值，不抛异常。用来容忍不重要服务不稳定时
  对调用方的影响。

配置服务降级的方式：

在注入UserService的时候使用注解的方式配置

```java
@Reference(mock = "force:return+null")   // 不再调用UserService的服务，强制返回null，配置服务降级
// @Reference(mock = "fail:return+null")   // 配置服务降级，失败之后返回null
private UserService userService;
```

