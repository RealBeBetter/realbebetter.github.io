---
title: 【Java】Spring框架
date: 2021-05-18
tags:
- Java
- Frame
- Spring
---

# 【Java】Spring框架

## 一、Spring简介

### 简介

Spring是分层的Java SE/EE应用full-stack轻量级开源框架，以IoC（Inverse Of Control：反转控制）和AOP（Aspect Oriented Programming：面向切面编程）为内核。提供了展现层SpringMVC和持久层Spring JDBCTemplate以及业务层事务管理等众多的企业级应用技术，还能整合开源世界众多著名的第三方框架和类库，逐渐成为使用最多的Java EE企业应用开源框架。

现在，2017年9月发布了最新的Spring版本——**Spring 5.0通用版（GA）**

### 优势

- 方便解耦,简化开发
  - 通过Spring提供的IoC容器，可以将对象间的依赖关系交由Spring进行控制，避免硬编码所造成的过度耦合。
  - 用户也不必再为单例模式类、属性文件解析等这些很底层的需求编写代码，可以便专注于上层的应用
- AOP编程的支持
  - 通过Spring的AOP功能，方便进行面向切面编程，许多不容易用传统OOP实现的功能可以通过AOP轻松实现。
- 声明式事务的支持
  - 可以将我们从单调烦闷的事务管理代码中解脱出来，通过声明式方式灵活的进行事务管理，提高开发效率和质量。
- 方便程序的测试
  - 可以用非容器依赖的编程方式进行几乎所有的测试工作，测试不再是昂贵的操作，而是随手可做的事情。
- 方便集成各种优秀框架
  - Spring对各种优秀框架(Struts、 Hibemate、 Hessian、 Quartz等)的支持。
- 降低JavaEE API的使用难度
  - Spring对JavaEE API （如JDBC、JavaMail、 远程调用等）进行了薄薄的封装层，使这些API的使用难度大为降低。
- Java源码是经典学习范例
  - Spring的源代码设计精妙、结构清晰、匠心独用，处处体现着大师对Java设计模式灵活运用以及对Java技术的高深造诣。它的源代码无疑是Java技术的最佳实践的范例。

## 二、Spring体系结构

![13417101-97a7215f5b7cd92f](https://i.loli.net/2021/03/19/SscPZ4dLbaM96Ht.png)

其中，核心容器最为关键，SpEL——Spring Expression Language（spring表达式语言），Beans——对象，Core——核心，Context——上下文。

### Spring程序开发步骤

![image-20210319193822382](https://i.loli.net/2021/03/19/Wgu3HXtclv5ph2G.png)

### Spring项目（Maven）的创建

①首先在idea的工作空间workspace文件夹下创建一个名为Spring的文件夹

②在idea中选择文件，打开File，选择刚刚创建的文件夹Spring，打开

![image-20210320130025262](https://i.loli.net/2021/03/20/GopryVadYs986Iu.png)

③在Idea中的操作：点击刚刚的Spring，之后点击新建一个Module，选择Maven之后点击Next

![image-20210320130313515](https://i.loli.net/2021/03/20/Z4J6wy2pRANvPoK.png)

④选择设定的Module名称为`itheima_spring_aop`（Name），之后选择Finish完成创建。之后以相同的方式创建`itheima_spring_ioc`项目。

![image-20210320130435864](https://i.loli.net/2021/03/20/IY9yCkxndOtTqcK.png)

⑤选择刚刚创建的aop项目，选择Project Structure，配置好jdk并选择下面的文件夹为刚刚创建的aop项目文件夹。

![image-20210320130829378](https://i.loli.net/2021/03/20/RAHNOrc8DKEtfip.png)

⑥之后选择下面的Facets选项，点击+号，选择web项目，添加

![image-20210320130949894](https://i.loli.net/2021/03/20/UWwcSqdThx6Mv5i.png)

⑦在下一个界面修改上下两个选项的文件路径名，并修改为一般惯用的路径文件

D:\Java_Files\Spring\itheima_spring_aop\src\main\webapp\WEB-INF\web.xml

D:\Java_Files\Spring\itheima_spring_aop\src\main\webapp

![image-20210320131111838](https://i.loli.net/2021/03/20/j2P6A8TmyzhXex5.png)

⑧从第三步开始，以相同的方式创建`itheima_spring_ioc`Module。至此，项目创建完成。

### Spring工程实际运用

①导入坐标

②创建Bean

③创建applicationContext.xml文件

④在配置文件中进行配置

⑤创建ApplicationContext对象getBean

实际操作：

一、打开Module下面的pom.xml文件，添加Spring

![image-20210319214610086](https://i.loli.net/2021/03/19/7PMkE6qpmuUNOR1.png)

添加的部分代码如下：

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
</dependencies>
```

二、在需要的路径创建一个接口，并为该接口提供实现

![image-20210319214739183](https://i.loli.net/2021/03/19/NXceVSMUgJRWEmz.png)

![image-20210319214818684](https://i.loli.net/2021/03/19/SOzAv8Kg1fpDGHn.png)

三、在resources文件夹下创建applicationContext.xml配置文件（该名字可以自己定义）

![image-20210319214958926](https://i.loli.net/2021/03/19/pA6SrigklV5DEJH.png)

四、配置applicationContext.xml配置文件，在Beans中添加Bean对象，设置自定义一个id（名字可自定义，但是后续需要使用），并且需要用到之前接口的实现类的文件名（`class="com.itheima.dao.impl.UserDaoImpl"`），具体配置如图

![image-20210319215331677](https://i.loli.net/2021/03/19/HODlN64wTnz5BJq.png)

五、在Java目录下创建一个新的Module，创建一个新的class文件。本class文件就是真正用到spring的Java文件，我这里根据课程创建的，一样是demo->UserDaoDemo

![image-20210319215632207](https://i.loli.net/2021/03/19/LiMCQJOwIcAvDBr.png)

此class中的代码部分，configLocation参数就是刚才编写的配置文件名（不用写路径，之后自己会根据寻找文件）。UserDao类的实例对象后的`getBean()`方法的参数就是之前配置文件中的id。

至此为止，简单工程的实际创建使用暂时结束。

最终创建成功自己简单运行的结果：

![image-20210319214202620](https://i.loli.net/2021/03/19/yjoBRKSHUz5TapP.png)

在此次使用过程中，一共使用了五个文件。两个配置文件：

```java
pom.xml    					// 配置Spring详细参数
applicationContext.xml		//配置使用Bean对象
```

一个接口文件，两个class文件，分别对应接口的实现方法以及客户端代码对于接口方法的获取调用（使用Spring的过程）。

## 三、Spring配置文件详解

在Spring项目中，上述的项目中存在两个配置文件，其中有一个为创建Spring项目时生成的[pom.xml]()，该文件的作用是用来导入Spring框架的。另外一个则是涉及到Spring项目的使用，该配置文件需要用户自己来创建使用。需要在Beans中创建新的Bean对象，设置**ID属性以及class属性**来获取对象。

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"></bean>
```

此时，该行代码使用的id需要在这整个xml文件中唯一，是标识确认，不能和其他的Bean对象的id重复（类比于前端），后面的class是全限定名。默认的反射是通过无参构造创建对象的，这样配置需要保证UserDaoImpl中存在无参构造，如果没有无参构造则不能创建成功。

> id：Bean实例在Spring容器中的唯一标识
>
> class：Bean的全限定名

**Bean标签范围配置**

![image-20210320133502713](https://i.loli.net/2021/03/20/ygN2V19O7eIpaRn.png)

默认在xml配置文件中不写scope，缺省值是singleton。表示在创建Bean对象时，只会有一例出现在Spring中；而设置prototype时，则根据创建的数量，会有相应的数量的Bean对象存在于Spring中。

测试方法：创建多个UserDao对象实例，打印输出多个UserDao的地址，看看是否不同的实例会不会输出相同的地址值。

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl" scope="singleton"></bean>
```

**作用范围、创建时机以及生存周期**

![image-20210320140119868](https://i.loli.net/2021/03/20/PiKSW3jARqzlCh9.png)

```xml
init-method：指定类中的初始化方法名称
destroy-method：指定类中的销毁方法名称
```

### Bean实例化的三种方式

> 无参构造方法实例化
>
> 工厂静态方法实例化
>
> 工厂实例方法实例化

**工厂静态方法实例化**

①创建静态工厂类

![image-20210320145902342](https://i.loli.net/2021/03/20/dUpeIBam9hgbR24.png)

之后跳转到之前的applicationContext.xml中，修改之前的Bean实例化语句为

```xml
<bean id="userDao" class="com.itheima.factory.StaticFactory" factory-method="getUserDao"></bean>
```

如果方法内部不为静态的（工厂实例方法），则需要先获取工厂的Bean对象，之后再获取工厂的Bean方法。

**工厂实例方法实例化**

①创建一个DynamicFactory的对象，代码方法的区别就是static的有无

![image-20210320150934614](https://i.loli.net/2021/03/20/fn9Bs7b61oUxNRP.png)

②修改xml文件配置参数

```xml
<bean id="factory" class="com.itheima.factory.DynamicFactory"></bean>
<bean id="userDao" factory-bean="factory" factory-method="getUserDao"></bean>
```

### SpringBean的依赖注入分析

![image-20210320153714415](https://i.loli.net/2021/03/20/EVCqk91D3LmYaJv.png)

![image-20210320153908461](https://i.loli.net/2021/03/20/C1aVNsphekEWMDK.png)

### Bean的依赖注入概念

依赖注入（Dependency Injection）：是Spring框架核心IOC的具体实现

![image-20210320154202752](https://i.loli.net/2021/03/20/J6smLGFtQBdcr4T.png)

在上述的应用实例中，将UserDao注入到UserService中的方法有两个：构造方法、set方法

![image-20210320155649812](https://i.loli.net/2021/03/20/BhtNecQ9WYjdqzP.png)

### Bean的依赖注入的数据类型

注入数据的三种类型

> 普通数据类型
>
> 引用数据类型
>
> 集合数据类型

**普通数据类型和引用数据类型的注入**

在实现类中写setter方法

```java
public class UserDaoImpl implements UserDao {

    private String userName;
    private int age;

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public void save() {
        System.out.println(userName + "=====" + age);
        System.out.println("save running...");
    }
}
```

因为是**普通数据和引用数据类型**，我们直接使用`value`对这两个变量进行赋值。

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
	<property name="userName" value="zhangsan"></property>
	<property name="age" value="20"></property>
</bean>
```

最终运行效果：

![image-20210329151435781](https://i.loli.net/2021/03/29/HoQR3NZV84KlfE6.png)

**集合数据类型的注入**

针对集合类型，我们选取Map以及List集合。

**List集合的配置文件**

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
    <property name="strList">
        <list>
            <value>aaa</value>
            <value>bbb</value>
            <value>ccc</value>
        </list>
    </property>
</bean>
```

具体步骤还是和之前的普通类型数据的步骤类似。在实现类中添加相关参数的setter方法，之后再save方法中添加打印输出。

```java
private List<String> strList;
private Map<String, User> userMap;
private Properties properties;

public void setStrList(List<String> strList) {
    this.strList = strList;
}

public void setUserMap(Map<String, User> userMap) {
    this.userMap = userMap;
}

public void setProperties(Properties properties) {
    this.properties = properties;
}
```

```java
@Override
public void save() {
    System.out.println(strList);
    System.out.println(userMap);
    System.out.println(properties);
    System.out.println("save running...");
}
```

运行结果正常，输出`[aaa, bbb, ccc]`。

**Map集合的配置文件**

针对Map集合数据类型，Map实际上属于一种键值对，并非单纯的集合类型，所以不同于List集合。

```java
package com.itheima.domain;

public class User {

    private String name;
    private String addr;

    public void setName(String name) {
        this.name = name;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getName() {
        return name;
    }

    public String getAddr() {
        return addr;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", addr='" + addr + '\'' +
                '}';
    }
}
```

编写完上述的集合之后，开始对配置文件进行编写

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl">
    <property name="strList">
        <list>
            <value>aaa</value>
            <value>bbb</value>
            <value>ccc</value>
        </list>
    </property>
    <property name="userMap">
        <map>
            <entry key="u1" value-ref="user1"/>
        </map>
    </property>
    <property name="properties">
        <props>
            <prop key="p1">properties1</prop>
            <prop key="p2">properties2</prop>
        </props>
    </property>
</bean>

<bean id="user1" class="com.itheima.domain.User">
    <property name="name" value="tom"/>
    <property name="addr" value="beijing"/>
</bean>
<bean id="userService" class="com.itheima.service.impl.UserServiceImpl"/>
```

这次的配置不同于在bean中直接添加list的value值，需要添加新的bean对象，并且在新的bean中添加新的property，在property中添加新的value，这次的name与之前的User类中的name和addr相对应，使得键值的两个属性值能够对应上。

需要注意的是，**value-ref的值和下面的bean中的id需要保持一致，而entry中的key则没有要求**。

运行之后的值为

> [aaa, bbb, ccc]
> {u1=User{name='tom', addr='beijing'}}
> {p1=properties1, p2=properties2}
> save running...

**properties配置文件**

```
<property name="properties">
    <props>
        <prop key="p1">properties1</prop>
        <prop key="p2">properties2</prop>
    </props>
</property>
```

配置方法与List集合类似。

### Spring引用其他配置文件

因为项目大小的问题，我们通常将Spring项目拆分，引入其他配置文件。将部分配置拆分到其他配置文件中，而在Spring主配置文件中通过import标签进行加载，这种方法通常就是分模块开发。

```xml
<import resource = "applicationContext-xxx.xml"/>
```

**知识要点总结**

![image-20210329164325288](https://i.loli.net/2021/03/29/6nLDeHpaQkiUvy2.png)

## 四、Spring相关API

### ApplicationContext的继承体系

applicationContext：接口类型，代表应用上下文，可以通过其实例获得Spring容器中的Bean对象。

![image-20210329235558733](https://i.loli.net/2021/03/29/dlIcjKuLtHzpibX.png)

### ApplicationContext的实现类

#### ClassPathXmlApplicationContext

从类的根路径下加载配置文件

#### FileSystemXmlApplicationContext

从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置

#### AnnotationConfigApplicationContext

当使用注解配置容器对象时，需要使用此类来创建Spring容器，它用来读取注解

#### getBean()方法使用

![image-20210330000200641](https://i.loli.net/2021/03/30/bH5D81pfLVenytJ.png)

在之前的代码中，使用UserService类getBean()方法。一共有两种方式，一种是通过id方式，一种是通过类对象方式。

```java
public class UserController {
    public static void main(String[] args) {
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
//      UserService userService = (UserService) app.getBean("userService");
        UserService userService = app.getBean(UserService.class);
        userService.save();
    }
}
```

但是当容器中存在某一类的多个对象时，需要用id来获取，因为用类来获取会导致无法分清到底使用哪一个。

### Spring的重点API

```java
ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
app.getBean("id");
app.getBean(Class);
```

## 五、Spring配置数据源

### 数据源（连接池）的使用

- 数据源（连接池）是为了提高程序性能出现的
- 事先实例化数据源，初始化部分连接资源
- 使用连接资源时从数据源中获取
- 使用完毕后将连接资源归还给数据源

常见的数据源（连接池）有：DBCP、C3P0、Druid、BoneCP等。

### 数据源开发步骤

第一步：在pom.xml中添加依赖

```xml
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.32</version>
    </dependency>
    <dependency>
        <groupId>c3p0</groupId>
        <artifactId>c3p0</artifactId>
        <version>0.9.1.2</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.1.10</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>3.8.2</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>RELEASE</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

其中，添加的依赖有mysql、druid、c3p0等。

第二步：创建`DataSourceTest`类进行测试，两者的使用都是相似的步骤。设置好对应的四个参数，之后直接连接即可。

```java
public class DataSourceTest {

    @Test
    // 测试手动创建 c3p0 数据源
    public void test1() throws Exception {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass("com.mysql.jdbc.Driver");
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUser("root");
        dataSource.setPassword("123456");
        Connection connection = dataSource.getConnection();
        System.out.println(connection);
        connection.close();
    }

    @Test
    // 测试手动创建 druid 数据源
    public void test2() throws Exception {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUsername("root");
        dataSource.setPassword("123456");
        Connection connection = dataSource.getConnection();
        System.out.println(connection);
        connection.close();
    }
}
```

但是，这样的操作存在耦合性较高的弊端，不利于后期的修改更新操作。因此我们需要用到抽取配置文件的方式解耦合。

### 抽取properties配置文件

第一步：编写配置文件。新建file-> **jdbc.properties**。

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:myql://localhost:3306/test
jdbc.username=root
jdbc.password=123456
```

第二步：使用配置文件获取到相关的参数，完成解耦合的操作。

```java
@Test
// 测试手动创建 c3p0 数据源（加载properties配置文件形式）
public void test3() throws Exception {
    // 读取配置文件
    ResourceBundle rb = ResourceBundle.getBundle("jdbc");
    String driver = rb.getString("jdbc.driver");
    String url = rb.getString("jdbc.url");
    String username = rb.getString("jdbc.username");
    String password = rb.getString("jdbc.password");
    ComboPooledDataSource dataSource = new ComboPooledDataSource();
    dataSource.setDriverClass(driver);
    dataSource.setJdbcUrl(url);
    dataSource.setUser(username);
    dataSource.setPassword(password);

    Connection connection = dataSource.getConnection();
    System.out.println(connection);
    connection.close();
}
```

整体的使用步骤多了一步：从配置文件中抽取到相关参数。之后的使用中根据抽取到的参数set相关的使用参数即可。

需要注意的是用到ResourceBundle类中的getBundle方法，获取到之前创建的**jdbc.properties**配置文件。这里的使用方法是根据配置文件名字自动找寻到配置文件的所在，完成资源绑定。之后创建String对象，获得配置文件中的具体内容。

### Spring配置数据源

可以将DataSource的创建权交给Spring容器去完成。

步骤总结：①在pom.xml中引入Spring容器。

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```

②新建applicationContext.xml配置文件，在applicationContext.xml文件中添加bean对象

```xml
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="com.mysql.jdbc.Driver"></property>
    <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test"></property>
    <property name="user" value="root"></property>
    <property name="password" value="123456"></property>
</bean>
```

注意：此处的name应该跟从之前的c3p0数据源的四种参数，将下列的setDriverClass的四种方法，去掉之前的set，并将首字母改成小写添加进去。由于是普通数据类型，直接使用value赋值即可，不需要采用引用。

```java
ComboPooledDataSource dataSource = new ComboPooledDataSource();
dataSource.setDriverClass(driver);
dataSource.setJdbcUrl(url);
dataSource.setUser(username);
dataSource.setPassword(password);
```

③在java类中添加相关的程序代码

```java
@Test
// 测试 Spring 容器创建产生数据源
public void test4() throws Exception {
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    DataSource dataSource =  app.getBean(DataSource.class);
    Connection connection = dataSource.getConnection();
    System.out.println(connection);
    connection.close();
}
```

注意：这种通过.class方法getBean只适用于applicationContext.xml配置文件只有一个数据源bean的情况；若有多个，应该通过id获取到相关的Bean对象。

### 使用Spring加载的方式抽取jdbc配置文件

目的是使用applicationContext.xml抽取jdbc.properties配置文件信息。

![image-20210330142832582](https://i.loli.net/2021/03/30/FGkrwS4HsVX2LgP.png)

步骤：①首先引入context命名空间

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation=
               "http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
</bean>
```

将第一行复制，之后添加:context，将其中beans的部分修改为context。网站部分也一样复制修改，前后两个部分beans的内容修改为context。

②导入properties配置文件信息

```xml
<!--加载外部的properties配置文件-->
<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>
```

③值修改为`value="${key}"`的形式。

```xml
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"></property>
    <property name="jdbcUrl" value="${jdbc.url}"></property>
    <property name="user" value="${jdbc.username}"></property>
    <property name="password" value="${jdbc.password}"></property>
</bean>
```

## 六、Spring注解开发

Spring是轻代码而重配置的开发框架，配置比较繁重，影响开发效率，所以注解开发是一种趋势。注解代替xml配置文件可以简化配置，提高开发效率。

### Spring原始注解

Spring原始注解主要是替代<Bean>标签的配置

![image-20210330150504530](https://i.loli.net/2021/03/30/wOmEpTrvtSxZjQI.png)

### 完善测试环境

在注解之前，我们先惯例操作，搭建一个可以用来测试使用的Spring项目。

![image-20210330153837849](https://i.loli.net/2021/03/30/pvnNIGow3zCF5gK.png)

①首先创建接口和响应的实现

dao层的接口以及实现：

```java
public interface UserDao {
    public void save();
}
```

```java
public class UserDaoImpl implements UserDao {

    @Override
    public void save() {
        System.out.println("save running...");
    }
}
```

service层的接口以及实现：

```java
public interface UserService {
    public void save();
}
```

```java
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public void save() {
        userDao.save();
    }
}
```

因为我们在dao层已经创建了save方法，在service层要通过set方法直接调用save方法，实现用Spring生成Bean对象直接调用的目的。

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"></bean>

<bean id="userService" class="com.itheima.service.impl.UserServiceImpl">
    <property name="userDao" ref="userDao"></property>
</bean>
```

之后，我们建立一个测试用的web层，我们使用C/S方法，直接在web层中启动整个程序。创建一个`web.UserController`。

```java
public class UserController {

    public static void main(String[] args) {
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userService = app.getBean(UserService.class);
        userService.save();
    }

}
```

运行结果测试正常，能够通过Service层调用到dao层的save方法。

> 3月 30, 2021 3:37:22 下午 com.mchange.v2.c3p0.C3P0Registry banner
> 信息: Initializing c3p0-0.9.1.2 [built 21-May-2007 15:04:56; debug? true; trace: 10]
> save running...

### 原始注解入门操作

使用注解开发，需要在applicationContext.xml配置文件中配置组件扫描，作用是指定哪一个包及其子包下的Bean需要进行扫描以便识别使用注解配置的类、字段和方法。

注解开发步骤：①需要在创建Bean的类上加上注解Component

```java
//<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"></bean>
@Component("userDao")
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
        System.out.println("save running...");
    }
}
```

```java
//<bean id="userService" class="com.itheima.service.impl.UserServiceImpl">
//<property name="userDao" ref="userDao"></property>
//</bean>
@Component("userService")
public class UserServiceImpl implements UserService {
    //<property name="userDao" ref="userDao"></property>
    @Autowired
    @Qualifier("userDao")
    private UserDao userDao;
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    @Override
    public void save() {
        userDao.save();
    }
}
```

以上这两个代码的注解相当于在Spring配置文件中的部分——对应的是注释部分的内容。Component注解都是添加在接口对应的实现类前面，至于要在userService中获取到userDao的引用对象值，则需要在类的内部所需要获取到的属性上方使用@Autowired以及@Qualifier("id")获取。

值得注意的是：**当使用的是xml配置的方式获取到Bean对象时，需要使用到实现类中的set方法；如果用到的时注解的方式，则可以不适用set方法**。

②配置组件扫描

```xml
<!--使用注解需要配置组件扫描-->
<context:component-scan base-package="com.itheima"/>
```

配置组件扫描，让Spring寻找对应的包及其子包下的注解部分。

利用这种注解，就能完成Spring的注解开发。如果没有加上组件扫描部分，会出现*NoSuchBeanDefinitionException*的异常。

### 原始注解详解

针对上述的案例，如果注解中只写了Autowired，不写Qualifier，也能实现注入。

```java
@Repository("userDao")
public class UserDaoImpl implements UserDao {
    @Override
    public void save() {
        System.out.println("save running...");
    }
}
```

```java
	@Autowired  // 按照数据类型从Spring容器中进行匹配
//  @Qualifier("userDao") // 按照id的值从Spring容器中进行匹配的，但是要结合@Autowired一起使用
    private UserDao userDao;
```

上述这样的情况下也能实现注入。或者直接Autowired与Qualifier均不使用，我们使用@Resource(name="userDao")的方式也能成功进行注入并使用。

```java
//    <property name="userDao" ref="userDao"></property>
//    @Autowired  // 按照数据类型从Spring容器中进行匹配
//    @Qualifier("userDao") // 按照id的值从Spring容器中进行匹配的，但是要结合@Autowired一起使用
    @Resource(name="userDao")  // @Resource相当于@Autowired+@Qualifier
    private UserDao userDao;
```

此外，还可以通过注解的方式对普通的变量进行赋值

```java
@Value("itcast")
private String driver;
System.out.println(driver);
```

这样的情况是可以正常打印输出itcast的。但是这样的单纯赋值意义不大，搭配properties配置文件来使用的时候用处更加广泛。

```java
@Value("${jdbc.driver}")
private String driver;
```

此外，还能使用`@Scope("singleton")`注解来对Bean的单例或者多例进行规定。

```
@PostConstruct
public void init() {
    System.out.println("Service对象的初始化方法");
}

@PreDestroy
public void destroy() {
    System.out.println("Service对象的销毁方法");
}
```

但是，单纯的使用这两种注解，只会打印init方法，并不会打印destroy方法。这时候我们将ApplicationContext变成子类，ClassPathXmlApplicationContext，并且之后手动关闭，则销毁方法也会打印。

```java
ClassPathXmlApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
app.close();
```

### Spring新注解

在开发过程中，使用上述的注解不能替代全部的xml配置文件，还需要使用配置文件的有：

> 非自定义的Bean的配置：`<Bean>`
>
> 加载properties配置文件：`<context:property-plceholder>`
>
> 组件扫描的配置文件：`<context:component-scan>`
>
> 引入其他文件：`<import>`

所以这个时候，我们引入新注解：

![image-20210330203421187](https://i.loli.net/2021/03/30/WzHkyOM6UdY7apX.png)

为了达到不使用ApplicationContext配置文件的目的，我们将使用新注解的方式达到。

①对于非自定义的`<Bean>`对象的配置

原配置文件需要在applicationContext.xml中进行以下的配置

```xml
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"></property>
    <property name="jdbcUrl" value="${jdbc.url}"></property>
    <property name="user" value="${jdbc.username}"></property>
    <property name="password" value="${jdbc.password}"></property>
</bean>
```

运用新注解，我们在需要创建Bean实例的方法上面添加@Bean的配置。

```java
@Bean("dataSource")     // Spring会将当前方法的返回值以指定名称存储到Spring容器中
public DataSource getDataSource () throws PropertyVetoException { }
```

②对于加载properties配置文件：`<context:property-plceholder>`的配置

之前由于使用了properties配置文件的方式配置了jdbc的相关参数，现在我们使用注解来代替其中的参数获取。

获取properties文件中的响应key-value的时候，我们使用@Value注解的方式向private变量赋值，成功解耦。

没有使用新注解的方式之前，我们使用的是xml配置的方式，现在替换成下面的形式，注解添加在自定义的类前面。

```java
//<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>
@PropertySource("classpath:jdbc.properties")
```

③对于组件扫描的配置文件：`<context:component-scan>`的配置

```java
//<context:component-scan base-package="com.itheima"/>
@ComponentScan("com.itheima")
```

④对于引入其他文件：`<import>`的配置

```java
//<import resource=""/>
@Import({DataSourceConfiguration.class})
```

使用上述这四种注解之前，我们需要添加注解说明，标志成核心配置类

```java
// 标志该类是Spring的一个核心配置类
@Configuration
```

了解完注解的相关使用后，我们进入到正常的使用。创建config包，新建SpringConfiguration类和DataSourceConfiguration类。

代码分别如下：

```java
// 标志该类是Spring的一个核心配置类
@Configuration
//<context:component-scan base-package="com.itheima"/>
@ComponentScan("com.itheima")
//<import resource=""/>
@Import({DataSourceConfiguration.class})
public class SpringConfiguration {

}
```

```java
//<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>
@PropertySource("classpath:jdbc.properties")
public class DataSourceConfiguration {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;
    @Bean("dataSource")     // Spring会将当前方法的返回值以指定名称存储到Spring容器中
    public DataSource getDataSource () throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(driver);
        dataSource.setJdbcUrl(url);
        dataSource.setUser(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
```

这个时候，将web层的启动代码，修改成如下：

```java
ApplicationContext app = new AnnotationConfigApplicationContext(SpringConfiguration.class);
UserService userService = app.getBean(UserService.class);
userService.save();
```

最终成功运行，运行结果：

> 3月 30, 2021 9:59:42 下午 com.mchange.v2.c3p0.C3P0Registry banner
> 信息: Initializing c3p0-0.9.1.2 [built 21-May-2007 15:04:56; debug? true; trace: 10]
> com.mysql.jdbc.Driver
> save running...

这个时候的运行，applicationContext.xml文件已经可以完全删除。至此，我们已经成功摆脱配置文件的限制。

结合之前的注解，我们已经能够实现在Spring开发中，不需要任何的配置文件了，实现真正的全注解开发。

### Spring整合Junit

#### 原始Junit测试Spring的问题

原始测试中，每个测试中都有下面两行代码：

```java
ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
IAccountService as = ac.getBean("accountService", IAccountService.class);
```

这两行代码的作用是获取容器，如果不写的话，会提示空指针异常，不能轻易删掉。

解决思路：

> 使用SpringJunit创建Spring容器，但是需要将配置文件的名称告诉它
>
> 将需要进行测试的Bean直接在测试类中进行注入

#### Spring集成Junit的步骤

![image-20210330230811784](https://i.loli.net/2021/03/30/poenrfCZ5yzAhav.png)

①添加集成Junit的依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```

②添加测试类，使用@Runwith注解和@ContextConfiguration注解

```java
@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration("classpath:applicationContext.xml")
@ContextConfiguration(classes = {SpringConfiguration.class})
public class SpringJunitTest {

    // 使用注解注入容器中的对象
    @Autowired
    private UserService userService;

    @Autowired
    private DataSource dataSource;

    @Test
    public void test1() throws SQLException {
        userService.save();
        System.out.println(dataSource.getConnection());
    }

}
```

## 七、AOP

### Spring的AOP简介

AOP为**Aspect Oriented Programming**的缩写，意为：面向切面编程，通过预编译方 式和运行期动态代理实现程序功能的统一维护的一种技术。

AOP是OOP的延续，是软件开发中的一个热点,也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

> 作用：在程序运行期间，不修改源码的情况对目标方法进行功能的增强
>
> 优势：减少重复代码，提高开发的效率，并且便于维护

### AOP的底层实现

实际上，AOP的底层是通过Spring提供的动态代理技术实现的。在运行期间，Spring通过动态代理技术动态地生成代理对象，代理对象方法执行时进行增强功能的介入，在调用目标对象的方法，从而完成功能的增强。

常用的动态代理技术

> JDK代理：基于接口的动态代理技术
>
> cglib代理：基于父类的动态代理技术

![image-20210331182633165](https://i.loli.net/2021/03/31/AlDjWpedkzQn8Cf.png)

### JDK动态代理

①创建代理目标对象接口`TargetInterface()`

```java
public interface TargetInterface {
    public void save();
}
```

②创建目标方法类`Target()`

```java
public class Target implements TargetInterface{
    public void save() {
        System.out.println("save running...");
    }
}
```

③创建增强方法类`Advice()`

```java
public class Advice {
    public void before() {
        System.out.println("前置增强...");
    }
    public void afterReturning() {
        System.out.println("后置增强...");
    }
}
```

④创建主方法测试类`ProxyTest()`

```java
public class ProxyTest {

    public static void main(String[] args) {

        // 获得目标对象
        final Target target = new Target();

        // 获得目标增强对象
        final Advice advice = new Advice();

        // 返回值 就是动态生成的代理对象
        TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
                // 获取目标对象的类加载器
                target.getClass().getClassLoader(),
                // 目标对象相同的接口字节码对象数组
                target.getClass().getInterfaces(),
                new InvocationHandler() {
                    // 调用代理对象的任何方法，实质执行的都是invoke方法
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        // 前置增强
                        advice.before();
                        // 执行目标方法
                        Object invoke = method.invoke((target));
                        // 后置增强
                        advice.afterReturning();
                        return invoke;
                    }
                }
        );
        // 调用代理对象的方法
        proxy.save();
    }

}
```

出现错误过程以及调试：

按照教程中打的是`method.invoke(target.args);`但是在运行的时候出现*不支持发行版本5*的错误提示信息。最后根据提示更改IDEA的JDK选择版本号——默认在setting中的Build->Compiler->Java Compiler中修改相关的Module的版本号——得以解决；再根据IDEA的提示信息修改教程代码为`method.invoke(target.arg)`；最后IDEA自动修改成`method.invoke((target));`运行成功。

这些步骤就是使用JDK动态代理的整个过程。所有的类都放在同一个Module下面，测试使用正常。

![image-20210401174025367](https://i.loli.net/2021/04/01/rdXE3bNQpMOSjwB.png)

### cglib动态代理

cglib处于spring框架中的core部分，其中有对应的package存在，所以在使用的时候将spring依赖导入即可。整个package的创建不需要使用接口，直接复制之前的jdk动态代理部分。

①创建目标方法

```java
public class Target {
    public void save() {
        System.out.println("save running...");
    }
}
```

②创建增强方法

```java
public class Advice {

    public void before() {
        System.out.println("前置增强...");
    }

    public void afterReturning() {
        System.out.println("后置增强...");
    }

}
```

③创建代理方法

```java
public class ProxyTest {

    public static void main(String[] args) {

        // 获得目标对象
        final Target target = new Target();

        // 获得目标增强对象
        final Advice advice = new Advice();

        // 返回值 就是动态生成的代理对象 基于cglib
        // 1、创建增强器
        Enhancer enhancer = new Enhancer();
        // 2、设置父类（目标）
        enhancer.setSuperclass(Target.class);
        // 3、设置回调
        enhancer.setCallback(new MethodInterceptor() {
            @Override
            public Object intercept(Object object, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
                // 执行前置
                advice.before();
                // 执行目标方法
                Object invoke = method.invoke((target));
                // 执行后置
                advice.afterReturning();
                return invoke;
            }
        });
        // 4、创建代理对象
        Target proxy = (Target) enhancer.create();

        // 5、调用目标方法
        proxy.save();
    }

}
```

其中，使用cglib动态代理方式不需要创建接口，步骤如注释中一样。

![image-20210401180705656](https://i.loli.net/2021/04/01/Fuwz8bJIeiMHqks.png)

在进行动态代理真正的使用中，不需要和上面一样使用繁琐的步骤，只需要进行简单的配置即可，spring会对动态代理进行简单的封装。

### AOP相关概念

连接点：JoinPoint，指可以被增强的方法

切入点：PointCut，指真正被增强的方法

连接点范围更大，切入点是连接点的子集

![image-20210401205949450](https://i.loli.net/2021/04/01/ocZ9QEU6KOWRm12.png)

### AOP开发明确的事项

#### 需要编写的内容

> 1、编写核心业务代码（目标类的目标方法）
>
> 2、编写切面类，切面类中有通知（增强功能方法）
>
> 3、在配置文件中，配置织入关系，即将哪些通知和哪些连接点进行结合

#### AOP技术实现的内容

Spring框架监控切入点方法的执行。一旦监控到切入点方法被运行，使用代理机制，动态创建目标对象的代理对象，根据通知类别，在代理对象的对应位置,将通知对应的功能织入，完成完整的代码逻辑运行。

#### AOP底层使用哪种代理方法

在Spring中，框架会根据目标类是否实现了接口来决定采用哪种动态代理的方式。

> 有接口，则采用JDK动态代理方式
>
> 无接口，则采用cglib动态代理方式

#### 知识要点

AOP：面向切面编程

AOP的底层实现：基于JDK的动态代理 和 基于cglib的动态代理

- Pointcut（切入点）：被增强的方法
- Advice（通知/增强）：封装业务增强逻辑的方法
- Aspect（切面）：切点+通知
- Weaving（织入）：将切点与通知结合的过程

### 基于XML的AOP开发

①导入AOP相关坐标

在spring-context中已经存在springAOP，但是还需要用到切面编程的一些内容，所以我们需要还导入aspectjweaver。

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.4</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
```

②创建目标接口和目标类（内部有切点）

我们直接将之前写的Target以及TargetInterface两个类复制使用。

![image-20210401213729896](https://i.loli.net/2021/04/01/dFInf6agbA9Gc72.png)

③创建切面类（内部有增强方法）

创建MyAspect类，代码编写如下所示：

```java
public class MyAspect {
    public void before() {
        System.out.println("前置增强...");
    }
}
```

④将目标类和切面类的对象创建权交给Spring

在Resources文件夹中创建applicationContext.xml配置文件，创建目标类和切面类的Bean对象。

```xml
<!--目标对象-->
<bean id="target" class="com.itheima.aop.Target"/>

<!--切面对象-->
<bean id="myAspect" class="com.itheima.aop.MyAspect"/>
```

其中，整体结构如上图所示。

⑤在applicationContext.xml中配置织入关系

```xml
<!--配置织入:告诉Spring框架哪些方法（切点）需要进行哪些增强（前置、后置...）-->
<aop:config>
    <!--声明切面-->
    <aop:aspect ref="myAspect">
        <!--切面：切点+通知-->
        <aop:before method="before" pointcut="execution(public void com.itheima.aop.Target.save())"/>
    </aop:aspect>
</aop:config>
```

这一步需要首先使用aop的命名空间，添加aop的命名空间，之后使用aop的配置。

配置命名空间之后的代码如下所示：

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
">
</beans>
```

⑥测试代码

在测试之前，首先需要导入spring-test依赖（前面已经实现导入依赖）。

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```

创建test.java.com.itheima.test.AopTest类，代码如下：

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class AopTest {

    @Autowired
    private TargetInterface target;

    @Test
    public void test1() {
        target.save();
    }

}
```

在这里使用注解的方式注入applicationContext.xml配置文件。在使用测试类的时候，前前后后遇见了不少的问题。

1.test1()方法没有相关的运行按钮：

在pom.xml中选配更高版本的junit（最好4.12或更高，后面项目运行时候提示错误需要更高版本的junit）并且删除其中~~<scope>~~标签。

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <!--<scope>test</scope>-->
</dependency>
```

2.IDEA的jdk版本号自动切换成1.5导致运行失败：

原因是因为pom.xml文件在配置的时候会默认切换版本成1.5，所以需要在pom.xml中指定JDK的版本号。

```xml
<properties>
    <java.version>14</java.version>
    <maven.compiler.source>14</maven.compiler.source>
    <maven.compiler.target>14</maven.compiler.target>
</properties>
```

最终，运行结果如下。

> 4月 01, 2021 10:13:11 下午 org.springframework.context.support.AbstractApplicationContext prepareRefresh
> 信息: Refreshing org.springframework.context.support.GenericApplicationContext@69b0fd6f: startup date [Thu Apr 01 22:13:11 CST 2021]; root of context hierarchy
> 前置增强...
> save running...

### 切点表达式的写法

之前在applicationContext.xml文件中配置织入方法过程的时候，需要编写切点表达式，格式如下

```xml
<aop:before method="before" pointcut="execution(public void com.itheima.aop.Target.save())"/>
```

后面的pointcut的配置 `execution(public void com.itheima.aop.Target.save())` 意思就是执行Target目标类中的sav方法。

表达式通用语法

```xml
execution([修饰符] 返回值类型 包名.类名.方法名(参数))
```

execution	n.处决;实行;执行;实施;

细节问题：①访问修饰符可以省略不写；②返回值类型、包名、类名、方法名可以用*代替任意；③包名类名之间一个点.代表当前包下的类，两个点..代表当前包及其子包下的类；④参数列表两个点..可以代表任意个数、任意类型的参数

![image-20210401222929774](https://i.loli.net/2021/04/01/9NiUGErdo42DmA6.png)

上述的写法都是合法可用的。第三个是最常用的。

```xml
<aop:before method="before" pointcut="execution(* com.itheima.aop.*.*(..))"/>
```

### 通知的类型

通知的配置语法

```xml
<aop:通知类型 method="切面中类方法名" pointcut="切点表达式"/>
```

![image-20210401223526764](https://i.loli.net/2021/04/01/cqRxGYfwHgENFrb.png)

```xml
<aop:before method="before" pointcut="execution(* com.itheima.aop.*.*(..))"/>
<aop:after-returning method="afterReturning" pointcut="execution(* com.itheima.aop.*.*(..))"/>
```

配置好后置方法并且编写了后置方法，运行的时候就会有后置方法了。

> 4月 01, 2021 10:37:58 下午 org.springframework.context.support.AbstractApplicationContext prepareRefresh
> 信息: Refreshing org.springframework.context.support.GenericApplicationContext@69b0fd6f: startup date [Thu Apr 01 22:37:58 CST 2021]; root of context hierarchy
> 前置增强...
> save running...
> 后置增强...

但是在环绕增强的时候，如果没有在环绕增强方法中配置参数的话，运行结果将不会出现目标方法。

```java
public void around() {
    System.out.println("环绕前增强...");
    System.out.println("环绕后增强...");
}
```

> 4月 01, 2021 10:41:00 下午 org.springframework.context.support.AbstractApplicationContext prepareRefresh
> 信息: Refreshing org.springframework.context.support.GenericApplicationContext@69b0fd6f: startup date [Thu Apr 01 22:41:00 CST 2021]; root of context hierarchy
> 前置增强...
> 环绕前增强...
> 环绕后增强...
> 后置增强...

正确的解决方法是，在around方法中增加参数ProceedingJoinPoint

Proceeding	v-ing.进行中的，继续，接着做；proceed的现在分词	JoinPoint	n.连接点;注入点

```java
// Proceeding JoinPoint：正在执行的连接点==切点
public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    System.out.println("环绕前增强...");
    // 切点方法
    Object proceed = proceedingJoinPoint.proceed();
    System.out.println("环绕后增强...");
    return proceed;
}
```

```xml
<aop:around method="around" pointcut="execution(* com.itheima.aop.*.*(..))"/>
```

> 环绕前增强...
> save running...
> 环绕后增强...
> 4月 01, 2021 10:50:17 下午 org.springframework.context.support.AbstractApplicationContext doClose
> 信息: Closing org.springframework.context.support.GenericApplicationContext@4a87761d: startup date [Thu Apr 01 22:50:16 CST 2021]; root of context hierarchy
>
> Process finished with exit code 0

对于异常抛出增强，在原方法中需要出现异常抛出才会执行。

①在切点中添加异常情况；

②添加异常抛出增强配置；

```xml
<aop:after-throwing method="afterThrowing" pointcut="execution(* com.itheima.aop.*.*(..))"/>
```

③执行结果如下

> 环绕前增强...
> 异常抛出增强...
>
> java.lang.ArithmeticException: / by zero

这个执行结果中：目标方法没有被执行、环绕后方法也没有被执行。

最终增强：无论出不出现异常，最终都会出现增强。

编写最终增强方法：

```java
// 最终增强
public void after() {
    System.out.println("最终增强...");
}
```

编写最终增强配置：

```xml
<aop:after method="after" pointcut="execution(* com.itheima.aop.*.*(..))"/>
```

运行结果：

> 4月 01, 2021 11:00:20 下午 org.springframework.context.support.AbstractApplicationContext prepareRefresh
> 信息: Refreshing org.springframework.context.support.GenericApplicationContext@69b0fd6f: startup date [Thu Apr 01 23:00:20 CST 2021]; root of context hierarchy
> 环绕前增强...
> save running...
> 异常抛出增强...
> 最终增强...
>
> java.lang.ArithmeticException: / by zero

可以看到，尽管异常仍然存在，环绕后增强没有执行，但是最终增强还是执行了（此处异常被放在了sout语句的后面，故出现了打印的内容）。

### 切点表达式的抽取

当多个切点表达式相同时，可以将切点表达式进行抽取，在增强中使用pointcut-ref属性代替pointcut属性来引用抽取后的切点表达式。

![image-20210401233117583](https://i.loli.net/2021/04/01/naLVt3HgE47zlCA.png)

切点表达式的抽取就是添加一个aop:pointcut的标签，定义好表达式，之后在使用通知的时候，表达式直接通过引用的方式调用即可。

```xml
<aop:pointcut id="myPointcut" expression="execution(* com.itheima.aop.*.*(..))"/>
<aop:around method="around" pointcut-ref="myPointcut"/>
<aop:after method="after" pointcut-ref="myPointcut"/>
```

**知识要点总结**

![image-20210401233945752](https://i.loli.net/2021/04/01/VgOIxAjURMTqkiY.png)

### 基于注解的AOP开发

#### 注解AOP入门

准备阶段：新建一个anno的package，将之前使用的Target以及MyAspect、TargetInterface复制到anno包中。

①创建目标接口和目标类（内部有切点）

myAspect类以及Target类、TargetInterface类

②创建切面类（内部有增强方法）

![image-20210402001330594](https://i.loli.net/2021/04/02/OHzP5tWe3a9cmL6.png)

③将目标类和切面类的对象创建权交给Spring

在目标Target类前面和切面类MyAspect前面添加@Component注解

```java
@Component("myAspect")
public class MyAspect { }
@Component("target")
public class Target implements TargetInterface { }
```

④在切面类中注解配置织入关系

创建新的测试类AnnoTest，利用注解导入新的配置文件，同时开启组件扫描。

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-anno.xml")
public class AnnoTest {

    @Autowired
    private TargetInterface target;

    @Test
    public void test1() {
        target.save();
    }

}
```

```xml
<!--组件扫描-->
<context:component-scan base-package="com.itheima.anno"/>
```

在需要添加的增强方法前面注解相关参数，配置织入关系。

```xml
// 配置前置通知
@Before("execution(* com.itheima.anno.*.*(..))")
public void before() {
    System.out.println("前置增强...");
}
```

⑤在配置文件中开启组件扫描和AOP的自动代理

新建context命名空间，打开AOP自动代理。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
">

    <!--组件扫描-->
    <context:component-scan base-package="com.itheima.anno"/>

    <!--aop自动代理-->
    <aop:aspectj-autoproxy/>

</beans>
```

在没有开启自动代理之前，程序虽然能正常运行，但是缺少本应有的前置增强。

⑥测试

运行AnnoTest测试类，结果如下：

> 4月 02, 2021 12:37:31 上午 org.springframework.context.support.AbstractApplicationContext prepareRefresh
> 信息: Refreshing org.springframework.context.support.GenericApplicationContext@69b0fd6f: startup date [Fri Apr 02 00:37:31 CST 2021]; root of context hierarchy
> 前置增强...
> save running...

成功执行前置增强，运行成功。

#### 注解通知种类和切点表达式抽取

![image-20210402155307777](https://i.loli.net/2021/04/02/qaQfPvHCL8F93w7.png)

配置的时候，在通知前面增加注解即可。

```java
@Around("execution(* com.itheima.anno.*.*(..))")
@After("execution(* com.itheima.anno.*.*(..))")
```

**切点表达式的抽取**

![image-20210402155900668](https://i.loli.net/2021/04/02/18veQFyEZUPn32i.png)

切点表达式的抽取首先需要先定义表达式抽取方法，然后在方法上添加注解表达式。

```java
// 定义切点表达式
@Pointcut("execution(* com.itheima.anno.*.*(..))")
public void pointcut() {

}
```

使用抽取表达式的时候，有两种方式：

```java
@After("MyAspect.pointcut()")
@Around("pointcut()")
```

这样的注解方式都可以对抽取的表达式进行调用。

#### 知识要点

![image-20210402160535832](https://i.loli.net/2021/04/02/bgcBz6waVmlI8sN.png)

## 八、Spring JdbcTemplate

### Spring JdbcTemplate基本使用

![image-20210402161251307](https://i.loli.net/2021/04/02/9dTvjzI4Nq36FGs.png)

> Template		n.样板; 模板; 型板; 模框; 标准;

使用步骤：

①导入spring-jdbc和spring-tx坐标

tx表示事务，Transaction

 在新建立的项目中的pom.xml文件中导入新的依赖包。

```xml
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.32</version>
    </dependency>
    <dependency>
        <groupId>c3p0</groupId>
        <artifactId>c3p0</artifactId>
        <version>0.9.1.2</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.1.10</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-web</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.0.1</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet.jsp</groupId>
        <artifactId>javax.servlet.jsp-api</artifactId>
        <version>2.2.1</version>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.12.1</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.12.2</version>
    </dependency>
    <dependency>
        <groupId>commons-fileupload</groupId>
        <artifactId>commons-fileupload</artifactId>
        <version>1.4</version>
    </dependency>
    <dependency>
        <groupId>commons-io</groupId>
        <artifactId>commons-io</artifactId>
        <version>2.7</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-tx</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
</dependencies>
```

②创建数据库表和实体

创建数据库表格Account表，包含Name和Money两个属性。创建Account类，加入两个属性值并添加相关的Getter和Setter方法。

```java
public class Account {

    private String name;
    private double money;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "Account{" +
                "name='" + name + '\'' +
                ", money=" + money +
                '}';
    }
}
```

③创建JdbcTemplate对象

创建测试类：首先设置数据源对象，这里使用c3p0数据源对象，之后设置好相关的四个参数连接好数据库。

```java
public class JdbcTemplateTest {

    @Test
    // 测试JdbcTemplate开发步骤
    public void test1() throws PropertyVetoException {
        // 设置数据源对象
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass("com.mysql.jdbc.Driver");
        dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
        dataSource.setUser("root");
        dataSource.setPassword("123456");


        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        // 设置数据源对象
        jdbcTemplate.setDataSource(dataSource);
        // 执行操作
        int row = jdbcTemplate.update("insert into account values(?, ?)", "Tom", 5000);
        System.out.println(row);
    }

}
```

④执行数据库操作

执行数据库的更新操作，首先之前要创建一个JdbcTemplate类，之后用实例设置好数据源对象，执行操作，打印结果。

#### Spring产生JdbcTemplate对象

我们可以将JdbcTemplate对象的创建权交给Spring，将数据源DataSource的创建权也交给Spring，在Spring容器中将DataSource注入到JdbaTemplate模板对象中，配置如下：

①创建applicationContext.xml配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--配置数据源对象-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="com.mysql.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test"/>
        <property name="user" value="root"/>
        <property name="password" value="123456"/>
    </bean>

    <!--配置Jdbc模板对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"/>
    </bean>

</beans>
```

②测试类中编写新的方法，让Spring容器产生JdbcTemplate对象

```java
@Test
// 测试Spring产生jdbc模板对象
public void test2() {
    ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
    JdbcTemplate jdbcTemplate = app.getBean(JdbcTemplate.class);
    int row = jdbcTemplate.update("insert into account values(?, ?)", "Zhangsan", 5000);
    System.out.println(row);
}
```

#### 抽取properties配置文件

首先创建一个properties类型的文件，`jdbc.properties`

之后配置这个文件，在applicationContext.xml文件中添加context命名空间。

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc.mysql://localhost:3306/test
jdbc.username=root
jdbc.password=123456
```

利用context命名空间导入properties配置文件。

```xml
<!--引入properties配置文件-->
<context:property-placeholder location="classpath:jdbc.properties"/>
```

#### JdbcTemplate基本使用

CRUD操作，创建测试类JdbcTemplateCRUDTest.class

```java
package com.itheima.test;

import com.itheima.domain.Account;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class JdbcTemplateCRUDTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void testUpdate() {
        jdbcTemplate.update("insert into account values{?, ?}", 10000, "Tom");
    }

    @Test
    public void testDelete() {
        jdbcTemplate.update("delete from account where name = ?", "Tom");

    }

    @Test
    public void testQueryAll() {
        List<Account> accountList = jdbcTemplate.query("select * from account", new BeanPropertyRowMapper<Account>(Account.class));
        System.out.println(accountList);
    }

    @Test
    public void testQueryOne() {
        Account account = jdbcTemplate.queryForObject("select * from account where name = ?", new BeanPropertyRowMapper<Account>(Account.class), "Tom");
        System.out.println(account);
    }

    @Test
    public void testQueryCount() {
        Long count = jdbcTemplate.queryForObject("select count(*) from account", Long.class);
        System.out.println(count);
    }

}
```

#### 知识要点

![image-20210404234422204](https://i.loli.net/2021/04/04/jyDIhEsAoXGNHFa.png)

关于使用步骤的解释：

①导入坐标，spring-jdbc坐标，其中包含了jdbcTemplate模板；spring-tx坐标中包含了数据库的事务

②提供操作对象，在操作的时候还要创建数据的对象接口类，方便后面使用模板对结果集进行操作

③创建对象之后还要设置数据源对象

④执行操作，主要使用的spring中的封装，对查询的结果集做了一定的封装，能够直接使用（实体行属性）

## 九、Spring的事务控制

### 编程式事务控制相关对象

#### PlatformTransactionManager

![image-20210404235330509](https://i.loli.net/2021/04/04/jpHGknJdewFQ7la.png)

#### TransactionDefinition

![image-20210405000803460](https://i.loli.net/2021/04/05/Du69JoihnOtcZAd.png)

#### 事务的隔离级别

![image-20210405213243792](https://i.loli.net/2021/04/05/CBKphEA1RU6cDxJ.png)

#### 事务的传播行为

![image-20210405213535625](https://i.loli.net/2021/04/05/3TqdxH8Pg7m6ZLs.png)

#### TransactionStatus

![image-20210405214407960](https://i.loli.net/2021/04/05/7svcpWH2dFfoQBr.png)

事务运行的过程中的一些运行状态信息。

#### 知识总结

编程式事务控制的三大对象

> PlatformTransactionManager：平台事务管理器
>
> TransactionDefinition：事务定义
>
> TransactionStatus：事务状态，被动封装的一个对象，指的是事务控制时的状态信息

### 基于XML的声明式事务控制

Spring的声明式事务控制，顾名思义就是**采取声明的方式来处理事务**。这里所说的声明，就是在配置文件中的声明，用在Spring配置文件中声明式地处理事务来代替代码的处理事务。

**作用**

![image-20210405215535585](https://i.loli.net/2021/04/05/SnGEdN5cwHJIZhW.png)



> **注意**：Spring声明式事务控制底层就是AOP

#### 实际使用

①创建新的Module，在其中的pom.xml文件中配置好需要的依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.6</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-tx</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.0.5.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>c3p0</groupId>
        <artifactId>c3p0</artifactId>
        <version>0.9.1.2</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.32</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

②创建好需要的类——保存对应数据信息的Account类

```java
public class Account {
    private String name;
    private double money;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }
}
```

③在dao层添加对应的接口以及实现方法，实现方法实现了账户存取款以及转账的流程。

```java
public class AccountDaoImpl implements AccountDao {

    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void out(String outMan, double money) {
        jdbcTemplate.update("update account " +
                "set money = money - ? where name = ?", money, outMan);
    }

    public void in(String inMan, double money) {
        jdbcTemplate.update("update account " +
                "set money = money + ? where name = ?", money, inMan);
    }

}
```

④在Service层加入执行转账的代码

```java
public class AccountServiceImpl implements AccountService {

    private AccountDao accountDao;

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public void transfer(String outMan, String inMan, double money) {
        accountDao.out(outMan, money);
		// int i = 1 / 0;
        accountDao.in(inMan, money);
    }
}
```

⑤在web层加入实际的运行代码

```java
public class AccountController {

    public static void main(String[] args) {
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        AccountService accountService = app.getBean(AccountService.class);
        AccountService.transfer("Tom", "Lucy", 500);
    }

}
```

如果在上述的Transfer方法中存在错误，导致out运行而in没有运行，则会产生严重的后果，钱转出去了而目标账户余额没有增加。

这个时候就有了增加业务控制的需要。声明式的事务控制实质上是基于Spring中的AOP来实现的，所以需要用到通知增强。

所以，我们需要知道的有：谁是切点、谁是通知、配置切面

出问题的地方就是之前的转账方法transfer方法，所以切点是转账方法。通知就是我们要实现的增强，其实就是事务增强，就是事务控制。配置切面就是添加事务控制。

在applicationContext.xml文件中配置事务控制的增强

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd
       http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
">

    <<!--配置数据源对象-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="com.mysql.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test"/>
        <property name="user" value="root"/>
        <property name="password" value="123456"/>
    </bean>

    <!--配置Jdbc模板对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <bean id="accountDao" class="com.itheima.dao.impl.AccountDaoImpl">
        <property name="jdbcTemplate" ref="jdbcTemplate"/>
    </bean>

    <!--目标对象，切点-->
    <bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl">
        <property name="accountDao" ref="accountDao"/>
    </bean>

    <!--配置平台事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--通知 事务控制-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="*"/>
        </tx:attributes>
    </tx:advice>

    <!--配置事务AOP织入-->
    <aop:config>
        <aop:advisor advice-ref="txAdvice" pointcut="execution(* com.itheima.service.impl.*.*(..))"/>
    </aop:config>

</beans>
```

最终，有错误的存在，能够成功控制事务，不提交错误异常情况下的操作。

```xml
<!--通知 事务控制-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <!--设置事务的属性信息-->
    <tx:attributes>
        <tx:method name="*" isolation="DEFAULT" propagation="REQUIRED" timeout="-1" read-only="false"/>
    </tx:attributes>
</tx:advice>
```

在中间的标签中，出现了隔离级别，传播行为、超时时间、是否只读。name表示的是对哪个方法进行单独的增强，*代表对所有的方法都进行一个增强。在实际情况中，不同方法可以单独进行不同的事务控制属性配置。如果不写，则为默认属性。

![image-20210405225354305](https://i.loli.net/2021/04/05/aPt4drpiXHVSDzg.png)

#### 知识要点

声明式事务控制的要点

> 平台事务管理器的配置
>
> 事务通知的配置
>
> 事务AOP织入的配置

### 基于注解的声明式事务控制

在上述的项目中，对事务控制进行注解实现。

①首先在需要进行事务控制的类中进行相应的注解

```java
@Service("accountService")
@Transactional(isolation = Isolation.DEFAULT)
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDao accountDao;

//    public void setAccountDao(AccountDao accountDao) {
//        this.accountDao = accountDao;
//    }

    @Transactional(isolation = Isolation.DEFAULT, propagation = Propagation.REQUIRED)
    public void transfer(String outMan, String inMan, double money) {
        accountDao.out(outMan, money);

        accountDao.in(inMan, money);
    }
}
```

②在applicationContext.xml文件中配置好注解驱动

```xml
<!--事务的注解驱动-->
<tx:annotation-driven transaction-manager="transactionManager"/>
```

#### 知识要点

![image-20210405232819214](https://i.loli.net/2021/04/05/K79AfINM52zV6k3.png)

> 平台事务管理器配置（xml方式）
>
> 事务通知的配置（@Transactional注解配置）
>
> 事务注解驱动的配置（`<tx:annotation-driven/>`）



> 以上根据[视频](https://www.bilibili.com/video/BV1Bg4y1q7q2?p=81&share_source=copy_web)学习整理而来，第一部分包含1-76P的内容，Spring框架
>
> 作者：雨下一整晚real
>
> 时间：2021.4.5 16:50:21
>
> 未经作者许可禁止转载
