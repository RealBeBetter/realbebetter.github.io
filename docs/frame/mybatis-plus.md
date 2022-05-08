---
title: 【Java】Mybatis-Plus框架
date: 2021-07-03 21:01:56
tags:
- Java
- Frame
---

## 一、概述

### 特性

- **无侵入**
- **损耗小**
- **强大的 CRUD 操作**
- **支持 Lambda 形式调用**
- 更多特性参照[MyBatis-Plus (baomidou.com)](https://baomidou.com/)

### 架构

> 图片来源官网

![image-20220406091608984](https://s2.loli.net/2022/04/06/qXKterM5Y8DWo1L.png)

## 二、Mybatis-Plus使用

### 入门应用

首先在使用之前，我们先使用Mybatis完成CRUD操作，之后对Mybatis与Mybatis-Plus进行整合操作。

一、创建项目之后，首先创建数据库中的数据对象

```mysql
-- 创建测试表
CREATE TABLE `tb_user` (
`id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
`user_name` varchar(20) NOT NULL COMMENT '用户名',
`password` varchar(20) NOT NULL COMMENT '密码',
`name` varchar(30) DEFAULT NULL COMMENT '姓名',
`age` int(11) DEFAULT NULL COMMENT '年龄',
`email` varchar(50) DEFAULT NULL COMMENT '邮箱',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
-- 插入测试数据
INSERT INTO `tb_user` (`id`, `user_name`, `password`, `name`, `age`, `email`) VALUES
('1', 'zhangsan', '123456', '张三', '18', 'test1@itcast.cn');
INSERT INTO `tb_user` (`id`, `user_name`, `password`, `name`, `age`, `email`) VALUES
('2', 'lisi', '123456', '李四', '20', 'test2@itcast.cn');
INSERT INTO `tb_user` (`id`, `user_name`, `password`, `name`, `age`, `email`) VALUES
('3', 'wangwu', '123456', '王五', '28', 'test3@itcast.cn');
INSERT INTO `tb_user` (`id`, `user_name`, `password`, `name`, `age`, `email`) VALUES
('4', 'zhaoliu', '123456', '赵六', '21', 'test4@itcast.cn');
INSERT INTO `tb_user` (`id`, `user_name`, `password`, `name`, `age`, `email`) VALUES
('5', 'sunqi', '123456', '孙七', '24', 'test5@itcast.cn');
```

二、创建com.company.pojo.User类，作为查询结果的POJO映射类

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String userName;
    private String password;
    private String name;
    private Integer age;
    private String email;
}
```

上面的两个注解：`@NoArgsConstructor` 和 `@AllArgsConstructor`分别对应直接生成无参构造和全参构造。

三、创建com.company.mapper.UserMapper接口，对应查询操作的接口

```java
public interface UserMapper {
    List<User> findAll();
}
```

四、创建资源文件log4j.properties文件，使用log4j生成日志

```properties
log4j.rootLogger=DEBUG,A1
log4j.appender.A1=org.apache.log4j.ConsoleAppender
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=[%t] [%c]-[%p] %m%n
```

五、创建Mybatis核心配置文件mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://127.0.0.1:3306/mp?
useUnicode=true&amp;characterEncoding=utf8&amp;autoReconnect=true&amp;allowMultiQuerie
s=true&amp;useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="UserMapper.xml"/>
    </mappers>
</configuration>
```

六、创建UserMapper.xml配置文件，对应sql操作的语句

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.company.submodule.mapper.UserMapper">
    <select id="findAll" resultType="com.company.submodule.pojo.User">
        select * from tb_user
    </select>
</mapper>
```

七、使用测试类对上述的结果进行测试

```java
public class MybatisTest {

    @Test
    public void testFindAll() throws IOException {
        // 1. 创建 sqlSessionFactory
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

        // 2. 创建mapper对象
        SqlSession sqlSession = sessionFactory.openSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);

        // 3. 运行测试
        List<User> users = mapper.findAll();
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

最终打印出查询结果。

### Mybatis-Plus和Mybatis的整合

上述的使用是针对Mybatis框架的使用，针对Mybatis-Plus框架的使用，我们首先要在Maven中添加依赖：

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>3.1.1</version>
</dependency>
```

现在针对Mybatis和Mybatis-Plus框架的整合操作，整个整合过程中仅需要修改两处地方：

①将之前创建的UserMapper接口继承BaseMapper

```java
public interface UserMapper extends BaseMapper<User> {
    List<User> findAll();
}
```

该接口提供了一系列的方法，Mybatis-Plus提供的一系列方法就在这个里面提供。该接口的归属包为 `package com.baomidou.mybatisplus.core.mapper;`。

②测试代码中：

![image-20210625152821147](https://s2.loli.net/2022/04/06/fVXR7O2p5Yh9lQP.png)

创建sqlSession的时候，使用Mybatis-Plus提供的类，而不是使用Mybatis提供的类。

```java
public class MybatisPlusTest {

    @Test
    public void testFindAll() throws IOException {
        // 1. 创建 sqlSessionFactory
        InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sessionFactory = new MybatisSqlSessionFactoryBuilder().build(resourceAsStream);

        // 2. 创建mapper对象
        SqlSession sqlSession = sessionFactory.openSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);

        // 3. 运行测试
        List<User> users = mapper.findAll();
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

查询结果和之前的结果保持一致。

测试中使用Mybatis-Plus中的方法，`selectList()`调用方法：

```java
List<User> users = mapper.selectList(null);
for (User user : users) {
    System.out.println(user);
}
```

这样直接使用的时候会报错，提示 `Table 'mp.user' doesn't exist`。

提示该错误的原因是因为使用的POJO类，命名为User，Mybatis-Plus在运行的时候会指定类名为查询的数据库中的表格名（查询方法运行的时候参数为`null`）。其中的mp为之前创建的实例的数据库名，查看运行日志可以得知，当时生成的Sql语句为 `SELECT id,user_name,password,name,age,email FROM user`，表名不一致，所以要在User类上指定`@TableName`的值。

解决办法：在之前创建的POJO包下的User类的上方添加注释

```java
@TableName("tb_user")
```

这样的作用是指定表名，将数据库中的表格名和Mybatis-Plus中指定的表名匹配一致。

疑问：

创建Mybatis-Plus的工厂类对象之后，创建Mapper对象的时候已经指定了UserMapper类，那么为什么运行时候结果没有指定到UserMapper.xml文件中的`<select>`语句块，而是需要重新再指定TableName呢？

- 可以通过 `@TableName` 注解实现 Java 实体与数据库之间的相互映射

为什么继承之后就能够直接使用Mybatis-Plus之中提供的方法了呢？

- 由于使用了MybatisSqlSessionFactoryBuilder进行了构建，继承的BaseMapper中的方法就载入到了SqlSession中，所以就可以直接使用相关的方法。

### Mybatis-Plus和Spring的整合

一、首先导入必要的依赖pom.xml中

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.0.5.RELEASE</version>
</dependency>
```

二、创建实体类pojo.User类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("tb_user")
public class User {
    private Long id;
    private String userName;
    private String password;
    private String name;
    private Integer age;
    private String email;
}
```

三、创建mapper.UserMapper接口

```java
public interface UserMapper extends BaseMapper<User> {

}
```

四、创建Spring的核心配置文件applicationContext.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <!--配置加载properties配置文件-->
    <context:property-placeholder location="classpath:*.properties"/>

    <!--配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
        <property name="url" value="${jdbc.url}"/>
        <property name="driver" value="${jdbc.driver}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
        <!--配置最大活动连接数-->
        <property name="maxActive" value="5"/>
    </bean>

    <!--这里使用MP提供的sqlSessionFactory，完成了Spring与MP的整合-->
    <bean id="sqlSessionFactory"
          class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--扫描mapper接口，使用的依然是Mybatis原生的扫描器-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.company.mybatis.mapper"/>
    </bean>

</beans>
```

五、创建测试类

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class MybatisPlusSpringTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelectList() {
        List<User> users = this.userMapper.selectList(null);
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

这个时候直接运行测试类可能会报错，因为两者不在同一个包下。所以可能无法创建`dataSource`的Bean对象，原因是无法加载资源路径下的jdbc.properties文件。

解决方法一：将resources文件夹复制粘贴到test下面

解决方法二：不使用jdbc.properties文件，直接使用字符串类型的value值

![image-20210625171752077](https://s2.loli.net/2022/04/06/GxiCPJ7rdcVSE5g.png)

根据上述的写法，还会发生错误：

> Cannot convert value of type 'java.lang.String' to required type 'java.sql.Driver"

解决方法：

因为使用的是Druid数据源，Druid数据源对于配置的name都有具体的要求。需要将driver改成`driverClassName`才能解决错误。

![image-20210630161950738](https://s2.loli.net/2022/04/06/Tk7cDn5rwf1SvAd.png)

### Mybatis-Plus和Spring Boot以及Mybatis的整合

一、用自动生成的方式创建Spring Boot项目

二、编写UserMapper接口

```java
@Repository
public interface UserMapper extends BaseMapper<User> {
}
```

添加该注解的是为了避免后面用`@Autowired`会造成警告。

三、编写POJO类User

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("tb_user")
public class User {
    private Long id;
    private String userName;
    private String password;
    private String name;
    private Integer age;
    private String email;
}
```

这样编写需要在初始化Spring Boot项目的时候导入lombok依赖，目的是为了能够使用注解简化代码。

四、在Spring Boot的启动类上添加 `@MapperScan`注解，导入`UserMapper`接口

```java
@SpringBootApplication
// 设置mapper接口的扫描包
@MapperScan("com.example.mybatisplus_springboot.mapper")
public class MybatisPlusSpringBootApplication {

    public static void main(String[] args) {
        SpringApplication.run(MybatisPlusSpringBootApplication.class, args);
    }

}
```

五、编写测试类，利用`selectList(null)`方法查询User结果最终遍历

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
class MybatisPlusSpringBootApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void selectList() {
        List<User> users = userMapper.selectList(null);
        for (User user : users) {
            System.out.println(user);
        }
    }

}
```

出现的问题：

> Invalid bound statement (not found): com.example.mybatisplus_springboot.mapper.UserMapper.selectList

根据排查各种情况，最终发现是导入的依赖包的问题。原先导入的依赖包是普通的依赖包，不是Spring Boot版本的Mybatis-Plus依赖，不适用Mapper映射文件而直接使用接口导入的方式，会发生映射Mapper和方法无法形成映射关系。

解决方法是修改依赖包为：

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.1.1</version>
</dependency>
```

运行的结果如下所示：

![image-20210630171623802](https://s2.loli.net/2022/04/06/ScCUDvYQNgEmAIo.png)

### 通用CRUD

Mybatis-Plus框架使用的时候相比于Mybatis更加简单。根据上述的Spring Boot项目，我们在使用Mybatis-Plus的时候，只需要完成：

①添加POJO类对象

②添加Mapper接口，并让之继承BaseMapper接口

③在SpringBoot启动类上添加`@MapperScan`扫描Mapper接口

④创建Mapper接口对象，然后注入ioc容器

⑤使用Mapper创建的对象，调用BaseMapper中提供的各种简化CRUD的方法

根据源码，键入Alt+7可以查看到BaseMapper中提供的一些方法：

![image-20210630172206567](https://s2.loli.net/2022/04/06/qIU2pwFxDKBYWMC.png)

#### Insert方法测试

由于数据库中已经设置ID自增长，我们可以不需要设置ID值，填充其他属性来完成。

编写测试类InsertUserTest类，如下所示：

```java
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class InsertUserTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testInsert() {
        User user = new User();
        user.setEmail("swrely@qq.com");
        user.setUserName("Real");
        user.setName("雨下一整晚");
        user.setAge(20);
        user.setPassword("123456");
        // 返回的是数据库影响的行数
        int insert = this.userMapper.insert(user);
        System.out.println("Result >= " + insert);

        // 获取自增长后的id，插入成功后自增站的id值会回填到user对象中
        System.out.println("id >= " + user.getId());
    }

}
```

上述代码中，调用userMapper的insert方法，传入设置好参数的user对象（ID不设置）。

![image-20210701093411652](https://s2.loli.net/2022/04/06/8d4vTtKAhIG6eW7.png)

这个时候能够实现插入成功。但是主键却变成了32位的数字，不符合我们的使用要求。

**@TableId**

解决方法：

一、在POJO类对象的定义中，对于主键的属性添加注解

```java
@TableId(type = IdType.AUTO)
private Long id;
```

二、添加注解后，还是出现32位主键的情况。通过查看他人的解决方法，先将数据库中的主键自增长取消勾选，之后又重新勾选，解决

![image-20210701093803826](https://s2.loli.net/2022/04/06/kPbrdmcvueoaY1z.png)

运行结果最终可以看到结果：

![image-20210701093840938](https://s2.loli.net/2022/04/06/P5DSAeqTLVGWnIv.png)

**@TableField**

`@TableField`注解主要作用：

一、解决数据库中字段名和pojo类对象的属性名不一致的问题

例如：将email属性更改为mail属性，需要在mail的成员变量的地方添加该注解

```java
@TableField(value = "email")        // 解决数据库中字段名不一致的问题
private String mail;
```

同时更改set方法的方法名。

![image-20210701095010177](https://s2.loli.net/2022/04/06/lVXqUMRJyQgHmzo.png)

二、解决数据库中字段名不存在的问题

如果新增加的字段在数据库中没有相应的字段属性，那么应该屏蔽该数据字段的插入或者删除操作。

```java
@TableField(exist = false)          // 解决数据库中字段不存在的问题
private String address;
```

之后设置该属性后实现插入操作，会发现插入语句中没有该属性值，也就是插入语句自动屏蔽该成员变量。

三、屏蔽数据库中某些字段的查询结果

数据库中某些关键的属性是不应该被查询到的，比如说密码，我们可以设置：

```java
@TableField(select = false)         // 屏蔽字段查询结果
private String password;
```

该注解的作用很明显，屏蔽select语句的字段结果。

查询出来之后，显示password的值为`null`。

![image-20210701095509752](https://s2.loli.net/2022/04/06/IkoXNTlyg1Ajei9.png)

#### Update方法测试

update方法在Mybatis-Plus中存在两个，分别是根据ID进行更新和根据条件进行更新。

```java
int updateById(@Param("et") T entity);

int update(@Param("et") T entity, @Param("ew") Wrapper<T> updateWrapper);
```

`updateById()`测试：

根据代码测试可以看到，该方法需要传入的是一个user实例对象，首先需要创建一个对象。

![image-20210701101203787](https://s2.loli.net/2022/04/06/jKnzwHITLM7sxBi.png)

然后对该对象的主键ID进行设置，设置成数据库中需要修改的字段的ID值，然后设置需要更改的属性，最终传入对象。

```java
@Test
public void testUpdateById() {
    User user = new User();
    user.setId(6L);
    user.setName("钱八");
    user.setUserName("qianba");
    user.setMail("test6@itcast.cn");
    // userMapper.up
    int update = userMapper.updateById(user);   // 返回的是数据库影响的行数
    System.out.println(update);
    User selectUser = userMapper.selectById(6L);
    System.out.println(selectUser);
}
```

运行结果：

> 1
> User(id=6, userName=qianba, password=null, name=钱八, age=20, mail=test6@itcast.cn)

根据条件修改：

根据测试，该方法需要传入的是一个user对象以及包装器`wrapper`对象。

![image-20210701101132485](https://s2.loli.net/2022/04/06/gjSdJ19WO34Esx6.png)

查看包装器对象的实现类，如下：
![image-20210701101458735](https://s2.loli.net/2022/04/06/zASmJTKPgdnfEeR.png)

我们先编写测试方法，设置个别需要修改的属性。

```java
User user = new User();
user.setAge(20);
user.setPassword("888888");
```

这个时候我们需要查询到我们需要修改的row数据，所以上述的实现类使用QueryWrapper类。代码如下：

```java
@Test
public void testUpdate() {
    User user = new User();
    user.setAge(20);
    user.setPassword("888888");
    // Wrapper 包装器对象的编写
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.eq("user_name", "zhangsan");
    int update = userMapper.update(user, queryWrapper);
    System.out.println(update);
    System.out.println(userMapper.selectById(1L));
}
```

运行结果：

![image-20210701101934551](https://s2.loli.net/2022/04/06/Owbp6WszDnrYefU.png)

此外，根据条件更新还有另外一种写法：（直接使用上述包装器的是实现对象之一的UpdateWrapper类）

```java
@Test
public void testDirectUpdate() {
    // Wrapper 包装器对象
    UpdateWrapper<User> wrapper = new UpdateWrapper<>();
    wrapper.set("password", "999999").eq("user_name", "zhangsan");
    int update = userMapper.update(null, wrapper);
    System.out.println(update);
    System.out.println(userMapper.selectById(1L));
}
```

#### Delete方法测试

删除的方法常见的有下面几种：

![image-20210701103143796](https://s2.loli.net/2022/04/06/zO35qupFnUtHIbG.png)

`deleteById()`方法测试：

使用方法很简单，直接传入ID值即可。

```java
@Test
public void testDeleteById() {
    int delete = userMapper.deleteById(6L);
    System.out.println(delete);
    System.out.println(userMapper.selectList(null));
}
```

运行结果就是删除主键为6的元素。

`deleteByMap()`方法测试：

该方法需要传入一个Map类型的参数，首先需要创建一个Map类型的对象。

```java
@Test
public void testDeleteByMap() {
    Map<String, Object> map = new HashMap<>();
    map.put("user_name", "zhangsan");
    map.put("password", "123456");      // password is “999999”
    // the relationship of maps is AND in sql statement
    System.out.println(userMapper.deleteByMap(map));    // 0
    System.out.println(userMapper.selectById(1L));      // same as before
}
```

map的参数前者和后者的关系是colomu和value的关系，使用的时候要注意二者的关联。而且多个mao属性之间的关系在sql语句映射中是**AND**的关系，所以根据条件，这一语句密码不符合，删除失败。

`delete()` 方法测试：

使用`delete()` 进行测试，直接使用delete方法，传入一个Wrapper类型的参数。

这种方式有两种构建形式：实际使用中推荐第二种方式，可以避免字段名输错的情况

```java
@Test
public void testDelete() {
    // 方法一：创建 Wrapper对象
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("id", "5");
    System.out.println(userMapper.delete(wrapper));     // 1
    System.out.println(userMapper.selectById(5L));      // null

    // 方法二：创建user对象
    User user = new User();
    user.setId(5L);
    user.setPassword("123456");
    QueryWrapper<User> queryWrapper = new QueryWrapper<>(user);
    System.out.println(userMapper.delete(queryWrapper));    // 0
    System.out.println(userMapper.selectById(5L));          // null
}
```

`deleteBatchIds()`方法测试：

该方法是根据传入的Id值进行批量删除。

```java
@Test
public void testDeleteBatchIds() {
    // 根据id进行批量删除
    int delete = userMapper.deleteBatchIds(Arrays.asList(7L, 8L));  // 2
    System.out.println(delete);
}
```

#### Select方法测试

`selectById()`方法测试：

根据主键Id查询字段值：

```java
@Test
public void testSelectById() {
    User user = userMapper.selectById(2);
    System.out.println(user);
}
```

`selectBatchIds()`方法测试：

根据主键Id进行批量查询的操作，实施步骤一样：

```java
@Test
public void testSelectBatchIds() {
    // 根据id批量查询
    List<User> users = userMapper.selectBatchIds(Arrays.asList(1L, 2L));
    for (User user : users) {
        System.out.println(user);
    }
}
```

根据多个id值，返回多个查询结果，如果没有，则为null

`selectOne()`方法测试：

根据条件查询，返回一条数据。

```java
@Test
public void testSelectOne() {
    // 根据条件查询单个
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("user_name", "wangwu");
    // 查询到的数据超过一条时，会抛出异常
    User user = userMapper.selectOne(wrapper);
    System.out.println(user);
}
```

如果查询的结果有多条，将会抛出异常。

`selectCount()`方法测试：

根据条件查询，返回查询到的数据的条数。

```java
@Test
public void testSelectCount() {
    // 根据条件查询，返回数据条数
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.gt("age", "20");    // age > 20 , count = 2
    Integer count = userMapper.selectCount(wrapper);
    System.out.println(count);      // 2
}
```

`selectList()`方法测试：

根据条件，查询全部记录，返回entity对象。

```java
@Test
public void testSelectList() {
    // 根据条件查询全部记录
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.like("email", "@");             // like %@%
    List<User> users = userMapper.selectList(wrapper);
    for (User user : users) {
        System.out.println(user);
    }
}
```

`selectPage()` 方法测试：

该方法是分页查询，对查询到的结果进行分页，方便后续处理到数据。

一、配置Mybatis-Plus的分页插件

```java
@Configuration
// 设置mapper接口的扫描包
@MapperScan("com.example.mybatisplus_springboot.mapper")
public class MybatisPlusConfig {

    @Bean       // 配置mybatisPlus的分页插件
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }

}
```

该操作将之前配置的扫描Mapper包的注解从Spring Boot的启动类拿到Mybatis-Plus的配置类。顺便将方法中新创建的分页类注入到ioc容器中。

二、使用`selectPage(Page page, Wrapper wrapper)`方法

该方法需要传入两个参数，一个是设置分页的参数，一个是设置查询的条件。

```java
@Test
public void testSelectPage() {
    // 根据条件进行分页查询
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.like("email", "@");

    Page<User> page = new Page<>(1, 1);
    IPage<User> iPage = userMapper.selectPage(page, wrapper);
    System.out.println("总条数：" + iPage.getTotal());
    System.out.println("总页数：" + iPage.getPages());
    System.out.println("当前页：" + iPage.getCurrent());

    List<User> records = iPage.getRecords();
    for (User record : records) {
        System.out.println(record);
    }

}
```

### SQL注入原理

在MP中，ISqlInjector负责SQL的注入工作，它是一个接口，AbstractSqlInjector是它的实现类，实现关系如下：

![image-20210701145036040](https://s2.loli.net/2022/04/06/bWD4G9XH28gSLdi.png)

主要是使用`AbstractSqlInjector`中的`inspectInject()`方法对SQL进行注入，关键语句是使用Lambda表达式的语句。

![image-20210701145333703](https://s2.loli.net/2022/04/06/k3tu5419BNawixm.png)

## 三、Mybatis-Plus的配置

### 全局配置文件

在Spring Boot项目中的application.properties文件中指定mybatis的配置文件所在的路径。

```properties
# 全局配置文件
mybatis-plus.config-location=classpath:mybatis-config.xml
```

这样配置之后可以扫描到配置文件。

### 自定义SQL语句

如果系统中执行的SQL语句在MP插件中查询不到，需要指定的SQL语句，这个时候就需要自定义的SQL语句。

一、首先配置扫描Mapper映射配置文件所在路径

```properties
# 指定 mapper.xml 文件的路径
mybatis-plus.mapper-locations=classpath*:mybatis/*.xml
```

二、在刚才指定的路径下编写相关的映射配置文件 UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mybatisplus_springboot.mapper.UserMapper">
    <select id="findById" resultType="com.example.mybatisplus_springboot.pojo.User">
        select * from tb_user where id = #{id}
    </select>
</mapper>
```

三、在UserMapper接口中添加自定义的方法

```java
public interface UserMapper extends BaseMapper<User> {
    User findById(Long id);
}
```

四、编写运行自定义的SQL语句的方法

```java
@Test
public void testFindById() {
    User user = userMapper.findById(1L);
    System.out.println(user);
}
```

### 别名包扫描路径

该配置的目的是设置UserMapper中的全路径名，使其使用的时候更加方便。

```properties
# 实体包扫描路径
mybatis-plus.type-aliases-package=com.example.mybatisplus_springboot.pojo
```

添加之后，可以直接使用该包下的类，不需要指定该路径。

```xml
<select id="findById" resultType="User">
    select * from tb_user where id = #{id}
</select>
```

如上所示，User类属于上述实体包的路径，不需要设置全路径，而是直接写类名即可。

### 驼峰命名映射

是否开启自动驼峰命名规则（camel case）映射，即从经典数据库列名 A_COLUMN（下划线命名） 到经典 Java 属性名 aColumn（驼峰命名） 的类似映射，默认值为`true`，表示开启。

之前的应用中，使用的是user_name的数据库命名，在Java中写的是userName的命名，二者没有设置却能够正常查询出来并实现映射，证实了该注解是默认开启的。

```properties
# 关闭自动驼峰映射，该参数不能和mybatis-plus.config-location同时存在
mybatis-plus.configuration.map-underscore-to-camel-case=false
```

运行一个查询，可以看到查询结果为`null`

> User(id=1, userName=null, password=999999, name=张三, age=20, mail=null)

### 设置缓存

全局地开启或关闭配置文件中的所有映射器已经配置的任何缓存，默认为 true。

```properties
# 禁用缓存
mybatis.configuration.cache-enabled=false
```

### IdType配置

配置ID的生成策略，默认值为ID_WORKER

```properties
# idType 策略配置，自增长
mybatis-plus.global-config.db-config.id-type=auto
```

配置完毕之后，就不需要在实体pojo映射类的id属性上添加`@TableId(type = IdType.AUTO)`的注解了。

### tablePrefix配置

表名前缀，全局配置后可省略`@TableName()`配置。

```properties
# 配置表名前缀
mybatis-plus.global-config.db-config.table-prefix=tb_
```

配置数据库中表名的前缀，省去了后续编写pojo类的时候在类的上方指定`@TableName("tb_user")`的注解了。

## 四、条件构造器

在MP中，Wrapper包装器的实现如下所示：

![image-20210701160733297](https://s2.loli.net/2022/04/06/juROkMVlynPgh2i.png)

一共有两个抽象类，并拥有各自的具体实现类。

### AllEq

该方法存在于`QueryWrapper`类中，可以指定查询的条件。

```java
@Test
public void testAllEq() {
    QueryWrapper<User> wrapper = new QueryWrapper<>();

    // 设置allEq的参数条件
    Map<String, Object> map = new HashMap<>();
    map.put("name", "张三");
    map.put("age", "20");
    map.put("password", null);

    // 单个参数，多个map值之间的关系是AND，查询结果为空
    // wrapper.allEq(map);
    // 两个参数，设置为null的参数是否指定为查询条件，查询有结果
    // wrapper.allEq(map, false);
    // Lambda表达式参数，表示满足条件则添加进where条件中，有多个条件满足则使用AND连接
    wrapper.allEq((K, V) -> ("name".equals(K) || "age".equals(K) || "id".equals(K)), map);

    List<User> users = userMapper.selectList(wrapper);
    for (User user : users) {
        System.out.println(user);
    }
}
```

主要使用的方法如上所示。该方法是重载的形式创建的，存在多种形式。

### 基本比较操作

Mybatis-Plus中存在多种比较操作，内置的有：

- eq：等于=
- ne：不等于<>
- gt：大于>
- ge：大于等于>=
- lt：小于<
- le：小于等于<=
- between：between value1 and value2
- not between：not between value1 and value2
- in：field in (value.get(0), value.get(1))
- notIn：field not in (value.get(0), value.get(1))

### 模糊查询

- like：LIKE '%value%'
- notLike：NOT LIKE '%value%'
- likeLeft：LIKE '%value'
- likeRight：LIKE 'value%'

```java
@Test
public void testLike() {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.likeLeft("user_name", "wu");
    List<User> users = userMapper.selectList(wrapper);
    for (User user : users) {
        System.out.println(user);
    }
}
```

### 排序查询

- orderBy：order by field
- orderByAsc：order by field Asc
- orderByDesc：order by field Desc

```java
@Test
public void testOrderByAgeDesc() {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.orderByDesc("age");
    List<User> users = userMapper.selectList(wrapper);
    for (User user : users) {
        System.out.println(user);
    }
}
```

### 逻辑查询

- or：拼接OR
- and：嵌套AND

```java
@Test
public void testOr() {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("user_name", "wangwu").or().eq("age", 20);
    List<User> users = userMapper.selectList(wrapper);
    for (User user : users) {
        System.out.println(user);
    }
}
```

### 指定字段查询

- select：指定字段名，查询指定字段

```java
@Test
public void testSelect() {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("user_name", "wangwu").or()
            .eq("age", 20)
            .select("user_name", "name", "age");        // 指定查询的字段
    List<User> users = userMapper.selectList(wrapper);
    for (User user : users) {
        System.out.println(user);
    }
}
```

## 五、ActiveRecord

> 什么是ActiveRecord？
>
> ActiveRecord也属于ORM（对象关系映射）层，由Rails最早提出，遵循标准的ORM模型：表映射到记录，记 录映射到对象，字段映射到对象属性。配合遵循的命名和配置惯例，能够很大程度的快速实现模型的操作，而 且简洁易懂。
>
> ActiveRecord的主要思想是：
>
> - 每一个数据库表对应创建一个类，类的每一个对象实例对应于数据库中表的一行记录；
> - 通常表的每个字段 在类中都有相应的Field； ActiveRecord同时负责把自己持久化，在ActiveRecord中封装了对数据库的访问，即CURD；
> - ActiveRecord是一种领域模型(Domain Model)，封装了部分业务逻辑；

### 使用AR

在Mybatis-Plus中，只需要将实体类pojo对象继承Model即可。

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
//@TableName("tb_user")
public class User extends Model<User> {

    //@TableId(type = IdType.AUTO)
    private Long id;

    private String userName;

    @TableField(select = false)         // 屏蔽字段查询结果
    private String password;

    private String name;
    private Integer age;

    //@TableField(value = "email")        // 解决数据库中字段名不一致的问题
    private String email;

   /* @TableField(exist = false)          // 解决数据库中字段不存在的问题
    private String address;*/
}
```

### insert操作

```java
@Test
public void testInsert() {
    User user = new User();
    user.setUserName("qianqi");
    user.setPassword("123456");
    user.setName("钱七");
    user.setAge(25);
    user.setEmail("test5@itcast.cn");

    boolean insert = user.insert();
    System.out.println(insert);
    User user1 = user.selectById();
    System.out.println(user1);
}
```

### update操作

```java
@Test
public void testUpdate() {
    User user = new User();
    user.setId(3L);
    user.setAge(26);

    boolean update = user.updateById();
    System.out.println(update);
}
```

此外，还可以根据条件进行更新操作，使用Wrapper包装器完成。

### delete操作

```java
@Test
public void testDelete() {
    User user = new User();
    user.setId(4L);

    boolean delete = user.deleteById();
    System.out.println(delete);
}
```

### 条件查询

```java
@Test
public void testSelect() {
    User user = new User();

    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.ge("age", 22);  // 查询年龄>=22岁的用户

    List<User> users = user.selectList(wrapper);
    for (User user1 : users) {
        System.out.println(user1);
    }
}
```

### Oracle主键Sequence

如果使用的是Oracle数据库，那么就不能使用自增长，就得使用Sequence序列生成id值了。

**创建表格以及序列**

```sql
--创建表，表名以及字段名都要大写
CREATE TABLE "TB_USER" (
"ID" NUMBER(20) VISIBLE NOT NULL ,
"USER_NAME" VARCHAR2(255 BYTE) VISIBLE ,
"PASSWORD" VARCHAR2(255 BYTE) VISIBLE ,
"NAME" VARCHAR2(255 BYTE) VISIBLE ,
"AGE" NUMBER(10) VISIBLE ,
"EMAIL" VARCHAR2(255 BYTE) VISIBLE
)
--创建序列
CREATE SEQUENCE SEQ_USER START WITH 1 INCREMENT BY 1
```

**jdbc驱动包**

通过Maven仓库不能直接下载到Oracle的驱动包，所以我们需要自己下载之后导入，并且添加*as Library*

```
mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc8 -Dversion=12.1.0.1 -
Dpackaging=jar -Dfile=ojdbc8.jar
```

安装完成的坐标：

```xml
<dependency>
    <groupId>com.oracle</groupId>
    <artifactId>ojdbc8</artifactId>
    <version>12.1.0.1</version>
</dependency>
```

**修改数据库连接配置**

```properties
#数据库连接配置
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
spring.datasource.url=jdbc:oracle:thin:@192.168.31.81:1521:xe
spring.datasource.username=system
spring.datasource.password=oracle
#id生成策略
mybatis-plus.global-config.db-config.id-type=input
```

使用前：需要完成两个步骤：

一、需要配置MP的序列生成器到Spring容器：

```java
@Configuration
@MapperScan("cn.itcast.mp.mapper") //设置mapper接口的扫描包
public class MybatisPlusConfig {
    /**
    * 分页插件
    */
    @Bean
    public PaginationInterceptor paginationInterceptor() {
    	return new PaginationInterceptor();
    }
    /**
    * 序列生成器
    */
	@Bean
	public OracleKeyGenerator oracleKeyGenerator(){
    	return new OracleKeyGenerator();
    }
}
```

二、实体pojo类对象中指定序列的名称

```java
@KeySequence(value = "SEQ_USER", clazz = Long.class)
public class User{
	// ......
}
```

使用：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserMapperTest {
    @Autowired
    private UserMapper userMapper;
    
    @Test
    public void testInsert(){
        User user = new User();
        user.setAge(20);
        user.setEmail("test@itcast.cn");
        user.setName("曹操");
        user.setUserName("caocao");
        user.setPassword("123456");
        int result = this.userMapper.insert(user); //返回的result是受影响的行数，并不是自增后的id
        System.out.println("result = " + result);
        System.out.println(user.getId()); //自增后的id会回填到对象中
    }
}
```

## 六、插件

> MyBatis 允许你在已映射语句执行过程中的某一点进行拦截调用。默认情况下，MyBatis 允许使用插件来拦截的方法
> 调用包括：
>
> 1. Executor (update, query, flushStatements, commit, rollback, getTransaction, close, isClosed)
> 2. ParameterHandler (getParameterObject, setParameters)
> 3. ResultSetHandler (handleResultSets, handleOutputParameters)
> 4. StatementHandler (prepare, parameterize, batch, update, query)

> 我们看到了可以拦截Executor接口的部分方法，比如update，query，commit，rollback等方法，还有其他接口的
> 一些方法等。总体概括为：
>
> 1. 拦截执行器的方法
> 2. 拦截参数的处理
> 3. 拦截结果集的处理
> 4. 拦截Sql语法构建的处理

### 执行分析插件

> MP中提供了对SQL执行的分析的插件，可用作阻断全表更新、删除的操作，注意：该插件仅适用于开发环境，不适用于生产环境。

首先在MybatisPlusConfig类中配置插件：

```java
@Bean       // SQL分析插件配置
public SqlExplainInterceptor sqlExplainInterceptor() {
    SqlExplainInterceptor sqlExplainInterceptor = new SqlExplainInterceptor();

    List<ISqlParser> list = new ArrayList<>();
    list.add(new BlockAttackSqlParser());   // 攻击阻断器，阻断删除、更新操作

    sqlExplainInterceptor.setSqlParserList(list);

    return sqlExplainInterceptor;
}
```

之后编写测试方法：

```java
/**
 * 全表更新测试，测试阻断器是否生效
 */
@Test
public void testUpdateAll() {
    User user = new User();
    user.setAge(20);

    boolean update = user.update(null);
    System.out.println(update);
}
```

运行结果如下：

> org.apache.ibatis.exceptions.PersistenceException:
>
> Error updating database.  Cause: com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: Prohibition of table update operation
>
> Cause: com.baomidou.mybatisplus.core.exceptions.MybatisPlusException: Prohibition of table update operation

可以看到全表更新操作成功被阻断，插件生效。

### 性能分析插件

> 性能分析拦截器，用于输出每条 SQL 语句及其执行时间，可以设置最大执行时间，超过时间会抛出异常。
>
> 该插件只用于开发环境，不建议生产环境使用。

配置方法：

在Mybatis-config.xml文件中添加配置选项：

```xml
<configuration>
    <!--<plugins>
        <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor"/>
    </plugins>-->

    <plugins>
        <!-- SQL 执行性能分析，开发环境使用，线上不推荐。 maxTime 指的是 sql 最大执行时长 -->
        <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor">
            <property name="maxTime" value="100" />
            <!--SQL是否格式化 默认false-->
            <property name="format" value="true" />
        </plugin>
    </plugins>
</configuration>
```

配置完成之后在application.properties文件中导入该文件，并解决冲突，即可生效。

选择一个Test方法运行之后，可以看到运行结果。

>  Time：27 ms - ID：com.example.mybatisplus_springboot.mapper.UserMapper.selectById
>  Execute SQL：
>   SELECT
>       id,
>       user_name,
>       name,
>       age,
>       email
>   FROM
>       tb_user
>   WHERE
>       id=2

### 乐观锁插件

当需要修改一条数据的时候，希望这条数据没有被别人修改。

乐观锁实现原理：

- 取出记录时，获取当前version
- 更新时，带上这个version
- 执行更新时， set version = newVersion where version = oldVersion
- 如果version不对，就更新失败

简而言之，就是添加一个新的字段，每次修改操作同时带着该字段修改。修改操作之前对比字段是否相对于自己获取的字段值发生变化。

使用准备：

一、在项目中配置插件（两种方式）：

在mybatis-config.xml文件中配置插件：

```xml
<!--乐观锁插件-->
<plugin interceptor="com.baomidou.mybatisplus.extension.plugins.OptimisticLockerInterceptor"></plugin>
```

在mybatisPlusConfig类中添加配置：

```java
@Bean       // 乐观锁插件
public OptimisticLockerInterceptor optimisticLockerInterceptor() {
    return new OptimisticLockerInterceptor();
}
```

二、在数据库中新增字段Version：

```mysql
ALTER TABLE `tb_user`
ADD COLUMN `version` int(10) NULL AFTER `email`;
UPDATE `tb_user` SET `version`='1';
```

三、为实体pojo对象添加Version字段，并添加Version注解

```java
@Version
private String version;
```

使用步骤：

编写测试方法，使用ActiveRecord方式调用修改。

```java
@Test
public void testUpdateVersion() {
    User user = new User();
    user.setId(1L);
    user.setAge(26);
    user.setVersion(1);

    boolean update = user.updateById();
    System.out.println(update);
}
```

执行的SQL语句如下所示：

> UPDATE  tb_user
> SET age=26, version=2
> WHERE  id=1  AND version=1

最终id为1的用户年龄成功修改成26，version版本的值自动+1，达到版本更新的效果。

需要注意的是，乐观锁在运用的时候，版本的字段需要指定为version，不能随意更改。

注意事项：

- 支持的数据类型只有：`int,Integer,long,Long,Date,Timestamp,LocalDateTime`
- 整数类型下 `newVersion = oldVersion + 1`
- `newVersion` 会回写到 `entity` 中
- 仅支持 `updateById(id)` 与 `update(entity, wrapper)` 方法
- 在`update(entity, wrapper)` 方法下， `wrapper` 不能复用

### SQL注入器

在MP中，如果需要自定义sql方法，可以通过在接口中声明该方法，之后在UserMapper.xml之类的映射文件中添加语句配置实现。

但是，相比于这种传统的方法，我们有更好的方式来将sql语句方法传入ioc容器，实现SQL注入。优点是可以实现在多表之间的方法复用。

一、编写MyBaseMapper接口

```java
public interface MyBaseMapper<T> extends BaseMapper<T> {

    List<T> findAll();
}
```

二、将自定义编写的接口继承该接口

```java
@Repository
public interface UserMapper extends MyBaseMapper<User> {
    User findById(Long id);
}
```

三、编写`MySqlInjector`类

```java
public class MySqlInjector extends DefaultSqlInjector {

    @Override
    public List<AbstractMethod> getMethodList() {
        List<AbstractMethod> methodList = super.getMethodList();
        methodList.add(new FindAll());
        // 再扩充自定义的方法
        // list.add(new FindAll());
        return methodList;
    }
}
```

四、编写FindAll类

```java
public class FindAll extends AbstractMethod {
    @Override
    public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?>
            modelClass, TableInfo tableInfo) {
        String sqlMethod = "findAll";
        String sql = "select * from " + tableInfo.getTableName();
        SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql,
                modelClass);
        return this.addSelectMappedStatement(mapperClass, sqlMethod, sqlSource,
                modelClass, tableInfo);
    }
}
```

五、将自定义的SQL注入器注入到ioc容器

```java
@Bean         // 自定义SQL注入器
public MySqlInjector mySqlInjector(){
    return new MySqlInjector();
}
```

六、编写测试代码

```java
/**
 * 自定义 SQL 注入器方法测试
 */
@Test
public void testFindAll(){
    List<User> users = userMapper.findAll();
    for (User user : users) {
        System.out.println(user);
    }
}
```

最终运行可以查询出该表格所有数据。

### 自动填充字段

在MP中，可以根据自己的需要实现自动填充某些字段的值。

一、编写自动填充策略类

```java
@Component
public class MyMetaObjectHandle implements MetaObjectHandler {
    /**
     * 插入数据的时候填充
     * @param metaObject
     */
    @Override
    public void insertFill(MetaObject metaObject) {
        Object password = getFieldValByName("password", metaObject);
        if (null == password) {
        //字段为空，可以进行填充
            setFieldValByName("password", "123456", metaObject);
        }
    }

    /**
     * 更新数据的时候填充
     * @param metaObject
     */
    @Override
    public void updateFill(MetaObject metaObject) {

    }
}
```

二、在需要进行自动填充的pojo类的相应字段上添加注解

```java
// 屏蔽字段查询结果，插入数据时填充字段
@TableField(select = false, fill = FieldFill.INSERT)
private String password;
```

三、编写测试类

```java
/**
 * 测试自动填充字段
 */
@Test
public void testInsert() {
    User user = new User();
    user.setUserName("qianqi");
    // user.setPassword("123456");
    user.setName("钱七");
    user.setAge(25);
    user.setEmail("test5@itcast.cn");

    boolean insert = user.insert();
    System.out.println(insert);
    User user1 = user.selectById();
    System.out.println(user1);
}
```

最终没有设置密码的情况下还是能够实现自动填充默认密码字段。填充的条件是密码值为null，没有设置密码值，就会使用自动填充字段的策略。

### 逻辑删除

> 在实现功能时，删除操作需要实现逻辑删除，所谓逻辑删除就是将数据标记为删除，而并非真正的物理删除（非DELETE操作），查询时需要携带状态条件，确保被标记的数据不被查询到。这样做的目的就是避免数据被真正的删除。

整体的实现逻辑类似于乐观锁，需要在数据表中新增一个字段，用来标记是否删除的状态。

一、添加字段

```sql
ALTER TABLE `tb_user`
ADD COLUMN `deleted` int(1) NULL DEFAULT 0 COMMENT '1代表删除，0代表未删除' AFTER
`version`;
```

二、在pojo实体类中添加该字段，并添加相应注解

```java
@TableLogic
private Integer deleted;
```

三、配置逻辑删除

在application.properties文件中添加删除的逻辑映射

```properties
# 逻辑已删除值(默认为 1)
mybatis-plus.global-config.db-config.logic-delete-value=1
# 逻辑未删除值(默认为 0)
mybatis-plus.global-config.db-config.logic-not-delete-value=0
```

四、编写测试

```java
/**
 * 逻辑删除测试
 */
@Test
public void testDeleteById(){
    this.userMapper.deleteById(4L);
}
```

执行的SQL语句如下：

```sql
UPDATE
    tb_user 
SET
    deleted=1 
WHERE
    id=4 
    AND deleted=0
```

查询被删除的数据结果：

```java
/**
 * 逻辑删除测试查询结果
 */
@Test
public void testSelectById(){
    User user = this.userMapper.selectById(4L);
    System.out.println(user);
}
```

执行的SQL语句为：

```sql
SELECT
        id,
        user_name,
        name,
        age,
        email,
        version,
        deleted 
    FROM
        tb_user 
    WHERE
        id=4 
        AND deleted=0
```

结果显示为`null`，但是在数据库中查询可得知，只是将`deleted`字段的值设置为1，并没有将数据从磁盘上删除。

### 通用枚举

一、修改表格结构

```sql
ALTER TABLE `tb_user`
ADD COLUMN `sex` int(1) NULL DEFAULT 1 COMMENT '1-男，2-女' AFTER `deleted`;
```

二、配置枚举类

```java
public enum SexEnum implements IEnum<Integer> {
    MAN(1, "男"),
    WOMAN(2, "女");

    private int value;
    private String desc;

    SexEnum(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    @Override
    public Integer getValue() {
        return this.value;
    }

    @Override
    public String toString() {
        return this.desc;
    }

}
```

三、配置添加枚举类的扫描

在application.properties中添加配置扫描枚举

```properties
# 枚举包扫描
mybatis-plus.type-enums-package=com.example.mybatisplus_springboot.enums
```

四、在pojo实体类中添加枚举字段

```java
private SexEnum sex;                  // 性别枚举字段
```

五、编写测试类

```java
/**
 * 通用枚举测试
 */
@Test
public void testInsertEnum(){
    User user = new User();
    user.setName("钱七");
    user.setUserName("qianqi");
    user.setAge(20);
    user.setEmail("test5@itast.cn");
    user.setVersion(1);
    user.setSex(SexEnum.WOMAN);
    int result = this.userMapper.insert(user);
    System.out.println("result = " + result);
}
```

执行的SQL语句：

```sql
INSERT  INTO tb_user( user_name, password, name, age, email, version, sex ) 
VALUES  ( 'qianqi', '123456', '钱七', 20, 'test5@itast.cn', 1, 2 )
```

通用枚举查询测试：

```java
/**
 * 测试枚举查询
 */
@Test
public void testSelectBySex() {
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("sex", SexEnum.WOMAN);
    List<User> users = this.userMapper.selectList(wrapper);
    for (User user : users) {
        System.out.println(user);
    }
}
```

### 代码生成器

> AutoGenerator 是 MyBatis-Plus 的代码生成器，通过 AutoGenerator 可以快速生成 Entity、Mapper、Mapper XML、Service、Controller 等各个模块的代码，极大的提升了开发效率。

```java
package com.company.mp.generator;

import java.util.Scanner;*

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


/**
 * 代码生成器演示例子
 */
public class MysqlGenerator {


    /**
     * 读取控制台内容
     * @param tip
     * @return
     */
    public static String scanner(String tip) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder help = new StringBuilder();
        help.append("请输入" + tip + "：");
        System.out.println(help.toString());
        if (scanner.hasNext()) {
            String ipt = scanner.next();
            if (StringUtils.isNotEmpty(ipt)) {
                return ipt;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }

    /**
     * run this
     * @param args
     */
    public static void main(String[] args) {
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();
        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("itcast");
        gc.setOpen(false);
        mpg.setGlobalConfig(gc);
        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://127.0.0.1:3306/mp?useUnicode = true & useSSL = false & characterEncoding = utf8");
        // dsc.setSchemaName("public");
        dsc.setDriverName("com.mysql.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("123456");
        mpg.setDataSource(dsc);
        // 包配置
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(scanner("模块名"));
        pc.setParent("cn.itcast.mp.generator");
        mpg.setPackageInfo(pc);
        // 自定义配置
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };
        List<FileOutConfig> focList = new ArrayList<>();
        focList.add(new FileOutConfig("/templates/mapper.xml.ftl") {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输入文件名称
                return projectPath + "/itcast-mpgenerator/src/main/resources/mapper/" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" +
                        StringPool.DOT_XML;
            }
        });

        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);
        mpg.setTemplate(new TemplateConfig().setXml(null));
        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setNaming(NamingStrategy.underline_to_camel);
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);
        //
        strategy.setSuperEntityClass("com.baomidou.mybatisplus.samples.generator.common.BaseE ntity");
        strategy.setEntityLombokModel(true);
        //
        strategy.setSuperControllerClass("com.baomidou.mybatisplus.samples.generator.common.B aseController");
        strategy.setInclude(scanner("表名"));
        strategy.setSuperEntityColumns("id");
        strategy.setControllerMappingHyphenStyle(true);
        strategy.setTablePrefix(pc.getModuleName() + "_");
        mpg.setStrategy(strategy);
        // 选择 freemarker 引擎需要指定如下加，注意 pom 依赖必须有！
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }
}
```

### MybatisX插件

> MybatisX 是一款基于 IDEA 的快速开发插件，为效率而生。 安装方法：打开 IDEA，进入 File -> Settings -> Plugins -> Browse Repositories，输入 mybatisx 搜索并安装。

> Java 与 XML 调回跳转
> Mapper 方法自动生成 XML

Java与XML来回跳转：

点击Mybatis的图片会自动实现跳转：

![image-20210702142328314](https://s2.loli.net/2022/04/06/eR7VvNJODGX35Px.png)

点击上图的mybatis的小鸟logo，会跳转到下面的地方：

![image-20210702142410086](https://s2.loli.net/2022/04/06/tJKmdcuyRvxH9bL.png)

Mapper方法自动生成XML：

在UserMapper接口中添加方法，然后选中高亮选项：

![image-20210702143045861](https://s2.loli.net/2022/04/06/KjN476UMcGqVAnf.png)

会在UserMapper.xml文件中自动生成下面的XML代码（SQL语句需要自己写）

![image-20210702143138269](https://s2.loli.net/2022/04/06/v9bpjA5rVPfmyol.png)

