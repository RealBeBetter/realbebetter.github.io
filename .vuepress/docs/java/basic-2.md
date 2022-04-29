---
title: 【Java】基础知识部分-集合容器之Collection、List
date: 2021-05-03
tags:
- Java
---
## 五、集合（上）

提供一种存储空间可变的存储模型，存储的数据容量可以随时发生改变

集合分为单列集合（Collection：单值形式）和双列集合（Map：K-V形式，键值对）

**集合**（黑体的是接口，其余的为实现类）

- **Collection**    单列集合
  - **List**    元素可重复
    - ArrayList
    - LinkedList
  - **Set**    元素不可重复
    - HashSet
    - TreeSet
- **Map**    双列集合
  - HashMap

### Collection

Collection集合概述

- 是单例集合的顶层接口，它表示一组对象，这些对象也称为Collection的元素
- JDK不提供此接口的任何直接实现，它提供更具体的子接口(如Set和List) 实现

创建Collection集合的对象

- 多态的方式
- 具体的实现类，如ArrayList

```java
public static void main(String[] args) {
    Collection<String> collection = new ArrayList<String>();
    collection.add("Hello");
    collection.add("World");
    collection.add("java");
    System.out.println(collection);
}
```

输出的结果是：`[Hello, World, java]`

说明ArrayList实现类中重写了toString方法

#### 常用方法

![image-20210425012328479](https://s2.loli.net/2022/04/06/KpnhP4QxRj23ekG.png)

```java
public static void main(String[] args) {
    Collection<String> collection = new ArrayList<String>();
    // 添加对应元素
    collection.add("Hello");
    // 移除指定元素
    collection.remove("Hello");
    collection.add("World");
    // 清除所有元素
    collection.clear();
    collection.add("java EE");
    // 是否包含特定元素
    System.out.println(collection.contains("java EE"));
    // 判断集合是否为空
    System.out.println(collection.isEmpty());
    // 返回集合的元素个数
    System.out.println(collection.size());
    System.out.println(collection);
}
```

#### 集合中元素的遍历

利用迭代器 Iterator ，集合的专用遍历方式

Iterator：迭代器，集合的专用遍历方式

- `Iterator<E> iterator()`：返回此集合中元素的迭代器，通过集合的 `iterator()` 方法得到
- 迭代器是通过集合的 `iterator()` 方法得到的，所以我们说它是依赖于集合而存在的

Iterator 中的常用方法

- `E next()`：返回迭代中的下一个元素
- `boolean hasNext()`：如果迭代具有更多元素，则返回 `true`

```java
public static void main(String[] args) {
    Collection<String> collection = new ArrayList<String>();
    collection.add("Hello");
    collection.add("World");
    collection.add("java");
    System.out.println(collection);

    // 获得迭代器的方法
    Iterator<String> iterator = collection.iterator();
    // 获取元素的方法
    System.out.println(iterator.next());
    /*System.out.println(iterator.next());
    System.out.println(iterator.next());
    System.out.println(iterator.next());
    System.out.println(iterator.next());*/
    // 正确的遍历方法，使用 hasNext 方法判断是否有下一个元素再进行访问
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
}
```

#### 集合的使用步骤

![image-20210425014246288](https://s2.loli.net/2022/04/06/RCvyF9NtrTAmsEc.png)

### List

List 集合概述

- 有序集合，也称为序列，用户可以精确控制列表中每个元素的插入位置。用户可以通过整数索引访问元素，并搜索列表中的元素
- 与 Set 集合不同， 列表通常允许重复的元素

List 集合特点

- 有序：存储和取出的元素顺序一致
- 可重复：存储的元素可以重复

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<String>();
    list.add("Hello");
    list.add("World");
    list.add("java");
    list.add("World");
    System.out.println(list);
    // 采用迭代器的方式进行遍历列表
    Iterator<String> iterator = list.iterator();
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
    // 采用for循环的方式遍历列表
    for (String s : list) {
        System.out.println(s);
    }
}
```

可重复，遍历方式有两种

#### 特有方法

![image-20210425015116983](https://s2.loli.net/2022/04/06/fpsD2IjCR3aHhAw.png)

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<String>();
    list.add("Hello");
    list.add("World");
    // 在集合中的指定位置插入指定的元素
    list.add(2, "java");
    // 在集合中删除指定索引处的元素
    list.remove(2);
    // 修改指定位置处的元素
    System.out.println(list.set(1, "java EE"));
    // 返回指定位置的元素
    System.out.println(list.get(1));
    System.out.println(list);
}
```

#### 并发修改异常

需求：在集合中遍历元素，如果发现有World元素存在，我们就往集合中添加新的元素

```java
public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("Hello");
        list.add("World");
        list.add("java");
        // ConcurrentModificationException : 并发修改异常
        /*Iterator<String> iterator = list.iterator();
        while(iterator.hasNext()) {
            String s = iterator.next();
            if ("World".equals(s)) {
                list.add("java EE");
            }
        }*/
        // ConcurrentModificationException
        /*for (String s : list) {
            if ("World".equals(s)) {
                System.out.println(list.add("java EE"));;
            }
        }*/

        for (int i = 0; i < list.size(); i++) {
            String s = list.get(i);
            if ("World".equals(s)) {
                System.out.println(list.add("java EE"));;
            }
        }

        System.out.println(list);
    }
```

注释部分运行结果：

> Exception in thread "main" java.util.ConcurrentModificationException
> 	at java.base/java.util.ArrayList$Itr.checkForComodification(ArrayList.java:1012)
> 	at java.base/java.util.ArrayList$Itr.next(ArrayList.java:966)
> 	at itheima_04.ListDemo01.main(ListDemo01.java:16)

这时候会报错，是因为并发修改异常。在源代码中查看，我们可以看到在遍历集合的时候，会出现两个参数

- modCount    实际修改次数
- expectedModCount    预期修改次数

当这两个值不相等的时候，会抛出并发修改异常。add方法运行时候对modCount做了+1操作，但是这时候expectedModCount并没有执行+1操作。下次访问的时候，Itr类中存在的判断两者相等操作执行，得出两者的不相等，抛出异常。

利用ArrayList修改元素，使用迭代器进行遍历的时候，会使得预期修改次数得不到该有的变化。

迭代的时候，之所以设置两个参数，不允许添加元素，是因为如果一直在迭代的时候添加元素，可能会造成迭代永远不会结束的情况。

可以看出，foreach循环（增强for循环）在这里本质上也是使用了迭代器运行。（查看语法糖可以得知，底层也是利用了迭代器进行实现的）

用for循环实现的时候，则没有出现异常情况，可以正常运行。

> true
> [Hello, World, java, java EE]

- 并发修改异常：`ConcurrentModificationException`
- 产生原因：
  - 迭代器遍历的过程中，通过集合对象修改了集合中元素的长度，造成了迭代器获取元素中判断预期修改值和实际修改值不一致
- 解决方案
  - 用for循环遍历，然后用集合对象做对应的操作即可

迭代器的本质理解：

迭代器的作用是将集合中的元素按照顺序遍历访问，依次返回第0号元素、第1号元素等。如果这个时候访问到第3号元素的时候，往第0号元素的位置添加元素，那么后面的所有元素都将往后移位置，也就是第3号元素会出现重复访问，造成严重后果。

Java认为，在迭代的时候，容器大小应该保持不变。这也是为什么会*在迭代器中*设置两个变量modCount以及expectedModCount*是否相等的判断*，用这两个元素进行比较，如果发生添加或删除操作，那么modCount就会+1，而期望值却没有发生改变，导致两者数值不一致，从而抛出异常。

之所以利用普通for循环调用get方法能够实现，是因为在get方法中并没有添加二者的判断。modCount只存在于add或者remove方法中，并不存在get方法中，也没有必要再get方法中添加二者的数值相等的判断。

#### ListIterator

列表迭代器：通过list集合的listiterator方法得到，是list集合的特有迭代器。

相比父类Iterator，它可以随意设置遍历的顺序，并且能够在迭代的时候进行修改。

向后遍历 hsaNext

向前遍历 hasPrevious

![image-20210425150053550](https://s2.loli.net/2022/04/06/EiHYoTM2ezwfdsX.png)

这里面之所以可以遍历时进行修改，是因为在源码中，将modCount赋值给了expectedModCount了，不会造成二者的不相等。

```java
public static void main(String[] args) {
    List<String> list = new ArrayList<String>();
    list.add("Hello");
    list.add("World");
    list.add("java");

    // 获取list迭代器
    ListIterator<String> stringListIterator = list.listIterator();
    // 向后遍历
    while (stringListIterator.hasNext()) {
        String s = stringListIterator.next();
        if ("World".equals(s)) {
            stringListIterator.add("java EE");
        }
    }
    System.out.println(list);
    // 向前遍历
    while (stringListIterator.hasPrevious()) {
        System.out.println(stringListIterator.previous());
    }
}
```

#### 增强for循环（for each）

增强for：简化数组和Collection集合的遍历

- 实现Iterable接口的类允许其对象成为增强型 for语句的目标
- 它是JDK5之后出现的，其内部原理是一个Iterator迭代器

增强for的格式

- 格式：

  ```java
  for(元素数据类型变量名 : 数组或者Collection集合) {
  	//在此处使用变量即可，该变量就是元素
  }
  ```

编写代码如下所示：

```java
public static void main(String[] args) {
    int[] arr = {1, 2, 3, 4, 5};

    for (int i : arr) {
        System.out.println(i);
    }

    String[] strings = {"Hello", "World", "java"};
    for (String string : strings) {
        System.out.println(string);
    }

    List<String> list = new ArrayList<String>();
    list.add("Hello");
    list.add("World");
    list.add("java");
    // foreach内部是一个Iterator迭代器
    for (String s : list) {
        System.out.println(s);
        if (s.equals("World")) {
            list.add("java EE");
        }
    }
}
```

运行结果如下所示，在Iterator迭代器中，修改集合的数量操作，报出并发修改异常

![image-20210427014507547](https://s2.loli.net/2022/04/06/oAeRM5W8OScty6f.png)

#### List常用子类

ArrayList：底层数据结构是数组，查询快，增删慢

LinkedList：底层数据结构是链表，查询慢，增删快

```java
// 用 ArrayList 和 LinkedList 完成存储字符串并遍历
public static void main(String[] args) {
    // 创建集合对象
    ArrayList<String> arrayList = new ArrayList<String>();
    arrayList.add("Hello");
    arrayList.add("World");
    arrayList.add("java");
    for (String s : arrayList) {
        System.out.println(s);
    }
    Iterator<String> iterator = arrayList.iterator();
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
    for (int i = 0; i < arrayList.size(); i++) {
        System.out.println(arrayList.get(i));
    }

    LinkedList<String> linkedList = new LinkedList<String>();
    linkedList.add("Hello");
    linkedList.add("World");
    linkedList.add("java EE");
    for (String s : linkedList) {
        System.out.println(s);
    }
    Iterator<String> stringIterator = linkedList.iterator();
    while (stringIterator.hasNext()) {
        System.out.println(stringIterator.next());
    }
    for (int i = 0; i < linkedList.size(); i++) {
        System.out.println(linkedList.get(i));
    }
}
```

#### LinkedList集合的特有功能

![image-20210427212018137](https://s2.loli.net/2022/04/06/WNT9MlHRcuDgAyz.png)

```java
public static void main(String[] args) {
    // 测试 LinkedList 集合特有功能
    LinkedList<String> list = new LinkedList<String>();
    list.add("Hello");
    list.add("World");
    list.add("java");

    // 经测试，LinkedList 集合重写了toString方法
    System.out.println(list.toString());
    list.addFirst("First");
    list.addLast("Last");
    System.out.println(list.toString());
    list.removeFirst();
    list.removeLast();
    System.out.println(list.toString());
    System.out.println(list.getFirst());
    System.out.println(list.getLast());
}
```


