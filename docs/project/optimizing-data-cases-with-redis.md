---
title: 【项目】使用Redis优化项目实例
date: 2021-09-10 00:39:57
tags:
- Project
- Database
- Redis
---

## 一、环境搭建

业务分析：编写一个简单的前端页面，选择用一个 `<select>`列表，页面加载完成后发送Ajax请求， 加载所有省份。

**数据库环境**

创建如下的数据库以及数据表：

```sql
create database province;
use province;
create table province(
   id int primary key not null auto_increment,
    name varchar(20) not null
);

insert into province(name) value("北京");
insert into province(name) value("天津");
insert into province(name) value("上海");
insert into province(name) value("重庆");
```

**配置环境**

使用druid.properties文件：

```properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql:///province
username=root
password=123456
initialSize=5
maxActive=10
maxWait=3000
```

使用redis.properties文件：

```properties
redis.host=127.0.0.1
redis.port=6379
redis.maxTotal=30
redis.maxIdle=10
```

依赖文件pom.xml为：

```xml
<dependencies>
    <dependency>
        <groupId>commons-logging</groupId>
        <artifactId>commons-logging</artifactId>
        <version>1.2</version>
    </dependency>
    <dependency>
        <groupId>commons-beanutils</groupId>
        <artifactId>commons-beanutils</artifactId>
        <version>1.7.0</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.2.6</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.12.2</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.12.1</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.12.1</version>
    </dependency>
    <dependency>
        <groupId>jstl</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>
    <dependency>
        <groupId>org.glassfish.web</groupId>
        <artifactId>jstl-impl</artifactId>
        <version>1.2</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.23</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-tx</artifactId>
        <version>5.2.4.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.2.4.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
        <version>5.2.4.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>5.2.4.RELEASE</version>
    </dependency>
</dependencies>
```

其中，创建servlet需要的核心依赖为：

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
</dependency>
```

创建web包，并且引入jQuery框架包。在web包下编写主页代码，其中body主题如下所示：

```html
<body>
<select id="province">
    <option>--请选择省份--</option>
</select>
</body>
```

## 二、编写业务

### 业务逻辑

整个业务逻辑：

HTML页面发送请求——Servlet接收请求处理——调用Service层——调用dao层——数据库查询

### dao层

创建com.company.dao.ProvinceDao接口

```java
public interface ProvinceDao {
    List<Province> findAll();
}
```

创建对应的实现类com.company.dao.impl.ProvinceDaoImpl类

```java
public class ProvinceDaoImpl implements ProvinceDao {

    // 1. 声明JdbcTemplate对象
    private final JdbcTemplate jdbcTemplate = new JdbcTemplate(JDBCUtils.getDataSource());

    @Override
    public List<Province> findAll() {
        // 2. 定义sql
        String sql = "select * from province";
        // 3. 执行sql语句
        List<Province> provinces = jdbcTemplate.query(sql, new BeanPropertyRowMapper<Province>(Province.class));
        return provinces;
    }
}
```

### domain层

创建实体类com.company.domain.Province类

```java
public class Province {
    private int id;
    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Province{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
```

### service层

创建service层com.company.service.ProvinceService接口

```java
public interface ProvinceService {
    List<Province> findAll();
}
```

创建对应的实现类com.company.service.impl.ProvinceServiceImpl类

```java
public class ProvinceServiceImpl implements ProvinceService {

    // 声明dao变量，service调用dao层
    private final ProvinceDao dao = new ProvinceDaoImpl();

    @Override
    public List<Province> findAll() {
        return dao.findAll();
    }
}
```

### util包

创建jdbc工具类com.company.util.JDBCUtils类

```java
public class JDBCUtils {

    public static DataSource ds;

    static {
        try {
            // 1. 加载配置文件
            Properties pro = new Properties();
            // 2. 获取字节输入流
            InputStream stream = JDBCUtils.class.getClassLoader().getResourceAsStream("druid.properties");
            pro.load(stream);

            // 3. 初始化连接池对象
            ds = DruidDataSourceFactory.createDataSource(pro);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 获取数据源对象
    public static DataSource getDataSource() {
        return ds;
    }

    // 获取连接对象
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }

}
```

### web.servlet包

创建com.company.web.servlet.ProvinceServlet类

```java
@WebServlet(name = "ProvinceServlet", value = "/provinceServlet")
public class ProvinceServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1. 调用service查询
        ProvinceService service = new ProvinceServiceImpl();
        List<Province> list = service.findAll();
        // 2. 序列化list为json
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(list);
        System.out.println(json);
        // 3. 响应结果
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
```

## 三、Ajax请求

在主页中编写响应的请求代码，发起Ajax连接。

```html
<script src="js/jquery-3.5.1.min.js"></script>
<script>
    $(function () {
        // 发送Ajax请求，加载所有省份数据
        $.get("provinceServlet", {}, function (data) {
            // [{"id":1,"name":"北京"},{"id":2,"name":"天津"}
            // {"id":3,"name":"上海"},{"id":4,"name":"重庆"}]
            // 1. 获取select
            let province = $("#province");
            // 2. 遍历json数组
            $(data).each(function () {
                // 3. 创建option标签
                let option = "<option name='" + this.id + "'>" + this.name + "</option>";
                // 4. 调用select的append方法，追加option
                province.append(option);
            });
        });
    });
</script>
```

## 四、Redis优化

使用Redis对整个业务进行优化，主要的使用方式是使用Redis的缓存优化。

在整个业务的Service层进行操作，逻辑如下：

- 从Redis中查询数据
  - 没有
    - 再从数据库中查询
    - 将数据存入Redis
    - 返回数据
  - 有
    - 直接返回数据

这样的操作，可以减少数据库的查询次数，加快整个业务的运行速度。

### 准备阶段

导入新的jedis的依赖包：

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.6.0</version>
</dependency>
```

编写jedis连接池工具类com.company.util.JedisPoolUtils类：

```java
public class JedisPoolUtils {

    private static JedisPool jedisPool;

    static {
        // 读取配置文件
        InputStream resource = JedisPoolUtils.class.getClassLoader().getResourceAsStream("redis.properties");
        Properties properties = new Properties();
        try {
            properties.load(resource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 获取数据，设置到JedisPoolConfig中
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(Integer.parseInt(properties.getProperty("redis.maxTotal")));
        jedisPoolConfig.setMaxIdle(Integer.parseInt(properties.getProperty("redis.maxIdle")));
        // 初始化JedisPool对象
        jedisPool = new JedisPool(jedisPoolConfig, properties.getProperty("redis.host"), Integer.parseInt(properties.getProperty("redis.port")));
    }

    /**
     * 获取连接方法
     * @return 返回Jedis连接对象
     */
    public static Jedis getJedis() {
        return jedisPool.getResource();
    }
}
```

### 添加方法

在service接口层添加新的方法：

```java
public interface ProvinceService {
    List<Province> findAll();

    String findAllJson();
}
```

实现类中添加新的方法：

```java
/**
 * 使用redis缓存优化业务
 */
@Override
public String findAllJson() {
    // 先从redis中查询数据
    // 创建jedis对象
    Jedis jedis = JedisPoolUtils.getJedis();
    System.out.println("连接成功");
    String provinceJson = jedis.get("province");

    // 判断provinceJson是否有值
    if (provinceJson == null || provinceJson.length() == 0) {
        System.out.println("redis中无数据，查询数据库...");
        // redis中没有数据，需要从数据库中获取
        List<Province> provinces = dao.findAll();
        // 将list序列化成json
        ObjectMapper mapper = new ObjectMapper();
        try {
            provinceJson = mapper.writeValueAsString(provinces);
            System.out.println(provinceJson);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        try {
            // 将json数据存入redis中
            String set = jedis.set("province", provinceJson);
            if ("OK".equals(set)) {
                System.out.println("数据存入成功");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 释放资源
            jedis.close();
        }
    } else {
        System.out.println("redis中有数据，查询缓存...");
    }
    return provinceJson;
}
```

最后在servlet中替换新的方法调用：

```java
// 1. 查询json
ProvinceService service = new ProvinceServiceImpl();
// 2. 序列化结果
String json = service.findAllJson();
System.out.println(json);
// 3. 响应结果
response.setContentType("application/json;charset=utf-8");
response.getWriter().write(json);
```

## 五、注意

使用redis缓存一些内容不经常发生变化的数据更加合适

- 数据库的数据一 旦发生改变，则需要更新缓存。
- 数据库的表执行增删改的相关操作，需要将redis缓存数据情况，再次存入
- 在service对应的增删改方法中，将redis数据删除

遇见问题：

> java.lang.ClassNotFoundException: org.apache.commons.pool2.impl.GenericObjectPoolConfig

原因是缺少必要的jar包：

```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>2.6.0</version>
</dependency>
```

