## 【Spring】如何封装一个 starter 

## 定义和目的

定义：Spring Boot 中的 Starter 是 Spring Boot 相对于传统的 Spring 的优势原因之一。Starter 相当于模块，它能将模块所需要的依赖进行整合并对模块内部的 Bean 根据环境进行自动配置。

> 使用者在使用 Spring Boot 中的 Starter 的时候，无需进行过多的配置和依赖，Spring Boot 能进行自动扫描并且为对应的模块设置默认值，做到真正的开箱即用。
>
> 针对于一些没有封装成 Starter 的依赖，往往经常出现的情况是需要使用者自行进行必要的一些配置。而对于 Starter 来说，会在开发者没有进行配置的情况下为模块中的依赖配置默认值；如果开发者想要自行配置，大多数只需要在 yml 配置文件中配置对应的键值对即可。

目的：封装 Starter 的目的主要是为了**将独立于业务之外的配置模块进行集成**，方便其他工程在需要使用的时候直接在 pom 中导入依赖，避免需要直接进行代码的硬拷贝而重新集成，也减少了硬拷贝可能带来的依赖版本冲突问题，让 Spring Boot 做到真正的**开箱即用**。

## 命名规范

- Spring Boot 官方开发的 Starter 的命名规则为 spring-boot-starter-{name} ，例如：spring-boot-starter-web
- 第三方的 Starter 官方推荐的命名规则为 {name}-spring-boot-starter ，例如：mybatis-spring-boot-starter

## 准备阶段

在这个阶段我们需要知道一些 Starter 开发中常用的注解，减少使用 xml 配置文件。Spring Boot 在自动装配的过程中是通过扫描 spring.factories 文件加载自动配置类，自动配置类中定义了各种运行时判断条件，这些判断条件的存在减少了依赖冲突的产生，也丰富了 Starter 的扩展功能。

- 属性映射注解
  - @ConfigurationProperties ：配置文件属性值和实体类的映射
  - @EnableConfigurationProperties：和 @ConfigurationProperties 配合使用，把 @ConfigurationProperties 修饰的类加入ioc容器。
- 配置bean注解
  - @Configuration ：标识该类为配置类，并把该类注入 ioc 容器
  - @Bean ：一般在方法上使用，声明一个 Bean，bean 名称默认是方法名称，类型为返回值。
- 条件注解
  - @Conditional：是根据条件类创建特定的 Bean ，条件类需要实现 Condition 接口，并重写 matches 接口来构造判断条件。该注解是 Spring 4 新提供的注解，按照一定的条件进行判断，满足条件给容器注册 Bean 。
  - @ConditionalOnBean ：容器中存在指定bean，才会实例化一个Bean
  - @ConditionalOnMissingBean：容器中不存在指定bean，才会实例化一个Bean
  - @ConditionalOnClass：系统中有指定类，才会实例化一个Bean
  - @ConditionalOnMissingClass：系统中没有指定类的 Bean 信息，才会实例化一个Bean
  - @ConditionalOnExpression：当SpEl表达式为true的时候，才会实例化一个Bean
  - @AutoConfigureAfter ：在某个bean完成自动配置后实例化这个bean
  - @AutoConfigureBefore ：在某个bean完成自动配置前实例化这个bean
  - @ConditionalOnJava ：系统中版本是否符合要求
  - @ConditionalOnSingleCandidate：当指定的Bean在容器中只有一个，或者有多个但是指定了首选的Bean时触发实例化
  - @ConditionalOnResource：类路径下是否存在指定资源文件
  - @ConditionalOnWebApplication：是web应用
  - @ConditionalOnNotWebApplication：不是web应用
  - @ConditionalOnJndi：JNDI指定存在项
  - @ConditionalOnProperty： 配置Configuration的加载规则
    - prefix ：配置属性名称的前缀
    - value ：数组，获取对应property名称的值，与name不可同时使用
    - name ：数组，可与prefix组合使用，组成完整的配置属性名称，与value不可同时使用
    - havingValue  ：比较获取到的属性值与havingValue给定的值是否相同，相同才加载配置
    - matchIfMissing ：缺少该配置属性时是否可以加载。如果为true，没有该配置属性时也会正常加载；反之则不会生效

## 开发步骤

### 一、创建 Starter 项目

**注意：在创建 Initializr 项目之后，要删除 main 启动类和 test 文件夹。**

在选择起步的时候的依赖时，不需要勾选任何依赖。

![image-20220218093857935](https://s2.loli.net/2022/03/31/kiuNcKXjzTGZ5CQ.png)

### 二、导入必要的依赖

**注意：在第一步删除了启动类之后，需要去除 pom 文件中 maven 打包插件 spring-boot-maven-plugin。**

这一部分中，为了适配大多数的项目，建议将 JDK 版本设置为 1.8 。

```xml
<groupId>com.company</groupId>
<artifactId>demo-spring-boot-starter</artifactId>
<version>1.0.0</version> <!--以后导入的时候要使用的版本号，需要修改-->
<name>demo-spring-boot-starter</name>
<description>Demo project for Spring Boot</description>
<properties>
    <java.version>8</java.version>
</properties>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <!-- Spring Boot 的自动装配所需要的依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-autoconfigure</artifactId>
    </dependency>

    <!-- 配置文件点击可以跳转实体，主要是为了适配 IDEA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

### 三、编写属性类

我们需要对 Starter 进行配置信息类进行定义，为了和配置文件进行映射，能够读取 yml 或者 properties 文件中的配置属性。

主要用到的注解是 @ConfigurationProperties ，该注解能够帮我们完成映射工作。

```java
@ConfigurationProperties(prefix = "demo.config")
public class DemoProperties {

    private String name = "Hello Starter！";

    private int age = 8;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
```

### 四、自定义业务类

在这一部分可以自定义一些用于获取配置文件信息进行业务操作的业务类。

```java
public class DemoService {

    private String name;

    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String demo() {
        return "DemoService{" +
                "name='" + name + "'" +
                ", age=" + age +
                "}";
    }
    
}
```

### 五、编写自动配置类

注意：这里配置一个 web 应用才能注入，并且 demo.config.flag 的值是否为 true 或者不配置该 key 才能注入 DemoService 服务。自动配置类遵循的命名规范是 XxxAutoConfiguration 。

```java
@Configuration(proxyBeanMethods = false)
// 当存在某个类时，此自动配置类才会生效
@ConditionalOnClass(value = {DemoService.class})
// 导入我们自定义的配置类,供当前类使用
@EnableConfigurationProperties(value = DemoProperties.class)
// 只有非web应用程序时此自动配置类才会生效
@ConditionalOnWebApplication
//判断demo.config.flag的值是否为“true”， matchIfMissing = true：没有该配置属性时也会正常加载
@ConditionalOnProperty(prefix = "demo.config", name = "flag", havingValue = "true", matchIfMissing = true)
public class DemoAutoConfiguration {
    /**
     * @param demoProperties 直接方法签名入参注入DemoProperties,也可以使用属性注入
     * @return DemoService 类
     */
    @Bean
    @ConditionalOnMissingBean(DemoService.class)
    //@ConditionalOnProperty(prefix = "demo.config", name = "flag", havingValue = "true", matchIfMissing = true)
    public DemoService demoService(DemoProperties demoProperties) {
        DemoService demoService = new DemoService();
        //把获取的信息注入
        demoService.setName(demoProperties.getName());
        demoService.setAge(demoProperties.getAge());
        return demoService;
    }

}
```

### 六、编写 spring.factories

在 resource/META-INF/ 下面创建 spring.factories 文件，把自动配置类 DemoAutoConfiguration 配置到org.springframework.boot.autoconfigure.EnableAutoConfiguration 的 key 下，Spring Boot 启动时会自动加载该文件并根据条件装配。

```xml
org.springframework.boot.autoconfigure.EnableAutoConfiguration=
com.company.demospringbootstarter.config.DemoAutoConfiguration
```

至此，封装 starter 的工作已经完成。后面为一些可选项。

### 七、编写配置提示文件

**additional-spring-configuration-metadata.json**

配置 additional-spring-configuration-metadata.json 文件后，在开发人员的IDE工具使用个人编写的配置读取很有效的在`application.properties`或`application.yml`文件下完成提示。

[配置详细格式参数可查看文档](https://link.juejin.cn?target=https%3A%2F%2Fdocs.spring.io%2Fspring-boot%2Fdocs%2F2.1.7.RELEASE%2Freference%2Fhtml%2Fconfiguration-metadata.html%23configuration-metadata-format)

```json
{"properties": [
    {
      "name": "demo.config.name",
      "type": "java.lang.String",
      "defaultValue": "hello 默认值！这里配置的是提示，真正默认值在Properties里面",
      "description": "这是字符串名称啊."
    },
    {
      "name": "demo.config.age",
      "defaultValue": 18,
      "description": "这是int类型的年龄啊.",
      "deprecation": {
              "reason": "过时原因.",
              "replacement": "替代key是：demo.config.age22",
              "level": "warning"
            }
    }
]}
```

大家参考下面`properties`表格进行配置上的理解。

| 名称         | 类型   | 目的                                                         |
| ------------ | ------ | ------------------------------------------------------------ |
| name         | String | 属性的全名。名称采用小写的周期分隔形式(例如server.address)。此属性是强制性的。 |
| type         | String | 属性的数据类型的完整签名（例如java.lang.String），但也是完整的泛型类型（例如java.util.Map<java.util.String,acme.MyEnum>）。您可以使用此属性来指导用户可以输入的值的类型。为了保持一致性，通过使用其包装对应项（例如，boolean变为java.lang.Boolean）来指定基元的类型。请注意，此类可能是一个复杂类型，它从Stringas绑定的值转换而来。`如果类型未知或基本类型，则可以省略。` |
| description  | String | 可以向用户显示的组的简短描述。如果没有可用的描述，则可以省略。建议描述为简短段落，第一行提供简明摘要。描述中的最后一行应以句点（.）结尾。 |
| sourceType   | String | 贡献此属性的源的类名称。例如，如果属性来自带注释的类@ConfigurationProperties，则此属性将包含该类的完全限定名称。如果源类型未知，则可以省略。 |
| defaultValue | Object | 默认值，如果未指定属性，则使用该值。如果属性的类型是数组，则它可以是值数组。如果默认值未知，则可以省略。 |
| deprecation  | 数组   | 过时的描述。                                                 |

`deprecation`每个`properties`元素的属性中包含的JSON对象可以包含以下属性：

| 名称        | 类型   | 目的                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| level       | String | 弃用级别，可以是warning（默认）或error。当属性具有warning弃用级别时，它仍应绑定在环境中。但是，当它具有error弃用级别时，该属性不再受管理且不受约束。 |
| reason      | String | 该属性被弃用的原因的简短描述。如果没有可用的原因，可以省略。建议描述为简短段落，第一行提供简明摘要。描述中的最后一行应以句点（.）结尾。 |
| replacement | String | 替换此不推荐使用的属性的属性的全名。如果此属性没有替换，则可以省略。 |

**spring-configuration-metadata.json**

spring-configuration-metadata.json代码量挺大的，为了方便我们可以通过IDE来生成，这里使用的是idea。

**在idea设置中搜索Annotation Processors，接下来勾住Enable annonation processing就完成了。 在编译打包后的文件中看到自动生成的spring-configuration-metadata.json。这个文件不用我们编写**

![image-20220218111135506](https://s2.loli.net/2022/03/31/XVljw8z72YBQ3OJ.png)

自动生成的 json 文件可以在 target 下的 META-INF 中看见：

![image-20220218110929396](https://s2.loli.net/2022/03/31/v4n2FAJS17ehZUT.png)

下面是自动生成的：

```json
{
  "groups": [
    {
      "name": "demo.config",
      "type": "com.company.demospringbootstarter.config.DemoProperties",
      "sourceType": "com.company.demospringbootstarter.config.DemoProperties"
    }
  ],
  "properties": [
    {
      "name": "demo.config.age",
      "type": "java.lang.Integer",
      "sourceType": "com.company.demospringbootstarter.config.DemoProperties",
      "defaultValue": 8
    },
    {
      "name": "demo.config.name",
      "type": "java.lang.String",
      "sourceType": "com.company.demospringbootstarter.config.DemoProperties",
      "defaultValue": "Hello Starter！"
    }
  ],
  "hints": []
}
```

## 测试 starter 

编写完毕之后，我们在 maven 控制台执行 clean 、compiler 、package 、install 的操作。

> 在这一步发现一些问题，在进行打包的时候，发现 test 文件夹下的类提示没有依赖。直接将 test 文件夹删除即可。

新建项目：demo-test-spring-boot-starter 进行测试。

### 一、导入自定义起步依赖

```xml
<!--添加自定义的依赖-->
<dependency>
    <groupId>com.company</groupId>
    <artifactId>demo-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

输入 artifactId 即可，在安装依赖之后版本信息一般会自动填充。

### 二、编写测试类

```java
@Service
public class TestController implements CommandLineRunner {

    /**
     * 注入自定义starter服务，这里使用 @Autowired 注入也可以
     */
    @Resource
    private DemoService demoService;

    @Override
    public void run(String... args) throws Exception {
        System.out.println(demoService.demo());
    }
}
```

### 三、执行测试类

直接运行测试项目的启动类，提示错误：没有定义好 DemoService 的类，推荐我定义一个同名的 Bean 。

经过一番折腾，终于成功运行，运行结果如下：

![image-20220218114111294](https://s2.loli.net/2022/03/31/tbArlEcO1SPsoBH.png)

## 问题总结

前面测试一直不成功的原因：

- 之前封装的过程中，DemoService 类上不需要标注 @Service 注解。我没有标注该注解，但是还是发生了其他问题。

- spring.factories 文件需要定义在 target 文件夹下，自己在 resource 下添加 META-INF 文件夹会导致打包之后 target 下出现两个 META-INF 文件夹，导致一直读取不到 spring.factories 文件。正确操作是在执行 mvn:compiler 之后，将生成的相关文件（除了application.properties文件）全部剪贴到 META-INF 下。

  ![image-20220218114719959](https://s2.loli.net/2022/03/31/kw23789fVahIQuE.png)正确的 target 文件夹应该如上所示。

> 参考文件：
>
> 作者：小伙子vae
> 链接：https://juejin.cn/post/7047674475331977224
> 来源：稀土掘金
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
