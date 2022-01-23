---
title: 【Java】基础知识部分-数组、类、继承多态、接口泛型
date: 2021-05-03
tags:
- Java
---

## 一、数组

### 单个数组内存分配图

![image-20210623200824004](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623200824004.png)

### 多个数组内存分配图

![image-20210623200845985](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623200845985.png)

### 多个数组指向相同地址

![image-20210623200910906](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623200910906.png)

这种情况下，多个数组指向同一个地址值。

中间一行的赋值操作是将arr的地址值赋值给arr2，如果这个时候针对arr2进行操作，那么也就相当于是对arr进行操作，本质上指向的是同一个数组。所以无论操作arr还是arr2，结果上没有本质上的区别。

### 数组空指针异常

![image-20210623201404201](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623201404201.png)

如果数组被赋值为null，那么将找不到数组本身存放的堆内存地址。再次使用的时候会报错：空指针异常

## 二、内部类、抽象类、包装类、修饰符

### 内部类

在一个类中定义一个类，类中被定义的类就是内部类

#### 内部类的访问特点

- 内部类可以直接访问外部类的成员，包括私有

- 外部类要访问内部类的成员，必须创建对象

```java
public class Outer {
    private int num = 20;
    public class Inner {
        public void show() {
            System.out.println(num);
        }
    }
    private void method() {
        Inner inner = new Inner();
        inner.show();
    }
}
```

#### 成员内部类

根据内部类的位置不同，可以分为两种：

- 在类的成员位置：成员内部类
- 在类的局部位置：局部内部类

成员内部类如何使用呢？两种方式：

一、将内部类的权限名定义为public，之后创建内部类

```java
public class Outer {
    private int num = 20;
    public class Inner {
        public void show() {
            System.out.println(num);
        }
    }
}
```

```java
public static void main(String[] args) {
    // 创建对象调用内部类方法
    Outer.Inner oi = new Outer().new Inner();
    oi.show();
}
```

二、如果Inner内部类的权限名不是public，则上述方法失效，那么如何调用呢？

在外部类内创建新的方法，创建内部类，调用方法；外界直接创建外部类，并调用该方法即可

```java
public class Outer {
    private int num = 20;
    private class Inner {
        public void show() {
            System.out.println(num);
        }
    }
    public void method() {
        Inner i = new Inner();
        i.show();
    }
}
```

```java
public static void main(String[] args) {
    // 创建对象调用内部类
    /*Outer.Inner oi = new Outer().new Inner();
    oi.show();*/
    Outer o = new Outer();
    o.method();
}
```

#### 局部内部类

局部内部类就是在方法体中的类，所以外界是无法使用的，需要在方法中创建该局部内部类的对象，通过调用对象内部的方法使用

该类可以访问外部的成员，也可以访问方法内的局部变量

```java
public class Outer {
    private int num = 10;
    public void method() {
        class Inner {
            int num2 = 20;
            public void show() {
                System.out.println(num);
                System.out.println(num2);
            }
        }
        // 直接在方法内部创建对象调用局部内部类的方法
        Inner i = new Inner();
        i.show();
    }
}
```

```java
public static void main(String[] args) {
    Outer o = new Outer();
    o.method();
}
```

#### 匿名内部类

前提：存在一个类或者一个接口，这里的类可以是具体类也可以是抽象类

格式：

```java
new class/interface() {
    // Override method()
};
```

本质是**一个继承了该类或实现了该接口的子类匿名对象**

步骤一：有一个类或者接口

```java
public interface Inter {
    void show();
}
```

步骤二：创建相关的类

```java
public class Outer {
    public void method() {
        /*new Inter() {
            @Override
            public void show() {
                System.out.println("匿名内部类方法执行");
            }
        };
        这样写仅仅是个对象，下面的写法才是对象调用方法：
        new Inter() {
            @Override
            public void show() {
                System.out.println("匿名内部类方法执行");
            }
        }.show();*/

        // 由于该匿名内部类实现的是 Inter 接口，我们可以用接口类型来接受这个匿名内部类
        Inter i = new Inter() {
            @Override
            public void show() {
                System.out.println("匿名内部类方法执行");
            }
        };

        i.show();
        i.show();
    }
}
```

步骤三：测试

```java
public class Test {
    public static void main(String[] args) {
        Outer o = new Outer();
        o.method();
    }
}
```

输出结果：

匿名内部类方法执行
匿名内部类方法执行

#### 匿名内部类在开发中的使用

仅使用一次，创建接口操作类的对象，调用接口操作方法，方法的参数是接口

不想创建接口实现类的情况，并且只想用一次，就可以使用匿名内部类

### 抽象类

Java中，**没有方法体**的方法应该被定义为**抽象方法**；类中如果有抽象方法，则应该定义为**抽象类**

注意事项：

- 抽象类中的方法不一定是抽象方法，但是抽象方法所属的类一定要是抽象类
- 抽象类中的子类要么是抽象类，要么重写抽象类中的所有抽象方法
- 抽象类不能实例化，但是抽象类可以通过子类对象进行实例化，这叫抽象类多态

#### 抽象类的成员特点

抽象类中可有成员变量、成员方法、构造方法

- 成员变量
  - 可以是变量，也可以是常量
- 成员方法
  - 可以有抽象方法：限定子类必须完成某些动作
  - 可以有非抽象方法：提高代码的复用性
- 构造方法
  - 有构造方法，但是不能实例化
  - 抽象方法的实例化是通过子类的对象进行实例化的，子类对象对于父类数据的初始化要使用到这些构造方法

```java
public abstract class Animal {
    // 抽象类中可以包含成员变量
    private int age = 20;
    private final String city = "北京";

    // 因为抽象类是通过子类对象进行实例化的，所以子类对象在使用构造方法创建时，
    // 会隐式的调用父类的构造方法，也就是抽象类的构造方法
    public Animal() {}

    public Animal(int age) {
        this.age = age;
    }

    public void show() {
        age = 40;
        System.out.println(age);
        System.out.println(city);
    }

    /*public void eat() {
        System.out.println("吃东西");
    }*/
    // 抽象方法
    public abstract void eat();
    // 抽象类中可以有具体的方法
    public void sleep() {
        System.out.println("睡觉");
    }
}
```

### 包装类

![image-20210406145151828](https://i.loli.net/2021/04/06/OJpMzHUX6GnkaRw.png)

基本数据类型使用虽然非常方便，但是没有对应的方法来操作这些数据。所以我们可以使用包装类将这些基本数据类型进行一定的封装，把基本类型的数据包装起来，这就是包装类。

> 在包装类中可以定义一些方法，用来操作基本类型的数据。

#### 装箱与拆箱

![image-20210406150512203](https://i.loli.net/2021/04/06/ONEve8UiJmxL7nQ.png)

### 修饰符

Java中的修饰符分为两大类：权限修饰符、状态修饰符

#### 权限修饰符

![image-20210509204638596](https://i.loli.net/2021/05/09/I9iJOYoz8hsapCV.png)

权限修饰符，修饰的是访问的权限，指的是在同一个module中的不同类中的访问权限

#### 状态修饰符

##### final（最终态）

可以修饰成员方法、成员变量、类

- final修饰方法，表明该方法是最终方法，不能被重写
- final修饰变量，表明该变量是最终变量，不能被再次赋值
- final修饰类，表明该类是最终类，不能被继承

final修饰局部变量：

- final修饰基本数据类型变量，变量的数据值不能发生改变
- final修饰引用数据类型变量，变量的地址值不能发生改变，但是地址里的内容是可以发生改变的

##### static（静态）

可以修饰成员方法、成员变量

- 被类的所有对象共享——这也是我们判断是否使用static关键字的条件
- 可以通过类名.变量名调用（也可以使用对象名调用），推荐使用类名调用
- *静态成员方法只能访问静态成员*

## 三、继承、多态

### 继承

继承是面向对象三大特征之一，可以使得子类具有父类的属性和方法，还可以在子类中重新定义，追加属性和方法

#### 继承的利弊

- 优点：
  - 提高了代码的复用性（多个类相同的成员可以放到同一个类中）
  - 提高了代码的维护性（如果方法的代码需要修改，修改一处即可）
- 缺点：
  - 继承让类与类之间产生了关系，类的耦合性增强了，当父类发生变化时，子类实现也不得不跟着变化，削弱了子类的独立性

#### 继承使用的情况

什么时候使用继承？

当类A是类B的”一种/一个“时，就可以使用继承关系。

#### 继承中成员变量访问

- 在子类方法中访问变量
  - 子类局部范围找
  - 子类成员范围找
  - 父类成员范围找
  - 如果都没有就报错（不考虑父类的父类）

#### super与this关键字的使用

- super：代表父类存储空间的标识（可以理解为父类对象引用）
- this：代表本类对象的引用

![image-20210623201554835](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623201554835.png)

#### 继承中成员方法的访问

继承中的成员方法的访问：（子类访问成员方法）

- 子类成员范围找
- 父类成员范围找
- 如果找不到就报错（不考虑父类的父类）

```java
public static void main(String[] args) {
    Zi zi = new Zi();
    // 调用子类成员方法
    zi.method();
    // 调用子类和父类中的重名无参方法
    // 真正调用的是子类中的同名方法
    zi.show();
    // 调用父类中的方法，需要在子类中的同名方法中添加 super.show();
}
```

#### 继承中构造方法的访问特点

继承中，关于构造方法的访问：

- 子类中所有的构造方法都会默认访问父类中的无参构造方法

- 原因：子类继承自父类，在子类调用父类时可能会用到父类的数据，所以在子类进行初始化的时候需要先对父类进行初始化操作
- 因为子类会继承父类的数据，可能还会使用父类的数据。所以在子类初始化之前需要先完成父类数据的初始化
- **每一个子类构造方法的第一句默认都是`super();`**

如果父类中没有无参构造方法，只有带参构造方法，解决方法：

- 通过使用super关键字显式的调用父类的带参构造方法
- 在父类中自己提供一个无参构造方法（推荐使用）

```java
public static void main(String[] args) {
    /*
    * 父类无参构造方法被调用
    * 子类无参构造方法被调用
    * */
    Zi z1 = new Zi();
    /*
    * 父类无参构造方法被调用
    * 子类带参构造方法被调用
    * */
    Zi z2 = new Zi(20);
}
```

#### super中的内存图

![image-20210623201636429](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623201636429.png)

#### 方法重写

**子类中出现了和父类中一样的方法声明**

当子类中需要父类的功能，而功能主体子类有自己特有内容，可以重写父类中的方法。这样既沿袭了父类中的功能，又定义了子类特有的功能

方法重写时最好添加`@Override`注解，可以帮忙检查方法重写的方法声明是否正确

**注意事项**

- 父类中的私有方法子类不能重写（父类中的私有成员子类是不能被继承的）
- 子类重写父类方法，子类的访问权限不能更低。例如：父类成员方法为默认，子类重写方法权限为默认或比默认更高（protected，public）
  - 方法访问权限：public > protected > 默认 > private

#### 继承的注意事项

Java中的继承只支持单继承，不支持多继承（一个类继承自多个类，不允许）

继承支持多级继承，子类继承自父类，父类继承自父类的父类（爷爷类）这样的继承是合法的

### 多态

多态定义的时候：左父右子

#### 多态中成员访问

成员变量：编译看左边，执行看左边

成员方法：编译看左边，执行看右边

成员方法和成员变量执行不同的原因：**因为成员方法有重写，而成员变量没有**

底层上的解释就是成员变量属于前期绑定（静态绑定，程序编译期的绑定），成员方法属于后期绑定（动态绑定，程序运行期的绑定）。

> 重载属于前期绑定，重写属于后期绑定。

也就是说：**多态的编译是否能通过，要看父类中是否有相关的变量和方法；执行则要看是变量还是方法**

#### 多态的利弊

- 多态的好处：提高了程序的扩展性


- 多态的弊端：不能使用子类的特有功能
- 定义多态方法的时候，使用父类型作为参数，使用具体的子类型进行操作

实际使用如下：

①创建Animal类

```java
public class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}
```

②创建Dog类和Cat类

```java
public class Cat extends Animal{
    public void eat() {
        System.out.println("猫吃老鼠");
    }
}
```

```java
public class Dog extends Animal{
    public void eat() {
        System.out.println("狗吃骨头");
    }

    public void gatekeeper() {
        System.out.println("狗看门");
    }
}
```

③创建测试主类

```java
public class AnimalDemo {
    public static void main(String[] args) {
        Animal a = new Cat();
        a.eat();

        Animal b = new Dog();
        // b.gatekeeper();
        b.eat();
    }
}
```

这个时候我们调用gatekeeper方法则会报错，因为gatekeeper方法是Dog类独有的方法。多态的弊端此时体现出来了：因为在Animal父类中没有定义gatekeeper方法，那么在使用多态的时候就不能调用到子类的独有方法。

解决方法：①在Animal类中添加Dog的特有方法，那这样Cat类也能够调用gatekeeper方法，本质上二者相悖了。

```java
public void gatekeeper() {
    System.out.println("动物看家护院");
}
```

所以说，多态的弊端就是不能调用子类的特有方法。

②向下转型，将Animal类定义的时候的b对象（Dog）转型为Dog本身的类型。这样转型之后其实也与多态定义的时候的方法不相符，违背了多态本身的定义。

```java
((Dog) b).gatekeeper();
```

## 四、接口、泛型

### 接口Interface

接口就是一种**公共的规范标准**，Java中的接口更多体现在**对行为的抽象**

接口使用interface关键字来创建；接口的使用是通过类来实现该接口实现的

```Java
public interface Jumping {
    public abstract void jump();
}
```

接口不能实例化，要想使用需要通过一个类来实现该接口，通过实现类对象来实例化（与抽象类在这一方面类似），叫做接口多态

#### 接口的成员特点

- 成员变量
  - 只能是常量，默认由public static final修饰，不能进行二次赋值
- 成员方法
  - 只能是抽象方法，默认由public abstract修饰，不能是非抽象方法
- 构造方法
  - 接口中没有构造方法，因为接口主要是对行为进行抽象，没有具体存在
  - 一个类如果没有父类，则默认继承自Object类

```java
public interface Inter {
    public int num = 20; // 接口中的成员变量默认是被 static final 修饰
    public final int num2 = 30;
    public static final int num3 = 40;

    public abstract void method();
    void show();

    /* 接口中不能有构造方法和非抽象方法的
    public Inter() {}
    public void show() {}*/
}
```

### 泛型Generic

泛型：是JDK5中引入的特性，它提供了编译时类型安全检测机制，该机制允许在编译时检测到非法的类型。它的本质是参数化类型，也就是说所操作的数据类型被指定为一个参数。

提到参数，最熟悉的就是定义方法时有形参，然后调用此方法时传递实参。那么参数化类型怎么理解呢?
顾名思义，就是将类型由原来的具体的类型参数化，然后在使用/调用时传入具体的类型
这种参数类型可以用在类、方法和接口中，分别被称为泛型类、泛型方法、泛型接口

泛型定义格式：

- <类型>：指定一种类型的格式，这里的类型可以看成是形参
- <类型1,类型2...>：指定多种类型的格式，多种类型之间用逗号隔开。这里的类型可以看成是形参
- 将来具体调用时候给定的类型可以看成是实参，并且实参的类型只能是引用数据类型

泛型的使用可以使一些集合的使用中可能出现的类型错误，由运行期错误转换为编译期错误，编码的时候更加安全。

①把运行期间的问题提前到了编译期

②避免了强制类型转换

#### 泛型类

泛型类的定义格式：

- 格式：`修饰符class类名<类型> { }`
- 范例：`public class Generic<T> { }`
- 此处T可以随便写为任意标识，常见的如`T、E、K、V`等形式的参数常用于表示泛型

使用步骤：

①创建泛型类Generic类

```java
public class Generic<T> {
    private T t;

    public T getT() {
        return t;
    }

    public void setT(T t) {
        this.t = t;
    }
}
```

②使用泛型类

```java
public class GenericDemo {

    public static void main(String[] args) {
        Student student = new Student();
        student.setStuName("张三");
        student.setStuAge(18);
        System.out.println(student.getStuName());
        System.out.println(student.getStuAge());

        Generic<String> g1 = new Generic<String>();
        g1.setT("李四");
        System.out.println(g1.getT());

        Generic<Integer> g2 = new Generic<Integer>();
        g2.setT(20);
        System.out.println(g2.getT());
    }

}
```

对比普通类（student），泛型类在使用的时候更加简便，不需要过多的创建set和get方法

#### 泛型方法

在上述的例子中，我们使用泛型方法需要多次创建新的对象，使用中还是比较繁琐。为了能够创建一次对象，多次调用不同的参数的同一个方法，我们可以使用泛型方法。

定义格式如下

```java
public class GenericFunction {
    public <T> void show(T t) {
        System.out.println(t);
    }
}
```

使用方法

```java
GenericFunction g = new GenericFunction();
g.show("雨下一整晚Real");
g.show(20);
g.show(true);
```

打印输出结果如下所示：

> 雨下一整晚Real
> 20
> true

#### 泛型接口

我们定义一个泛型接口

```java
public interface GeneticInterface<T> {
    void show(T t);
}
```

定义接口的实现类

```java
public class GenericInterfaceImpl<T> implements GeneticInterface<T>{
    @Override
    public void show(T t) {
        System.out.println(t);
    }
}
```

测试运行类

```java
GeneticInterface<String> geneticInterface1 = new GenericInterfaceImpl<String>();
geneticInterface1.show("Real");

GeneticInterface<Integer> geneticInterface2 = new GenericInterfaceImpl<Integer>();
geneticInterface2.show(21);

GeneticInterface<Boolean> geneticInterface3 = new GenericInterfaceImpl<Boolean>();
geneticInterface3.show(true);
```

运行结果如下

> Real
> 21
> true

#### 类型通配符

为了表示各种泛型List的父类，可以使用类型通配符。

- 类型通配符：<?>
- List<?>：表示元素类型未知的List，它的元素可以匹配任何的类型
- 这种带通配符的List仅表示它是各种泛型List的父类，并不能把元素添加到其中

如果说我们不希望List<?>是任何泛型List的父类，只希望它代表某一类泛型List的父类，可以使用类型通配符的上限

- 类型通配符上限：<? extends 类型>
- List<? extends Number>：它表示的类型是Number或者其子类型

除了可以指定类型通配符的上限，我们也可以指定类型通配符的下限

- 类型通配符下限：<? super 类型>
- List<? super Number>：它表示的类型是Number或者其父类型

```java
public class GenericDemo {
    public static void main(String[] args) {
        List<?> list1 = new ArrayList<Object>();
        List<?> list2 = new ArrayList<Number>();
        List<?> list3 = new ArrayList<Integer>();
        /*这三个类是继承关系，按照继承顺序编写的*/
        System.out.println("--------");

        /*类型通配符上限*/
        // List<? extends Number> list4 = new ArrayList<Object>();
        List<? extends Number> list5 = new ArrayList<Number>();
        List<? extends Integer> list6 = new ArrayList<Integer>();

        /*类型通配符下限*/
        List<? super Number> list7 = new ArrayList<Object>();
        List<? super Number> list8 = new ArrayList<Number>();
        // List<? super Number> list9 = new ArrayList<Integer>();

    }
}
```

在上述的代码中，添加注释的行是错误的。根据上限和下限的定义，我们可以得出super和extends的使用。

#### 可变参数

要想实现多个数字之和，这种方法的实现，需要用到可变参数

如果为每一个数量的数求和编写一个方法，那么工作量将会变得非常大。这个时候我们就可以用到可变参数

使用如下：

```java
public static void main(String[] args) {
    System.out.println(sum(10, 20));
    System.out.println(sum(10, 20, 30));
    System.out.println(sum(10, 20, 30, 40));
}

static int sum(int... a) {
    int sum = 0;
    for (int i : a) {
        sum += i;
    }
    return sum;
}
```

其中，a是一个数组类型的数据。我们求和的时候直接遍历数组求和即可。

***如果sum方法有多个参数，那么可变参数应该放在后面***

![image-20210424231843121](https://i.loli.net/2021/04/24/KxZzjmQWHDnpURq.png)

如果调换二者的顺序，则不能通过编译。

#### 可变参数的使用

![image-20210424233045153](https://i.loli.net/2021/04/24/2Kc3i6TShvtFXz5.png)

```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("Hello", "World", "java");
    // UnsupportedOperationException
    // list.add("java EE");
    // list.remove("java");
    list.set(2, "java EE");
    System.out.println(list);

    List<String> stringList = List.of("Hello", "World", "java");
    // UnsupportedOperationException
    // stringList.add("java EE");
    // stringList.remove("java");
    // stringList.set(2, "java EE");
    System.out.println(stringList);

    // set集合不允许有重复元素
    Set<String> set = Set.of("Hello", "World", "java");
    // UnsupportedOperationException
    // set.add("java EE");
    // set.remove("java");
    System.out.println(set);
}
```

注释掉的部分是不支持的内容，不允许的部分。
