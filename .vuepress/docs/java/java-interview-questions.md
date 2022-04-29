---
title: 【面试】Java面试题
date: 2022-01-01 20:19:12
tags:
- Java
---

# day01

## 一、switch 是否能作用在 byte 上，是否能作用在 long 上，是否能作用在 String 上？

- Java5以前，只能是byte，short，int，char
- Java5开始，加入枚举类型（enum）
- Java7开始，加入String，但long是所有版本都不可以的

## 二、用最有效率的方法计算 2 乘以 8

- 2<<3，左移三位

## 三、`float f=3.4;`是否正确？

- Java中默认写的小数属于 `long` 类型，直接赋值给`float`类型，属于将`long`强转型至`float`类型，会发生精度丢失，编译器会报错：*java: 不兼容的类型: 从double转换到float可能会有损失*。需要修改为：

- ```
  float f = (float) 3.4;
  float f = 3.4F;
  ```

## 四、`short s1 = 1; s1 = s1 + 1;`有错吗？`short s1 = 1; s1 += 1;`有错吗？

- 前者出错，后者没问题。定义声明语句无问题，后面的赋值有问题。s1变量属于`short`类型，`+1`操作中的1默认是int类型，该操作属于是将`int`类型变量转型至`short`类型，发生类型转换错误。
- 后者`s1 += 1;` 操作，会自动进行类型转换，相当于 `s1 = (short) (s1 + 1);`

## 五、`==`和`equals()`有什么区别？

- 对于基本数据类型来说，`==`比较的是两者的值；对于引用类型来说，`==`比较的两者的内存地址。

- 对于基本数据来说，没有`equals()`方法；对于引用数据类型来说，要分情况看有没有重写`equals()`方法。很多Java内置的引用数据类型都对`equals()`方法进行了重写，重写之后的作用就是对比引用数据类型中的数据值（String、Integer）。例如，String类型中的`equals()`方法的重写如下：

  ```java
  public boolean equals(Object anObject) {
      if (this == anObject) {
          return true;			// 判断是否是同一个对象，比较两者的内存地址
      }
      if (anObject instanceof String) {			// 比较引用数据类型中的对象内容是否一致
          String aString = (String)anObject;
          if (!COMPACT_STRINGS || this.coder == aString.coder) {
              return StringLatin1.equals(value, aString.value);
          }
      }
      return false;
  }
  ```

- 对于Object对象，`equals()`方法就是对比两者的内存地址值

  ```java
  public boolean equals(Object obj) {
  	return (this == obj);
  }
  ```


# day02

## 一、**finally一定会执行吗？**

- 没有执行try-catch-finally语句块时
  - 在try-catch块之前直接执行`return`语句，将不会执行
  - 在try-catch块之前制造一个错误，编译不会通过
- 执行了try-catch-finally语句块
  - 在try语句块中执行`System.exit(0);`，也就是finally之前运行语句退出jvm，则finally语句块也不会执行
- 不管是在try块中制造异常还是在try块中执行`return`，finally语句块最终都会被执行，这与try-catch-finally语句块的设计的初衷一致。

## 二、什么是对象序列化和反序列化？

- 持久化Java对象的过程，就是对象序列化；而将Java对象序列化之后的文件读取并且重新创建对象的过程，称为对象反序列化。序列化的方式：实现`Serializable`接口或者`Externalizable`接口。

- **序列化**： 将数据结构或对象转换成二进制字节流的过程

  - ```java
    // 序列化
    private static void write () throws IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("day07_IOStream\\src\\object_serialization_stream\\oos.txt"));
        Student s = new Student("雨下一整晚Real", 20);
        oos.writeObject(s);
        oos.close();
    }
    ```

- **反序列化**：将在序列化过程中所生成的二进制字节流的过程转换成数据结构或者对象的过程

  - ```java
    // 反序列化
    private static void read () throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("day07_IOStream\\src\\object_serialization_stream\\oos.txt"));
        Object object = ois.readObject();
        Student student = (Student) object;
        System.out.println(student.getName() + "," + student.getAge());
        ois.close();
    }
    ```

- 序列化的主要作用是将对象的成员方法和成员变量转换成二进制文件，便于在网络环境中发送或留待下一台设备恢复原先对象的状态

- **如果有字段不想进行序列化，该如何操作？**

  - 选择使用`transient`关键字对不想进行序列化的变量进行修饰。但是，该关键字只能修饰变量，不能修饰类和方法

## 三、既然有了字符流，为什么还要有字节流？

- 不管是文件读写或者是网络发送，最小的可操作存储单位都是字节
- 效率上：Java字符流是jvm将字节转换得来的，这个过程相较于直接操作字节更加耗时
- 编码上：如果操作字符流的过程中，不知道编码格式，将会非常容易出现乱码的问题
- 读写上：字符流的字符是可以直接看得懂的，而字节不行
- 选择上：如果需要发送视频、图片、音频等多媒体文件的时候，选择字节流操作将会提高效率；涉及到字符的操作，选择字符流

## 四、获取键盘输入的常用的两种方式？

- ```java
  BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  System.out.println("请输入一行文字：");
  String line = br.readLine();
  ```

- ```java
  Scanner sc = new Scanner(System.in);
  String line = sc.nextLine();
  ```

## 五、何为反射？反射的优缺点是什么？

- 反射：指在运行时去获取一个类的变量和方法信息，然后通过获取到的信息来**创建对象，调用方法**的一种机制。由于这种动态性，可以极大的增强程序的灵活性，程序不用在编译期就完成确定，在运行期仍然可以扩展
  ![image-20210626104753272](https://s2.loli.net/2022/04/01/AZbWjqUOm64FaYk.png)

- 优点：提高了代码的灵活性，为各种框架提供了开箱即用功能的底层支持

- 缺点：

  - 性能相比于常规类实例化稍差，但对于框架来说可以无视（参考文献 [java-reflection-why-is-it-so-slow](https://stackoverflow.com/questions/1392351/java-reflection-why-is-it-so-slow)）

    > The compiler can do no optimization whatsoever as it can have no real idea about what you are doing. This probably goes for the as wellJIT
    > Everything being invoked/created has to be discovered (i.e. classes looked up by name, methods looked at for matches etc)
    > Arguments need to be dressed up via boxing/unboxing, packing into arrays, wrapped in s and re-thrown etc.ExceptionsInvocationTargetException

    > 编译器不能做任何优化，因为它不能真正了解您在做什么。这可能也适用于jit
    >
    > 所有被调用/创建的东西都必须被发现（即按名称查找的类、查找匹配项的方法等）
    >
    > 参数需要通过装箱/拆箱、打包到数组中、用s包装并重新抛出等方式进行修饰

  - 主要是安全性的问题，例如如反射可以提供无视泛型参数的安全性检查（泛型参数的安全性检查发生在编译期间）

    - 利用反射越过泛型参数的安全性检查，往`Integer`类型的ArrayList添加`String`：

    - ```java
      // 1. create list
      ArrayList<Integer> arrayList = new ArrayList<Integer>();
      // 2. get the class of arraylist
      Class<? extends ArrayList> listClass = arrayList.getClass();
      // 3. get add method
      Method add = listClass.getMethod("add", Object.class);
      // 4. invoke add method
      add.invoke(arrayList, "Hello Inflection!");
      // 5. print result
      System.out.println(arrayList);
      ```

# day03

## 一、Java中如何跳出多重循环？

- 使用标号的方式：在循环外部定义一个标号，在需要跳出循环的地方添加 `break mark;`语句

  - ```java
    ok:
    for (int i = 0; i < 10; i++) {
        for (int j = 0; j < 10; j++) {
            if (i == 5)
                break ok;
        }
    }
    ```

- 利用多重`break;`的方式

  - ```java
    int flag = 0;
    for (int i = 0; i < 10; i++) {
        flag++;
        for (int j = 0; j < 10; j++) {
            break;
        }
        break;
    }
    System.out.println(flag);       // flag == 1
    ```

- 利用try-catch语句块，通过自定义异常的方式捕获异常，跳出循环

  - ```java
    try {
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                if (j == 0) {
                    throw new Exception();
                }
            }
            System.out.println("i loop is running...");     // No display
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    ```

## 二、JDK、JRE、JVM的区别是什么？

- 结构上的区别如下：

![image-20210626112645843](https://s2.loli.net/2022/04/01/mFQXjCipZJP7Gwk.png)

- JDK：Java Development Kit，Java开发工具包，提供了Java开发环境和运行环境
- JRE：Java Runtime Environment，Java运行环境，提供了Java的运行环境
- JVM：Java Virtual Machine，Java虚拟机，是Java跨平台的基础，`.class`字节码文件的运行依赖JVM

## 三、String str1 = "Hello";和String str2 = new String("Hello");一样吗？

- 不一样，通过编写运行下面的代码可以得知

```java
String str1 = "Hello";
String str2 = new String("Hello");
// Objects created with the new keyword are stored in heap memory
// Directly assigned strings are placed in the constant pool
System.out.println(str1 == str2);           // false
// String overrides the equals method
System.out.println(str1.equals(str2));      // true
```

简单来说，就是通过 `new` 关键字创建的对象会存放在堆Heap中；而直接赋值的字符串会存放在常量池中。

## 四、Java中的常用容器有哪些？

**容器**（黑体的是接口，其余的为实现类）

- **Collection**    单列集合
  - **List**    元素可重复
    - ArrayList：数组结构，可以随机访问
    - LinkedList：链表结构，不支持随机访问
    - Vector：线程安全的 ArrayList ，扩容机制不同
    - Stack：栈，先进后出。效率低，尽量使用 LinkedList 和 Deque 来实现
  - **Set**    元素不可重复
    - HashSet：集合中的元素无序，无重复元素，允许空元素
    - TreeSet：写入数据有序，无重复元素，不允许空元素
    - LinkedHashSet：集合中的元素默认按照插入顺序排序
- **Map**    双列集合
  - HashMap
  - LinkedHashMap
  - TreeMap
  - Hashtable

注意事项：

- 容器在使用的时候一般通过多态的方式创建，List、Set、Map都不能直接使用，而是要使用他们对应的实现类

## 五、Java中线程安全的类有哪些？

`StringBuffer`

- 线程安全的可变序列。
- 从JDK 5开始，被StringBuilder替代。通常应该使用StringBuilder，因为它支持所有相同的操作不执行同步，执行速度更快。

`Vector`

- 从Java 2平台v1.2开始，该类改进了List接口。与新的集合实现不同，它实现了同步，这意味着它是线程安全的。如果不需要线程同步，建议使用ArrayList对象。

`Hashtable`

- 该类实现了一个Hash表，他将键映射到值。任何非null对象都可以用作键或者值。
- 从Java 2平台v1.2开始，该类改进了Map接口。与新的集合实现不同，它实现了同步，这意味着它是线程安全的。如果不需要线程同步，建议使用HashMap对象。

`ConcurrentHashMap`

- 该类是在java.util.concurrent包中的类，主要是为了解决高并发的情况下要使用Map集合的场景
- jdk1.7版本中是使用Segment分段锁来实现的，1.8版本使用的是CAS和synchronized关键字实现。

# day04

## 一、BIO、NIO、AIO 有什么区别？

- BIO：Block IO 同步阻塞式 IO，就是我们平常使用的传统 IO，它的特点是模式简单使用方便，并发处理能力低。
- NIO：New IO 同步非阻塞 IO，是传统 IO 的升级，客户端和服务器端通过 Channel（通道）通讯，实现了多路复用。
- AIO：Asynchronous IO 是 NIO 的升级，也叫 NIO2，实现了异步非堵塞 IO ，异步 IO 的操作基于事件和回调机制。

## 二、HashMap的实现原理？

在jdk 8中，HashMap是由**数组+链表+红黑树**共同实现的。

![img](https://s2.loli.net/2022/04/01/D3hStcyWr8VeNJl.jpg)

**扩容**

- 扩容长度：默认数组的长度是16，并且发生扩容的时候，长度都为之前的`2倍`。也就是说，长度只可能为16、32、64……
- 加载因子：扩容发生的阈值，因为扩容是在容量用完之前就需要进行的。如果等到用完之后需要添加大量数据，这个时候还没来得及扩容就会发生容量不够用的情况。
  - 目前的阈值参数为0.75。如果按照初始值容量计算，当占用容量空间达到`16*0.75=12`时，就会发生扩容，扩容之后的容量变为`16*2=32`；后续情况依此类推。
- 转换为红黑树：当哈希表上同一位置上的数据过多，即单一`Node`上的数据量过多，该`Node`上的数据默认会使用链表的结构进行排列，数据过多就会造成效率低下，JDK 8中对此情况做了优化：数据量到一定程度的时候，将链表形式的数据转换为红黑树的结构。
  - 转换条件：如果一条链表中元素的个数达到`TREEIFY_THRESHOLD`（默认是8），并且table的长度大于 `MIN_TREEIFY_CAPACITY`（默认是64），就会将链表转为红黑树来提高效率（JDK 8）。
  - 如果一条链表中元素的个数达到`TREEIFY_THRESHOLD`（默认是8），并且table的长度小于 `MIN_TREEIFY_CAPACITY`（默认是64），那么链表并不会转为红黑树，而是将数组扩大至原来的2倍（并且是每添加一 次就扩大2倍），直到数组长度达到64（此时链表就可以转为红黑树了），也就达到了效率最高。
    - 前者满足，后者不满足：则链表中每添加一个数据，数组长度扩大为原来的两倍，直至table的长度达到 `MIN_TREEIFY_CAPACITY`（默认是64），转换为红黑树。
    - 前者不满足，后者满足：链表中数据长度不足够转换为红黑树，两者效率差距不大，直至链表中数据增加至`TREEIFY_THRESHOLD`（默认是8），转换为红黑树。

为什么每次数组长度length都是2的n次方？（**length = 2^n**）

- 因为在HashMap中访问数组的过程是一个Hash运算的过程。使用**h%length**取模就相当于**h&(length-1)**，这样运算速度更快。相当于是对取模运算进行了一个优化，加快了访问速度。
- 不同的Hash值发生碰撞的概率比较小，这样对于空间利用的效率就比较高，查询更快。

为什么初始容量定义为16？

- 这属于一个习惯性以及概率性问题，使用16更加符合日常需要，而且为2的n次方。

为什么负载因子设置为0.75？

![image-20211019111214175](https://s2.loli.net/2022/04/01/B1vWNsYdHy7x8Io.png)

这个问题在源码中有解释，当负载因子为0.75的时候遵循泊松分布，且0.75的时候空间和时间的利用率都比较高，且根据初始值和扩容量计算出来的树形阈值是一个整数。单个hash槽内元素个数为8的概率小于百万分之一，所以将7作为一个分水岭，>7的时候转换为红黑树，=7不操作，<7转为链表。如果是增加则转换为红黑树，如果是减少，则转换为链表。

## 三、深拷贝和浅拷贝的区别？

- 深拷贝：深拷贝复制的是被复制数据或对象的值，复制的数据或对象会在内存中重新分配内存空间，相当于重新创建，两者互不影响。
- 浅拷贝：浅拷贝复制的是被复制数据或对象的引用，复制的数据或者对象通过引用指向被复制数据或对象引用所指向的值，两者是互相影响的。

简单来说，就是复制之后的对象是否影响到原有对象，如果影响到，就是浅拷贝；如果未影响到，就是深拷贝。

## 四、Java初始化顺序？

对于无继承关系的情况下，通常顺序是：

- 【静态变量、静态代码块】——>【普通变量、普通代码块】——>【构造函数】

存在继承关系的情况下，初始化顺序是：

- 静态初始化——>父类初始化——>子类初始化——>构造函数

其中，静态初始化和父类初始化中遵循父类优先于子类的顺序。举例来说，在静态初始化中，要首先将所有的父类都进行初始化之后，再进行子类的初始化。

- 为什么构造函数的优先级最低？
  - 如果构造函数的优先级最高，那么在进行初始化的过程中，后面普通变量进行初始化会覆盖掉构造函数的内容了。只有构造函数最后初始化，对变量进行重新赋值，修改才能在初始化完成之后生效。

## 五、Object类有哪些方法？

getClass、clone、toString、equals、hashCode、wait、notify、notifyAll

# day05

## 一、下面的语句中，各变量之间是否相等？

```java
String s1 = "abc";  
String s2 = "a";
String s3 = "bc";
String s4 = "a" + "bc"; 
String s5 = s2 + s3;
```

- 第一，字符串字面值不相等的肯定不相等
- s1和s4相等，因为s1直接放在字符串常量池中，s4在编译期间能够直接知道运行结果（初始化值），属于编译期间的优化
- s1和s5不相等，s5是通过变量拼接实现的，底层调用了StringBuilder方法：`new StringBuilder().append(new String(s2)).append(new String(s3))`。这样的情况下，地址值是不相等的，所以判断得出 `s1 != s5`

## 二、下面的语句中，各变量之间是否相等？

```java
Integer s1 = Integer.valueOf(1);
Integer s2 = Integer.valueOf(1);
Integer s3 = new Integer(128);
Integer s4 = new Integer(128);
```

- `s1 == s2`

  - 此处涉及到`Integer`封装实现的源码。

  - ```java
    @HotSpotIntrinsicCandidate
    public static Integer valueOf(int i) {
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }
    
    @Deprecated(since="9")
    public Integer(int value) {
        this.value = value;
    }
    
    private static class IntegerCache {
        static final int low = -128;
        static final int high;
        static final Integer[] cache;
        static Integer[] archivedCache;
    }
    ```

  - 根据JDK源码可以得知，通过valueOf创建的Integer对象和直接传参构造的Integer(  `Interger(i)` )，会判断范围是否在 `-128~127`之间，如果在范围内，将会保存到一个缓存数组中，此时比较的是值。所以这种情况下会相等。

- `s3 != s4`

  - 这种情况下，进行判断会得出两者最终超出范围，会调用new Integer方法创建Integer对象。因为存在于堆空间，最终可以得出两者的地址值不相同，所以会返回false。
  - 最终结论：凡是使用new Integer方法创建的，均不相等；如果使用别的方法创建出来的，在范围之内的，才会相等。
  - 平时开发中进行对比的时候应该使用`intValue()`方法。

## 三、String、StringBuilder、StringBuffer的区别？

- 对于String类来说，维护的是一个`byte[]`数组（JDK 8以及之前是`char`类型的数组，做出这个改动是为了节省空间），并且是`final`修饰的，是不可改变的。每次对String的操作都会生成新的String对象，会造成内存浪费。
- ![image-20210925005025291](https://s2.loli.net/2022/04/01/omgdH9luRrGUJfj.png)
- 对于`StringBuilder`来说，也用的是`final`修饰，但是实例化的对象却是一个能够修改的。可以看到`StringBuilder`底层维护的是一个`byte[]`数组，初始化的`StringBuilder`默认容量是16；如果赋值了字符串，那么容量就是【字符串长度+16】；此外还可以通过指定长度的方式创建，传入`int`类型的参数。
- ![image-20210925005322696](https://s2.loli.net/2022/04/01/o9VQtWcFuPep6Ui.png)
- 对于`StringBuffer`来说，相比于`StringBuilder`的区别就是在方法上加了`synchronized`关键字。在多线程的环境下是线程安全的。初始化容量上，和`StringBuilder`一致。
- ![image-20210925010003215](https://s2.loli.net/2022/04/01/pcb5RmyJSvND2AE.png)
- 后两者能够进行字符串的改变，是因为维护了一个缓冲区，实际上是对缓冲区进行修改，对字符串进行改变并不会产生新的String对象。所以后两者又被归到字符串缓冲区中。

## 四、如何提高反射的效率？

- 缓存反复用到的对象
  - 将需要多次创造的对象预先缓存到一个Class变量中，用到的时候直接调用Class对象
- 取消安全检查
  - 遇到私有变量和方法时，使用`setAccessible(true)`来开启暴力反射，取消安全检查。安全检查需要消耗一定的性能。

## 五、PreparedStatement和Statement有什么区别？

- PreparedStatement在使用上可以携带参数，避免了拼接字符带来的不便
- PreparedStatement可以对SQL语句进行一个预编译，可以减少SQL语句的编译错误以及SQL注入
- PreparedStatement可以将命令让数据库编译和解析，然后放到命令缓冲区。在二次执行相同的`prepareStatement`的时候直接调用缓存不需编译，可以一定程度提高运行效率。

# day06

## 一、#{}和${}有什么区别？

这两种符号主要是Mybatis的映射配置文件中的动态传参符号。

- #{}是占位符，${}是拼接符。
- #{}使用的是占位符 `?` ，${}使用的是字符串替换。
- #{}在使用上相当于`PrepareStatement`，${}相当于`statement`。

## 二、MySQL的隔离级别有哪些？

- 读未提交
- 读已提交
- 可重复读
- 串行化

## 三、锁的实现方式有哪些？

Java中锁的实现一般没有很明确的规则，一般对于锁进行分类，是根据锁的特性、锁的实现、锁的状态从不同角度考量的结果。

- 乐观锁、悲观锁
- 自旋锁、适应性自旋锁

- 无锁、偏向锁、轻量级锁、重量级锁

- 公平锁、非公平锁

- 可重入锁、非可重入锁

- 排他锁、共享锁

- 读写锁

- 分段锁

- 可中断锁

- 乐观锁、悲观锁

## 四、CAS是什么？

CAS，Compare and Swap，比较并交换。

CAS可以将比较和交换转为原子操作，这个原子操作直接由CPU保证，是现代CPU广泛支持的对内存中的共享数据进行操作的一种指令，也是一种乐观锁的思想实现。只有判断这个值等于期望值，才会去将它进行修改，否则将不会进行修改。

CAS操作依赖3个值：内存中的值V，旧的预估值X，要修改的新值B，如果旧的预估值X等于内存中的值V，就将新的值B保存到内存中。

在`AtomicInteger`的源码中，Unsafe类提供了原子操作，这个类是JVM提供的类，一般需要导包使用。我们调用的时候使用到的是`AtomicInteger`类，然后通过实例化对象调用Unsafe提供的方法。

CAS的三大问题：

- **ABA问题**：CAS在执行的时候需要对原有的数据进行检查，如果一个值原来是A，变成了B，后来再变成了A，这个时候CAS是无法检索到它的状态改变的。解决方法：①使用版本号；②使用时间戳；③使用UUID等。在jdk 1.5的时候开始提供AtomicStampedReference类来解决ABA问题，具体操作封装在`compareAndSet()`方法中，主要解决思路是在操作之前将当前引用、当前标识和预期引用、预期标识进行比较，如果相等就表示没有发生ABA问题，如果不相等则表示发生了ABA问题，就不进行修改。
- **循环时间开销大**：自旋CAS长时间不成功，会造成巨大的性能开销。解决方法：JVM提供对CPU中的pause指令的支持。该指令有两个作用：①延迟流水线执行指令（de-pipeline）【延迟自旋指令的执行时间】；②避免在退出循环的时候因内存顺序冲突（memory order violation）而引起CPU流水线被清空（CPU pipeline flush）【避免流水线重新加载】
- **只能保证一个共享变量的原子操作**：CAS只能针对单个变量进行操作，要对多个不同变量保证原子性操作，无法使用CAS。解决方法：JDK提供了**AtomicReference类**来保证对象之间的原子性，可以将多个变量存放在同一个对象中来进行操作。

## 五、MySQL执行计划是什么？

当用户发给MySQL服务器一条sql查询指令之后，数据库优化器会对这条指令进行一个优化，产生一个**执行计划**。

使用 **EXPLAIN** 关键字可以模拟优化器执行 SQL 查询语句，从而知道MySQL是如何执行这条查询语句的，进而根据执行方式可以进行sql调优。

> 语法：`Explain + sql`

执行之后，获得的数据有以下：

![img](https://s2.loli.net/2022/04/01/wbRCIeEiKqusTWm.png)

其中，id表示执行顺序（从大到小，相等则从上至下），select_type表示查询类别，table表示查询的表格，type表示访问类型（一般需要达到ref(非唯一索引扫描)/range(检索给定行)级别），possible_keys表示可能使用到的索引，key表示实际用到的索引，key_len表示索引字节数，ref显示索引哪一列被使用到，rows表示大致所需要读取的行数，extra表示额外信息。

# day07

## 一、对象的创建过程？

> 参考文档：[对象的创建过程（new 的过程）_西瓜游侠的博客-CSDN博客_new的过程](https://blog.csdn.net/hbtj_1216/article/details/77599911?ops_request_misc=&request_id=&biz_id=102&utm_term=对象的创建过程&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-1-77599911.nonecase&spm=1018.2226.3001.4187)

①检查类是否已经被加载

- 如果类没有被加载，则执行类加载；如果已经加载，进入下一步。

②为对象分配内存空间；

- 指针碰撞：JVM将堆内存抽象为两块内存，一块是已占用内存，一块是空闲内存。两块区域中有指针作为”分界线“，分配内存的时候向空闲区移动指针即可。这样的操作要求内存是地址连续的。多线程环境下会产生划分地址不一致的情况，虚拟机采用了循环CSA操作来解决。
- 空闲列表：JVM堆内存是不连续的时候，要维护一个列表，记录空闲的内存块。划分内存的时候就将足够的空间划分出去。这个划分方法又会涉及到一个动态规划的问题，”如何保证空间最大利用化“。

③为对象字段设置零值；

- 将对象分配到的内存空间初始化为0值，但不包括对象头。

④设置对象头；

- JVM会将对象的一些信息存放在对象头（Object Header）的位置，维护的信息包含：类的元数据、对象的GC分代年龄。

⑤执行构造方法。

- 执行构造方法，按照程序的编码将对象赋构造初始值。

## 二、设计模式有哪些？

> 参考文档：[41_白话设计模式 - 文集 - 简书 (jianshu.com)](https://www.jianshu.com/nb/4583287)

设计模式一般指的是GOF提出的23种设计模式，一般指在面向对象开发中采用。

设计模式是软件开发人员在软件开发过程中面临的一般问题的解决方案。

## 三、Map的实现类以及各自用法？

参考Map的实现类图可以看出，主要有七个：

![image-20220401150502384](https://s2.loli.net/2022/04/01/qZgCWYQDrsVvUhM.png)

- TreeMap

  - 能够将集合里的数据按照key进行排序，需要实现Comparator比较器接口，默认升序。**如果实现了排序接口，TreeMap不允许key为null，非同步。**

  - ```java
    TreeMap<String, Object> treeMap = new TreeMap<>(new Comparator<String>() {
        @Override
        public int compare(String o1, String o2) {
            return 0;
        }
    });
    ```

  - 使用中，**TreeMap可以设置一个key为`null`值，多个value值为`null`**。

- HashMap

  - 使用频率非常高的Map，主要是根据key的HashCode来存储数据，可以根据HashCode值非常快速地查找到Key的位置并访问到Value值。**HashMap允许一个Key为null，允许多条Value为null，非同步。**

  - HashMap在构建的时候会进行一个Key的HashCode的计算，所以不允许有重复值。在重复将相同key值的键值对加入之后，会**覆盖之前的value值**。

  - ```java
    HashMap<String, Object> hashMap = new HashMap<>();
    hashMap.put(null, null);
    hashMap.put(null, "Test1");     
    hashMap.put("a", "Test2");
    System.out.println(hashMap.get(null));  // Test1
    System.out.println(hashMap.get("a"));   // Test2
    ```

- LinkedHashMap

  - 是HashMap的一个子类，继承自HashMap，实现了Map接口。

  - 相比于HashMap来说，LinkedHashMap只是在table数组中添加了一个before和after的区域，用于维护双向链表，实现整个LinkedHashMap，所以在设计上可以对HashMap进行继承。

  - 在整个类中，维护了一个Head头和一个accessOrder标志位，用于链表的结构中进行迭代。标志位`accessOrder`如果为`true`，则表示按照访问的顺序进行迭代；如果为`false`，则表示按照插入的顺序进行迭代，默认是`false`。**LinkedHashMap是有序的，覆盖特性，允许一个键为null，允许多个null值，非同步。**

  - ```java
    /**
     * The head (eldest) of the doubly linked list.
     */
    transient LinkedHashMap.Entry<K,V> head;
    
    /**
     * The tail (youngest) of the doubly linked list.
     */
    transient LinkedHashMap.Entry<K,V> tail;
    
    /**
     * The iteration ordering method for this linked hash map: {@code true}
     * for access-order, {@code false} for insertion-order.
     *
     * @serial
     */
    final boolean accessOrder;
    ```

- Hashtable

  - 继承自Dictionary抽象类，主要特点是针对其中的增删查改等方法均加了`synchronized`关键字，特点就是**同步**，但是对于多并发场景下，容易造成效率低下的问题。Hashtable是一种通过加锁实现同步的Collections.synchronizedMap(Map)。现在一般为了解决并发问题，会使用juc下的ConcurrentHashMap类来专门处理。

  - 使用上，Hashtable不允许有null值，无论是Key还是Value都不允许为空，源代码规定。Hashtable使用的是快速失败机制，初始容量为11，加载因子0.75，扩容为前一次的容量的2倍+1。扩容代码在rehash方法中，`int newCapacity = (oldCapacity << 1) + 1;`。

  - ```java
    /**
     * Maps the specified {@code key} to the specified
     * {@code value} in this hashtable. Neither the key nor the
     * value can be {@code null}. <p>
     *
     * The value can be retrieved by calling the {@code get} method
     * with a key that is equal to the original key.
     *
     * @param      key     the hashtable key
     * @param      value   the value
     * @return     the previous value of the specified key in this hashtable,
     *             or {@code null} if it did not have one
     * @throws     NullPointerException  if the key or value is
     *               {@code null}	// 如果键或者值为null均抛出空指针异常
     * @see     Object#equals(Object)
     * @see     #get(Object)
     */
    public synchronized V put(K key, V value) {
        // Make sure the value is not null
        if (value == null) {
            throw new NullPointerException();
        }
    
        // Makes sure the key is not already in the hashtable.
        Entry<?,?> tab[] = table;
        int hash = key.hashCode();
        int index = (hash & 0x7FFFFFFF) % tab.length;
        @SuppressWarnings("unchecked")
        Entry<K,V> entry = (Entry<K,V>)tab[index];
        for(; entry != null ; entry = entry.next) {
            if ((entry.hash == hash) && entry.key.equals(key)) {
                V old = entry.value;
                entry.value = value;
                return old;
            }
        }
    
        addEntry(hash, key, value, index);
        return null;
    }
    ```

  - ```java
    Hashtable<String, Object> hashtable = new Hashtable<>();
    hashtable.put(null, null);  	// java.lang.NullPointerException
    hashtable.put("AAA", null);     // java.lang.NullPointerException
    ```

  - 下面的代码验证了Hashtable在遍历的时候进行增删修改，会导致并发修改异常，所以是**快速失败**的。

  - ```java
    hashtable.put("A", "a");
    Iterator<Map.Entry<String, Object>> iterator = hashtable.entrySet().iterator();
    while (iterator.hasNext()) {
        Map.Entry<String, Object> next = iterator.next();
        System.out.println(hashtable.get(next.getKey()));
        if (next.getKey().equals("A")) {
            hashtable.put("B", "b");    // java.util.ConcurrentModificationException
            hashtable.put("A", "b");    // 不会报错
        }
    }
    System.out.println(hashtable.get("A")); // b
    ```

- IdentityHashMap

  - 使用`==`代替`equals()`对Key进行比较的散列映射，专为解决特殊问题而设计。

- WeakHashMap

  - 弱键映射，允许释放映射所指向的对象，为解决特色问题而设计的。

- ConcurrentHashMap

  - 主要是一个针对高并发的环境设计的，相比Hashtable可以提高并发量以及运行效率。

  - 它的类的定义可以看出这是一个继承了AbstractMap的类，所以算作是Map的子类。

  - ```java
    public class ConcurrentHashMap<K,V> extends AbstractMap<K,V>
        implements ConcurrentMap<K,V>, Serializable {
        // ......
    }
    ```

  - 这个类在jdk 1.5中加入，在1.6/1.7中的实现原理主要是Segment段落锁。访问该Segment时只加锁该段Segment，并不对其他Segment加锁，所以这样一来就大大提高了并发度。按此来说，有多少个Segment最高就支持多少的并发量，而这个初始值是16。

  - **不支持null键或null值，同步**。

  - ```java
    ConcurrentHashMap<String, Object> concurrentHashMap = new ConcurrentHashMap<>();
    concurrentHashMap.put(null, "A");   // java.lang.NullPointerException
    concurrentHashMap.put("A", null);   // java.lang.NullPointerException
    ```

为什么HashMap允许key和value为null，而Hashtable不允许？

- 第一点，根据源码的`put()`方法可以得知：HashMap源码中碰到key为null的情况下返回HashCode为0，而Hashtable直接抛出异常。

- ```java
  // HashMap
  static final int hash(Object key) {
      int h;
      return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
  }
  
  // Hashtable
  public synchronized V put(K key, V value) {
      // Make sure the value is not null
      if (value == null) {
          throw new NullPointerException();
      }
  
      // Makes sure the key is not already in the hashtable.
      Entry<?,?> tab[] = table;
      int hash = key.hashCode();
      int index = (hash & 0x7FFFFFFF) % tab.length;
      @SuppressWarnings("unchecked")
      Entry<K,V> entry = (Entry<K,V>)tab[index];
      for(; entry != null ; entry = entry.next) {
          if ((entry.hash == hash) && entry.key.equals(key)) {
              V old = entry.value;
              entry.value = value;
              return old;
          }
      }
  
      addEntry(hash, key, value, index);
      return null;
  }
  ```

- 第二点，源于HashMap和Hashtable不同的设置机制决定的。Hashtable使用的是**安全失败机制（fail-safe）**。HashMap使用的是Iterator迭代器，使用的是**快速失败机制（fail-fast）**；Hashtable使用的是Enumerator，使用的是**安全失败机制（fail-safe）**。

  ```java
  public final void remove() {
      Node<K,V> p = current;
      if (p == null)
          throw new IllegalStateException();
      if (modCount != expectedModCount)
          throw new ConcurrentModificationException();
      current = null;
      removeNode(p.hash, p.key, null, false, false);
      expectedModCount = modCount;
  }
  ```

  在HashMap中的HashIterator中的remove方法，其中会判断是否两个修改值是否相等，不相等就抛出并发修改异常。

- **在 java.util 包的集合类就都是快速失败的；而 java.util.concurrent 包下的类都是安全失败的。**

  - 快速失败机制（fail-fast），是Java集合中的一种机制。使用迭代器遍历的时候，针对集合做出**结构修改**（如果修改map的value值无影响），会抛出并发修改异常。源码层面，是因为`modCount`实际修改值不等于`expectedModCount`期望修改值，抛出`java.util.ConcurrentModificationException`。
    如果在A线程对集合进行遍历，B线程对集合进行增删改或者A线程对集合进行增删改，将会抛出并发修改异常，这就是快速失败。快速失败的容器，在遍历的时候是直接对集合的内容进行访问。

    ```java
    for (String key : hashMap.keySet()) {
        System.out.println(hashMap.get(key));
        hashMap.remove(null);       // java.util.ConcurrentModificationException
    }
    ```

  - 安全失败机制（fail-safe），java.util.concurrent包下的容器都是安全失败的。采用安全失败的容器，遍历的时候都是先将容器复制一个副本，在副本上进行遍历访问。遍历的时候使用的容器和修改的容器并不是同一个，所以并不能被迭代器检测到两个修改值的不同。因此安全失败机制的容器可以支持高并发，并发修改。

## 四、使用`Collections.synchronizedMap()`构造同步Map

```java
Map<String, Object> synchronizedMap = new HashMap<>();
synchronizedMap.put(null, "a");
synchronizedMap.put("B", "b");
synchronizedMap.put("C", null);
Map<String, Object> stringObjectMap = Collections.synchronizedMap(synchronizedMap);
stringObjectMap.put("D", "d");
System.out.println(stringObjectMap.get(null));
System.out.println(stringObjectMap.get("B"));
System.out.println(stringObjectMap.get("C"));
System.out.println(stringObjectMap.get("D"));
```

使用这个方法构造一个synchronizedMap，传入的Map不能为空，否则将会产生空指针异常。**键值均允许为空**，且构造前后进行修改都是支持的。

![image-20211019105344297](https://s2.loli.net/2022/04/01/CsBuOgrTUbf1pxF.png)

在源码中，这个类维护了两个变量，一共有两个构造方法。mutex表示对象排斥锁，这个变量用于表示哪些用户需要同步锁，哪些用户不需要同步锁。

使用第一个构造方法，则将本身作为一个对象排斥锁，那么所有访问到该变量的线程都需要进行同步加锁。

## 五、ConcurrentHashMap的实现原理？

- 首先，实现并发Map的方式有三种：
  - `Collections.synchronizedMap()`
  - `Hashtable`
  - `ConcurrentHashMap`

因为并发量低以及运行效率，前面两者较少使用。ConcurrentHashMap在jdk 1.7和1.8的时候的实现是有区别的。

- JDK 1.7版本的时候，ConcurrentHashMap使用的是**分段锁**的思想来实现的。这个段就是Segment数组，针对Hashtable锁的优化，主要是减少了锁的粒度。至于之前的Hashtable在操作的时候直接使用`synchronized`关键字加在方法上，造成了很大程度上并发度的损失。
  此时的ConcurrentHashMap使用的数据结构是**Segment数组+HashEntry链表**，Segment是ConcurrentHashMap的一个内部类，每次操作的时候针对某一个Segment进行操作，那么只考虑在这一个Segment上进行加锁，最大限度提高了一个并发量。Segment继承于ReentrantLock可重入锁，不是使用synchronized关键字。HashEntry相比于HashMap中的Entry，它使用了volatile关键字修饰value以及下一个节点next。在查找的时候，会先定位到Segment，之后再定位到HashEntry。
  还有一个优化就是针对get方法（查询操作），并不需要实现加锁。

  ![image-20220401150545760](https://s2.loli.net/2022/04/01/VI5QAlbyEkdCUnF.png)

- JDK 1.8版本中，ConcurrentHashMap使用的是CAS+synchronized实现加锁。这一版本中，将HashEntry改为了Node数组，并且引入了红黑树来优化链表（树形阈值默认是8）。这些优化的原因：①JDK针对`synchronized`关键字进行了一个优化，在使用该关键字的时候，有一个锁升级的过程：无锁->偏向锁->轻量级锁->重量级锁。整个过程，会先使用**偏向锁**获取，失败之后使用**CAS轻量级锁**，失败之后**短暂自旋**变成重量级锁。

- 1.8版本中的`ConcurrentHashMap`主要有两大改进。第一点，取消Segments字段，直接采用`static class Node<K,V>`保存数据，采用Node数组元素作为锁，实现了对每一个节点上的数据进行加锁，提高了并发度。第二点，引入了红黑树来优化链表，当单一节点上的链表长度>=8的时候，会将它升级成红黑树，提高检索效率。

# day08

## 一、fail-fast快速失败和fail-safe安全失败的对比？

- java.util包下面的所有的集合类都是快速失败的，而java.util.concurrent包下面的所有的类都是安全失败的。

- 快速失败的迭代器会在特定情况下抛出ConcurrentModificationException并发修改异常，而安全失败的迭代器永远不会抛出这样的异常。快速失败是一种错误检测机制，修改原集合结构会报错，但是用iterator进行remove操作则不会。

  想要在迭代器中进行删除操作，有两种方式：①使用迭代器的`remove`方法；②使用集合本身的`remove`方法之后进行`break`（break之后就直接跳出迭代过程，不会再次检查两个modCount是否相等）。

  ```java
  hashtable.put("A", "a");
  hashtable.put("B", "b");
  Iterator<Map.Entry<String, Object>> iterator = hashtable.entrySet().iterator();
  while (iterator.hasNext()) {
      Map.Entry<String, Object> next = iterator.next();
      System.out.println(hashtable.get(next.getKey()));
      if (next.getKey().equals("A")) {
          // hashtable.put("B", "b");    // java.util.ConcurrentModificationException
          iterator.remove();      // 不会报错
          // hashtable.put("C", "c");    // 不会报错
      }
  }
  System.out.println(hashtable.containsKey("A"));     // false，删除起到了效果
  ```

- 安全失败的迭代器在进行遍历之前，会先对原有集合进行一次复制。迭代操作都是针对副本进行的，此时修改原集合的数据并不会造成并发修改异常。这也就保证了支持安全失败的集合，是更适合高并发的场景的。副本问题，缺陷就是并不能保证迭代时访问的是最新的内容。

## 二、线程创建方法

线程创建一共有四种方式：实现Runnable接口、继承Thread类、使用Callable接口和FutureTask、使用线程池创建。

- 实现Runnable接口，最常用的一种方法，不会使线程丢失继承的能力（单继承，多实现）。实现的过程一般分为类继承和使用匿名内部类（Lambda表达式）创建。

  ```java
  Thread thread1 = new Thread(new Runnable() {
      @Override
      public void run() {
          System.out.println("线程1创建...");
      }
  });
  ```

- 继承Thread类，重写其中的run方法

  ```java
  public class Thread extends Thread {
      @Override
      public void run() {
          System.out.println(Thread.currentThread().getName() + " run()方法正在执行...");
      }
  }
  ```

- 实现Callable接口创建，这种方式优点是可以获取线程运行中的返回值

  ```java
  public class Thread implements Callable<Integer> {
      @Override
      public Integer call() throws Exception {
          System.out.println(Thread.currentThread().getName() + " call()方法执行中...");
          return 1;
      }
  }
  class StartThread {
      public static void main(String[] args) {
          FutureTask<Integer> futureTask = new FutureTask<>(new Thread());
          Thread thread = new Thread(futureTask);
          thread.start();
      }
  }
  ```

- 使用线程池创建，优点是可以实现线程的统一管理和线程复用，避免重复创建线程，池化。实现的时候通常使用线程执行器，创建之前要有一个线程类，所以严格意义上这种方法需要一个线程类作为模板。

  ```java
  public ThreadPoolExecutor(int corePoolSize,
                            int maximumPoolSize,
                            long keepAliveTime,
                            TimeUnit unit,
                            BlockingQueue<Runnable> workQueue,
                            ThreadFactory threadFactory) {
      this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
           threadFactory, defaultHandler);
  }
  ```

  ```java
  public static void main(String[] args) {
      ExecutorService service = Executors.newSingleThreadExecutor();  // 单线程执行器
      Thread thread = new Thread();
      for (int i = 0; i < 5; i++) {
          service.execute(thread);
      }
      System.out.println("线程任务开始执行");
      service.shutdown();	// 关闭线程
  }
  ```

## 三、线程池关键参数

```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory) {
    this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
         threadFactory, defaultHandler);
}
```

查看线程池的构造方法，主要有七个参数：

- corePoolSize，核心线程数量。线程池维护核心线程的数量，即当这些线程处于空闲状态的时候，核心线程仍然不会被销毁。如果设置了`allowCoreThreadTimeOut`，则允许核心线程在一定时间之后销毁。
- maximumPoolSize，最大线程数。线程池中最大线程数量。在线程池中如果新进来一个任务，首先会查看有没有空闲线程，如果有，则将任务交给空闲线程处理；如果没有，则会将任务加入到工作队列中等待执行；如果工作队列满了，才会尝试去创建新的进程，如果进程数量没有达到最大线程数量，才会创建新的线程。创建的最大数量限制其实就是`maximumPoolSize - corePoolSize`。
  通俗来讲，任务找不到线程处理也找不到排队的地方，线程池才会创建一个新的线程。
- keepAliveTime，空闲线程存活时间。如果线程池中的线程数量大于核心线程数，且有线程处于空闲状态，那么空闲线程在经过了空闲线程存活时间之后将会被销毁。
- unit，线程存活时间单位。
- workQueue，工作队列。新任务如果没有空闲进程来处理，那么在工作队列没有满的情况下将会被存放进工作队列中，排队等待线程来处理这个任务。这个时候就出现了线程调度的问题，jdk中提供了四种工作队列来满足用户的需求。
  - ①ArrayBlockingQueue，基于数组的有界阻塞队列。相当于创建一个固定最大长度的队列，任务按照FIFO的顺序排队执行。如果队列满了但是当前线程数没有达到最大，将会创建一个新的线程来处理这个任务。
  - ②LinkedBlockingQuene，基于链表的无界阻塞队列（默认是无界的，但是一样可以指定队列长度）。相当于使用一个链表将任务存储起来，按照FIFO调度，最大支持的容量是`Integer.MAX_VALUE`。这样的队列其实只利用到了核心线程，当新的任务进来，核心线程满了就不会再创建新的线程直到最大线程数，任务只会挂到队列的最后面等待核心线程处理。
  - ③SynchronousQuene，同步阻塞队列。生产者放入一个任务必须等到消费者取出这个任务。也就是任务进来的时候直接执行，除非达到线程最大数。
  - ④PriorityBlockingQueue，优先阻塞队列（默认是无界的，但是一样可以指定队列长度）。具有优先级的线程阻塞队列，支持长度和链表队列一样，基本相当于无界。队列中的线程按照优先级进行调度。
- threadFactory，线程创建工厂。主要是用来指定线程创建的方法，可以设定线程名、是否为守护线程等。
- Handler，拒绝策略。当线程数量达到线程最大数量且工作队列也达到最大限制，应该如何拒绝新的任务？
  - ①CallerRunsPolicy，在调用者线程中直接执行被拒绝任务的`run`方法。
  - ②AbortPolicy，丢弃任务并且抛出`RejectedExecutionException`异常。
  - ③DiscardPolicy，直接丢弃任务。
  - ④DiscardOldestPolicy，丢掉最先入队的任务，加入新的任务。

## 四、锁的分类

- 悲观锁、乐观锁

  - 悲观锁和乐观锁是两种不同的加锁思想的策略，表示了不同的同步思想。在Java中，乐观锁主要使用的是CAS的思想来实现；悲观锁主要使用的是synchronized关键字和Lock类。

  - 悲观锁的实现，主要使用的是synchronized关键字和lock的实现类来完成。synchronized关键字可以使用在方法上，也可以使用在代码块上。

    ```java
    public static final Object object = new Object();
    public static void main(String[] args) {
        // 悲观锁的实现方法
        synchronized (object) {
            // 加锁操作
        }
    }
    public synchronized void testMethod() {
        // 操作同步步骤
    }
    
    private final ReentrantLock lock = new ReentrantLock();
    public void modifyPublicResources() {
        lock.lock();
        // 同步操作
        lock.unlock();
    }
    ```

  - 乐观锁的实现，主要使用的是CAS的思想，用到的是JDK中提供的原子类提供的一些操作方法。

    ```java
    // 乐观锁的实现
    final AtomicInteger atomicInteger = new AtomicInteger(1);
    atomicInteger.incrementAndGet();
    ```

  - 自旋锁在使用的时候尽管效率很高，但是在使用的时候仍然会造成一定的问题。比如在使用的时候，会有①ABA问题；②自旋时间过长；③只能保证对单个变量进行原子操作。

- 自旋锁、适应性自旋锁

  - 自旋锁和适应性自旋锁主要是为了提高运行的效率。在进行线程阻塞或者唤醒的时候，会造成CPU的状态切换（用户态切换到内核态），这样的切换会导致较高的资源损耗。自旋锁就是让等待的线程保持一种忙循环（自旋），避免短时间内的状态切换导致的损耗。短时间的自旋相比处理器的状态切换带来的损耗是小很多的，所以才会出现自旋的优化。

  - 但是自旋的线程也需要设定好一个自旋的时间和次数限制，避免无节制自旋导致多次忙循环的开销。所以要为自旋锁设定一个忙循环的时间上线和次数上限，默认自旋的次数上限是10，使用`-XX:PreBlockSpin`参数可以修改默认自旋的最高次数。在jdk 1.4版本中新增了自旋锁，在jdk 1.6版本的时候加入适应性自旋锁并且默认使用自旋。

  - ```java
    // JDK 中的原子类 getAndAdd 方法中的do-while循环会使用到自旋锁
    @HotSpotIntrinsicCandidate
    public final int getAndAddInt(Object o, long offset, int delta) {
        int v;
        do {
            v = getIntVolatile(o, offset);
        } while (!weakCompareAndSetInt(o, offset, v, v + delta));
        return v;
    }
    ```

  - 适应性自旋锁，顾名思义就是根据自旋获取锁的难度，自适应判断是否自旋。对于同一个锁对象，如果在上一次自旋中很容易就获取锁了，那么这次就会允许它自旋更多次数；如果上一次很难或者一直没有获取到锁，那么这一次可能会直接忽略自旋的过程。判断适应性自旋，有点类似于富兰克林效应。

- 无锁、偏向锁、轻量级锁、重量级锁

  - 这四种状态是`synchronized`关键字在加锁的时候的状态转变。锁升级也是这个顺序，首先并不直接加锁，之后变为偏向锁，之后再变为轻量级锁，最后升级为重量级锁，这个过程被称为锁膨胀或锁升级。无锁就是一开始并不直接加锁，如果发现有加锁的需求，就开始对它进行锁升级到偏向锁。

  - 偏向锁指的是通常将锁偏向于第一个获得锁的线程。大多数情况下，不存在多个线程竞争，会优先考虑使用偏向锁，对于同一线程多次获取锁来说效率会更高。使用偏向锁的时候，会**在对象头存储锁偏向的线程ID**，以后再次进入和退出同步代码块的时候只需要判断是否是第一次获得锁的线程即可。偏向锁的使用目标是减少在无竞争或者只有一个线程使用锁的时候用轻量级锁带来的性能消耗，因为轻量级锁在**无竞争且自始至终都只有单个线程使用**的时候都是一种性能浪费，轻量级锁每次使用申请、释放都需要CAS，而重量级锁只有在初始化的时候需要使用CAS。

    不过一旦出现多个线程竞争时必须撤销偏向锁，所以撤销偏向锁消耗的性能必须小于之前节省下来的CAS原子操作的性能消耗，不然就得不偿失了。

    - 偏向锁的撤销需要等待全局安全点
    - 撤销偏向锁会将恢复到无锁或者轻量级锁状态

    偏向锁在Java 6之后是默认启用的，但在应用程序启动几秒钟之后才激活，可以使用`-XX:BiasedLockingStartupDelay=0`参数关闭延迟，如果确定应用程序中所有锁通常情况下处于竞争状态，可以通过`XX:-UseBiasedLocking=false`参数关闭偏向锁。

    - 偏向锁是在只有一个线程执行同步块时进一步提高性能，适用于一个线程反复获得同一锁的情况。
    - 适用于有同步代码块，但是没有竞争的情况。

    偏向锁的原理很简单，假设现在有一间公共的单人阅览室。你是第一个进入而且此时没有其他人来图书馆，你在使用的时候只需要直接进去（轻量级CAS）就可以使用了。下次来的时候如果仍然是这种情况，也可以直接使用（偏向锁）。但是如果有多个人来图书馆（不存在竞争），此时你应该在一个不会打扰的时间点（全局安全点）关门表示里面有人（轻量级锁申请CAS），不使用的时候就打开门（释放使用CAS）。但是在你关门看书的时候有人敲门表示要使用这间阅览室（存在竞争多线程），关门就不再适应了，你应该锁门（重量级锁加锁）并且悬挂状态牌（锁状态切换）表示此时不应该被打扰。

  - 轻量级锁的目标是减少在无实际锁竞争时使用重量级锁带来的性能消耗（线程切换以及CPU在用户态以及内核态的切换）。但是轻量级锁在使用的时候仅仅针对的是无实际的锁竞争，如果存在锁竞争的情况中，会尝试使用自旋锁优化，自旋失败之后再会变成重量级锁。

    轻量级锁的实现主要是依赖将Mark Word中的部分字节CAS更新指向线程栈中的Lock Record，如果指向成功就表示成功获得了轻量级锁，否则就是失败获取。

    轻量级锁：无实际竞争，多个线程交替使用锁；允许短时间的锁竞争。重量级锁：有实际竞争，且锁竞争时间长（阻塞线程需要更长的时间才能得到锁）。

  - 重量级锁在Java中被抽象为监视器锁（monitor）。在加锁的时候消耗更大，主要实现的方式是`synchronized`关键字，锁标识位为10，指针指向的是monitor对象（也称为管程或监视器锁）的起始地址。在编译之后的字节码指令中，使用到的是monitor关键字。monitor有两个重要的参数：一个是成员变量owner，表示这把锁的拥有者；一个是recursions，表示拥有这把锁的次数。

    重量级锁在加锁的时候使用一个monitorenter和两个monitorexit（失败跳转到两个monitorexit中间的部分），整体为了保证原子性操作字节码中的指令顺序的方式有点类似于数据库事务。在jdk1.6之前，重量级锁可以直接对应底层操作系统中的互斥量（mutex），这种同步实现的成本非常高。

    ![image-20211026105035969](https://s2.loli.net/2022/04/01/TH2VPkKvQBuLlhy.png)

- 公平锁、非公平锁

  - 公平锁按照申请锁的顺序去获得锁；非公平锁在申请锁的时候会直接尝试去获取锁，如果获取失败，加入等待队列。两者的区别相当于银行排队办业务，公平锁按照先来后到的顺序获取锁；非公平锁就是VIP客户尝试直接去插队最前面去办业务，如果现在窗口繁忙没法处理业务，还是需要排队等待。

  - 公平锁的机制导致线程按照FIFO的顺序获得锁，优点是所有进程都不会出现饿死，都能得到锁；缺点是每次都要将阻塞队列中的线程唤醒，CPU开销比较大。

  - 非公平锁的机制导致新来的线程总是能够以高优先级尝试去获取锁，优点是能够提高吞吐量，尝试去获取锁的进程不需要进行状态切换，减少了CPU进行线程状态切换带来的开销；缺点是队列中的线程可能会因为长期加入的线程而获取不到锁导致饿死。

  - 公平锁和非公平锁在jdk中的实现主要是在Lock中的，主要是用在ReentrantLock类中。ReentrantLock中有一个Sync类，Sync类继承自`AbstractQueuedSynchronizer`类，在操作锁的大部分操作，都是使用的这个类来进行的。Sync类有两个子类：FairSync和NofairSync，这就是公平锁和不公平锁的两个方法的实现。公平锁的实现很好理解，先进先出，直接使用队列就可以完成。

  - Sync的继承体系如下：

    ![image-20220429214203754](https://s2.loli.net/2022/04/29/mrkPODxg9jEWYZB.png)

    可以得知Sync类继承自抽象类AbstractQueuedSynchronizer，也就是平时经常说的AQS，抽象队列同步器。ReentrantLock在创建的时候默认为非公平锁，如果需要指定为公平锁，需要在构造方法中传值为true。

    ![image-20211027181924051](https://s2.loli.net/2022/04/01/bsBlAjTRiOVZaCx.png)

    如果要实现非公平锁，那么应该维护三个变量，state表示锁的状态，如果为0表示当前可以获得锁，否则将不能获得锁。在实现的时候，需要先给state设置默认值，分别代表不同的含义。

    ![image-20211027182300913](https://s2.loli.net/2022/04/01/2TPRqiVIvSLs67H.png)

    另外还需要维护两个变量，一个是当前使用锁的线程，一个是等待队列。当使用锁的线程为空，state应该为1，代表当前锁处于使用的状态不可获得，否则可以立即获得锁。如果使用的非公平锁，那么新加入线程会在第一时间查看state的值，判断是否加入等待队列。这样就实现了非公平锁。如果A线程持有了锁，而B线程处于等待队列，在A线程释放了锁的间隙，A线程唤醒了B线程，C线程加入进来，根据非公平锁，C线程将会率先获得锁，导致B线程无法获得。如果持续这样的情况，将会造成线程饿死的状态。

    > 参考文档：[面试官：说一下公平锁和非公平锁的区别？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/115543000)

- 可重入锁、不可重入锁

  - 可重入锁又称为递归锁，在锁对象是同一个的时候，如果同一线程外层在外层方法获得锁的时候，再进入内层方法会自动获得锁，不会因为之前获得锁而没有释放而阻塞。

    ```java
    synchronized (this) {
    	System.out.println("第1次获取锁，这个锁是：" + this);
    	int index = 1;
    	while (true) {
    	synchronized (this) {
    		System.out.println("第" + (++index) + "次获取锁，这个锁是：" + this);
    	}
    	if (index == 10) {
    		break;
    	}
    }
    ```

    简单理解，就是一个锁可以由外层获得后，再让内层获得一次，不会出现死锁的情况。可重入锁有`synchronized`、`ReentrantLock`（英文翻译就是可重入锁）。不同的是ReentrantLock在使用的时候需要注意使用`lock`方法和`unlock`方法，加锁和释放的次数要达到一致才能达到预期的效果。

    可重入锁，为的就是可以重复获得这个锁。比如现在排队打疫苗，以家庭为单位进行，每次只能一个家庭进行。此时恰好你家获得了这个机会，那么你和你的家人在打疫苗的时候可以直接进行而不用排队。这样就大大方便了对于秩序的维护，那些暂时没有权限的家庭，只能按照先来后到的顺序排队进行。

  - 不可重入锁，简单来说就是可重入锁的对立面。若当前线程某个方法已经获得了锁，当在方法中再次尝试获得锁时会获取不到，造成阻塞。

    ```java
    public class Lock{
        private boolean isLocked = false;
        public synchronized void lock() throws InterruptedException{
            while(isLocked){    
                wait();				// 执行wait会释放锁，只有notify才会唤醒等待
            }
            isLocked = true;
        }
        public synchronized void unlock(){
            isLocked = false;		// 修改锁的状态并且唤醒等待线程
            notify();				// 获得锁
        }
    }
    ```

    ```java
    public class Count{
        Lock lock = new Lock();
        public void print(){
            lock.lock();
            doAdd();
            lock.unlock();
        }
        public void doAdd(){
            lock.lock();		// 执行该方法的时候无法直接获取，只有先释放才能获得，即不可重入。在第二次执行lock方法之前运行了一次notify方法，造成了锁被唤醒的线程获得，所以获取不到锁造成阻塞
            //do something
            lock.unlock();
        }
    }
    ```

    > 参考文档：[Java不可重入锁和可重入锁理解_u012545728的博客-CSDN博客_不可重入锁](https://blog.csdn.net/u012545728/article/details/80843595)

- 独享锁、共享锁。独享锁和共享锁都是锁的一种概念

  - 独享锁，又称排他锁。独享锁指的是锁一次只能被一个线程锁持有。如果一个线程对数据加了独享锁，那么其他线程都无法再对这个数据加锁。Java中的synchronized以及Lock的实现类都属于独享锁。

  - 共享锁，共享锁与独享锁相反，如果一个线程对数据加了共享锁，那么其他线程仍然能够对该线程加共享锁，但是不能加共享锁。Java中典型的共享锁是jdk中的可重入读写锁，持有共享锁的线程只应且只能读数据，持有独享锁的线程能进行读写。读写锁中的读锁是共享锁，允许多个线程持有同时查看；而写锁则是独享锁，不能允许多个线程同时持有。

    ![image-20211027184644436](https://s2.loli.net/2022/04/01/H6MWc89gVo47vu2.png)

    对于读写锁，它的构造方法如下：

    ![image-20211027190204212](https://s2.loli.net/2022/04/01/VS2A1P9jMdDE7bR.png)

    ![image-20211027190300679](https://s2.loli.net/2022/04/01/2tEgSIjnD9YsAhr.png)

    ![image-20211027190356320](https://s2.loli.net/2022/04/01/AQKgEyhpGjTZsnc.png)

    > 在独享锁中也维护了一个state，这个值通常是0或者1（如果是重入锁的话state值就是重入的次数），在共享锁中state就是持有锁的数量。但是在ReentrantReadWriterLock中有读、写两把锁，所以需要在一个整型变量state上分别描述读锁和写锁的数量（或者也可以叫状态）。于是state变量“按位切割”切成了两个部分，高16位表示读锁状态（读锁个数），低16位表示写锁状态（写锁个数）。

    在获取独享锁（写锁）的时候，源码如下：

  ```java
  @ReservedStackAccess
  protected final boolean tryAcquire(int acquires) {
      /*
       * Walkthrough:
       * 1. If read count nonzero or write count nonzero
       *    and owner is a different thread, fail.
       * 2. If count would saturate, fail. (This can only
       *    happen if count is already nonzero.)
       * 3. Otherwise, this thread is eligible for lock if
       *    it is either a reentrant acquire or
       *    queue policy allows it. If so, update state
       *    and set owner.
       */
      Thread current = Thread.currentThread();
      int c = getState();
      int w = exclusiveCount(c);
      if (c != 0) {
          // (Note: if c != 0 and w == 0 then shared count != 0)
          if (w == 0 || current != getExclusiveOwnerThread())
              return false;
          if (w + exclusiveCount(acquires) > MAX_COUNT)
              throw new Error("Maximum lock count exceeded");
          // Reentrant acquire
          setState(c + acquires);
          return true;
      }
      if (writerShouldBlock() ||
          !compareAndSetState(c, c + acquires))
          return false;
      setExclusiveOwnerThread(current);
      return true;
  }
  ```

## 五、分布式锁的实现方式

分布式锁主要有数据库锁、Redis锁、Zookeeper锁三种方式。按照运行速度来说，Redis > Zookeeper > 数据库；按照可靠性来说，Zookeeper > Redis > 数据库。所以一般选择使用Zookeeper或者Redis，相比Zookeeper，Redis分布式锁的实现难度更低。

**概念**

- 在我们进行单机应用开发级并发同步的时候，我们往往采用synchronized或者Lock的方式来解决多线程间的代码同步问题，这时多线程的运行都是在同一个JVM之下，没有任何问题。
- 但当我们的应用是分布式集群工作的情况下，属于多JVM下的工作环境，跨JVM之间已经无法通过多线程的锁解决同步问题。那么就需要一种更加高级的锁机制来处理这种**跨机器的进程之间的数据同步**问题——这就是分布式锁。
- 分布式锁其实是通过分布式锁组件来实现。原先的单机环境下，加锁和开锁都是在同一个JVM中完成。分布式环境中，由于负载均衡等机制的实现，已经很难判定服务究竟会往哪一台机器发送，所以加锁就需要用一把“公共的锁”来完成。每次需要修改数据的时候，就向公共的锁获取；这个时候其他机器中的进程想要进行数据修改也必须先向公共锁先获取，这个时候发现这把锁已经被拿走，所以只能进行等待锁释放。这个过程就能完成数据的安全同步问题，最终实现跨机器的进程数据同步问题。

**分布式锁的几种常见实现方式**

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

**Zookeeper分布式锁的原理**

核心思想：当客户端要获取锁，则创建节点；使用完锁，则删除该节点。

![image-20210718112802792](https://s2.loli.net/2022/04/01/JZOPBt8kxKLsueC.png)

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

> 参考文档：[分布式锁的几种实现方式 - 爷的眼睛闪亮 - 博客园 (cnblogs.com)](https://www.cnblogs.com/austinspark-jessylu/p/8043726.html)

# day09

## 一、next、nextInt、nextLine的区别

- next方法：read the input only till the space. It can't read two words separated by space. Also, next() places the cursor in the same line after reading the input.

  读取输入内容直到遇到空格，它不能读取两个字符之间的空格。同时将光标放在读取输入后面，并且在同一行。

- nextInt方法：it only reads the int value, nextInt() places the cursor in the same line after reading the input.

  只读取整形的数据，输入读取完之后，将光标放在同一行。使用该方法时，会将光标放在读取数字后面同一行。

- nextLine方法：reads input including space between the words (that is, it reads till the end of line \n). Once the input is read, nextLine() positions the cursor in the next line.

  读取空格，直到以'\n'为标志的行尾。一旦输入读取完毕，该方法会将光标移到下一行开始的位置。

## 二、数组下标为什么从0开始？

为什么数组的下标为什么从0开始？按常理来说，第一个元素应该下标应该从1开始，因为索引指针指向的是第一个元素。

因为，**数组在内存中是占用一段连续的存储空间**，当数组初始化后，数组的长度就会固定不变，需要增加数组的长度时，由于数组的存储空间附近可能被其它数据存储的空间占用，所以**只能创建一片新的存储空间用来存储数组**。

而获取数组元素时，规则是：**数组下标 * 数据类型字节大小 + 数组首地址的方式来获取**。如：一个int类型（4个字节）的数组，假设首地址为“1”。那么，第一位元素的地址 = 0 * 4 + 1；第二位元素的地址 = 1 * 4 + 1。

所以，程序就是通过这种计算方式来快速获取数组元素。

## 三、AQS是什么？

AQS，AbstractQueuedSynchronizer，抽象队列同步器。AQS定义了一套多线程访问共享资源的同步器框架。

抽象队列同步器，维护了一个 state 变量代表锁的状态，以及一个 FIFO 的线程等待队列。

![image-20220429214643377](https://img-blog.csdnimg.cn/img_convert/aee822cff75a3ff8b6c81953269ac195.png)

对于 state 变量，应该设置为 volatile 的，因为要实现多个线程共享。state 变量不为 0 的时候，就代表这个共享资源正在被使用（没有被释放），依据这个逻辑，要让其他线程得知共享资源的使用状态，就要可以获取到 state 的值，所以应该被设置为 volatile ，保证可见性。

操作 state 变量一共有三种方式：`getState()`、`setState()`、`compareAndSetState()`。

AQS允许两种资源共享方式：Exclusive（独享，只允许一个线程同时访问）；Shared（共享，允许多个线程同时访问）。独享方式常用的有重入锁 Reentrant Lock；共享方式常见的有信号量 Semaphore 、倒计时锁 CountdownLatch。

自定义抽象队列同步器的实现**只需要实现 state 的获取与释放方式**即可。一般需要实现的方式有四种：

- tryAcquire(int)：独占方式。尝试获取资源，成功则返回true，失败则返回false。
- tryRelease(int)：独占方式。尝试释放资源，成功则返回true，失败则返回false。
- 以上两种方式是独占方式，对应的共享方式就是在方法名后面加上一个 Shared 即可，不过方法的返回值不一样。共享方法的获取资源的方法是 `int tryAcquireShared(int)`，返回 负数 代表失败；返回 0 代表获取成功，但是没有剩余资源；返回正数代表获取成功且有对应数量的剩余资源。
- 共享方法中的释放资源的方法是 `boolean tryReleaseShared(int)` ，释放后允许唤醒后续等待节点则返回 true，反之则返回 false。

自定义同步器的方法要么是共享的，要么是独享的，所以在实现的时候只需要重写其中的一对方法即可。

```java
public class AQSDemo extends AbstractQueuedSynchronizer {

    @Override
    protected boolean tryAcquire(int arg) {
        return super.tryAcquire(arg);
    }

    @Override
    protected boolean tryRelease(int arg) {
        return super.tryRelease(arg);
    }
    
}
```

以 ReentrantLock 为例，如果使用 AQS，就需要使用独享方式的方法。state 的初始值是 0 ，如果存在线程调用 lock 方法获取锁，会调用 tryAcquire 方法将执行 state +1 操作。此时其他的线程尝试获取锁的时候，会查看 state 的值，此时发现 state 并不为 0 ，那么表示有其他线程正在使用独占锁，就不能获取锁。如果已经获取到锁的线程再尝试获取锁，就会将 state + 1，这个过程就是锁的重入。重入多少次，就需要释放多少次，否则会造成锁会长时间得不到释放，state 也不会回归到零值。

以 CountdownLatch 为例，如果使用 AQS，需要使用共享方式的方法。state 的初始值是 0， 任务分为 n 个线程去执行，那么这个过程中，需要将 state 也置为 n，保证最终执行完毕的时候，state 会归零。n 个线程是并行执行的，每个子线程完成之后会 Countdown 倒计时一次，state 的值也会执行 CAS 操作进行 -1，直到所有线程都执行完毕，state 的值也会变成 0，之后会 unpark() 主调用线程，然后主调用线程就会从 await() 函数返回，继续后续任务。

## 四、CountdownLatch、CyclicBarrier以及Semaphore的区别是什么？

CountdownLatch，倒计时锁，计数器锁。线程执行完毕计数，可以让等待线程在计数值达到目标值的时候开始执行。应用场景：例如 B 组线程需要等待 A 组线程全部执行完毕之后才开始运行，那么 A 组线程每运行完一个线程，调用 Countdown 方法计数 +1 ；B 组每个线程都会调用 await 方法，等待 A 组线程计数达到预设值之后，调用 await 方法的线程才会开始运行。在实际使用中，可以用来进行高并发测试，等待线程数量达到一定数量才开始运行目标线程。

CyclicBarrier，循环屏障。相比计数器锁，循环屏障是让一组线程等待至某种状态之后再全部开始运行，循环是因为所有等待线程被释放之后， CyclicBarrier 对象可以重用。CyclicBarrier 在初始化的时候可以定义一个参与线程的数量，即 parties 同伴数量，其他线程会先调用一个 await 方法使线程的状态处于等待状态。只有当 parties 个对象处于等待状态（调用了 await 方法），这些 parties 个线程才会继续执行。简单来说就是让线程处于等待状态，一直到凑齐了目标个线程才开始继续执行。这里存在一个 generation 代数概念，就是满足条件之后同时开始继续的同一批线程。在 CyclicBarrier 中，所有等待的线程在开始继续执行之后，generation 会重置；而在 CountdownLatch 中，generation 在等待线程开始执行之后并不会重置。

> 1、CountDownLatch 简单的说就是一个线程等待，直到它所等待的其他线程都执行完成并且调用`countDown()` 方法发出通知后，当前线程才可以继续执行。CountDownLatch 等待目标数量的线程执行完毕之后，当前线程才开始执行。
> 2、CyclicBarrier是所有线程都进行等待，直到所有线程都准备好进入 await() 方法之后，所有线程同时开始执行。CyclicBarrier 会将多个线程阻塞，等待达到目标数量之后同时开始执行。
> 3、CountDownLatch的计数器只能使用一次。而CyclicBarrier的计数器可以使用 reset() 方法重置。所以CyclicBarrier 能处理更为复杂的业务场景，比如如果计算发生错误，可以重置计数器，并让线程们重新执行一次。
> 4,、CyclicBarrier 还提供其他有用的方法，比如 getNumberWaiting() 方法可以获得 CyclicBarrier 阻塞的线程数量。isBroken() 方法用来知道阻塞的线程是否被中断。如果被中断返回 true，否则返回 false。

Semaphore，信号量。信号量主要作用是控制并发线程的数量。信号量通过 `acquire()` 和 `release()` 来控制线程的，信号量在初始化的时候会预设一个初始值 n ，表示可以提供的信号量个数 n ，`acquire()` 和 `release() ` 分别表示获取和释放信号量，传入的参数为信号量的个数。如果这个值设置为 1 ， 表示这个锁就是互斥锁；如果设置为 10 ， 线程每次执行`acquire(3)` 获取 3 个信号量，那么最大的并发数就是 10 / 3 = 3。注意线程在获取之后要及时释放信号量，否则会造成阻塞。

以上三个类均位于 java.util.concurrent 包下，都是并发编程中的辅助类。

## 五、volatile的使用场景有哪些？

当一个变量被 volatile 修饰之后，将具备：可见性、有序性。

> **1.保证此变量对所有的线程的可见性，当一个线程修改了这个变量的值，volatile 保证了新值能立即同步到主内存，其它线程每次使用前立即从主内存刷新。**但普通变量做不到这点，普通变量的值在线程间传递均需要通过主内存来完成。
> **2.禁止指令重排序优化。有volatile修饰的变量，赋值后多执行了一个“load addl $0x0, (%esp)”操作，这个操作相当于一个内存屏障**（指令重排序时不能把后面的指令重排序到内存屏障之前的位置）。

可见性是通过刷新主内存中 volatile 修饰的变量值来实现的。工作线程都存在各自对应的一个工作内存，该线程在修改共享变量的时候，会将共享变量复制一个副本到各自对应的高速内存缓冲区（工作内存）中，在工作内存中执行对共享变量的操作，操作完毕之后再将新值写回到主内存中。使用了 volatile 修饰的共享变量，其他线程在使用该变量前，会针对这个变量从主内存读取值。**它可以避免线程从自己的工作缓存中查找变量的值，必须到主存中获取它的值，线程操作`volatile`变量都是直接操作主存**。

有序性，即代码实际的执行顺序和代码的编写顺序一致。Java 中的 JIT 编译器在进行代码编译的时候，会针对代码执行顺序进行优化，这个就是指令重排序，虽然重排序，但是它会保证**程序最终结果和代码顺序执行结果相同**。**指令重排序只针对没有数据依赖关系的语句**。如果语句之间存在数据依赖关系，那么编译器和处理器不会改变存在数据依赖关系的语句执行顺序，但是这种情况只针对于单线程程序，对于多线程程序，指令重排序并不能保证执行结果不变。

计算机在设计的时候，会在不改变程序的执行结果的前提之下，尽可能地提高并行度。为了保证有序性，可以使用 volatile 关键字。底层保证有序性，主要是内存屏障。内存屏障，相当于给重排序指令之间加了一道屏障，前后的指令不能穿越这个屏障重新排队了。既然指令重排序不会针对存在数据依赖关系的语句，那么解决多线程环境下的指令重排序，就需要人为地**添加数据依赖**。内存屏障就相当于是人为地创造数据依赖或者创造重排序的屏障，禁止了目标指令的重排序。

内存屏障分为两种，一种是 Load Barrier 读屏障，另一种是 Store Barrier 写屏障。

内存屏障的作用有两个：① 禁止内存屏障两侧的指令重排序； ② 强制将高速缓存中的临时变量值写回主内存，使高速缓存中的变量值失效。

> 对于Load Barrier来说，在指令前插入Load Barrier，可以让高速缓存中的数据失效，强制线程从主内存加载数据；
> 对于Store Barrier来说，在指令后插入Store Barrier，能让写入缓存中的最新数据更新写入主内存，让其他线程可见。

Java 中的内存屏障由这两个屏障两两组合构成，一共有四种，包括 LoadLoad、StoreStore、LoadStore、StoreLoad。其中 StoreLoad 屏障是开销最大的，它需要保障在 Store 操作之后让所有处理器可见。Java 中的 volatile 是悲观操作，会在每个 volatile 写操作前插入StoreStore屏障，在写操作后插入StoreLoad屏障；在每个volatile读操作前插入LoadLoad屏障，在读操作后插入LoadStore屏障。

> 参考文档：[并发关键字volatile（重排序和内存屏障） - 简书 (jianshu.com)](https://www.jianshu.com/p/ef8de88b1343)

volatile 的典型使用场景：单例模式中的 DCL 双重检查锁实现

```java
public class Singleton {  
    // 实例变量用 volatile 修饰，让其他线程感知到变量的状态
    private volatile static Singleton singleton;  
    // 私有化构造方法
    private Singleton (){}  
    public static Singleton getSingleton() {  
    // 先检查实例存在与否，不存在才需要被实例化
    if (singleton == null) {  
        // 实例化的时候进行加锁，避免多个线程同时检查到线程不存在同时进行实例化
        // 同步之前进行判断是避免已经实例化的情况下，多个线程同时进行 synchronized 操作，造成性能开销
        synchronized (Singleton.class) {
            // 避免多个线程通过第一重检查之后，在经过了 synchronized 的等待之后，直接进行实例化
            // 如果两个线程同时通过第一重检查，第一个线程先获得锁，实例化对象
            // 第二个线程等待之后获取锁，再进行第二次判断的时候，由于存在 volatile 关键词，从主内存中获取 singleton 的状态，发现已经实例化了，那么就不会通过判断，保证了多线程状态下的安全
            if (singleton == null) {  
                singleton = new Singleton();  
            }  
        }  
    }  
    return singleton;  
    }  
}
```

volatile 保证有序性：

```java
public class VolatileDemo {
    // volatile 修饰成员变量 flag ，只能修饰成员变量，不能修饰局部变量（保证可见性）
    public static volatile int flag = 0;
    public static int x = 0, y = 0;
    public static void main(String[] args) {
        x = 1;
        x = 2;
        /* volatile 变量在进行读写相关操作时，保证在该操作之前的所有操作已经完成，
         * 且结果对于后面可见；保证在该操作后面的操作均未开始。
         * 在这个例子中，可以保证在执行 3 的时候，1、2全部完成，4、5还未开始
         * 但是1、2与4、5各自之间的顺序无法保证
         */
        flag = 3;
        x = 4;
        y = 5;
    }
}
```

# day10

## 一、Spring Boot和普通的Spring有什么区别？

Spring Boot是在Spring的基础上面搭设的框架，目的是为了简化Spring项目的搭设和开发过程。

Spring Boot的四大特性：

- 自动配置 Spring-boot-starter 开箱即用依赖模块
- 简化统一配置文件，可以使用 yaml 格式或者 properties 格式配置文件
- 监控管理 actuator
- 内嵌了如 Tomcat，Jetty，所有的依赖都打到一个 jar 包里面，可以直接 java -jar 运行

监控管理依赖：添加了监控依赖管理依赖，可以实现对应用的监控和管理功能

```xml
<dependencies> 
	<dependency> 
		<groupId> org.springframework.boot </ groupId> 
		<artifactId> spring-boot-starter-actuator </ artifactId> 
	</ dependency> 
</ dependencies>
```

## 二、Mybatis的一级缓存以及二级缓存是什么？

Mybatis 针对缓存进行了支持，一级缓存的作用域是一个 SqlSession，默认开启；二级缓存的作用域是针对整个Mapper ，需要手动开启，开启的条件是要让所有的 POJO 类都实现序列化接口，开启方法有两种：

① 在配置文件中打开二级缓存的开关

```xml
<setting name="cacheEnabled" value="true" />
```

② 在 Mapper 映射文件中开启二级缓存

```xml
<cache eviction="FIFO" flushInterval="60000" size="512" readOnly="true"/>
<!-- eviction收回策略 flushInterval刷新间隔 size引用数目 readOnly只读 -->
```

③ 在 Spring Boot项目中开启缓存：

```yaml
mybatis: 
  configuration:
    cache-enabled: true
```

禁用缓存：在语句标签中使用 useCache 属性，将其设置为 false 即可。默认为 true 表示使用缓存。

```xml
<select id="findAllPets" resultMap="petsMap" useCache="false">
 select * from pets
</select>
```

**一级缓存**

在参数和 sql 完全一样的情况下，我们使用同一个 SqlSession 来调用同一个 Mapper 方法，往往只执行一次 Sql。Mybatis 在执行完第一次 sql 的时候，会将结果缓存在 SqlSession 中，当第二次执行的时候，如果没有声明需要刷新且缓存没有失效，SqlSession 都会直接取出当前缓存的数据，而不会再次将 SQL 发送到数据库中。

一级缓存的优点就是对于重复的相同的请求，可以加快后续执行的时候的顺序，避免对数据库执行多次相同的 SQL，提高了效率。但是针对于一级缓存的设计，如果在缓存没有失效的前提下，人为针对数据库做出了影响 SQL 执行结果的修改，就需要进行缓存刷新操作了，迫使 Mybatis 请求数据库，而不是从 SqlSession 中直接提取缓存。这一点是在开发中需要注意的点。

在一个 SqlSession 中，会维护一个 Executor 对象， Executor 对象中维护一个 PerpetualCache 对象。在 SqlSession 中如果执行了修改（增删改）操作或者 clearCache() 方法，会清空 PerpetualCache 对象的数据，但是该对象可以继续使用。所以在修改操作执行之后，Sql 查询的结果如果受到影响，那么同样会刷新执行结果。

**二级缓存**

实现二级缓存的时候，MyBatis 要求返回的 POJO 必须是可序列化的，也就是要求实现 Serializable 接口。

开启了二级缓存意味着 Mapper.xml 文件中的所有 select 语句都会被缓存，所有的 update、insert、delete 语句都会刷新缓存。缓存默认的淘汰机制是使用 LRU 算法实现的；缓存会存储列表或集合对象 1024 个引用；缓存会被认为是可读 / 可写的缓存。

## 三、对象的创建过程是怎么样的？

对象创建过程分为五个步骤：

（1）当遇到 `new` 关键字的时候，首先检查这个指令的参数是否可以在常量池中定位到一个类的符号引用，并检查这个符号引用代表的类是否已被加载、解析和初始化。

（2）在类加载检查后，接下来需要为新对象分配内存。

（3）需要将分配到的内存空间都初始化为零。

（4）需要对对象进行相关的设置，比如这个对象是哪个类的实例、如何才能找到类的元数据信息、对象的 GC 分代年龄等信息。

（5）执行 `init()` 方法。

## 四、GC 如何判断垃圾对象？

Java 运行时数据区中的堆几乎存放着所有的对象实例，这些对象如果一直积累下去，会造成 Out Of Memory:Heap 错误。GC 判断垃圾对象一般有两种方式：**引用计数法** 和 **可达性分析**。

**引用计数法**

引用计数法，为所有的对象中添加一个引用计数器。每当存在一个对于该对象的引用，计数器的值就 +1 ；如果对于该对象的引用失效，计数器就 -1 。在整个引用计数的过程中，任何时刻计数器为 0 的对象就是不可再被使用的，也就是“垃圾”对象。

引用计数法，优点是执行效率高，可以非常及时地感知到引用数量的变化。在整个 GC 的过程中，引用计数可以比较快的让收集器进行 GC 阶段。但是因为存在循环引用的情况，引用计数的方法不能解决循环引用的情况，所以现阶段的 GC 回收器已经弃用该方法。

**可达性分析**

可达性分析，从 GC Roots 的对象开始作为搜索点，一直向下搜索查找引用链，搜索走过的路径就是引用链（Reference Chain），引用链上的对象就是不可回收的。如果一个对象与 GC Roots 之间没有任何引用链相连，则证明这个对象是不可达的，也就是可以被回收的对象。

GC Roots 通常包括以下几种：

- 虚拟机栈（栈帧中的本地变量表）中引用的对象
- 方法区中类静态属性引用的对象
- 方法区中常量引用的对象
- 本地方法栈中 JNI （即一般说的 Native 方法）引用的对象

## 五、被 GC 判断为垃圾的对象一定会被回收吗？

总结：要经过两次标记；如果已经运行过或者未重写 finalize 方法，则只需要进行一次标记。

如果一个对象即使被判定为不可达对象，但是直到死亡过程，还需要经过两次标记过程。对象第一次被判定为不可达对象的时候，会进行第一次标记并筛选。筛选条件为是否有必要执行 finalize 方法：如果有必要执行 finalize 方法，那么将会等待执行 finalize 方法；否则直接回收。判断有无必要执行 finalize 方法时，如果该对象并没有重写 finalize 方法或者 finalize 已经被调用过，此情况下会直接将对象进行回收。

如果对象重写了 finalize 方法且 finalize 方法并没有被调用过，那么将执行第二阶段的标记。这个时候对象开始执行 finalize 方法：对象会被放进一个 F-Queue 的队列中，稍后交由一个由虚拟机创建的、低优先级的 Finalizer 线程来执行队列中对象的 finalize 方法。为了避免 F-Queue 队列发生阻塞，“执行”的时候并不会等待 finalize 方法执行结束，而只是触发 finalize 方法。finalize 方法触发之后，如果对象被 GC 执行了第二次标记，那么基本上该对象的生命周期就结束了。

finalize 方法中，对象仍然可以再次执行自救。如果对象在 finalize 方法中将自身与 GC Roots 上的引用链上的对象建立关联（常用的是将自身 this 赋值给类变量或者成员变量），那么 GC 在第二次判断标记的过程中会将该对象判断为不可回收对象并移出队列。如果对象在 finalize 中仍然没有与引用链上的对象产生关联，基本上等于该对象已经结束生命周期了。整个回收过程中，finalize 方法最多只能免死一次；如果第一次自救成功，那么第二次判断为不可达的时候会直接回收。

> 参考文档：[GC是如何判断一个对象为"垃圾"的？被GC判断为"垃圾"的对象一定会被回收吗？_不能说的秘密的博客-CSDN博客](https://blog.csdn.net/canot/article/details/51037938)

# day11

## 一、BIO、NIO、AIO 三种 IO 模型分别是什么？

BIO （Blocking I/O）同步阻塞的 I/O 、NIO（New/Non-blocking I/O） 同步非阻塞的 I/O 、AIO（Asynchronous I/O） 异步非阻塞的 I/O 。这三种 IO 模型是 Java 中提供的 API ，与系统 IO 是不相同的。在Linux(UNIX)操作系统中，共有五种IO模型，分别是：**阻塞IO模型**、**非阻塞IO模型**、**IO复用模型**、**信号驱动IO模型**以及**异步IO模型**。

- 阻塞：发起一个请求之后，请求方如果没有等待到请求的结果，会一直处于等待，线程会被挂起，无法从事其他任务，条件就绪才能继续执行
- 非阻塞：发起一个请求之后，请求方不必等待到请求的结果，可以去执行其他任务
- 同步：发起一个调用之后，被调用者未处理完成之前，调用不返回
- 异步：发起一个调用之后，立刻得到被调用者的确认表示接收到调用，此时被调用者还没有返回结果，此时我们可以继续处理其他请求，被调用者处理完成之后通过事件、回调等机制来通知调用者

![image-20211126193822720](https://s2.loli.net/2022/04/01/bWfhCt8QBTng5Sj.png)

采用 BIO 的服务端，通常由一个独立的 Acceptor 线程来监听客户端的连接。通常是使用 `while(true)` 循环与 `accept()` 方法来让线程监听请求。一个线程在处理请求的时候是不能接收到来自其他用户的连接请求的，但是可以通过多线程的方式来让服务端能够同时服务多个用户。这个模型是典型的一请求一应答的通信模型。

采用 NIO 的服务端，引入了新的 Selector 、 Buffer  以及 Channel 概念。相比于 BIO 模型，NIO 不使用传统的 Socket 和 ServerSocket 类，而是使用对应的 SocketChannel 和 ServerSocketChannel 两种不同的套接字通道实现，两种通道都支持阻塞和非阻塞模式。
（1）NIO 是非阻塞的，IO 是阻塞的。因为 NIO 使用的是 Buffer 对象，读写的时候只需要开始即可，等待读取的过程中可以继续处理其他任务；IO 则要一直等待读/写完成才能继续其他任务。
（2）NIO 使用 Channel 进行通信，IO 使用 Stream 流进行通信。 NIO 是使用 Channel 通信，在 Channel 中对 Buffer 对象进行读写操作，可以支持双向读写和异步操作；而 Stream 只支持单向读写操作。
（3）Selector 选择器，NIO 模型中引入了 Selector 以及 Channel 概念。通过 Selector ，可以让单线程处理多个 Channel ，这样的处理可以提高线程的利用率。
JDK 中对于 NIO 的实现比较复杂，且还有空轮询的弊端，自行实现的 NIO 比较容易出现问题。通常使用的 Netty 框架的 NIO 模型来进行开发。

采用 AIO 的服务端，是异步非阻塞的。表示在发出请求之后，调用者可以继续执行其他任务，被调用者完成请求任务之后，相应的线程可以立即感知到（通常是操作系统发出通知）并且可以当即处理。目前 AIO 的应用比较少，适用于连接数目多且连接比较长的架构。

> 参考文档：[Java面试常考的 BIO，NIO，AIO 总结_小树的博客-CSDN博客](https://blog.csdn.net/m0_38109046/article/details/89449305?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~default-1.no_search_link&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2~default~CTRLIST~default-1.no_search_link)
> [Java NIO浅析 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/23488863)
> [漫话：如何给女朋友解释什么是Linux的五种IO模型？ (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg3MjA4MTExMw==&mid=2247484746&idx=1&sn=c0a7f9129d780786cabfcac0a8aa6bb7&source=41&scene=21#wechat_redirect)

## 二、Java 中的内存分配策略有哪些？

Java 中的内存分配策略主要有两种，分别是指针碰撞和空闲列表。

指针碰撞：假设 Java 堆中的内存都是规整的，所有被使用过的放在一边，未使用过的放在一边，中间有一个指针作为分界，分配内存仅仅需要把这个指针向空闲空间方向移动一段即可。

空闲列表：如果 Java 堆中的内存不是规整的，已使用过的和空闲的交错，虚拟机就需要维护一个列表，记录哪些内存是可用的，在分配的时候找到一块足够大的内存进行分配。

## 三、ThreadLocal 线程变量是什么？

ThreadLocal 又被叫做本地线程变量，意味着 ThreadLocal 中填充的变量只属于当前线程，对于其他线程来说是隔离的。 ThreadLocal 为每个线程都创建了一个副本用来保存各自的变量，这样的设计下，线程各自对应的变量是其他线程不可访问的，这样就形成了隔离的环境。

- 每个副本中的变量只能由当前 Thread 访问，别的线程是访问不到的。所以在开发的时候要注意变量是否需要被移除，否则容易造成内存占用且不易回收。
- ThreadLocal 为每个线程都创建了各自的副本，且线程之间彼此隔离，这样就不存在多线程下的线程安全问题了。
- ThreadLocal 由于采用的线程之间隔离的方式，可以用于传递参数。**实例需要在多个方法中共享，但不希望被多线程共享**。比如在 Spring 中的 request 和 session 就使用了 ThreadLocal 变量来实现。

使用 ThreadLocal 的时候，通常需要实现其中的三个方法：`get` 、`set` 、 `remove` 。

```java
@Component
public class HostHolder {
    private final ThreadLocal<User> users = new ThreadLocal<>();

    public void setUser(User user) {
        users.set(user);
    }
    public User getUser() {
        return users.get();
    }
    public void removeUser() {
        users.remove();
    }
}
```

以上的代码实现了将用户保存至各自对应的 ThreadLocal 中，可以比较容易地实现保存用户状态。

在 ThreadLocal 中一共存在四个方法，分为是 `initialValue()` 、`set()` 、`get()` 、 `remove()` 。ThreadLocal 底层为了实现线程之间的隔离，使用 Map 来存储每个线程对应的副本，key 对应的是每个线程的线程 ID ，value 值为对应的副本空间中存放的变量。

![image-20211127150926920](https://s2.loli.net/2022/04/01/18PewVO46xGW2as.png)

ThreadLocal  的组成结构：

![image-20211127151029198](https://s2.loli.net/2022/04/01/TJVBgS1NzR38ifs.png)

Thread 类中存在一个属性名为 threadLocals ，归属于 ThreadLocalMap 类，内部存在 Entry 数组，类似于 Map 。 Entry 数组中，key 存放的是 ThreadLocal 类，value 存放的是我们需要存放的对象。

```java
static class ThreadLocalMap {

  /**
   * The entries in this hash map extend WeakReference, using
   * its main ref field as the key (which is always a
   * ThreadLocal object).  Note that null keys (i.e. entry.get()
   * == null) mean that the key is no longer referenced, so the
   * entry can be expunged from table.  Such entries are referred to
   * as "stale entries" in the code that follows.
   */
  static class Entry extends WeakReference<ThreadLocal<?>> {
    /** The value associated with this ThreadLocal. */
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
      super(k);
      value = v;
    }
  }
}
```

由于 Entry 继承自 WeakReference 弱引用类，弱引用的特点是只能存在于下一次 GC 之前，发生 minorGC 或 majorGC 就会被回收，造成 key 变为空，value 还会被栈使用，也就造成了内存泄露问题。如果没有对 ThreadLocal 中的变量进行删除或者替换，它的生命周期将会与线程同步；如果线程又交予线程池进行管理实现线程复用，核心线程的生命周期将会变得不可预测，不可避免地导致 ThreadLocal 中变量的生命周期也持续延长那个，导致内存泄漏的问题越来越严重。

- 可以自己调用 remove 方法将不要的数据移除避免内存泄漏的问题
- 每次在做set方法的时候会清除之前 key 为 null
- 使用反射机制获取当前线程对应的 ThreadLocalMap ，手动移除

> 参考文档：[史上最全ThreadLocal 详解_fu_bobo-CSDN博客_threadlocal](https://blog.csdn.net/u010445301/article/details/111322569?ops_request_misc=%7B%22request%5Fid%22%3A%22163786206116780366548482%22%2C%22scm%22%3A%2220140713.130102334..%22%7D&request_id=163786206116780366548482&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-2-111322569.pc_search_result_control_group&utm_term=ThreadLocal&spm=1018.2226.3001.4187)
> [并发编程-Threadlocal - 简书 (jianshu.com)](https://www.jianshu.com/p/bd1e0bafd464)

## 四、 Redis 的缓存过期策略有哪些？

Redis 会把设置了过期时间的 key 放入一个独立的字典里，在 key 过期时并不会立刻删除它。 Redis 会通过如下两种策略，来删除过期的 Key 。

- 惰性删除
  - 客户端访问某个 Key 时， Redis 会检查该 Key 是否过期，若过期则删除。访问的时候才去查询数据是否过期。
- 定期扫描
  -  Redis 默认每秒执行 10 次过期扫描（配置 hz 选项），扫描策略如下：
  -  从过期字典中随机选择 20 个 key ，删除这 20 个 key 中 已过期的 key ；如果过期的 key 的比例超过 25% ，则再从过期字典中随机选择 20 个 key

## 五、 Redis 的缓存淘汰策略有哪些？

当 Redis 占用内存超出最大限制 (maxmemory) 时，可采用如下策略 (maxmemory-policy) ，让 Redis 淘汰一些数据， 以腾出空间继续提供读写服务。

- noeviction ：对可能导致增大内存的命令返回错误（大多数写命令， DEL 除外）
- volatile-ttl ：在设置了过期时间的 key 中，选择剩余寿命 TTL 最短的 key ，将其淘汰
- volatile-lru ：在设置了过期时间的 key 中，选择最少使用的 key (LRU) ，将其淘汰
- volatile- random ：在设置了过期时间的 key 中，随机选择一些key，将其淘汰
- allkeys-lru ：在所有的 key 中，选择最少使用的 key (LRU) ，将其淘汰
- allkeys-random ：在所有的 key 中，随机选择一些 key ，将其淘汰

Redis 中的 LRU 算法逻辑和普通的 LRU 略有区别。

- 普通的 LRU 需要维护一个链表，按照访问顺序存储数据。新的被访问的数据存储到表头，最近访问的 Key 在表头，最少访问的数据放在链表尾部。
- Redis 使用的 LRU 是一种近似 LRU 算法。给每个 Key 维护一个时间戳，淘汰时随机取样五个值，从中淘汰掉最旧的 Key 。这个时间戳的更新就是根据数据被访问的时间来进行记录的，这种方式相比于传统的 LRU 更加节省内存，也提高了计算的效率，且可以取得和 LRU 近似的淘汰效果。

# day12

## 一、 Redis 的缓存穿透、缓存击穿、缓存雪崩是什么？

**缓存穿透**

请求不存在【 DB 和 Redis 中都不存在】的数据，导致请求直接打到持久层数据库中，导致数据库负载过高，甚至导致宕机。这样的请求几乎可以导致请求次次到达 DB ，会导致 DB  的压力过高，相当于 Redis 没有起到任何请求缓冲的功能。【请求不存在的数据导致每次请求都到达 DB 】

**解决方法**

- 缓存空结果：缓存和 DB 都没有请求结果的时候，将空值存入缓存层。之后再次发起请求的时候，就可以直接从缓存中返回空值了，避免 DB 短期内压力过高。需要注意空值的缓存生效时间不能过久，否则会产生数据一致性问题。
- 请求合法性校验：对用户的请求进行合法性校验，一旦发现用户的请求是不存在的数据，将该请求拦截禁止。
- 布隆过滤器：将所有存在的 Key 放入布隆过滤器中，在访问缓存层之前，先通过过滤器拦截，若请求的是不存在的 key ，则直接返回空值。
  - 布隆过滤器的简单原理就是使用一个 Bit 数组，每个位置存储 0 或者 1 ，标识该位置是否被使用。而 Key 值则直接通过 Hash 映射到该数组中，判断一个 Key 是否存在可以直接看对应的 Hash 值位置上是否为 0 即可。事实上的布隆过滤器会存在一定的误判，但是对于大部分的判断还是准确的。

**缓存击穿**

缓存击穿指的是特定的热点数据被频繁访问，在失效的瞬间会将请求全部达到数据库上，造成 DB 瞬间压力过高宕机。可以理解为是对特定的热点数据的高频访问，一旦缓存失效请求会直接击穿 Redis 到达 DB 。【特定的热点数据过期导致 DB 瞬间压力过大】

**解决办法**

- 设置热点数据永不过期：两种方式，第一种不设置过期时间，达到物理上的“永不过期”。另一种本质上是对热点数据在过期前进行重新存储，刷新过期时间，达到一种”永不过期“的现象。
- 加互斥锁：让热点数据同时只能被一个线程访问，当一个线程访问该数据时，其他线程只能等待。访问完毕之后重建热点数据，届时其他线程可以直接从缓存取值。

**缓存雪崩**

由于某些原因，大量 key 在同一时间失效过期或不能用，导致缓存在瞬间几乎不可用，请求直接到达 DB ，最终导致宕机。【缓存崩溃，没有数据可用】

**解决办法**

- 设置随机失效时间：在设置 key 的生效时间的时候，使用随机数。这样可以避免大量的 key 在同一时间都处于不能用的状态，避免了缓存雪崩出现。
- 数据永不过期：两种实现方式，目的就是延长 Redis 的生效时间。
- 构建多级缓存：可以在本地新建一级缓存，降低请求达到 DB 的概率。相当于在 Redis 之前再加了一层屏障。常用的一级缓存构建工具有 Caffeine 、 Guava Cache 、EhCache 等。相比于 Redis ，本地缓存在处理请求的时候效果更好，性能更高。
- 构建高可用的 Redis 集群：部署多个 Redis 实例，当某个实例不可用的时候，仍然可以保证服务的可用性。
- 启用限流和降级措施：对存储层增加限流措施，当请求超出限制的时候，对其提供降级服务。

> 参考文档：[牛逼，三句话搞懂 Redis 缓存穿透、击穿、雪崩！_JAVA技术全栈的博客-CSDN博客_redis缓存击穿](https://blog.csdn.net/weixin_47531845/article/details/108950081?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~default-2.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~default-2.no_search_link&utm_relevant_index=5)

