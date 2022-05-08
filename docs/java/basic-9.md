---
title: 【Java】基础知识部分-反射
date: 2021-05-03
tags:
- Java
---
## 十、反射

### 类加载

当程序要使用某个类时，如果该类还没有被加载到内存中时，该系统会通过**类的加载、类的连接、类的初始化**三个步骤来对类进行初始化。如果没有出现意外，JVM会连续完成这三个步骤，所以有时也将这三个步骤统称为类加载或类初始化。

类的加载

- 类加载就是将class文件读入内存，并为之创建一个java.lang.Class的对象
- 任何类被使用时，系统都会为之建立一个Java.lang.Class对象

类的连接

- 验证阶段：用于检验被加载的类是否具有正确的内部结构，和其他类是否协调一致
- 准备阶段：负责为类的类变量分配内存，并设置默认初始化值
- 解析阶段：将类的二进制数据中的符号引用替换为直接引用

类的初始化

- 在该阶段，主要就是对类变量进行初始化

**类的初始化步骤**

- 假如该类还没有被加载和连接，则程序先加载并连接该类
- 假如该类的直接父类还没有被初始化，则先初始化其直接父类
- 假如类中有初始化语句，则系统依次执行这些初始化语句

注意：在执行第二个步骤的时候，如果该类还有直接父类，则也依次按照上述步骤执行
所以，根据这个逻辑，最先被初始化完成的是java.lang.Object类

**类的初始化时机**

- 创建类的实例
- 调用类的类方法
- 访问类或者类接口的类变量，或者为该类变量赋值
- 使用反射方式来强制创建某个类或者接口对应的java.lang.Class对象
- 初始化某个类的子类
- 直接使用java.exe命令来运行某个主类

#### 类加载器

作用：

- 负责将.class文件加载到内存中，并为之生成对应的java.lang.Class对象
- 虽然不用过分关注类加载机制，但是了解类加载机制我们能够更好地了解整个程序的运行

**JVM的类加载机制**

- 全盘负责：就是当一个类加载器负责加载某个Class时，该Class所依赖的和引用的其他Class也将由该类加载器负责载入，除非显示使用另外一个类加载器来载入
- 父类委托：就是当一个类加载器负责加载某个Class时，先让父类加载器试图加载该Class，只有在父类加载器无法加载该类时才尝试从自己的类路径中加载该类
- 缓存机制：保证所有加载过的Class都会被缓存，当程序需要使用某个Class对象时，类加载器先从缓存区中搜索该Class，只有当缓存区中不存在该Class对象时，系统才会读取该类对应的二进制数据，并将其转换成Class对象，存储到缓存区

ClassLoader：负责加载类的对象

Java运行时有以下内置的加载器

- Bootstrap class loader：它是虚拟机的内置类加载器，通常表示为null，并且没有父null
- Platform class loader：平台类加载器可以看到所有平台类，平台类包括由平台类加载器或其祖先定义的Java SE平台API，其实现类和JDK特定的运行时类
- System class loader：它也被称为应用程序类加载器，与平台类加载器不同。系统类加载器通常用于定义应用程序类路径，模块路径和JDK特定工具上的类
- 类加载器的继承关系：System的父加载器为Platform，而Platform的父加载器为Bootstrap

`ClassLoader`中的两个方法：

- `static ClassLoader getSystemClassLoader()`：返回用于委派的系统类加载器
- `ClassLoader getParent()`：返回父类加载器进行委派

案例代码：

```java
public class ClassLoaderDemo {
  public static void main(String[] args) {
    // static ClassLoader getSystemClassLoader() ：返回用于委派的系统类加载器
    ClassLoader systemClassLoader = ClassLoader.getSystemClassLoader();
    // jdk.internal.loader.ClassLoaders$AppClassLoader@3fee733d
    System.out.println(systemClassLoader);
    // ClassLoader getParent() ：返回父类加载器进行委派
    ClassLoader parent1 = systemClassLoader.getParent();
    // jdk.internal.loader.ClassLoaders$PlatformClassLoader@10f87f48
    System.out.println(parent1);
    ClassLoader parent2 = parent1.getParent();
    // null Bootstrap类加载器，只是因为表示为null
    System.out.println(parent2);
  }
}
```

### 反射

#### 反射概述

Java反射机制：是指在运行时去获取一个类的变量和方法信息。然后通过获取到的信息来创建对象，调用方法的一种机制。由于这种动态性，可以极大的增强程序的灵活性，程序不用在编译期就完成确定，在运行期仍然可以扩展

![image-20210528134700143](https://s2.loli.net/2022/04/06/AURKXGoW7TwnEFs.png)

#### 获取Class类的对象

我们要想通过反射去使用一个类，首先我们要获取到该类的字节码文件对象，也就是类型为Class类型的对象

这里我们提供三种方式获取Class类型的对象

- 使用类的class属性来获取该类对应的Class对象。举例：`Student.class`将会返回Student类对应的Class对象
- 调用对象的`getClass()`方法，返回该对象所属类对应的Class对象
  - 该方法是Object类中的方法，所有的Java对象都可以调用该方法
- 使用Class类中的静态方法`forName(String className)`，该方法需要传入字符串参数，该字符串参数的值是某个类的全路径，也就是完整包名的路径

案例：

一、首先创建Student类

```java
public class Student {
  // 提供三个变量：一个私有，一个默认，一个公共
  private String name;
  int age;
  public String address;
  // 提供两个构造方法：一个私有，一个默认，两个公共
  public Student() {

  }
  private Student(String name) {
    this.name = name;
  }
  Student(String name, int age) {
    this.name = name;
    this.age = age;
  }
  public Student(String name, int age, String address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
  // 成员方法：一个私有，四个公共
  private void function() {
    System.out.println("function");
  }
  public void method1() {
    System.out.println("method");
  }
  public void method2(String s) {
    System.out.println("method" + s);
  }
  public String method3(String s, int i) {
    return s + "," + i;
  }
  @Override
  public String toString() {
    return "Student{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", address='" + address + '\'' +
            '}';
  }
}
```

二、创建测试类

```java
public class ReflectDemo {
  public static void main(String[] args) throws ClassNotFoundException {
    // 使用类的class属性来获取该类对应的Class对象
    Class<Student> c1 = Student.class;
    System.out.println(c1);
    Class<Student> c2 = Student.class;
    System.out.println(c1 == c2);
    // 调用对象的 getClass() 方法
    Student s = new Student();
    Class<? extends Student> c3 = s.getClass();
    System.out.println(c3 == c1);
    // 使用Class类中的静态方法 forName(String className)
    Class<?> c4 = Class.forName("get_class.Student");
    System.out.println(c4 == c1);
  }
}
```

运行结果：

> class get_class.Student
> true
> true
> true

#### 反射获取构造方法并调用

Class类中用于获取构造方法的方法

- `Constructor<?>[] getConstructors()`：返回所有公共构造方法对象的数组
- `Constructor<?>[] getDeclaredConstructors()`：返回所有构造方法对象的数组
- `Constructor<T> getConstructor(Class <?> ... parameterTypes)`：返回单个公共构造方法对象
- `Constructor<T> getDeclaredConstructor(Class <?> ... parameterTypes)`：返回单个构造方法对象

Constructor类中用于创建对象的方法

- `T newInstance(Object... initargs)`：根据指定的构造方法创建对象

案例：利用上面创建的Student类进行测试

```java
public class ReflectDemo {
  public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    // 使用静态方法获取上次使用的学生类
    Class<?> aClass = Class.forName("get_class.Student");
    // Constructor<?>[] getConstructors() ：返回所有公共构造方法对象的数组
    // Constructor<?>[] constructors = aClass.getConstructors();
    // Constructor<?>[] getDeclaredConstructors() ：返回所有构造方法对象的数组
    Constructor<?>[] constructors = aClass.getDeclaredConstructors();
    for (Constructor<?> constructor : constructors) {
      System.out.println(constructor);
    }
    // Constructor<T> getConstructor(Class <?> ... parameterTypes) ：返回单个公共构造方法对象
    // Constructor<T> getDeclaredConstructor(Class <?> ... parameterTypes) ：返回单个构造方法对象
    // 参数：你要获取的构造方法的参数的个数和数据类型对应的字节码文件
    Constructor<?> constructor = aClass.getConstructor();
    // Constructor 提供了一个类的单个函数构造函数的信息和访问权限
    // T newInstance(Object... initargs) ：根据指定的构造方法创建对象
    Object obj = constructor.newInstance();
    System.out.println(obj);
  }
}
```

#### 练习：使用反射获取构造方法并调用

练习1：通过反射实现如下操作

- `Student s = new Student("张三", 20, "西安");`
- `System.out.println(s);`
- **基本数据类型也可以通过.class得到对应的Class类型**

```java
public class ReflectDemo1 {
  public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    // 获取 Class 对象
    Class<?> stuClass = Class.forName("get_class.Student");
    // Constructor<T> getConstructor(Class <?> ... parameterTypes) ：返回单个公共构造方法对象
    // public Student(String name, int age, String address)
    Constructor<?> constructor = stuClass.getConstructor(String.class, int.class, String.class);
    // 基本数据类型也可以通过.class获取到 Class 类型
    Object obj = constructor.newInstance("张三", 20, "西安");
    System.out.println(obj);
  }
}
```

练习2：通过反射实现如下操作

- `Student s = new Student("张三");`
- `System.out.println(s);`
- `public void setAccessible(boolean flag)`：**值为true，取消访问检查**

```java
public class ReflectDemo2 {
  public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    // 获取 Class 对象
    Class<?> stuClass = Class.forName("get_class.Student");
    // Constructor<T> getDeclaredConstructor(Class <?> ... parameterTypes) ：返回单个构造方法对象
    // private Student(String name)
    Constructor<?> constructor = stuClass.getDeclaredConstructor(String.class);
    // java.lang.IllegalAccessException
    // 采用暴力反射，运行 setAccessible 方法，设置为 true 抑制访问检查
    constructor.setAccessible(true);
    Object obj = constructor.newInstance("张三");
    System.out.println(obj);
  }
}
```

#### 反射获取成员变量并使用

Class类中用于获取成员变量的方法：

- `Field[] getFields()`：返回所有公共成员变量对象的数组、
- `Field[] getDeclaredFields()`：返回所有成员变量对象的数组
- `Field getField(String name)`：返回单个公共成员变量对象
- `Field getDeclaredField(String name)`：返回单个成员变量对象

Field类中用于给成员变量赋值的方法

- `void set(Object obj, Object value)`：给obj对象的成员变量赋值为value

案例：

```java
public class ReflectDemo {
  public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    // 获取对象的 Class 类型
    Class<?> aClass = Class.forName("get_class.Student");
    // Field[] getFields()：返回所有公共成员变量对象的数组
    // Field[] fields = aClass.getFields();
    // Field[] getDeclaredFields()：返回所有成员变量对象的数组
    Field[] fields = aClass.getDeclaredFields();
    for (Field field : fields) {
      System.out.println(field);
    }
    // Field getField(String name)：返回单个公共成员变量对象
    // Field getDeclaredField(String name)：返回单个成员变量对象
    Field addressField = aClass.getField("address");
    // 获取无参构造创建对象
    Constructor<?> constructor = aClass.getConstructor();
    Object obj = constructor.newInstance();
    // void set(Object obj, Object value)：给obj对象的成员变量赋值为value
    addressField.set(obj, "西安");
    System.out.println(obj);
  }
}
```

#### 练习：反射获取成员变量并使用

练习：通过反射实现如下操作

```java
Student s = new Student();
        s.name = "name" ;
        s.age = 20;
        s.address ="address";
        System.out.println(s);
```

实现代码：

```java
public class ReflectDemo {
  public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchFieldException {
    // 获得 Class 对象
    Class<?> stuClass = Class.forName("get_class.Student");
    // 获取无参构造方法创建对象
    Constructor<?> constructor = stuClass.getConstructor();
    Object obj = constructor.newInstance();
    System.out.println(obj);
    // 获取 field 对象、破坏访问权限检查、赋值、输出
    Field nameField = stuClass.getDeclaredField("name");
    nameField.setAccessible(true);
    nameField.set(obj, "雨下一整晚Real");
    System.out.println(obj);
    Field ageField = stuClass.getDeclaredField("age");
    ageField.setAccessible(true);
    ageField.set(obj, 20);
    System.out.println(obj);
    Field addressField = stuClass.getDeclaredField("address");
    addressField.setAccessible(true);
    addressField.set(obj, "Address");
    System.out.println(obj);
  }
}
```

#### 反射获取成员方法并使用

Class类中用于获取成员方法的方法

- `Method[] getMethods()`：返回所有公共成员方法对象的数组，包括继承的
- `Method[] getDeclaredMethods()`：返回所有成员方法对象的数组，不包括继承的
- `Method getMethod(String name, Class<?> ... parameterTypes)`：返回单个公共成员方法对象
- `Method getDeclaredMethod(String name, Class <?> ... parameterTypes)`：返回单个成员方法对象

Method类中用于调用成员方法的方法

- `Object invoke(Object obj, Object... args)`：调用obj对象的成员方法，参数是args，返回值是Object类型

案例：

```java
public class ReflectDemo {
  public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
    // 获取 Class 对象
    Class<?> stuClass = Class.forName("get_class.Student");
    // Method[] getMethods()：返回所有公共成员方法对象的数组，包括继承的
    Method[] methods = stuClass.getMethods();
    for (Method method : methods) {
      System.out.println(method);
    }
    // Method[] getDeclaredMethods()：返回所有成员方法对象的数组，不包括继承的
    Method[] declaredMethods = stuClass.getDeclaredMethods();
    for (Method declaredMethod : declaredMethods) {
      System.out.println(declaredMethod);
    }
    // Method getMethod(String name, Class<?> ... parameterTypes)：返回单个公共成员方法对象
    // Method getDeclaredMethod(String name, Class <?> ... parameterTypes)：返回单个成员方法对象
    // public void method1()
    Method method = stuClass.getMethod("method1");

    // 获取无参构造方法创建对象
    Constructor<?> constructor = stuClass.getConstructor();
    Object obj = constructor.newInstance();
    // Object invoke(Object obj, Object... args)：调用obj对象的成员方法，参数是args，返回值是Object类型
    method.invoke(obj);
  }
}
```

#### 练习：反射获取成员方法并调用

练习：通过反射实现如下操作

```java
Students = new Student);
        s.method1();
        s.method2("张三" );
        String ss = s.method3("张三",30);
        System.out.printIn(ss);
        s.function();
```

```java
public class ReflectDemo {
  public static void main(String[] args) throws InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchMethodException, ClassNotFoundException {
    // 获取 Class 类型
    Class<?> stuClass = Class.forName("get_class.Student");
    // 获取无参构造方法创建对象
    Constructor<?> constructor = stuClass.getConstructor();
    Object obj = constructor.newInstance();
    // 通过对象调用 method1 方法
    Method method1 = stuClass.getMethod("method1");
    method1.invoke(obj);
    // 调用 method2 方法
    Method method2 = stuClass.getMethod("method2", String.class);
    method2.invoke(obj, "雨下一整晚Real");
    // 调用 method3 方法，存在返回值
    Method method3 = stuClass.getMethod("method3", String.class, int.class);
    Object o = method3.invoke(obj, "雨下一整晚Real", 20);
    System.out.println(o);
    // 调用 function 方法，私有方法
    // Method function = stuClass.getMethod("function"); java.lang.NoSuchMethodException
    Method function = stuClass.getDeclaredMethod("function");
    // 暴力反射，破坏方法调用前的权限检查
    function.setAccessible(true);
    function.invoke(obj);
  }
}
```

#### 反射练习

练习1：有一个`ArrayList<Integer>`集合，现在要在这个集合中添加一个字符串数据，如何实现？

```java
public class ArrayListAddString {
  public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
    // 创建集合
    ArrayList<Integer> arrayList = new ArrayList<Integer>();
        /*arrayList.add(10);
        arrayList.add(20);
        arrayList.add("Hello");*/

    // 获取 Class 类型
    Class<? extends ArrayList> arrayClass = arrayList.getClass();
    Method add = arrayClass.getMethod("add", Object.class);
    // 利用反射越过泛型检查，调用原始方法的参数类型
    add.invoke(arrayList, "Hello");
    add.invoke(arrayList, "World");
    System.out.println(arrayList);
  }
}
```

练习2：通过配置文件运行类中的方法

```java
public class ConfigurationFileRunMethodInClass {
  public static void main(String[] args) throws IOException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException, ClassNotFoundException {
    /*
     * Class.txt
     * className=Xxx
     * methodName=Xxx
     * */
    // 加载配置文件
    Properties properties = new Properties();
    FileReader fr = new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day16_Reflection\\src\\reflect_exercise\\Class.txt");
    properties.load(fr);
    fr.close();
    // className=reflect_exercise.Student
    // methodName=study
    String className = properties.getProperty("className");
    String methodName = properties.getProperty("methodName");
    // 通过调用反射来实现方法调用
    Class<?> stuClass = Class.forName(className);
    // 通过获取无参构造方法获取对象
    Constructor<?> constructor = stuClass.getConstructor();
    Object obj = constructor.newInstance();
    Method method = stuClass.getDeclaredMethod(methodName);
    method.invoke(obj);
  }
}
```
