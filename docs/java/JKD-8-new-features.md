---
title: 【Java】JDK 8 新特性
date: 2022-10-20 19:31:02
tags:
- Java
---

## Lambda 表达式

> 在没有 Lambda 表达式的时候，在 Java 中只能使用匿名内部类代替 Lambda 表达式。

以下面的代码为例，查看 Lambda 表达式的使用。

```java
//匿名内部类方式排序 
List<String> names = Arrays.asList( "a", "b", "d" ); 

Collections.sort(names, new Comparator<String>() { 
    @Override 
    public int compare(String s1, String s2) { 
        return s1.compareTo(s2); 
    } 
}); 
```

Lambda 表达式的使用，一般分为以下四种方式：

- 可选类型声明：不需要声明参数类型，编译器可以统一识别参数值

```java
Collections.sort(names, (s1, s2) -> s1.compareTo(s2));
Collections.sort(names, (String s1, String s2) -> s1.compareTo(s2));
```

- 可选的参数圆括号：一个参数无需定义圆括号，但多个参数需要定义圆括号

```java
Arrays.asList("a", "b", "d").forEach(e -> System.out.println(e));
Arrays.asList("a", "b", "d").sort((e1, e2) -> e1.compareTo(e2));
```

- 可选的大括号：如果主体包含了一个语句，就不需要使用大括号

```java
Arrays.asList("a", "b", "c").forEach(e -> System.out.println(e));
Arrays.asList("a", "b", "c").forEach(e -> { 
    System.out.println(e); 
    System.out.println(e); 
});
```

- 可选的返回关键字：如果主体只有一个表达式返回值则编译器会自动返回值，大括号需要指定明表达式返回了一个数值

```java
Arrays.asList("a", "b", "d").sort((e1, e2) -> e1.compareTo(e2));
Arrays.asList("a", "b", "d").sort((e1, e2) -> { 
    int result = e1.compareTo(e2); 
    return result; 
});
```

注意：<br />①  Lambda 表达式可以引用类的成员变量和局部变量，但是会将这些变量隐式得转换成 final 修饰。也就是说在 Lambda 表达式中，引用的成员变量参数在 Lambda 表达式内部是不可以进行修改的。

```java
String separator = ",";
Arrays.asList("a", "b", "c").forEach( 
    (String e) -> System.out.print(e + separator));
```

② Lambda 表达式的局部变量可以不用声明为final，但是必须不可被后面的代码修改(即隐性的具有 final 的语义)，例如：

```java
int num = 1; 
Arrays.asList(1, 2, 3, 4).forEach(e -> System.out.println(num + e)); 
num = 2; 
// 报错信息：Local variable num defined in an enclosing scope 
// must be final or effectively final
```

## 函数式接口

Lambda 的设计者为了让现有的功能与 Lambda 表达式良好兼容，产生了函数接口这个概念。<br />函数式接口指的是**有且仅有一个抽象方法，但是可以有多个非抽象方法的接口**。这样的接口可以隐式转换为函数式接口，也可以使用注解 `@FunctionalInterface` 显示声明为一个函数式接口。<br />在实践中，隐式转换的函数式接口非常脆弱，只要某个开发者在该接口中添加一个函数，则该接口就不再是函数式接口进而导致编译失败。所以诞生了显示声明函数式接口的注解 `@FunctionalInterface` 。

```java
@FunctionalInterface
public interface GreetingService {
    void sayMessage(String message);
}
```

在 JDK 7 中只能通过匿名对象来实现：

```java
GreetingService greetService = new GreetingService() {
    @Override 
    public void sayMessage(String message) {
        System.out.println("Hello " + message); 
    } 
}; 
greetService.sayMessage("world");
```

但是在 JDK 8 引入函数式接口之后，我们可以直接使用 Lambda 表达式的方式来实现：

```java
GreetingService greetService = message -> System.out.println("Hello " + message); 
greetService.sayMessage("world");
```

这里使用到的就是函数式接口。

## 方法引用

方法引用使用一对冒号 `::`，通过**方法的名字来指向一个方法**。方法引用可以使语言的构造更紧凑简洁，减少冗余代码。<br />以 Car 类中定义了 4 个方法来区分 Java 中 4 种不同方法的引用。

```java
public class Car { 
 
    // Supplier 是jdk1.8的接口，这里和lamda一起使用了 
    public static Car create(final Supplier<Car> supplier) { 
        return supplier.get();
    }
 
    public static void collide(final Car car) {
        System.out.println("Collided " + car.toString()); 
    } 
 
    public void follow(final Car another) {
        System.out.println("Following the " + another.toString()); 
    } 
 
    public void repair() {
        System.out.println("Repaired " + this.toString()); 
    } 
} 
```

**构造器引用**<br />它的语法是 `Class::new`，或者更一般的 `Class<T>::new`，实例如下：

```java
final Car car = Car.create(Car::new); 
final List<Car> cars = Arrays.asList(car);
```

**静态方法引用**<br />它的语法是 `Class::static_method` ，实例如下：

```java
cars.forEach(Car::collide); 
```

**类的成员方法引用**<br />它的语法是 `Class::method` ，实例如下：

```java
cars.forEach(Car::repair);
```

**实例对象的成员方法的引用**<br />它的语法是 `instance::method`，实例如下：

```java
final Car police = Car.create(Car::new);
cars.forEach(police::follow); 
```

这个方法接受一个 Car 类型的实例参数。<br />运行上述例子，可以在控制台看到如下输出：

```java
Collided com.example.jdk8.methodrefer.Car@15aeb7ab
Repaired com.example.jdk8.methodrefer.Car@15aeb7ab
Following the com.example.jdk8.methodrefer.Car@15aeb7ab 
```

## 默认方法

Java 8 使用两个新概念扩展了接口的含义：默认方法和静态方法。<br />默认方法使得开发者可以在不破坏二进制兼容性的前提下，**往现存接口中添加新的方法，即不强制那些实现了该接口的类也同时实现这个新加的方法**。<br />为什么要有这个特性？首先，之前的接口是个双刃剑，好处是面向抽象而不是面向具体编程；缺陷是当需要修改接口时候，需要修改全部实现该接口的类，目前的 Java 8 之前的集合框架没有 foreach 方法，通常能想到的解决办法是在 JDK 里给相关的接口添加新的方法及实现。然而，对于已经发布的版本，是没法在给接口添加新方法的同时不影响已有的实现。所以引进的默认方法。他们的目的是为了解决接口的修改与现有的实现不兼容的问题。<br />默认方法、静态方法语法格式如下：

```java
public interface Vehicle {
   // 默认方法 
   default void print(){ 
      System.out.println("我是一辆车!"); 
   }
   // 静态方法 
   static void blowHorn(){
       System.out.println("按喇叭!!!"); 
   }
}
```

我们可以通过以下代码来了解关于默认方法的使用，实例如下：

```java
public class Tester { 
   public static void main(String args[]) { 
      Vehicle vehicle = new Car(); 
      vehicle.print(); 
   } 
} 

interface Vehicle { 
   default void print() { 
      System.out.println("我是一辆车!"); 
   } 
     
   static void blowHorn() { 
      System.out.println("按喇叭!!!"); 
   } 
} 
  
interface FourWheeler { 
   default void print() { 
      System.out.println("我是一辆四轮车!"); 
   } 
} 
  
class Car implements Vehicle, FourWheeler { 
   public void print() { 
      Vehicle.super.print(); 
      FourWheeler.super.print(); 
      Vehicle.blowHorn(); 
      System.out.println("我是一辆汽车!"); 
   } 
} 
```

执行以上脚本，输出结果为：

> 我是一辆车!<br />我是一辆四轮车!<br />按喇叭!!!<br />我是一辆汽车!

## Stream API

Java 8 API 添加了一个新的 java.util.stream 工具包，被称为流 Stream，可以让你以一种声明的方式处理数据，这是目前为止最大的一次对 Java 库的完善。<br />Stream 使用一种类似用 SQL 语句从数据库查询数据的直观方式来提供一种对 Java 集合运算和表达的高阶抽象。<br />Stream API 可以极大提高 Java 程序员的生产力，让程序员写出高效率、干净、简洁的代码。这种风格将要处理的元素集合看作一种流， 流在管道中传输， 并且可以在管道的节点上进行处理， 比如筛选， 排序，聚合等。<br />元素流在管道中经过中间操作 (intermediate operation) 的处理，最后由最终操作 (terminal operation) 得到前面处理的结果。

```java
+--------------------+       +------+   +------+   +---+   +-------+ 
| stream of elements +-----> |filter+-> |sorted+-> |map+-> |collect| 
+--------------------+       +------+   +------+   +---+   +-------+ 
```

以上流程对应的实例代码如下：

```java
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5); 
// 获取集合中大于2、并且经过排序、平方去重的有序集合 
List<Integer> squaresList = numbers
        .stream()
        .filter(x -> x > 2)
        .sorted((x,y) -> x.compareTo(y))
        .map(i -> i*i).distinct().collect(Collectors.toList());
```

在 Java 8 中，集合接口有两个方法来生成流：

- `stream()`：为集合创建串行流
- `parallelStream()`：为集合创建并行流

一般来说，流的来源可以是集合、数组、I/O channel、 、generator 等。其中主要有以下这几种方法：<br />① filter 方法：通过设置的条件过滤出元素

```java
List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl"); 
List<String> filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList()); 
```

② limit 方法：获取指定数量的流

```java
Random random = new Random();
random.ints().limit(10).forEach(System.out::println);
```

③ sorted 方法：对流进行排序

```java
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
numbers.stream().sorted().forEach(System.out::println);
```

④ map 方法：映射每个元素到对应的结果

```java
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
// 获取对应的平方数
List<Integer> squaresList = numbers.stream().map(i -> i*i).distinct().collect(Collectors.toList());
```

⑤ forEach 方法：迭代流中的每个数据

```java
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
numbers.stream().forEach(System.out::println);
```

⑥ Collectors 类：实现了很多归约操作，例如将流转换成集合和聚合元素

```java
List<String>strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl"); 
List<String> filtered = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.toList()); 
 
System.out.println("筛选列表: " + filtered); 
String mergedString = strings.stream().filter(string -> !string.isEmpty()).collect(Collectors.joining(", ")); 
System.out.println("合并字符串: " + mergedString); 
```

⑦ 统计：产生统计结果的收集器

```java
List<Integer> numbers = Arrays.asList(3, 2, 2, 3, 7, 3, 5);
  
IntSummaryStatistics stats = numbers.stream().mapToInt((x) -> x).summaryStatistics(); 
  
System.out.println("列表中最大的数 : " + stats.getMax());
System.out.println("列表中最小的数 : " + stats.getMin());
System.out.println("所有数之和 : " + stats.getSum());
System.out.println("平均数 : " + stats.getAverage());
```

⑧ 并行：parallelStream是流并行处理程序的代替方法

```java
List<String> strings = Arrays.asList("abc", "", "bc", "efg", "abcd","", "jkl"); 
// 获取空字符串的数量 
long count = strings.parallelStream().filter(string -> string.isEmpty()).count();
```

### Stream实现原理

| Stream操作分类                    |                            |                                                              |
| --------------------------------- | -------------------------- | ------------------------------------------------------------ |
| 中间操作(Intermediate operations) | 无状态(Stateless)          | unordered() filter() map() mapToInt() mapToLong() mapToDouble() flatMap() flatMapToInt() flatMapToLong() flatMapToDouble() peek() |
|                                   | 有状态(Stateful)           | distinct() sorted() sorted() limit() skip()                  |
| 结束操作(Terminal operations)     | 非短路操作                 | forEach() forEachOrdered() toArray() reduce() collect() max() min() count() |
|                                   | 短路操作(short-circuiting) | anyMatch() allMatch() noneMatch() findFirst() findAny()      |

① 简单的实现，可以通过操作迭代来完成。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/29554606/1666273017823-6c05fd93-5c6d-4133-9bea-b9b2ef1cf2ad.png)

1. 迭代次数多。迭代次数跟函数调用的次数相等。
2. 频繁产生中间结果。每次函数调用都产生一次中间结果，存储开销无法接受。

② Java 中的实现，使用流水线操作来完成。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/29554606/1666273247069-ecdf7cab-3b40-4ba4-af07-54d842035f74.png)

| 方法名                          | 作用                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| void begin(long size)           | 开始遍历元素之前调用该方法，通知Sink做好准备。               |
| void end()                      | 所有元素遍历完成之后调用，通知Sink没有更多的元素了。         |
| boolean cancellationRequested() | 是否可以结束操作，可以让短路操作尽早结束。                   |
| void accept(T t)                | 遍历元素时调用，接受一个待处理元素，并对元素进行处理。Stage把自己包含的操作和回调方法封装到该方法里，前一个Stage只需要调用当前Stage.accept(T t)方法就行了。 |

Sink的四个接口方法常常相互协作，共同完成计算任务。**实际上Stream API内部实现的的本质，就是如何重载Sink的这四个接口方法**。<br />一次操作中，执行链条因为 Sink 接口，可以理解为：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/29554606/1666273744149-530b10ca-3f9f-4107-8064-9a1dac2b9d8d.png)

> 参考文档：[深入理解Java8中Stream的实现原理_红豆和绿豆的博客-CSDN博客_java8 stream 原理](http://t.csdn.cn/uxpHF)
> [13万字详细分析JDK中Stream的实现原理_Java知音_的博客-CSDN博客](https://blog.csdn.net/weixin_36380516/article/details/120681732)

## Optional 类

Java 应用中最常见的 bug 就是空值异常。在 Java 8 之前，Google Guava 引入了 Optionals 类来解决 `NullPointerException`，从而避免源码被各种 null 检查污染，以便开发者写出更加整洁的代码。Java 8 也将 Optional 加入了官方库。<br />Optional 提供了一些有用的方法来避免显式的 null 检查。简单的使用如下：

```java
public class OptionalTest {
    public static void main(String[] args) {
        OptionalTest tester = new OptionalTest();
        Integer value1 = null;
        Integer value2 = 10;

        // Optional.ofNullable - 允许传递为 null 参数 
        Optional<Integer> a = Optional.ofNullable(value1);

        // Optional.of - 如果传递的参数是 null，抛出异常 NullPointerException 
        Optional<Integer> b = Optional.of(value2);
        System.out.println(tester.sum(a, b));
    }

    public Integer sum(Optional<Integer> a, Optional<Integer> b) {
        // Optional.isPresent - 判断值是否存在 
        System.out.println("第一个参数值存在: " + a.isPresent());
        System.out.println("第二个参数值存在: " + b.isPresent());
        // Optional.orElse - 如果值存在，返回它，否则返回默认值 
        Integer value1 = a.orElse(0);

        // Optional.get - 获取值，值需要存在 
        Integer value2 = b.get();
        return value1 + value2;
    }
}
```

## Date Time API

Java 8 引入了新的 Date-Time API(JSR 310) 来改进时间、日期的处理。<br />在旧版的 Java 中，日期时间 API 存在诸多问题，例如：

- 非线程安全：java.util.Date 是非线程安全的，所有的日期类都是可变的，这是 Java 日期类最大的问题之一。
- 设计很差：Java 的日期/时间类的定义并不一致，在 java.util 和 java.sql 的包中都有日期类，此外用于格式化和解析的类被定义在 java.text 包中。java.util.Date 同时包含日期和时间，而java.sql.Date 仅包含日期，将其纳入 java.sql 包并不合理。另外这两个类都有相同的名字，这本身就是一个非常糟糕的设计。
- 时区处理麻烦：日期类并不提供国际化，没有时区支持，因此 Java 引入了 java.util.Calendar 和java.util.TimeZone 类，但他们同样存在上述所有的问题。

因为上面这些原因，诞生了第三方库 Joda-Time ，可以替代 Java 的时间管理 API 。<br />Java 8 中新的时间和日期管理 API 深受 Joda-Time 影响，并吸收了很多 Joda-Time 的精华，新的java.time 包包含了所有关于日期、时间、时区、Instant (跟日期类似但是精确到纳秒)、duration（持续时间）和时钟操作的类。<br />新设计的 API 认真考虑了这些类的不变性，如果某个实例需要修改，则返回一个新的对象。<br />接下来看看 java.time 包中的关键类和各自的使用例子。<br />**Clock 类**<br />Clock 类使用时区来返回当前的纳秒时间和日期。Clock 可以替代 `System.currentTimeMillis()` 和 `TimeZone.getDefault()`，实例如下：

```java
final Clock clock = Clock.systemUTC();
System.out.println(clock.instant());
System.out.println(clock.millis());
```

输出结果是：

```java
2022-08-11T14:57:49.031Z
1660229869121
```

**LocalDate、LocalTime 和 LocalDateTime类**<br />LocalDate、LocalTime 和 LocalDateTime 类，都是用于处理日期时间的 API ，在处理日期时间时可以不用强制性指定时区。<br />**LocalDate**<br />LocalDate 仅仅包含 ISO-8601 日历系统中的日期部分，实例如下：

```java
// 获取当前日期
final LocalDate date = LocalDate.now();
// 获取指定时钟的日期
final LocalDate dateFromClock = LocalDate.now(clock);
System.out.println(date);
System.out.println(dateFromClock);
```

输出结果：

```java
2022-08-11
2022-08-11
```

**LocalTime**<br />LocalTime 仅仅包含该日历系统中的时间部分，实例如下：

```java
 // 获取当前时间
final LocalTime time = LocalTime.now();
// 获取指定时钟的时间
final LocalTime timeFromClock = LocalTime.now(clock);
System.out.println(time);
System.out.println(timeFromClock);
```

输出结果：

```java
23:01:44.744
15:01:44.744
```

**LocalDateTime**<br />LocalDateTime 类包含了 LocalDate 和 LocalTime 的信息，但是不包含 ISO-8601 日历系统中的时区信息，实例如下：

```java
// 获取当前日期时间
final LocalDateTime datetime = LocalDateTime.now();
// 获取指定时钟的日期时间
final LocalDateTime datetimeFromClock = LocalDateTime.now(clock);
System.out.println(datetime);
System.out.println(datetimeFromClock);
```

输出结果：

```java
2022-08-11T23:03:26.218
2022-08-11T15:03:26.218
```

**ZonedDateTime 类**<br />如果你需要特定时区的信息，则可以使用 ZoneDateTime，它保存有 ISO-8601 日期系统的日期和时间，而且有时区信息，实例如下：

```java
// 获取当前时间日期
final ZonedDateTime zonedDatetime = ZonedDateTime.now();
// 获取指定时钟的日期时间
final ZonedDateTime zonedDatetimeFromClock = ZonedDateTime.now(clock);
// 获取纽约时区的当前时间日期
final ZonedDateTime zonedDatetimeFromZone = ZonedDateTime.now(ZoneId.of("America/New_York"));
System.out.println(zonedDatetime);
System.out.println(zonedDatetimeFromClock);
System.out.println(zonedDatetimeFromZone);
```

输出结果：

```java
2022-08-11T23:05:10.262+08:00[Asia/Shanghai]
2022-08-11T15:05:10.262Z
2022-08-11T11:05:10.264-04:00[America/New_York]
```

**Duration 类**<br />Duration 类，它持有的时间精确到秒和纳秒。利用它我们可以很容易得计算两个日期之间的不同，实例如下：

```java
final LocalDateTime from = LocalDateTime.of(2022, Month.AUGUST, 1, 0, 0, 0);
final LocalDateTime to = LocalDateTime.of(2023, Month.SEPTEMBER, 1, 23, 59, 59);
// 获取时间差
final Duration duration = Duration.between(from, to);
System.out.println("Duration in days: " + duration.toDays());
System.out.println("Duration in hours: " + duration.toHours());
```

输出结果：

```java
Duration in days: 396
Duration in hours: 9527
```

## BASE 64

在 Java 7 中，使用 BASE 64 编码需要使用第三方库才能进行；在 Java 8 中，BASE 64 编码已经成为 Java 类库的标准，实例如下：

```java
final String text = "Base64 finally in Java 8!";
final String encoded = Base64.getEncoder().encodeToString(text.getBytes(StandardCharsets.UTF_8));
System.out.println(encoded);
final String decoded = new String(Base64.getDecoder().decode(encoded), StandardCharsets.UTF_8);
System.out.println(decoded);
```

运行结果：

```java
QmFzZTY0IGZpbmFsbHkgaW4gSmF2YSA4IQ==
Base64 finally in Java 8!
```

## Nashorn JavaScript 引擎

从 JDK 1.8 开始，Nashorn 取代 Rhino(JDK 1.6, JDK1.7) 成为 Java 的嵌入式 JavaScript 引擎。它使用基于 JSR 292 的新语言特性，将 JavaScript 编译成 Java 字节码。<br />与先前的 Rhino 实现相比，这带来了 2 到 10 倍的性能提升，实例如下：

```java
ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
ScriptEngine nashorn = scriptEngineManager.getEngineByName("nashorn");
String name = "Hello World";
try {
    nashorn.eval("print('" + name + "')");
} catch (ScriptException e) {
    System.out.println("执行脚本错误: " + e.getMessage());
}
```
