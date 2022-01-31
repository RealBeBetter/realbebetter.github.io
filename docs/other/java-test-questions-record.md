---
title: 牛客网Java专项练习刷题记录
date: 2021-12-26 21:06:12
tags:
- Other
---

# 程序运行题

- ```java
  enum AccountType
  {
      SAVING, FIXED, CURRENT;
      private AccountType()
      {
          System.out.println(“It is a account type”);
      }
  }
  class EnumOne
  {
      public static void main(String[]args)
      {
          System.out.println(AccountType.FIXED);
      }
  }
  ```

  - 判断的是枚举类的运行，此枚举类中有三个方法，所以最终会调用三次构造方法，最终输出三次 It is a account type。

# 选择题

- 关于Java中的数组，下面的一些描述，哪些描述是准确的：（  ）
  - 正确答案: A C F  你的答案: A D F (错误)

```
A.数组是一个对象，不同类型的数组具有不同的类
B.数组长度是可以动态调整的
C.数组是一个连续的存储结构
D.一个固定长度的数组可类似这样定义: int array[100]
E.两个数组用equals方法比较时，会逐个便利其中的元素，对每个元素进行比较
F.可以二维数组，且可以有多维数组，都是在Java中合法的
```

数组是一个对象，创建的时候语法规则如下：

```java
int[] arr1 = new int[5];
int[] arr2 = {1,2,3,4,5};
int[] arr3 = new int[]{1,2,3,4,5};
```

别的方法都是语法错误。比较应该使用`Arrays.equals()`方法，数组对象的`equals`方法没有重写，`Object.equals()`比较的是两个数组的地址值。

- 以下关于进程、线程、协程的的说法正确的是？

  正确答案: B D  你的答案: A B (错误)

  ```
  A.进程是操作系统能够进行运算调度的最小单位
  B.线程是堆共享，栈私有
  C.线程是堆私有，栈共享
  D.一般而言，执行开销进程 > 线程 > 协程
  ```

A选项，正确应该是线程才是操作系统能够进行运算调度的最小单位。

- 
  以下哪些请求方法是HTTP规范中支持的请求方法

  正确答案: A B D E  你的答案: A B (错误)

  ```
  GET
  HEAD
  INSERT
  DELETE
  TRACE
  ```

HTTP规范中的常用方法：GET（获取文档）、POST（发送数据）、HEAD（获取文档首部）、PUT（请求主体存储在服务器）、TRACE（报文追踪）、OPTIONS（决定执行的方法）、DELETE（删除文档）。运行的对象全部为服务器，而不是针对客户端。

- 下列关于PC机性能的叙述中，哪些是正确的

  正确答案: A B C  你的答案: A B (错误)

  ```
  逻辑结构相同时，CPU主频越高，速度就越快
  总线的传输速率与总线的数据线宽带、总线工作频率等有关
  通常cache容量越大，访问cache的命中率就越高
  主存的存取周期越长，存取速度就越快
  ```

主要看C选项，cache容量越大，所能承载的cache数据就越多，就越有可能缓存到需要命中的cache数据，所以命中率和容量成正比。同时注意通常情况下，cache不会缓存无用数据。

- 在一次挥手断开连接的过程中，以下TCP网络连接状态，哪些会出现在主动断开的一方

  正确答案: A B C  你的答案: B D (错误)

  ```
  FIN
  ACK
  TIME_WAIT
  CLOSE_WAIT
  ```

- 编译程序工作时，通常有以下哪些阶段

  正确答案: A B C E  你的答案: B E (错误)

  ```
  词法分析
  语法分析
  中间代码生成
  语义分析
  目标代码生成
  ```

个人做题时候，心路历程是：语义分析应该是程序员干的事，而不是机器应该做的事。然后我查资料，发现编译程序的工作流程，通常有五个阶段，如下图所示：

![image-20210916224808809](https://gitee.com/realBeBetter/image/raw/master/img/image-20210916224808809.png)

题目可能还是有问题，先记下这张图吧。

- 下面关于面向对象的一些理解哪些是错误的(  )

  正确答案: C  你的答案: C D (错误)

  ```
  面向对象的最重要的特性是支持继承、封装和多态
  系统设计应该遵循开闭原则，系统应该稳定不不可修改，但应支持通过继承、组合等方式进行扩展
  函数式的语言必然是面向对象的语言
  面向对象设计时，每个类的职责应该单一，不要再一个类中引入过多的接口
  过程式语言和面向对象的语言各有其优势，过程式语言更加灵活，面向对象语言更加强调抽象和封装
  Java和C++都是静态类型的面向对象编程语言
  ```

动态类型语言是指在运行期间才去做数据类型检查的语言，也就是说，在用动态类型的语言编程时，永远也不用给任何变量指定数据类型，该语言会在你第一次赋值给变量时，在内部将数据类型记录下来。静态类型语言与动态类型语言刚好相反，它的数据类型是在编译其间检查的，也就是说在写程序时要声明所有变量的数据类型，C/C++是静态类型语言的典型代表，其他的静态类型语言还有C#、JAVA等。

- final、finally、finalize三个关键字的区别是（）

  正确答案: A B C  你的答案: A B (错误)

  ```
  final是修饰符（关键字）可以修饰类、方法、变量
  finally在异常处理的时候使用，提供finally块来执行任何清除操作
  finalize是方法名，在垃圾收入集器将对象从内存中清除出去之前做必要的清理工作
  finally和finalize一样都是用于异常处理的方法
  ```

final：可用来定义变量、方法传入的参数、类、方法。
finally：只能跟在try/catch语句中，并且附带一个语句块，表示最后执行。
finalize：是垃圾回收器操作的运行机制中的一部分，进行垃圾回收器操作时会调用finalize方法，因为finalize方法是object的方法，所以每个类都有这个方法并且可以重写这个方法，在这个方法里实现释放系统资源及其他清理工作，JVM不保证此方法总被调用。

将类的成员的访问权限设置为默认的，则该成员能被( )

正确答案: A  你的答案: D (错误)

```
同一包中的类访问
其它包中的类访问
所有的类访问
所有的类的子类访问
```

![img](https://gitee.com/realBeBetter/image/raw/master/img/8411086_1516010523560_072774B6B658B3603E1AA7198722775C)

- jdk1.8版本之前的前提下，接口和抽象类描述正确的有（ ）

正确答案: B C  你的答案: A B C (错误)

```
抽象类没有构造函数
接口没有构造函数
抽象类不允许多继承
接口中的方法可以有方法体
```

抽象类可以有构造函数，只是不能进行实例化。

# 判断题

- 子类要调用继承自父类的方法，必须使用super关键字。
  - 错误。子类调用父类的构造方法和重写的父类的方法，要用super关键字；如果调用的是没有重写的方法，则可以直接调用。

- 抽象类方法的访问权限默认都是public。

  - 正确答案: B  你的答案: A (错误)

  - 关于抽象类

    JDK 1.8以前，抽象类的方法默认访问权限为protected

    JDK 1.8时，抽象类的方法默认访问权限变为default

    关于接口

    JDK 1.8以前，接口中的方法必须是public的

    JDK 1.8时，接口中的方法可以是public的，也可以是default的

    JDK 1.9时，接口中的方法可以是private的

# 问答题

## off-heap是指那种内存？

- off-heap是堆外内存，是JVM进程管理的内存。**堆外内存意味着把内存对象分配在Java虚拟机的堆以外的内存，直接受操作系统管理。**

## &和&&、|和||分别有什么区别？`~`符号怎么运算？

- &叫做按位与，无论符号两侧是否成立都会全部执行。&&叫做逻辑与，也叫短路与。前者符合后者将会跳过执行。
- |叫做按位或，无论符号两侧是否成立都会全部执行。&&叫做逻辑或，也叫短路或。前者符合后者将会跳过执行。
- `~`符号的运算规则是取反之后再 `-1`

## STW（或者Full GC）的多种触发条件？

- Java中Stop-The-World机制简称STW，是在执行垃圾收集算法时，Java应用程序的其他所有线程都被挂起（除了垃圾收集帮助器之外）。Java中一种全局暂停现象，全局停顿，所有Java代码停止，native代码可以执行，但不能与JVM交互；这些现象多半是由于gc引起。

- GC时的Stop the World(STW)是最大的敌人。但除了GC，JVM下还会发生停顿现象。

- JVM里有一条特殊的线程——VM Threads，专门用来执行一些特殊的VM Operation，比如分派GC，thread dump等，这些任务，都需要整个Heap，以及所有线程的状态是静止的，一致的才能进行。所以JVM引入了安全点(Safe Point)的概念，想办法在需要进行VM Operation时，通知所有的线程进入一个静止的安全点。

- 除了GC，其他触发安全点的VM Operation包括：

  1. JIT相关，比如Code deoptimization，Flushing code cache ；
  
  2. Class redefinition (e.g. java-agent，AOP代码植入的产生的instrumentation) ；
  3. Biased lock revocation 取消偏向锁 ；
  4. Various debug operation (e.g. thread dump or deadlock check)；
  
## 如何保证在多线程的条件下，线程按照自己想要的顺序执行？

使用三个机制：CylicBarrier、CountdownLatch、Semaphore

使用自定义的信号量，在线程执行之前定义自己的信号量，之后使用切换信号量的方式切换线程。

如果想要交错执行，使用acquire和release方法执行。

# 算法题

- 对于给定的一个包含连续字母、连续数字及空格的字符串（不会出现字母和数字连在一起出现），实现字母部分按出现顺序排列而数字按照从小到达顺序排在最后一个字母的后面

输入

```
"xb 1 cc 5 dd 10 ee 2"
```

输出

```
"xb cc dd ee 1 2 5 10"
```

自己写的暴力方法，先是没有判断其中一方或者双方均为空的情况，二是没有考虑到数字长度问题。

```java
public String char_and_num_return (String text_source) {
    // write code here
    int flag = 0;
    int isBlank = 0;
    char[] str = text_source.toCharArray();
    StringBuilder sb = new StringBuilder();
    StringBuilder num = new StringBuilder();
    for (int i = 0, strLength = str.length; i < strLength; i++) {
        char c = str[i];
        if (c >= '0' && c <= '9') {
            num.append(c);
            flag = 1;
        } else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            sb.append(c);
            isBlank = 0;
        } else if (c == ' ') {
            // 对于空格的处理需要判断，如果前面一位已经存在空格，应该不予处理
            if (isBlank == 0) {
                isBlank = 1;
                sb.append(c);
            }
            if (flag == 1) {
                num.append(c);
                flag = 0;
            }
        }
    }
    if (num.length() == 0 & sb.length() == 0) {
        return "";
    } else if (num.length() == 0) {
        return sb.toString().trim();
    } else if (sb.length() == 0) {
        return num.toString().trim();
    }
    String[] s = num.toString().split(" ");
    long[] strNum = new long[s.length];
    for (int i = 0; i < s.length; i++) {
        strNum[i] = Long.parseLong(s[i]);
    }
    for (int i = 0; i < strNum.length; i++) {
        for (int j = 0; j < strNum.length - 1 - i; j++) {
            if (strNum[j] > strNum[j + 1]) {
                long temp = strNum[j];
                strNum[j] = strNum[j + 1];
                strNum[j + 1] = temp;
            }
        }
    }
    if (isBlank == 1)
        sb.deleteCharAt(sb.length() - 1);
    for (long j : strNum) {
        sb.append(" ").append(j);
    }
    return sb.toString().trim();
}
```

