---
title: 【Java】基础知识部分-Lambda表达式
date: 2021-05-03
tags:
- Java
---
## 九、Lambda表达式

### 函数式编程思想概述

面向对象的思想强调：”必须通过对象的形式来工作“
函数式编程思想则尽量忽略面向对象的复杂思想；”强调做什么，而不是以什么形式去做“

我们学习的Lambda表达式就是以函数式编程思想的一种体现，jdk 8 新特性。

### Lambda表达式

#### 体验

需求：启动一个线程，在控制台输出一句话：多线程程序启动了

```java
public class LambdaDemo {
  public static void main(String[] args) {
    // 实现类的方式实现
        /*MyRunnable mr = new MyRunnable();
        Thread t1 = new Thread(mr);
        t1.start();*/
    // 匿名内部类的方式实现
        /*new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("多线程程序启动了");
            }
        }).start();*/
    // Lambda 表达式的方式实现
    new Thread( () -> {
      System.out.println("多线程程序启动了");
    }).start();
  }
}
```

我们提供了三种方式实现这种需求，其中Lambda表达式的方式最为简便高效。

#### Lambda表达式的标准格式

![image-20210526014306386](https://s2.loli.net/2022/04/06/5KuDnptoI7Cg48Z.png)

三要素：***形式参数、箭头、代码块***

```java
(formal parameters) -> { 
    // code
}
```

- 形式参数如果有多个，中间用逗号隔开；如果没有参数，留空即可。
- `->`由英文的中划线加大于号组成，是一种固定写法，代表指向动作
- 代码块是我们要做的具体内容，也就是我们之前的方法体内容
- 使用前提：①有一个接口；②接口中有且仅有一个抽象方法

### Lambda表达式练习

案例一：

- 定义一个接口`Eatable`，里面定义一个方法：`void eat();`
- 定义一个测试类，在测试类中提供两个方法：
  - 一个方法是`useEatable(Eatable e)`
  - 另一个方法是主方法，在主方法中调用`useEatable`方法

①创建接口类

```java
public interface Eatable {
    void eat();
}
```

②创建接口对应的实现类

```java
public class EatableImpl implements Eatable{
    @Override
    public void eat() {
        System.out.println("一天一苹果，医生远离我");
    }
}
```

③创建测试类，用三种方法实现调用

```java
public class EatableDemo {
    public static void main(String[] args) {
        Eatable e = new EatableImpl();
        useEatable(e);

        // 匿名内部类
        useEatable(new Eatable() {
            @Override
            public void eat() {
                System.out.println("一天一苹果，医生远离我");
            }
        });

        // Lambda 表达式的使用
        useEatable(() -> {
            System.out.println("一天一苹果，医生远离我");
        });
    }

    private static void useEatable(Eatable e) {
        e.eat();
    }
}
```

案例二：

- 定义一个接口`Flyable`，里面定义一个方法：`void fly(String s);`
- 定义一个测试类，在测试类中提供两个方法：
  - 一个方法是`useFlyable(Flyable f)`
  - 另一个方法是主方法，在主方法中调用`useFlyable`方法

①定义一个接口

```java
public interface Flyable {
    void fly(String s);
}
```

②创建测试类

```java
public class FlyableDemo {
    public static void main(String[] args) {
        // 匿名内部类实现
        useFlyable(new Flyable() {
            @Override
            public void fly(String s) {
                System.out.println(s);
                System.out.println("匿名内部类");
            }
        });

        // Lambda 表达式
        useFlyable( (String s) -> {
            System.out.println(s);
            System.out.println("Lambda表达式");
        });
    }
    private static void useFlyable(Flyable f) {
        f.fly("风和日丽，晴空万里");
    }
}
```

案例三：

- 定义一个接口`Addable`，里面定义一个方法：`int add(int x,int y);`
- 定义一个测试类，在测试类中提供两个方法：
  - 一个方法是`useAddable(Addable a)`
  - 另一个方法是主方法，在主方法中调用`useAddable`方法

①创建接口

```java
public interface Addable {
    int add(int x, int y);
}
```

②创建测试类

```java
public class AddableDemo {
    public static void main(String[] args) {
        // 匿名内部类实现
        useAddable(new Addable() {
            @Override
            public int add(int x, int y) {
                return x + y;
            }
        });

        // Lambda 表达式
        useAddable( (int x, int y) -> {
            return x + y;
        });
    }
    private static void useAddable(Addable a) {
        int sum = a.add(10, 20);
        System.out.println(sum);
    }
}
```

### Lambda表达式的省略模式

省略模式：

- 参数类型可以省略，但是有多个参数的时候，不能只省略部分
- 如果参数有且仅有一个，那么小括号可以省略
- 如果代码块的语句只有一条，可以省略大括号和分号，甚至是`return`

调用之前编写的接口，尝试Lambda表达式的省略模式的运用：

```java
public class LambdaDemo {
    public static void main(String[] args) {
        useAddable((int x, int y) -> {
            return x + y;
        });
        // 省略模式：参数的类型可以省略
        // 但是有多个参数的情况下，不能只省略部分
        useAddable((x, y) -> {
            return x + y;
        });
        useFlyable((s) -> {
            System.out.println(s);
        });
        // 省略模式：如果参数仅有一个，小括号()可以省略
        useFlyable(s -> {
            System.out.println(s);
        });
        // 省略模式：如果代码块的语句只有一条，可以省略大括号{}和代码块语句的分号;
        useFlyable(s -> System.out.println(s));
        // 省略模式：如果代码块的语句只有一条，可以省略大括号{}和代码块语句的分号; 如果有 return 语句 ，return 也要省略掉
        useAddable((x, y) -> x + y);
    }

    private static void useAddable(Addable addable) {
        int sum = addable.add(10, 20);
        System.out.println(sum);
    }

    private static void useFlyable(Flyable flyable) {
        flyable.fly("风和日丽，晴空万里");
    }
}
```

### Lambda表达式的注意事项

注意事项：

- 使用Lambda必须要有一个接口，且接口中有且仅有一个抽象方法

- 使用Lambda必须要有上下文环境，才能推导出Lambda对应的接口

  - ```java
    // 根据局部变量的赋值得知
    Runnable r = () -> System.out.println("Lambda表达式");
    new Thread(r).start();
    ```

  - ```java
    // 根据调用方法的参数得知
    new Thread(() -> System.out.println("Lambda表达式")).start();java
    ```

测试类：

```java
public class LambdaDemo {
    public static void main(String[] args) {
        // 注意：使用Lambda必须要有一个接口，且接口中有且仅有一个抽象方法
        useInter(() -> System.out.println("好好学习，天天向上"));
        // 注意：使用Lambda必须要有上下文环境，才能推导出Lambda对应的接口
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("匿名内部类");
            }
        }).start();
        // 根据局部变量的赋值得知
        Runnable r = () -> System.out.println("Lambda表达式");
        new Thread(r).start();
        // 根据调用方法的参数得知
        new Thread(() -> System.out.println("Lambda表达式")).start();

    }
    private static void useInter(Inter i) {
        i.show();
    }
}
```

### Lambda表达式和匿名内部类的区别

- 所需类型不同
  - 匿名内部类：可以是接口，可以是抽象类，也可以是具体类
  - Lambda表达式：只能是接口，而且接口中只能有一个抽象方法
- 使用限制不同
  - 如果一个接口中有且仅有一个抽象方法，可以使用匿名内部类，也可以使用Lambda表达式
  - 如果一个接口中存在多个抽象方法，只能使用匿名内部类
- 实现原理不同
  - 匿名内部类：编译之后，会在磁盘中产生一个单独的.class字节码文件
  - Lambda表达式：编译之后，没有一个单独的.class字节码文件，对应的字节码会在运行的时候动态生成

**匿名内部类在编译之后会在内存中产生一个单独的.class字节码文件**

```java
public class LambdaDemo {
    public static void main(String[] args) {
        // 匿名内部类
        /*useInter(new Inter() {
            @Override
            public void show() {
                System.out.println("接口");
            }
        });
        useAnimal(new Animal() {
            @Override
            void method() {
                System.out.println("抽象类");
            }
        });
        useStudent(new Student() {
            @Override
            void study() {
                System.out.println("具体类");
            }
        });*/

        // Lambda
        useInter(() -> System.out.println("接口"));
        // Lambda只支持接口类型，且接口中仅有一个抽象方法
        /*useAnimal(() -> System.out.println("抽象类"));
        useStudent(() -> System.out.println("具体类"));*/
    }
    private static void useInter(Inter i) {
        i.show();
    }
    private static void useAnimal(Animal a) {
        a.method();
    }
    private static void useStudent(Student s) {
        s.study();
    }
}
```
