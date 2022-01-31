---
title: 【Java】Spring Boot框架
date: 2021-07-01 12:02:10
tags:
- Java
- Frame
- Spring
---

## 一、Spring Boot概述

### 概念

SpringBoot提供了一种快速使用Spring的方式, 基于约定优于配置的思想，可以让开发人员不必在配置与逻辑业务之间进行思维的切换，全身心的投入到逻辑业务的代码编写中，从而大大提高了开发的效率，一定程度上缩短了项目周期。2014年4 月，Spring Boot 1.0.0发布，Spring的顶级项目之一([https://spring.io](https://spring.io))。

### Spring的缺点

- 配置繁琐：需要配置各种不同的配置文件，配置过程繁琐。
- 依赖繁琐：在pom.xml文件中需要提供各种不同的依赖，而且需要考虑不同依赖之间的版本问题。如果版本不兼容，将会无法启动。

### Spring Boot的功能

- 自动配置
  - Spring Boot的自动配置是一个运行时（更准确地说，应用程序启动时）的过程，考虑了众多因素，才决定Spring配置应该用哪个，不该用哪个。该过程是SpringBoot自动完成的。
- 起步依赖
  - 起步依赖本质上是一个Maven项目对象模型 (Project Object Model, POM)，定义了对其他库的**传递依赖**，这些东西加在一起即支持某项功能。
  - 简单的说，起步依赖就是将具备某种功能的坐标打包到一起，并提供一些默认的功能。
- 辅助功能
  - 提供了一些大型项目中常见的非功能特性，如嵌入式服务器、安全、指标、健康检测、外部配置等。
- Spring Boot并不是针对Spring功能上的增强，而是提供了一种快速使用Spring的方式。

## 二、Spring Boot快速入门

### 构建SpringBoot入门项目

需求：搭建Spring Boot工程，定义HelloController.hello()方法，返回”Hello SpringBoot!"。

实现步骤：
①创建Maven项目
②导入SpringBoot起步依赖
③定义Controller
④编写引导类
⑤启动测试

准备阶段：在pom.xml文件中添加下面的依赖

```xml
<!--Spring Boot工程需要继承的父工程-->
<parent>
    <artifactId>spring-boot-starter-parent</artifactId>
    <groupId>org.springframework.boot</groupId>
    <version>2.2.5.RELEASE</version>
</parent>

<dependencies>
    <!--Spring Boot中web开发的启动依赖-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

一、创建controller包，在controller包中创建com.company.controller.HelloController类

```java
@SpringBootApplication
public class HelloApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloApplication.class);
    }
}
```

二、创建Spring Boot项目的引导类，SpringBoot项目的入口

```java
/**
 * 引导类，Spring Boot项目的入口
 * @ author： Real
 * @ date： 2021年06月21日 20:24
 */
@SpringBootApplication
public class HelloApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloApplication.class);
    }
}
```

三、运行引导类，启动项目

运行结果如下所示：

![image-20210621203014300](https://i.loli.net/2021/06/21/F98bjK1ZfHtizEc.png)

最终，打开浏览器输入URL，可以得到如下结果：

![image-20210621203052371](https://i.loli.net/2021/06/21/xEfXeZdhGlMygpj.png)

上述的项目全部都是基于普通的Maven项目搭建，搭建的过程中较多的步骤不够快捷。IDEA提供了默认的快速搭建的方式。

### 快速搭建SpringBoot项目

一、创建新的模块的时候选择Spring Initializr一项

![image-20210621204312404](https://i.loli.net/2021/06/21/O5kbLntw1lxcWAG.png)

二、按需要填写好上面的选项之后，开始选择开发所需要的一些模块包

![image-20210621204418211](https://i.loli.net/2021/06/21/EoFymGI6VgAOixM.png)

三、勾选好所需要的模块包之后，点击确认即可成功搭建项目

![image-20210621204510615](https://i.loli.net/2021/06/21/li4wVSanQxHvXjW.png)

这样的创建方式，系统会自动填充所需要的pom.xml文件中的依赖以及SpringBoot的引导类。

### SpringBoot起步依赖原理

parent标签内

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.5.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

- 在spring- boot-starter-parent中定义了各种技术的版本信息，组合了一套最优搭配的技术版本。
- 在各种starter中，定义了完成该功能需要的坐标合集，其中大部分版本信息来自于父工程。
- 我们的工程继承parent，引入starter后，通过依赖传递，就可以简单方便获得需要的jar包，并且不会存在版本冲突等问题。

Spring Boot里面的依赖主要是一个`<artifactId>`标签内会指向多个依赖jar包，所以可以做到仅仅只写一两个依赖标签就能完成整个Spring项目的搭建，而且不用担心不同的依赖jar包版本的冲突。

## 三、Spring Boot配置

### 配置文件分类

SpringBoot是基于约定的，所以很多配置都有默认值。但如果想使用自己的配置替换默认配置的话，就可以使用application.properties或者application.yml (application.yaml) 进行配置。

默认中使用的配置文件经常用到的是三种后缀，`.properties`和`.yaml`和`.yml`三种配置文件共存，且如果有相同的属性的时候，三种优先级顺序从高到低：properties>yml>yaml；但是如果该属性在高优先级文件中不存在，而低优先级的属性存在，那么该属性仍然会采用低优先级配置文件中的配置项。

- SpringBoot提供了两种配置文件类型：properteis和yml/yaml
- 默认配置文件名称：application
- 在同一级目录下优先级为：properties > yml > yaml

### yml/yaml

YAML，Yet Another Markup Language。yml/yaml文件是以数据为核心的，相比xml更加简洁。

**基本语法**

> 大小写敏感
> 数据值前边必须有空格，作为分隔符
> 使用缩进表示层级关系
> 缩进时不允许使用Tab键，允许使用空格(各个系统Tab对应的空格数目可能不同，导致层次混乱)。
> 缩进的空格数目不重要，只要相同层级的元素左侧对挤即可
> #表示注释，从这个字符一直到行尾，都会被解析器忽略

- 基本语法
  - 大小写敏感
  - 数据值前边必须有空格，作为分隔符
  - 使用空格缩进表示层级关系，相同缩进表示同一级
- 数据格式
  - 对象
  - 数组：使用”-“表示数组每个元素
  - 纯量
- 参数引用
  - ${key}

```yaml
server:
  port: 8081

person1:
  name: zhangsan

# 行内写法
person2: {name: lisi}

#多行属性
address1:
  - Beijing
  - Shanghai

#行内属性
address2: [Beijing, Shanghai]

#单个的，不可再分的
#单引号忽略转义字符，双引号识别转义字符
msg1: 'Hello \n World'
msg2: "Hello \n World"

#参数引用
name: zhangsan
person3:
  name: ${name} #zhangsan
```

### 读取配置文件内容

- @Value

  - 在成员变量上方使用@Value注解，将@Value内的属性值注入到成员变量中

  - ```java
    @Value("${name}")
    private String name1;
    ```

- Environment

  - 利用Environment类的变量，利用`getProperty()`获取数据

  - ```java
    @Autowired
    private Environment env;
    System.out.println(env.getProperty("msg1"));
    ```

- @ConfigurationProperties

  - 将整个类用该注释注解，之后在pom.xml文件中添加SpringBoot官方推荐的依赖，配置处理器

  - ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
    ```

  - 在类的上方写上前缀属性，将会把yml配置文件中符合规则的前缀数据注入到Bean中

  - ```java
    @Component
    @ConfigurationProperties(prefix = "person")
    public class Person { }
    ```

### profile

我们在开发Spring Boot应用时，通常同一套程序会被安装到不同环境。比如：开发、测试、生产等。其中数据库地址、服务器端口等等配置都不同，如果每次打包时，都要修改配文件，那么非常麻烦。profile功能就是来进行动态配置切换的。

- profile配置方式

  - 多profile文件方式

    - 利用多个profile文件，创建多个profile文件，利用不同的文件后缀，最后在主profile文件中指定profile文件

    - 创建application-dev.properties

    - ```properties
      server.port=8081
      ```

    - 在application.properties中编写

    - ```properties
      spring.profiles.active=dev
      ```

  - yml多文档方式

    - 创建一个yml文件，用`---`作为yml文件中文档分隔符，创建多对属性值，最后在文档末尾指定使用profile

    - ```yml
      ---
      
      server:
        port: 8081
      
      spring:
        profiles: dev
      ---
      
      server:
        port: 8082
      
      spring:
        profiles: test
      ---
      
      server:
        port: 8083
      
      spring:
        profiles: pro
      
      ---
      
      spring:
        profiles:
          active: test
      ```

- profile激活方式

  - 配置文件

    - 利用上述两种方式，指定`profiles.active`属性值，最终确认使用哪个profile文件
    - application-dev.properties/yml开发环境
      application-test.properties/yml测试环境
      application- pro.properties/yml生产环境

  - 虚拟机参数

    - 在配置环境中指定VM Option（虚拟机参数）

      ```
      -Dspring.profiles.active=profileName
      ```

  - 命令行参数

    - 在命令行使用`java -jar pathName --spring.profiles.active=profileName`

      - 此方法需要先导出jar包，之后运行命令行参数（提前配置好Java环境变量）
      - ![image-20210622111046045.png](https://i.loli.net/2021/06/22/dlwR4K5CsqV26LJ.png)

    - 在配置环境中指定Program arguments（程序参数）

      ```
      --spring.profiles.active=profileName
      ```

  ![image-20210622103432012.png](https://i.loli.net/2021/06/22/XQWdwxALvF5ayNP.png)

当两者同时指定的时候，将会使用程序命令行参数。

### 内部配置加载顺序

- Springboot程序启动时，会从以下位置加载配置文件:

1. `file./config/`：当前项目下的/config目录下
2. `file:./` ：当前项目的根目录
3. `classpath:/config/`：classpath的config目录
4. `classpath:/`：classpath的根目录

- 加载顺序为上文的排列顺序，高优先级配置的属性会生效。低优先级的将会被忽略掉，低优先级中定义的高优先级中没有的属性，仍会生效。

### 外部配置加载顺序

打包进jar包之后，可以使用外部配置加载。

一般常用的包括命令行参数以及配置文件。

具体常用顺序参见官方文档->[Spring外部配置加载顺序](https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#boot-features-external-config)

### Spring Boot整合其他框架

#### Junit

需求：SpringBoot整合Junit

> 实现步骤：
> ①搭建SpringBoot工程
> ②引入starter-test起步依赖
> ③编写测试类
> ④添加测试相关注解
> @RunWith(SpringRunner.class)
> @SpringBootTest(classes=启动类.class)
> ⑤编写测试方法

快速创建测试，但是不选择需要引入的项目。项目搭建完成的时候，会自动引入test依赖。

在测试类中编写下面的代码：

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JunitApplication.class)
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void addTest() {
        userService.add();
    }

}
```

#### Redis

需求：SpringBoot整合Redis

> 实现步骤：
> ①搭建SpringBoot工程
> ②引入redis起步依赖
> ③配置redis相关属性
> ④注入RedisTemplate模板
> ⑤编写测试方法，测试

一、首先创建Spring初始化项目，选择redis所需要的依赖包

![image-20210622150432426](https://i.loli.net/2021/06/22/QzFo6Okvbpa7TJl.png)

二、创建相关的测试类，新建RedisTemplate对象

```java
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RedisApplication.class)
class RedisApplicationTests {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    void testSet() {
        // 添加数据
        redisTemplate.boundValueOps("name").set("zhangsan");
    }

    @Test
    void testGet() {
        // 获取数据
        Object name = redisTemplate.boundValueOps("name").get();
        System.out.println(name);
    }

}
```

三、如果还需要其他的配置选项，可以在新建一个application.yml文件，然后在文件中编写所需要的一些参数

```yaml
spring:
  redis:
    host: 127.0.0.1 # redis的主机ip地址
    port: 6379
```

#### Mybatis

需求：SpringBoot整合MyBatis

> 实现步骤：
> ①搭建SpringBoot工程
> ②引入mybatis起步依赖，添加mysql驱动
> ③编写DataSource和MyBatis相关配置
> ④定义表和实体类
> ⑤编写dao和mapper文件/纯注解开发
> ⑥测试

一、创建项目，勾选所需要的依赖：Mybatis和Mysql

![image-20210622150947031](https://i.loli.net/2021/06/22/KvpE6fjY7DrcRAG.png)

二、利用注解开发的方式对数据库数据进行查询操作，首先创建数据库并添加测试数据

```mysql
create database springboot;
use springboot;
create table t_user(
   id int(11) not null AUTO_INCREMENT,
   username varchar(32) collate utf8mb4_unicode_ci default null,
   password varchar(32) collate utf8mb4_unicode_ci default null,
   primary key(id)
);
insert into t_user(id, username, password) values(1,"zhangsan",123),(2, "lisi", 234);
```

三、创建实体类User

```java
public class User {
    private int id;
    private String username;
    private String password;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
```

四、创建接口UserMapper

```java
@Mapper
@Repository
public interface UserMapper {

   @Select("select * from t_user")
   List<User> findAll();
}
```

五、编写数据源配置文件application.yml

```yaml
#datasource
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/springboot?serverTimezone=UTC
    username: root
    password: 123456
    driver-class-name: com.mysql.jdbc.Driver
```

六、在测试类中编写测试方法进行测试

```java
@SpringBootTest
class MybatisApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    void testFindAll() {
        List<User> users = userMapper.findAll();
        for (User user : users) {
            System.out.println(user);
        }
    }

}
```

## 四、Spring Boot高级

### 自动配置

#### Condition

Condition是在Spring 4.0增加的条件判断功能，通过这个可以功能可以实现选择性的创建Bean操作。

需求：在Spring的IOC容器中有一个User 的Bean。
现要求：

1. 导入Jedis坐标后，加载该Bean，没导入，则不加载。
2. 将类的判断定义为动态的，判断哪个字节码文件存在可以动态指定。

实现步骤：

一、创建domain包，创建一个空的User类

```java
public class User {
}
```

二、创建一个config包，并在其下方创建一个UserConfig类

```java
@Configuration
public class UserConfig {

    @Bean
    // @Conditional(ClassCondition.class)
    @ConditionOnClass("redis.clients.jedis.Jedis")
    public User user() {
        return new User();
    }

}
```

三、创建condition包，在其下方创建ClassCondition类

```java
public class ClassCondition implements Condition {

    /**
     * 条件匹配，判断是否符合条件
     * @param conditionContext 上下文对象，用于获取环境，ioc，类加载器等
     * @param annotatedTypeMetadata 注解类型元信息对象，用于获取注解的属性值
     * @return 返回值判断是否符合条件
     */
    @Override
    public boolean matches(ConditionContext conditionContext, AnnotatedTypeMetadata annotatedTypeMetadata) {
        // 1. 需求：导入Jedis坐标之后才加载User类对应的Bean对象
        // 思路：判断redis.clients.jedis.Jedis.class文件是否存在
        /*boolean flag = true;
        try {
            Class<?> jedis = Class.forName("redis.clients.jedis.Jedis");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;*/

        // 思路：利用自定义配置的注解实现。通过导入属性值Value指定坐标后创建Bean
        // 获取注解属性值
        Map<String, Object> map = annotatedTypeMetadata.getAnnotationAttributes(ConditionOnClass.class.getName());
        System.out.println(map);
        String[] value = (String[]) map.get("value");
        boolean flag = true;
        try {
            for (String className : value) {
                Class<?> aClass = Class.forName(className);
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            flag = false;
        }
        return flag;
    }
}
```

如果使用第二种方法，还需要定义一个注解@ConditionOnClass，注解的定义如下：

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(ClassCondition.class)
public @interface ConditionOnClass {

    String[] value();

}
```

这样编写之后，就能够实现相对应的功能，完成需求。

自定义条件：

①定义条件类：自定义类实现Condition接口， 重写matches方法，在matches方法中进行逻辑判断，返回boolean值。matches 方法两个参数：

- context: 上下文对象，可以获取属性值，获取加载器，获取BeanFactory等。
- metadata：元数据对象，用于获取注解属性。

②判断条件：在初始化Bean时，使用@Conditional (条件类. class)注解

SpringBoot提供的常用条件注解：

- ConditionalonProperty：判断配置文件中是否有对应属性和值才初始化Bean
- ConditionalonClass：判断环境中是否有对应字节码文件才初始化Bean
- ConditionalOnMissingBean：判断环境中没有对应Bean才初始化Bean

#### 切换内置Web环境服务器

Spring Boot提供了4种Web服务器，默认使用的是Tomcat服务器。

提供的四种服务器有：Jetty、Netty、Tomcat、Undertow

一、将默认的Tomcat服务器取消使用

```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <groupId>org.springframework.boot</groupId>
        </exclusion>
    </exclusions>
</dependency>
```

二、添加使用其他的服务器，添加依赖

```java
<dependency>
    <artifactId>spring-boot-starter-jetty</artifactId>
    <groupId>org.springframework.boot</groupId>
</dependency>
```

将最后的名字更换，即可切换至其他的服务器

#### @Enable*注解

SpringBoot中提供了很多Enable开头的注解，这些注解都是用于动态启用某些功能的。而其底层原理是使用@Import注解导入一些配置类，实现Bean的动态加载。

一、创建UserConfig类

```java
@Configuration
public class UserConfig {

    @Bean
    public User user() {
        return new User();
    }
}
```

二、创建EnableApplication类

```java
/**
 * // 1. 使用@ComponaentScan注解，但是只扫描当前包及其子包
 * // 2. 使用@Import注解
 * // 3. 对@Import注解进行封装
 */
@SpringBootApplication
// @ComponentScan("com.company.mybatis.domain")
// @Import(UserConfig.class)
@EnableUser
public class EnableApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(EnableApplication.class, args);


        // 获取Bean对象
        Object user = context.getBean("user");
        System.out.println(user);
    }

}
```

三、使用第三种方式的时候，还需要自定义一个注解@EnableUser

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(UserConfig.class)
public @interface EnableUser {
}
```

### 监听机制

SpringBoot的监听机制，实际是对Java提供的事件监听机制的封装。

Java中的事件监听机制定义了以下几个角色：

①事件：Event，继承java.util.EventObject类的对象
②事件源：Source，任意对象Object
③监听器：Listener，实现java.util.EventListener接口的对象

SpringBoot在项目启动时，会对几个监听器进行回调，我们可以实现这些监听器接口，在项目启动时完成一些操作。

ApplicationContextInitializer、SpringApplicationRunListener、 CommandLineRunner、 ApplicationRunner

后面两个放到ioc容器中，直接能够运行。但是前面两个不能够直接运行，需要注册。

注册步骤：创建一个META-INF目录，创建一个spring.factories文件。

将源接口的导包全限定名=自定义的类的全限定名

### Spring Boot监控

使用依赖jar包actuator，即可启用Spring Boot监控功能。

监控健康以及一些信息，最终将返回到一个/actuator路径下，以json格式的字符串显示出来。

```json
{
    "_links": {
        "self": {
            "href": "http://localhost:8080/actuator", 
            "templated": false
        }, 
        "health": {
            "href": "http://localhost:8080/actuator/health", 
            "templated": false
        }, 
        "health-path": {
            "href": "http://localhost:8080/actuator/health/{*path}", 
            "templated": true
        }
    }
}
```

可以通过properties文件中设置相关显示程度的参数，可以显示更多的监控信息。

例如，健康信息：

在application.properties中添加

```properties
#开启健康监控的完整信息
management.endpoint.health.show-details=always
```

之后能够看到更多相关组件的健康信息，其中：UP代表正常，DOWN代表异常。

```json
{
    "status": "UP", 
    "components": {
        "diskSpace": {
            "status": "UP", 
            "details": {
                "total": 1000203087872, 
                "free": 799813742592, 
                "threshold": 10485760, 
                "exists": true
            }
        }, 
        "ping": {
            "status": "UP"
        }
    }
}
```

#### 开启所有endpoint

在application.properties文件中添加下面的代码，将会把所有的endpoint信息都添加进去。

```properties
#将所有的监控endpoint暴露出来
management.endpoints.web.exposure.include=*
```

输入给定路径之后，可以看到全部的监控信息。

### Spring Boot项目部署

SpringBoot项目开发完毕后，支持两种方式部署到服务器：

- jar包（官方推荐）
- war包

在创建项目之后，编写完成。打开Maven菜单，选择项目，选择package选项，运行即可打包成jar包（该选项是在创建初始化Spring Boot项目的默认选项，更改选项也可以更改部署方式）。

打包完成之后会提示信息：

![image-20210623104231605](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623104231605.png)

之后在命令行里面输入命令

```
java -jar D:\Java\IdeaProjects\SpringBoot\deploy\target\deploy-0.0.1-SNAPSHOT.jar
```

可以在命令行看到运行信息

![image-20210623104250566](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623104250566.png)

如果想要打包成war包格式：

一、在pom.xml依赖中添加packging标签，指定打包格式

```xml
<packaging>war</packaging>
```

二、在入口启动类添加对于特定接口以及特定方法的重写

```java
@SpringBootApplication
public class DeployApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(DeployApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(DeployApplication.class);
    }
}
```

完成之后可以以war包的形式部署。

