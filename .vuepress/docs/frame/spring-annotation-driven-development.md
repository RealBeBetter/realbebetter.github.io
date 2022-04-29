---
title: 【Java】Spring注解驱动开发
date: 2021-06-13 21:34:12
tags:
- Java
---

## 一、配置注解

首先进行一个注解案例的开发：创建数据库，然后创建JdbcTemplate对象，对数据库进行插入数据的操作。

一、创建数据库对象

```mysql
create database spring_ioc;
use spring_ioc;
create table account{
  id int primary key auto_increment,
  name varchar(50),
  money double(7,2),
  }
```

二、创建一个Maven工程，导入下面的依赖jar包

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.5.RELEASE</version>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.0.5.RELEASE</version>
  </dependency>
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
  </dependency>
</dependencies>
```

三、创建JdbcConfig类，要求返回一个JdbcTemplate类

首先构建一个jdbc.properties配置文件

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring_ioc
jdbc.username=root
jdbc.password=123456
```

```java
public class JdbcConfig {
  /*
   * 配置和jDBC操作相关的信息
   * */

  @Value("${jdbc.driver}")
  private String driver;
  @Value("${jdbc.url}")
  private String url;
  @Value("${jdbc.username}")
  private String username;
  @Value("${jdbc.password}")
  private String password;

  // 创建JdbcTemplate对象，并将其存入ioc容器
  @Bean("jdbcTemplate")
  public JdbcTemplate createJdbcTemplate(@Autowired DataSource dataSource) {
    return new JdbcTemplate(dataSource);
  }

  // 创建数据源
  @Bean
  public DataSource createDataSource() {
    // 1. 创建Spring默认的数据源对象
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    // 2. 给数据源配置需要的配置信息
    dataSource.setDriverClassName(driver);
    dataSource.setUrl(url);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    // 3. 返回
    return dataSource;
  }
}
```

四、创建Spring的主配置类SpringConfiguration

```java
@Configuration
@PropertySource("classpath:jdbc.properties")
@Import(JdbcConfig.class)
public class SpringConfiguration {

}
```

五、在Test下创建测试类SpringAnnotationTest

```java
public class SpringAnnotationTest {
  public static void main(String[] args) {
    // 1. 基于注解配置开发的方式创建容器
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
    // 2. 根据id获取Bean
    JdbcTemplate jdbcTemplate = ac.getBean("jdbcTemplate", JdbcTemplate.class);
    // 3. 执行操作
    int test = jdbcTemplate.update("insert into account(name, money) values(?, ?)", "test", 12345);
    // 4. 打印操作结果
    System.out.println(test);
  }
}
```

运行结果正常，最终也能正常输出执行的结果。

注意事项：

①创建JdbcTemplate类的时候，要将数据源对象注入。在ioc容器中因为只存在一个DataSource类的Bean，所以参数上的@Autowired其实也不用写。但是如果后期对象数量变多，为了避免注入的混乱，最好还是加入@Autowired注解

②`@PropertySource("classpath:jdbc.properties")`该行注解案例中是添加在主配置类中的，但是也可以添加在创建JdbcTemplate类的JdbcConfig类之前

③`@Bean`本质上就是将方法的返回结果注入到ioc容器中

## 二、基础注解详解

### @Configuration

@Configuration用于定义配置类，可替换xml配置文件，被注解的类内部包含有一个或多个被@Bean注解的方法，这些方法将会被`AnnotationConfigApplicationContext`或`AnnotationConfigWebApplicationContext`类进行扫描，并用于构建bean定义，初始化Spring容器。

@Configuration标注在类上，相当于把该类作为spring的xml配置文件中的`<beans>`，作用为：配置spring容器(应用上下文)

```java
@Configuration("springConfiguration")
public class SpringConfiguration {

}
```

```java
public class SpringConfigurationTest {
  public static void main(String[] args) {
    // 1. 创建容器
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
    // 2. 获取对象
    SpringConfiguration bean = ac.getBean("springConfiguration", SpringConfiguration.class);
    // 3. 调用对象
    System.out.println(bean);
  }
}
```

### @ComponentScan

@ComponentScan的作用就是根据后面指定的扫描路径，将符合规则的类装配到Spring容器中。

基础属性包含：`value = “package”`、`basePackages = "package"`以及`basePackageClasses = UserService.class`

其中，第一个和第二个的使用以及含义差不多，都是指定路径扫描，将路径下相符的类装配进容器。`basePackageClasses = UserService.class`的规则则是将`UserService`类所在的位置的父文件夹下的所有文件扫描，将其中包含的符合规则的类装配进Spring容器。如果不指定，则扫描的是该注解所在的包下的所有类以及所有子包下的类（@ComponentScan所在的类的第一行代码指定的package下的所有类）。

```java
@Configuration
@ComponentScan(value = "service", basePackages = "service", basePackageClasses = UserService.class)
public class SpringConfiguration {
}

/*
public static boolean hasText(@Nullable String str) {
    return str != null && !str.isEmpty() && containsText(str);
}
protected String buildDefaultBeanName(BeanDefinition definition, BeanDefinitionRegistry registry) {
    return buildDefaultBeanName(definition);
}
protected String buildDefaultBeanName(BeanDefinition definition) {
    String beanClassName = definition.getBeanClassName();
    Assert.state(beanClassName != null, "No bean class name set");
    String shortClassName = ClassUtils.getShortName(beanClassName);
    return Introspector.decapitalize(shortClassName);
}
public static String decapitalize(String name) {
    if (name == null || name.length() == 0) {
        return name;
    }
    if (name.length() > 1 && Character.isUpperCase(name.charAt(1)) &&
                    Character.isUpperCase(name.charAt(0))){
        return name;
    }
    char[] chars = name.toCharArray();
    chars[0] = Character.toLowerCase(chars[0]);
    return new String(chars);
}
 */
```

首先来看看测试类，测试类获取对象之后调用方法。根据上面定义的扫描规则，成功获取到UserService及其实现类UserServiceImpl。

```java
public class SpringComponentScanTest {
  public static void main(String[] args) {
    // 1. 创建容器
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
    // 2. 获取对象
    UserService userService = ac.getBean("userService", UserService.class);
    // 3. 调用方法
    userService.saveUser();
  }
}
```

通过下面的源码，来看看我们在BeanNameGenerator的默认运行规则。

```java
public static boolean hasText(@Nullable String str) {
        return str != null && !str.isEmpty() && containsText(str);
        }
protected String buildDefaultBeanName(BeanDefinition definition, BeanDefinitionRegistry registry) {
        return buildDefaultBeanName(definition);
        }
protected String buildDefaultBeanName(BeanDefinition definition) {
        String beanClassName = definition.getBeanClassName();
        Assert.state(beanClassName != null, "No bean class name set");
        String shortClassName = ClassUtils.getShortName(beanClassName);
        return Introspector.decapitalize(shortClassName);
        }
public static String decapitalize(String name) {
        if (name == null || name.length() == 0) {
        return name;
        }
        if (name.length() > 1 && Character.isUpperCase(name.charAt(1)) &&
        Character.isUpperCase(name.charAt(0))){
        return name;
        }
        char[] chars = name.toCharArray();
        chars[0] = Character.toLowerCase(chars[0]);
        return new String(chars);
        }
```

首先判断BeanName是否设置有值，如果没有值则通过`buildDefaultBeanName`创建默认的`BeanName`。BeanName创建之前，首先利用`getShortName`获取到类的名字，将名字通过`decapitalize`方法将类的首字母转换为小写字母，之后就将名字作为BeanName。

### BeanNameGenerator生成规则

创建一个自定义的`BeanNameGenerator`类：

```java
public class CustomBeanNameGenerator implements BeanNameGenerator {

    /*
    *
    * @Override
   public String generateBeanName(BeanDefinition definition, BeanDefinitionRegistry registry) {
      if (definition instanceof AnnotatedBeanDefinition) {
         String beanName = determineBeanNameFromAnnotation((AnnotatedBeanDefinition) definition);
         if (StringUtils.hasText(beanName)) {
            // Explicit bean name found.
            return beanName;
         }
      }
      // Fallback: generate a unique default bean name.
      return buildDefaultBeanName(definition, registry);
   }
    * */

  private static final String COMPONENT_ANNOTATION_CLASSNAME = "org.springframework.stereotype.Component";

  @Override
  public String generateBeanName(BeanDefinition definition, BeanDefinitionRegistry registry) {
    String beanName = null;
    // 1. 判断当前bean的定义信息是否是注解的
    if (definition instanceof AnnotatedBeanDefinition) {
      // 2. 把definition转成注解的bean的定义信息
      AnnotatedBeanDefinition annotatedBeanDefinition = (AnnotatedBeanDefinition) definition;
      // 3. 获取bean定义的元信息
      AnnotationMetadata metadata = annotatedBeanDefinition.getMetadata();
      // 4. 获取定义信息中的所有注解
      Set<String> annotationTypes = metadata.getAnnotationTypes();
      // 5. 遍历annotationTypes
      for (String type : annotationTypes) {
        // 6. 得到的注解属性
        AnnotationAttributes attributes = AnnotationAttributes.fromMap(metadata.getAnnotationAttributes(type, false));
        // 7. 判断attributes是否为null，同时必须是@Component及其衍生注解
        if (attributes != null && isStereotypeWithNameValue(type, metadata.getMetaAnnotationTypes(type), attributes)) {
          // 8. 获取value属性的值
          Object value = attributes.get("value");
          // 9. 判断value属性是否是String类型
          if (value instanceof String) {
            String strVal = (String) value;
            // 10. 判断value属性是否有值
            if (StringUtils.hasLength(strVal)) {
              if (beanName != null && !strVal.equals(beanName)) {
                throw new IllegalStateException("Stereotype annotations suggest inconsistent " +
                        "component names: '" + beanName + "' versus '" + strVal + "'");
              }
              beanName = strVal;
            }
          }
        }
      }
    }
    return beanName != null ? "my" + beanName : "my" + buildDefaultBeanName(definition);
  }

  private boolean isStereotypeWithNameValue(String annotationType,
                                            Set<String> metaAnnotationTypes, @Nullable Map<String, Object> attributes) {

    boolean isStereotype = annotationType.equals(COMPONENT_ANNOTATION_CLASSNAME) ||
            metaAnnotationTypes.contains(COMPONENT_ANNOTATION_CLASSNAME) ||
            annotationType.equals("javax.annotation.ManagedBean") ||
            annotationType.equals("javax.inject.Named");

    return (isStereotype && attributes != null && attributes.containsKey("value"));
  }

  private String buildDefaultBeanName(BeanDefinition definition) {
    String beanClassName = definition.getBeanClassName();
    Assert.state(beanClassName != null, "No bean class name set");
    String shortClassName = ClassUtils.getShortName(beanClassName);
    return Introspector.decapitalize(shortClassName);
  }
}
```

其中重写的方法的返回值返回的就是自定义的命名规则，在前面加上了my。那么这个时候之前通过Service定义的BeanName就无法再使用了。需要在创建Bean对象的时候将名字指定成符合自定义的BeanName生成器指定的规则，然后才能正常创建，否则将会提示没有这样的bean对象。

使用自定义的BeanNameGenerator的时候，需要在主配置类中指定自定义的BeanName生成器。

```java
@Configuration
@ComponentScan(basePackageClasses = UserService.class, nameGenerator = customer.CustomBeanNameGenerator.class)
public class SpringConfiguration {
}
```

然后再将测试类中的getBean方法参数的BeanName修改成指定规则。

```java
public class SpringComponentScanTest {
  public static void main(String[] args) {
    // 1. 创建容器
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
    // 2. 获取对象
    UserService userService = ac.getBean("myuserService", UserService.class);
    // 3. 调用方法
    userService.saveUser();
  }
}
```

在第二步的时候获取对象指定成了自定义的BeanName的规则，这样才能正常运行。

### TypeFilter自定义组件扫描过滤规则

业务需求：实现@ComponentScan过滤器扫描中根据业务需要扫描不同的实现类（扫描相对应的package）

业务实现：借助汽车销售行业中，针对不同的分区以及汽车类型，计算不同的提成以及绩效。

![image-20210831102840825](https://s2.loli.net/2022/04/06/3WhaMKyCkO9zHUJ.png)

类图如上所示。需要实现的目标就是达到修改配置文件就能修改计算的分区的目的。先来看看项目结构：

![image-20210615164011142](https://s2.loli.net/2022/04/06/cOkWsnbd1X5CTwa.png)

当我们需要计算North区域的时候，我们就指定扫描northImpl包；反之，则扫描Southwest。

一、为了后期区分开销售区域，我们要创建一个新的自定义的注解，后期根据注解扫描指定的区域

创建annotations.District注解

```java
/*用于定义区域的注解*/
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface District {

    /*用于指定区域名称*/
    String value();
}
```

二、创建service包，并且创建相对应的接口，分别对应计算提成percentage以及绩效performance

```java
/*销售分成的桥接接口*/
public interface DistrictPercentage {
    /*不同类型的提成不同：CAR SUV*/
    void salePercentage(String type);
}
```

```java
/*绩效计算的桥接接口*/
public interface DistrictPerformance {
    /*根据不同车辆类型计算绩效*/
    void calcPerformance(String type);
}
```

三、在service包下，根据不同的地区规则创建不同的对应实现类

north华北区：创建northImpl包，创建两个对应的实现类

```java
/*华北区的销售分成具体实现*/
@Service("districtPercentage")
@District("north")
public class NorthDistrictPercentage implements DistrictPercentage {
    @Override
    public void salePercentage(String type) {
        if ("SUV".equalsIgnoreCase(type)) {
            System.out.println("华北区" + type + "提成1%");
        } else if ("CAR".equalsIgnoreCase(type)) {
            System.out.println("华北区" + type + "提成0.5%");
        }
    }
}
```

```java
/*华北区绩效计算的具体实现*/
@Service("districtPerformance")
@District("north")
public class NorthDistrictPerformance implements DistrictPerformance {
    @Override
    public void calcPerformance(String type) {
        if ("SUV".equalsIgnoreCase(type)) {
            System.out.println("华北区" + type + "绩效是3");
        } else if ("CAR".equalsIgnoreCase(type)) {
            System.out.println("华北区" + type + "绩效是5");
        }
    }
}
```

southwest西南区：创建对应的southwest包，创建对应的两个实现类

```java
/*西南区提成计算的具体实现*/
@Service("districtPercentage")
@District("southwest")
public class SouthwestDistrictPercentage implements DistrictPercentage {
    @Override
    public void salePercentage(String type) {
        if ("SUV".equalsIgnoreCase(type)) {
            System.out.println("西南区" + type + "提成1.5%");
        } else if ("CAR".equalsIgnoreCase(type)) {
            System.out.println("西南区" + type + "提成0.5%");
        }
    }
}
```

```java
/*西南区绩效计算的具体实现*/
@Service("districtPerformance")
@District("southwest")
public class SouthwestDistrictPerformance implements DistrictPerformance {
    @Override
    public void calcPerformance(String type) {
        if ("SUV".equalsIgnoreCase(type)) {
            System.out.println("西南区" + type + "绩效是5");
        } else if ("CAR".equalsIgnoreCase(type)) {
            System.out.println("西南区" + type + "绩效是3");
        }
    }
}
```

这个时候，我们用@Service注解将两个分区的业务逻辑计算都使用了相同的BeanName注入。这个时候后期根据统一的BeanName以及设定的扫描规则，我们就能获取到想要的分区计算实现类。

四、创建配置文件district.properties。后期想要更改业务计算的分区，直接修改后面的值即可

```properties
common.district.name=north
```

五、创建自定义扫描过滤器。创建typefilter包，创建DistrictTypeFiler类

```java
// 自定义扫描过滤器
public class DistrictTypeFilter extends AbstractTypeHierarchyTraversingFilter {

    // 定义一个路径校验的对象
    private PathMatcher pathMatcher;

    // 定义区域名称
    // 此处的数据应该是读配置文件获取的，但是不能使用@Value读取properties文件内容
    // 此处负责填充属性的是InstantiationAwareBeanPostProcessor与TypeFilter的实例不一样
    private String districtName;

    public DistrictTypeFilter() {
        // 调用父类的构造函数
        // 第一个参数表示是否考虑基类上的信息，第二个参数表示是否考虑接口上的信息
        super(false, false);

        // 借助Spring默认的Resource通配符的方式
        pathMatcher = new AntPathMatcher();

        // 读取配置文件（硬编码）
        try {
            Properties properties = PropertiesLoaderUtils.loadAllProperties("district.properties");
            // 给 DistrictName 赋值
            districtName = properties.getProperty("common.district.name");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 本类将注册为Exclude，返回true则表示拒绝
    @Override
    protected boolean matchClassName(String className) {
        try {
            // 判断是否在指定包下的类（只处理和区域相关的类）
            if (!isPotentialPackageClass(className)) {
                // 不符合规则，不处理，直接返回
                return false;
            }
            // 判断当前区域和配置的区域是否一致，不一致则不能注册到ioc容器中
            Class<?> clazz = ClassUtils.forName(className, DistrictTypeFilter.class.getClassLoader());
            // 获取District注解
            District district = clazz.getAnnotation(District.class);
            // 判断是否有此注解
            if (district == null) {
                return false;
            }
            // 取出District的属性
            String districtValue = district.value();
            // 校验，如果取出的值和配置文件中提供的一致，则注入到ioc容器中，返回true；否则返回false
            return (!districtName.equalsIgnoreCase(districtValue));
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

    // 定义可以处理的类的类名，指定的package下的
    private static final String PATTERN_STANDARD = ClassUtils.convertClassNameToResourcePath("service.*.*");

    // 本类逻辑中可以处理的类
    private boolean isPotentialPackageClass(String className) {
        // 1. 将类名转换成为资源路径，以匹配是否符合扫描条件
        String path = ClassUtils.convertClassNameToResourcePath(className);
        // 2. 校验是否符合条件
        return pathMatcher.match(PATTERN_STANDARD, path);
    }
}
```

本类编写过程较为复杂。核心逻辑就是指定过滤规则（此处指定为Exclude），通过构造方法以及matchClassName方法对获取到的className与目标进行路径与名称校验。

六、创建测试类，进行测试

```java
public class SpringFilterTest {
    public static void main(String[] args) {
        // 1. 创建容器
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // 2. 获取对象
        DistrictPercentage districtPercentage = ac.getBean("districtPercentage", DistrictPercentage.class);
        // 3. 调用方法
        districtPercentage.salePercentage("SUV");

        // 获取对象
        DistrictPerformance districtPerformance = ac.getBean("districtPerformance", DistrictPerformance.class);
        // 调用方法
        districtPerformance.calcPerformance("SUV");
    }
}
```

当前properties文件中的值为north，计算的是华北区。运行结果如下所示：

> 华北区SUV提成1%
> 华北区SUV绩效是3

### @Bean

@Bean注解写在方法上时，是将方法的返回值注入到IOC容器中。

一、创建主配置类SpringConfiguration类

```java
@Configuration
public class SpringConfiguration {

    // 创建数据源对象
    @Bean(name = "dataSource")  // 写在方法上时，是将方法的返回值注入到IOC容器中
    public DataSource getDataSource() {
        return new DriverManagerDataSource();
    }

    // 创建JdbcTemplate对象
    @Bean("jdbcTemplate")
    public JdbcTemplate getJdbcTemplate(@Autowired DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

二、创建测试类SpringBeanTest类

```java
public class SpringBeanTest {
    public static void main(String[] args) {
        // 1. 创建ioc容器
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // 2. 获取对象
        DataSource dataSource = ac.getBean("dataSource", DataSource.class);
        // 3. 调用对象
        System.out.println(dataSource);

        // 获取JdbcTemplate对象
        JdbcTemplate jdbcTemplate = ac.getBean("jdbcTemplate", JdbcTemplate.class);
        // 调用对象获取数据源
        System.out.println(jdbcTemplate.getDataSource());
    }
}
```

注意：`@Bean`注解是将方法的返回值注入到ioc容器中。如果不指定name或者value（两者含义作用相同，都是指定Bean对象在ioc容器中的名字），那么默认注入的名称将会是**方法的名称**。这一点可以通过编程的方式得到验证。此外，`@Bean`注解中还包含initMethod初始化方法以及destroyMethod销毁方法。

在没有指定@Bean注解的名称的情况下，如果出现方法重载，那么根据定义的顺序，将只会把最后一个定义的方法的返回值存入ioc容器中。因为是将返回值注入到ioc容器中，如果方法返回的是void类型，将会报错，提示不能是一个void返回类型的。

```java
// 创建JdbcTemplate对象
@Bean("jdbcTemplate")
public JdbcTemplate getJdbcTemplate() {
    DataSource dataSource = new DriverManagerDataSource();
    System.out.println("执行了无参的JdbcTemplate方法");
    return new JdbcTemplate(dataSource);
}

// 创建JdbcTemplate对象
@Bean("jdbcTemplate")
public JdbcTemplate getJdbcTemplate(@Autowired DataSource dataSource) {
    System.out.println("执行了带参的JdbcTemplate方法");
    return new JdbcTemplate(dataSource);
}
```

这种情况下，将只输出带参的方法中的语句，因为第二个方法与第一个方法构成了重载，根据配置顺序，将只会注入第二个方法返回的Bean对象。

此外，还支持自定义的@Bean注解。

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
@Bean
public @interface MyBean {
}
```

这样编写完毕之后，我们就能在方法上使用该注解的名字（MyBean）作为新的注解@MyBean。这也是为什么源码之中提到Bean可以放在类上面的原因。

```java
// 创建JdbcTemplate对象
@MyBean
public JdbcTemplate getJdbcTemplate() {
    System.out.println("执行了自定义Bean的JdbcTemplate方法");
    return new JdbcTemplate(new DriverManagerDataSource());
}
```

这样的注解通过上面的自定义，也是能够正常注入并运行的。默认名称因为创建自定义@Bean注解的时候并没有特殊指定，所以与默认的情况一致，使用方法名称作为bean对象的名称。

### @Import

`@Import`注解存在的作用就是将其他的类导入到ioc容器中。这样只需要在主配置类上写上@Import注解即可。

源码如下所示：

```java
public @interface Import {

   /**
    * {@link Configuration}, {@link ImportSelector}, {@link ImportBeanDefinitionRegistrar}
    * or regular component classes to import.
    */
   Class<?>[] value();

}
```

一、创建JdbcConfig类，作为Jdbc连接时候需要使用的相关类

```java
public class JdbcConfig {
    // 获取数据源
    @Bean("dataSource")
    public DataSource createDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/spring_ioc");
        dataSource.setUsername("root");
        dataSource.setPassword("123456");
        return dataSource;
    }
}
```

二、创建主配置类SpringConfiguration类，在该处使用@Import注解将JdbcConfig类导入到ioc容器中

```java
@Configuration
@Import(JdbcConfig.class)
public class SpringConfiguration {
}
```

该处的导入是以字节码的形式导入，如果使用别的形式那就不需要@Import了。

三、创建测试类SpringImportTest类

```java
public class SpringImportTest {
    public static void main(String[] args) {
        // 1. 创建容器
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(SpringConfiguration.class);
        // 2. 获取对象
        DataSource dataSource = ac.getBean("dataSource", DataSource.class);
        // 3. 调用方法
        System.out.println(dataSource);

        // 获取JdbcConfig的Bean对象
        JdbcConfig jdbcConfig = ac.getBean(JdbcConfig.class);
        System.out.println(jdbcConfig);
    }
}
```

因为Spring的加载机制，我们在使用`@Import`注解的时候，会首先导入整个类，之后再导入类中的成员变量以及成员方法。所以根据这个逻辑，JdbcConfig类也会同步加载到ioc容器中。上述测试类的运行结果如下所示：

> org.springframework.jdbc.datasource.DriverManagerDataSource@e056f20
> config.JdbcConfig@57c758ac

值得一提的是上述在获取到JdbcConfig类的Bean对象的时候，如果使用通过beanName的方式获取Bean对象（使用默认Name，类名，JdbcConfig），这个时候会报错，提示没有名为JdbcConfig的Bean对象。

使用如下的方法获取到ioc容器中所有的bean的名字：

```java
// 获取容器中所有Bean的Name唯一标识
String[] names = ac.getBeanDefinitionNames();
for (String name : names) {
    System.out.println(name);
}
```

我们可以得到打印的结果如下：

> org.springframework.context.annotation.internalConfigurationAnnotationProcessor
> org.springframework.context.annotation.internalAutowiredAnnotationProcessor
> org.springframework.context.event.internalEventListenerProcessor
> org.springframework.context.event.internalEventListenerFactory
> springConfiguration
> config.JdbcConfig
> dataSource

除去默认的四个bean对象，我们自定义的注入对象一共有三个。springConfiguration，该Bean对象是主配置类中使用@Configuration自动装载进ioc容器中的。这个命名是根据之前BeanNameGenerator可以得知，将类的首字母小写，其余的不变。dataSource是使用@Bean注入到容器中。可以得知，使用@Import注解导入的JdbcConfig类，名为config.JdbcConfig，名字格式为`packageName.className`，即全限定类名。

通过上面的源码我们可以得知，@Import注解还有两个功能：`ImportSelector`以及`ImportBeanDefinitionRegistrar`

### ImportSelector

ImportSelector意为导入选择器。作用是可以根据指定的导入器的规则，指定导入的包的范围。

具体使用方法为：在Spring主配置类上加上`@Import(ImportSelectorName.class)`

实施步骤：

一、创建业务的接口以及实现类

```java
public interface UserService {
    void saveUser();
}
```

```java
public class UserServiceImpl implements UserService {
    @Override
    public void saveUser() {
        System.out.println("模拟保存用户");
    }
}
```

二、创建importSelector.CustomerImportSelector类，作为导入选择器的规则类

```java
/**
 * 自定义导入器
 * @ author： 雨下一整晚Real
 * @ date： 2021年06月16日 15:51
 */
public class CustomerImportSelector implements ImportSelector {

    // 表达式（AspectJ表达式）
    private String expression;

    // 默认构造函数，用于给表达式赋值
    public CustomerImportSelector() {
        try {
            // 1. 读取properties文件
            Properties properties = PropertiesLoaderUtils.loadAllProperties("customerImport.properties");
            // 2. 获取表达式的值
            String property = properties.getProperty("customer.importSelector.expression");
            // 3. 给表达式赋值
            expression = property;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 实现获取需要的导入类的字节码
    // 导入过滤规则TypeFilter采用aspectJ表达式的方式
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        // 1. 定义扫描包的名称
        String[] basePackages = null;
        // 2. 判断有@Import注解的类上是否有@ComponentScan注解
        if (importingClassMetadata.hasAnnotation(ComponentScan.class.getName())) {
            // 3. 如果有，取出@ComponentScan注解的属性
            Map<String, Object> attributes = importingClassMetadata.getAnnotationAttributes(ComponentScan.class.getName());
            // 4. 取出basePackages属性的值
            basePackages = (String[]) attributes.get("basePackages");
        }
        // 5. 判断是否有此注解，是否指定了包的扫描信息
        // 两种情况：无注解修饰，无值；有注解没有指定值（将会扫描配置类所在的包，有值但为空，长度为0）
        if (basePackages == null || basePackages.length == 0) {
            String basePackage = null;
            try {
                // 6. 取出@Import修饰的类所在的包的名称
                basePackage = Class.forName((importingClassMetadata.getClassName())).getPackage().getName();
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            // 7. 把包名填充到basePackages中
            basePackages = new String[]{basePackage};
        }
        // 8. 创建类路径扫描器，参数表示是否使用默认的过滤器
        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        // 9. 创建类型过滤器（使用AspectJ表达式类型的过滤器）
        TypeFilter typeFilter = new AspectJTypeFilter(expression, CustomerImportSelector.class.getClassLoader());
        // 10. 把类型过滤器添加到扫描器中
        scanner.addIncludeFilter(typeFilter);
        // 11. 定义一个要扫描的类的全限定类名的集合
        Set<String> classes = new HashSet<String>();
        // 12. 遍历，填充集合的内容
        for (String basePackage : basePackages) {
            scanner.findCandidateComponents(basePackage).forEach(beanDefinition -> classes.add(beanDefinition.getBeanClassName()));
        }
        // 13. 按照方法的返回值规定返回一个String数组
        return classes.toArray(new String[classes.size()]);
    }
}
```

三、编写导入选择器中要使用的AspectJ表达式的properties文件customerImport.properties

```properties
customer.importSelector.expression=com.company.service.impl.*
```

四、编写Spring的主配置类config.SpringConfiguration类

```java
@Configuration
@ComponentScan(basePackages = {"service", "config", "importSelector"})
@Import(CustomerImportSelector.class)
public class SpringConfiguration {
}
```

五、在test中编写测试类，test.SpringImportSelectorTest

```java
public class SpringImportSelectorTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        UserService userService = ac.getBean("service.impl.UserServiceImpl", UserService.class);
        userService.saveUser();
    }
}
```

### @PropertySource

@PropertySource注解，是导入properties配置文件的注解。

使用步骤如下：

一、创建一个JDBC的配置类，用于获取数据源并且创建连接

```java
public class JdbcConfig {

    @Value("${jdbc.driver}")
    private String driver;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    @Bean("dataSource")
    public DataSource createDataSource() {
        System.out.println("驱动是：" + driver);
        // 1. 创建Spring内置数据源
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        // 2. 给数据源填充内部属性
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
```

这样的编写方式意味着我们需要创建一个properties文件用于获取对应的连接。

二、创建jdbc.properties文件

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring_ioc?serverTimezone=GMT&allowPublicKeyRetrieval=true&useSSL=false&characterEncoding=utf8
jdbc.username=root
jdbc.password=123456
```

三、创建主配置类SpringConfiguration.class

```java
@Configuration
@Import(JdbcConfig.class)
@PropertySource("classpath:jdbc.properties")
public class SpringConfiguration {
}
```

四、创建测试类SpringPropertySourceTest

```java
public class SpringPropertySourceTest {
    public static void main(String[] args) throws SQLException {
        // 1. 创建容器
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // 2. 获取对象
        DataSource dataSource = ac.getBean("dataSource", DataSource.class);
        // 3. 调用方法
        Connection connection = dataSource.getConnection();
        System.out.println(connection);
    }
}
```

运行之后能够成功获取到数据源的连接。

注意：@PropertySource会有一个版本兼容的问题。在Spring4.3之后，会有一个properties文件解析器的配置，Spring会自动使用Properties文件解析器会使用默认的资源文件解析器PropertySourcesPlaceholderConfigurer类的唯一实现类DefaultPropertySourcesPlaceholderConfigurer。Spring4.3之后，就不会需要自己配置。在4.3版本之前，我们会使用如下的配置：

```java
// 注册资源文件解析器的Bean到ioc容器中 4.3之前版本需要，4.3版本之后基本不需要
// Properties文件解析器会使用默认的资源文件解析器的唯一实现类DefaultPropertySourcesPlaceholderConfigurer
@Bean
public static PropertySourcesPlaceholderConfigurer createPropertySourcesPlaceholderConfigurer() {
    return new PropertySourcesPlaceholderConfigurer();
}
```

默认实现的类源码如下：

```java
public class DefaultPropertySourceFactory implements PropertySourceFactory {
    public DefaultPropertySourceFactory() {
    }

    public PropertySource<?> createPropertySource(@Nullable String name, EncodedResource resource) throws IOException {
        return name != null ? new ResourcePropertySource(name, resource) : new ResourcePropertySource(resource);
    }
}
```

默认提供的实现类通过上面的方式创建PropertySource对象。运行逻辑就是判断是否有name，然后根据情况判断是否需要默认的名字构造，再调用相应的方法。

### properties和xml

在使用配置文件的时候，可以使用properties格式，也可以使用xml格式。

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring_ioc?serverTimezone=GMT&allowPublicKeyRetrieval=true&useSSL=false&characterEncoding=utf8
jdbc.username=root
jdbc.password=123456
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <entry key="jdbc.driver">com.mysql.jdbc.Driver</entry>
    <entry key="jdbc.url">jdbc:mysql://localhost:3306/spring_ioc</entry>
    <entry key="jdbc.username">root</entry>
    <entry key="jdbc.password">123456</entry>
</properties>
```

两者配合@PropertySource注解都能实现相应的功能。对比来说，properties文件更加简洁高效，而xml文件则更加繁琐。因为xml文件是标签的格式，所以可以更好的体现层级关系，而properties文件则不具备。xml文件在行末的空格，也会占据一定的内存空间，在传输的时候就要占据更多的带宽，从而影响加载速度。
在实际使用中，我们更多使用properties文件。但是为了弥补properties文件不能体现层级关系的短板，出现了一种新的文件格式yml文件。

### yml/yaml

创建jdbc.yml配置文件，如下：

```yaml
# Yet Another Markup Language 另一种标记语言
# YAML yml
# 写法：同一级顶头写
# 描述层级关系：另起一行，通常空两格写。同一级层级，空格数相同即可
# 键和值之间用冒号+空格分隔
jdbc:
  driver: com.mysql.jdbc.Driver
  url: jdbc:mysql://localhost:3306/spring_ioc?serverTimezone=GMT&allowPublicKeyRetrieval=true&useSSL=false&characterEncoding=utf8
  username: root
  password: 123456
#redis:
  #host:192.168.22.161
  #port:6379
```

之后要使用自定义解析的yaml文件的工厂类：

```java
/**
 * 自定义解析yaml文件的工厂类
 * @ author： Real
 * @ date： 2021年06月21日 13:49
 */
public class YamlPropertySourceFactory implements PropertySourceFactory {
    // 自定义解析规则，引入了第三方yaml文件解析器
    @Override
    public PropertySource<?> createPropertySource(String name, EncodedResource resource) throws IOException {
        // 1. 创建yaml文件解析工厂
        YamlPropertiesFactoryBean factoryBean = new YamlPropertiesFactoryBean();
        // 2. 获取解析的Resource
        factoryBean.setResources(resource.getResource());
        // 3. 把资源解析成properties文件
        Properties properties = factoryBean.getObject();
        // 4. 返回PropertySource对象
        return name != null ? new PropertiesPropertySource(name, properties) : new PropertiesPropertySource(resource.getResource().getFilename(), properties);
    }
}
```

整个项目的pom.xml配置文件中，需要加上相关的坐标：

```xml
<!--导入yaml解析器-->
<dependency>
    <groupId>org.yaml</groupId>
    <artifactId>snakeyaml</artifactId>
    <version>1.23</version>
</dependency>
```

Spring主要的配置类：

```java
@Configuration
@PropertySource(value = "classpath:jdbc.yml", factory = YamlPropertySourceFactory.class)
@Import(JdbcConfig.class)
public class SpringConfiguration {
}
```

测试类：

```java
public class SpringPropertySourceFactoryTest {
    public static void main(String[] args) throws SQLException {
        // 1. 创建容器
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // 2. 获取对象
        DataSource dataSource = ac.getBean("dataSource", DataSource.class);
        // 3. 调用方法
        Connection connection = dataSource.getConnection();
        System.out.println(connection);
    }
}
```

运行之后可以得到连接的信息。

> 驱动是：com.mysql.jdbc.Driver
> Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
> 6月 21, 2021 2:24:11 下午 org.springframework.jdbc.datasource.DriverManagerDataSource setDriverClassName
> 信息: Loaded JDBC driver: com.mysql.jdbc.Driver
> com.mysql.cj.jdbc.ConnectionImpl@61fe30

## 三、注入时机和设定注入条件的注解

### @DependsOn

- 作用：用于指定某个类的创建依赖的bean对象先创建。spring中 没有特定bean的加载顺序，使用此注解则可指定bean的加载顺序。（在基于注解配置中，是按照类中方法的书写顺序决定的）
- 适用范围：比如说观察者模式，分为事件、事件源 、监听器。在使用的时候，我们希望监听器不会错过任何的事件。那么，监听器的创建必须要在事件源之前创建。所以，在使用观察者模式的时候，会需要用到该注解。

一、创建一个事件event包，然后添加事件源类以及监听器类。因为在实际上的使用中，事件源的创建需要依赖于监听器；因为监听器要在所有的事件源创建之前创建。

监听器类event.EventListener类

```java
@Component
public class EventListener {
    public EventListener() {
        System.out.println("监听器创建了");
    }
}
```

事件源类event.EventSource类

```java
@Component
@DependsOn("eventListener")
public class EventSource {
    public EventSource() {
        System.out.println("事件源对象创建了");
    }
}
```

二、创建Spring的主配置类

```java
@Configuration
@ComponentScan("event")
public class SpringConfiguration {
}
```

三、创建测试类test.SpringDependsOnTest类

```java
public class SpringDependsOnTest {
    public static void main(String[] args) {
        // 1. 创建容器
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // 2. 启动容器
        ac.start();
        // 在没有使用@DependsOn注解的时候，创建对象的顺序是根据单词字母的顺序创建的
        // 使用了@DependsOn注解之后，将会按照设定的顺序创建Bean对象
    }
}
```

运行结果：

> 监听器创建了
> 事件源对象创建了

### @Lazy

- 作用：用于指定单例bean对象的创建时机。在没有使用此注解时，单例bean的生命周期与容器相同。但是当使用了此注解之后，单例对象的创建时机变成了第-次使用时创建。
- 注意：这不是延迟加载思想（因为不是每次使用时都创建，只是第一次创建的时机改变了)。
- 取值：value值表示是否开启延迟加载。默认值为true，表示开启。
- 使用范围：在实际开发中，当我们的Bean是单例对象时，并不是每个都需要一开始都加载到ioc容器之中，有些对象可以在真正使用的时候再加载，当有此需求时，即可使用此注解。值得注意的是，此注解只对单例bean对象起作用，当指定了@Scope注解的prototype取值后，此注解不起作用。

一、创建utils.LogUtil类，作为Bean对象的类

```java
@Component
@Lazy(value = true)
public class LogUtil {

    public LogUtil() {
        System.out.println("LogUtil对象创建");
    }

    public void printLog() {
        System.out.println("模拟日志记录");
    }
}
```

二、创建Spring主配置类config.SpringConfiguration类

```java
@Configuration
@ComponentScan("utils")
public class SpringConfiguration {
}
```

三、创建测试类test.SpringLazyTest类

```java
public class SpringLazyTest {
    public static void main(String[] args) {
        // 1. 创建容器
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // 2. 获取对象
        LogUtil logUtil = ac.getBean("logUtil", LogUtil.class);
        // 3. 对象使用
        logUtil.printLog();
    }
}
```

最后根据debug的结果可得知，该bean对象的创建一直等到第三行代码才会被创建。

### @Conditional

- 作用：根据条件选择注入的bean对象
- 属性：
  - value：用于提供一个Condition接口的实现类，实现类中需要编写具体代码实现注入的条件。
- 使用场景：
  当我们在开发时，可能会使用多平台来测试，例如我们的测试数据库分别部署到了linux和windows两个操作系统上面，现在根据我们的工程运行环境选择连接的数据库。此时就可以使用此注解。同时基于此注解引出的@Profile注解，就是根据不同的环境，加载不同的配置信息。

一、创建Jdbc配置文件，根据不同的环境创建不同的配置文件

linuxJdbc.properties

```properties
linux.driver=com.mysql.jdbc.Driver
linux.url=jdbc:mysql://localhost:3306/ssm
linux.username=root
linux.password=123456
```

jdbc.properties

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring_ioc?serverTimezone=GMT&allowPublicKeyRetrieval=true&useSSL=false&characterEncoding=utf8
jdbc.username=root
jdbc.password=123456
```

二、创建config.JdbcConfig类

```java
public class JdbcConfig {

    @Value("${jdbc.driver}")
    private String driver;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    /**
     * 创建windows版本的数据源
     * @return
     */
    @Bean("dataSource")
    public DataSource createDataSource() {
        // 1. 创建数据源
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        // 2. 设置属性
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // 打印URL
        System.out.println("Windows URL is " + url);
        // 3. 返回数据源
        return dataSource;
    }

    /**
     * 创建Linux环境下的测试数据源
     * @param linuxDriver
     * @param linuxUrl
     * @param linuxUsername
     * @param linuxPassword
     * @return
     */
    @Bean("dataSource")
    public DataSource createDataSource(@Value("${linux.driver}") String linuxDriver,
                                       @Value("${linux.url}") String linuxUrl,
                                       @Value("${linux.username}") String linuxUsername,
                                       @Value("${linux.password}") String linuxPassword) {
        // 1. 创建数据源
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        // 2. 设置属性
        dataSource.setDriverClassName(linuxDriver);
        dataSource.setUrl(linuxUrl);
        dataSource.setUsername(linuxUsername);
        dataSource.setPassword(linuxPassword);
        // 打印URL
        System.out.println("Linux URL is " + linuxUrl);
        // 3. 返回数据源
        return dataSource;
    }

}
```

三、创建Spring主配置类config.SpringConfiguration

```java
@Configuration
@Import(JdbcConfig.class)
@PropertySource({"classpath:jdbc.properties", "classpath:linuxJdbc.properties"})
public class SpringConfiguration {
}
```

四、创建测试类test.SpringConditionalTest类

```java
public class SpringConditionalTest {
    public static void main(String[] args) {
        // 1. 创建容器
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // 2. 获取对象
        DataSource dataSource = ac.getBean("dataSource", DataSource.class);
        // 3. 调用方法
        System.out.println(dataSource);
    }
}
```

但是这个时候，没有用到@Conditional注解。Spring在加载这两个重载方法的时候，会根据方法的编写顺序，后面创建的Bean会覆盖前面编写的Bean对象。所以运行的时候，打印输出的是Linux的dataSource的Bean对象。

> Linux URL is jdbc:mysql://localhost:3306/ssm
> org.springframework.jdbc.datasource.DriverManagerDataSource@5f8edcc5

所以，我们需要使用@Conditional注解对上述的代码方式进行修正。

一、创建condition包，创建WindowsCondition类和LinuxCondition类

WindowsCondition类：

```java
public class WindowsCondition implements Condition {
    /**
     * 是否注入到ioc容器中的核心方法
     * @param context  ioc上下文对象
     * @param metadata
     * @return true则表示注入到ioc容器中
     */
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 1. 获取ioc使用的BeanFactory对象
        ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
        // 2. 获取类加载器
        ClassLoader classLoader = context.getClassLoader();
        // 3. 获取环境信息（为了区分当前是Windows环境还是Linux环境）
        Environment environment = context.getEnvironment();
        // 输出当前系统的相关信息
        if (environment instanceof StandardEnvironment) {
            // 转换环境信息
            StandardEnvironment standardEnvironment = (StandardEnvironment) environment;
            Map<String, Object> map = standardEnvironment.getSystemProperties();
            for (Map.Entry<String, Object> m: map.entrySet()) {
                System.out.println(m.getKey() + " " + m.getValue());
            }
        }
        // 4. 获取Bean定义信息的注册器
        BeanDefinitionRegistry registry = context.getRegistry();
        // 5. 获取当前系统的名称
        String osName = environment.getProperty("os.name");
        // 6. 判断是否包含Windows规则
        if (osName.contains("Windows")) {
            // 需要注册到ioc容器中
            return true;
        }
        // 不需要注册到ioc容器中
        return false;
    }
}
```

LinuxCondition类：

```java
public class LinuxCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 1. 获取环境信息（为了区分当前是Windows环境还是Linux环境）
        Environment environment = context.getEnvironment();
        // 2. 获取当前系统的名称
        String osName = environment.getProperty("os.name");
        // 3. 判断是否包含Linux规则
        if (osName.contains("Linux")) {
            // 需要注册到ioc容器中
            return true;
        }
        // 不需要注册到ioc容器中
        return false;
    }
}
```

二、将config包下的JdbcConfig类中的相关方法加上@Conditiaonal注解

```java
public class JdbcConfig {

    @Value("${jdbc.driver}")
    private String driver;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    /**
     * 创建windows版本的数据源
     * @return
     */
    @Bean("dataSource")
    @Conditional(WindowsCondition.class)
    public DataSource createWindowsDataSource() {
        // 1. 创建数据源
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        // 2. 设置属性
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // 打印URL
        System.out.println("Windows URL is " + url);
        // 3. 返回数据源
        return dataSource;
    }

    /**
     * 创建Linux环境下的测试数据源
     * @param linuxDriver
     * @param linuxUrl
     * @param linuxUsername
     * @param linuxPassword
     * @return
     */
    @Bean("dataSource")
    @Conditional(LinuxCondition.class)
    public DataSource createLinuxDataSource(@Value("${linux.driver}") String linuxDriver,
                                       @Value("${linux.url}") String linuxUrl,
                                       @Value("${linux.username}") String linuxUsername,
                                       @Value("${linux.password}") String linuxPassword) {
        // 1. 创建数据源
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        // 2. 设置属性
        dataSource.setDriverClassName(linuxDriver);
        dataSource.setUrl(linuxUrl);
        dataSource.setUsername(linuxUsername);
        dataSource.setPassword(linuxPassword);
        // 打印URL
        System.out.println("Linux URL is " + linuxUrl);
        // 3. 返回数据源
        return dataSource;
    }

}
```

三、运行测试类

最终根据系统的运行环境，可以将相对应的Bean对象注入到ioc容器中。

### @Profile

- 定义：@Profile注解是spring提供的一个用来标明当前运行环境的注解
- 我们正常开发的过程中经常遇到的问题是，开发环境是一套环境，测试是一套环境， 线上部署又是一套环境。这样从开发到测试再到部署，会对程序中的配置修改多次，尤其是从测试到上线这个环节，让测试的也不敢保证改了哪个配置之后能不能在线上运行。为了解决上面的问题，我们一般会使用一种方法，就是针对不同的环境进行不同的配置,从而在不同的场景中跑我们的程序。
- 而spring中的@Profile注解的作用就体现在这里。在spring使用DI来注入的时候，能够根据当前制定的运行环境来注入相应的bean。最常见的就是使用不同的DataSource了。

需求：需要创建不同源环境下使用的数据源，用Junit测试写相应的测试环境。

一、创建数据库连接配置类config.JdbcConfig类

```java
public class JdbcConfig {
    @Value("${jdbc.driver}")
    private String driver;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    /**
     * 开发环境的数据源
     * @return
     */
    @Bean("dataSource")
    @Profile("dev")
    public DruidDataSource createDevDataSource() {
        // 1. 创建数据源对象
        DruidDataSource dataSource = new DruidDataSource();
        // 2. 填充属性
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // 3. 开发环境的最大连接数
        dataSource.setMaxActive(5);
        // 4. 返回数据源
        return dataSource;
    }

    /**
     * 测试环境的数据源
     * @return
     */
    @Bean("dataSource")
    @Profile("test")
    public DruidDataSource createTestDataSource() {
        // 1. 创建数据源对象
        DruidDataSource dataSource = new DruidDataSource();
        // 2. 填充属性
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // 3. 测试环境的最大连接数
        dataSource.setMaxActive(50);
        // 4. 返回数据源
        return dataSource;
    }

    /**
     * 生产环境的数据源
     * @return
     */
    @Bean("dataSource")
    @Profile("pro")
    public DruidDataSource createProDataSource() {
        // 1. 创建数据源对象
        DruidDataSource dataSource = new DruidDataSource();
        // 2. 填充属性
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // 3. 生产环境的最大连接数
        dataSource.setMaxActive(150);
        // 4. 返回数据源
        return dataSource;
    }
}
```

二、创建properties文件，jdbc.properties文件

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring_ioc?serverTimezone=GMT&allowPublicKeyRetrieval=true&useSSL=false&characterEncoding=utf8
jdbc.username=root
jdbc.password=123456
```

三、创建Spring的主配置类SpringConfiguration

```java
@Configuration
@PropertySource("classpath:jdbc.properties")
@Import(JdbcConfig.class)
public class SpringConfiguration {
}
```

四、创建测试类test.SpringProfileTest类

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfiguration.class)
@ActiveProfiles("dev")
public class SpringProfileTest {

    @Autowired
    private DruidDataSource druidDataSource;

    @Test
    public void testDataSource() {
        System.out.println(druidDataSource.getMaxActive());
    }

}
```

在使用的时候，会根据测试类的@ActiveProfiles注解中指定的Value值，指定创建不同的Bean对象。
所以在使用的时候，@Profile和@ActiveProfiles一般是同时搭配使用的。
在想要修改的时候，直接修改@ActiveProfiles中的值即可。
