---
title: 【Java】基础知识部分-集合容器、IO流
date: 2021-05-03
tags:
- Java
---
## 五、集合

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
- JDK不提供此接口的任何直接实现，它提供更具体的子接口（如Set和List)）实现

创建Collection集合的对象

- 多态的方式
- 具体的实现类ArrayList

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

![image-20210623202701633](https://gitee.com/realBeBetter/image/raw/master/img/image-20210623202701633.png)

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

Iterator：迭代器，集合的专用遍历方式

- Iterator <E> iterator()：返回此集合中元素的迭代器，通过集合的`iterator()`方法得到
- 迭代器是通过集合的`iterator()`方法得到的,所以我们说它是依赖于集合而存在的

Iterator中的常用方法

- `E next()`：返回迭代中的下一个元素
- `boolean hasNext()`：如果迭代具有更多元素，则返回true

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

![image-20210425014246288](https://i.loli.net/2021/04/25/5uPAeyocdMxFVUq.png)

### List

List集合概述

- 有序集合(也称为序列)，用户可以精确控制列表中每个元素的插入位置。用户可以通过整数索引访问元素，并搜索列表中的元素
- 与Set集合不同，列表通常允许重复的元素

List集合特点

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

![image-20210425015116983](https://i.loli.net/2021/04/25/FLfRaCsomQdXjvG.png)

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

![image-20210425150053550](https://i.loli.net/2021/04/25/BvbKdnPT2Gq9wjJ.png)

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

![image-20210427014507547](https://i.loli.net/2021/04/27/XSLV3eryk9jDMAB.png)

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

![image-20210427212018137](https://i.loli.net/2021/04/27/ZmG4kxifMzoWev1.png)

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

### Set

①不包含重复元素的集合

②没有带索引的方法，所以不能用普通for循环进行遍历

```java
/*
* HashSet : 对集合的迭代顺序不做任何保证
* 无须且不重复，不能添加重复的元素（添加之后无效，不报错）
* */
public static void main(String[] args) {
    Set<String> set = new HashSet<String>();
    set.add("Hello");
    set.add("World");
    set.add("java");
    // set.add("java");
    System.out.println(set.toString());
    for (String s : set) {
        System.out.println(s);
    }
    Iterator<String> iterator = set.iterator();
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }
}
```

#### 哈希值

哈希值是**JDK**根据对象的**地址**或者**字符串**或者**数字**算出来的int类型的**数值**

Object类中有一个方法可以获取对象的hash值

- 同一个对象多次调用hashCode，获得的hash值是相同的
- 通过重写hashCode方法，可以让不同对象获得的hashCode值相同
- 但是在特殊情况下，有可能不同的对象在不重写方法的情况下还是会出现相同的hashCode值

```java
public static void main(String[] args) {
    Student student = new Student("张三", 20);
    // 同一个对象多次调用HashCode方法，输出的hash值是一样的
    System.out.println(student.hashCode()); // 189568618
    System.out.println(student.hashCode()); // 189568618
    Student student2 = new Student("张三", 20);
    System.out.println(student2.hashCode()); // 793589513
    System.out.println(student2.hashCode()); // 793589513
    // 通过在类中重写hashCode方法，可以实现不同对象返回相同的hash值
    System.out.println("Hello".hashCode()); // 69609650
    System.out.println("World".hashCode()); // 83766130
    System.out.println("重地".hashCode()); // 1179395
    System.out.println("通话".hashCode()); // 1179395
}
```

#### HashSet保证元素唯一性分析

![image-20210427221941612](https://i.loli.net/2021/04/27/2btMD9WiZw5o7Rk.png)

```java
HashSet<String> hashSet = new HashSet<String>();
hashSet.add("Hello");
hashSet.add("World");
hashSet.add("java");
System.out.println(hashSet);

public boolean add(E e) {
    return map.put(e, PRESENT)==null;
}

static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

// hash值是根据元素的hashCode()方法得到的
// hash值和元素的hashCode方法相关

final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    // 如果哈希表未初始化，就对哈希表进行初始化
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // 根据对象的hash值计算对象的存储位置，如果该位置没有元素，则存储元素
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        Node<K,V> e; K k;
        /*
        1. 将存入的元素和以前的元素比较hash值
           如果hash值不同，则表示存入的元素为新元素（HashSet中没有的元素）
           会继续向下执行，将元素添加进hashSet中
        2. 如果hash值相同，则会调用对象的equals方法进行比较
               如果返回false，会继续向下执行，把元素添加到集合
               如果返回true，说明元素重复，不存储
        */
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
        if (e != null) { // existing mapping for key
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount;
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict);
    return null;
}
```

#### 哈希表

哈希表是一种特殊的数据结构，通过**链表+数组**的方式实现

在jdk 8之后，对哈希表底层做了优化

![image-20210427222307522](https://i.loli.net/2021/04/27/1jPRyrWZUNIQiGB.png)

关于存储对象中，使用哈希表存储不同的对象：

```java
/*
* 要求用 HashSet存储集合，并且保证集合中元素的唯一性
* */
public static void main(String[] args) {
    // 创建 HashSet 的 Student 集合对象
    HashSet<Student> hashSet = new HashSet<Student>();
    // 创建 Student 对象
    Student student1 = new Student("张三", 18);
    Student student2 = new Student("李四", 19);
    Student student3 = new Student("王五", 20);
    Student student4 = new Student("王五", 20);
    // 把学生对象添加到 HashSet 中
    hashSet.add(student1);
    hashSet.add(student2);
    hashSet.add(student3);
    hashSet.add(student4);
    for (Student student : hashSet) {
        System.out.println(student.toString());
    }
}
```

这样的情况下，直接使用hashSet会使得student3和student4对象同时均添加进集合中

为了解决这样的情况，我们在Student类中重写equal()和hashCode()方法

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Student student = (Student) o;
    return age == student.age && Objects.equals(stuName, student.stuName);
}

@Override
public int hashCode() {
    return Objects.hash(stuName, age);
}
```

#### LinkedHashSet集合

![image-20210427223542289](https://i.loli.net/2021/04/27/j5CSnHTvJL2y4bs.png)

```java
public static void main(String[] args) {
    LinkedHashSet<String> linkedHashSet = new LinkedHashSet<String>();
    linkedHashSet.add("Hello");
    linkedHashSet.add("World");
    linkedHashSet.add("World");
    linkedHashSet.add("java");
    for (String s : linkedHashSet) {
        System.out.println(s);
    }
}
```

添加元素的时候，不会出现重复的元素，由哈希表保证元素的唯一性，由链表保证元素的有序

#### TreeSet集合

![image-20210427224129129](https://i.loli.net/2021/04/27/VQhlNwsTo9eCcAX.png)

```java
public static void main(String[] args) {
    TreeSet<Integer> treeSet = new TreeSet<Integer>();
    treeSet.add(10);
    treeSet.add(50);
    treeSet.add(30);
    treeSet.add(40);
    treeSet.add(20);
    treeSet.add(30);
    for (Integer integer : treeSet) {
        System.out.println(integer);
    }
}
```

输出的结果是10 20 30 40 50其中不包含重复元素，而且按照自然排序进行输出

#### 自然排序Comparable的使用

将学生存储金TreeSet集合中，使用无参构造对学生对象根据年龄进行排序

年龄相同时，按照字母顺序进行排序

```java
/*
* 将学生按照年龄排序，如果年龄一样，按照字母顺序排序
* */
public static void main(String[] args) {
    TreeSet<Student> treeSet = new TreeSet<Student>();
    Student student1 = new Student("张三", 17);
    Student student2 = new Student("李四", 20);
    Student student3 = new Student("王五", 18);
    Student student4 = new Student("赵六", 18);
    treeSet.add(student1);
    treeSet.add(student2);
    treeSet.add(student3);
    treeSet.add(student4);
    for (Student student : treeSet) {
        System.out.println(student);
    }
}
```

在Student类中，重写compareTo方法，并且实现Comparable接口

```java
public class Student implements Comparable<Student>{
    @Override
    public int compareTo(Student o) {
        /*return 0; // 认为元素是重复的
        return 1; // 将元素按照正序输出
        return -1; // 将元素按照反序输出*/
        // 按照年龄从小到大排序
        int i = this.age - o.age; // 按照升序排列
        // int i = o.age - this.age; // 按照降序排列
        // 按照字母排序（年龄一样的情况下）
        int i1 = i == 0 ? this.stuName.compareTo(o.stuName) : i;
        return i1;
    }
}
```

结论：

- 用TreeSet存储自定义对象集合的时候，无参构造使用的是自然排序对元素进行排序的
- 自然排序，就是让元素所属的类实现Comparable接口，并且重写compareTo(Object o)方法
- 重写方法时，一定要按照规定的要求的主要条件和次要条件来编写

#### 比较器Comparator的使用

```java
/*
 * 将学生按照年龄排序，如果年龄一样，按照字母顺序排序
 * */
public static void main(String[] args) {
    TreeSet<Student> treeSet = new TreeSet<Student>(new Comparator<Student>() {
        @Override
        public int compare(Student s1, Student s2) {
            int num = s1.getAge() - s2.getAge();
            int num2 = num == 0 ? s1.getStuName().compareTo(s2.getStuName()) : num;
            return num2;
        }
    });
    Student student1 = new Student("张三", 17);
    Student student2 = new Student("李四", 20);
    Student student3 = new Student("王五", 18);
    Student student4 = new Student("赵六", 18);
    treeSet.add(student1);
    treeSet.add(student2);
    treeSet.add(student3);
    treeSet.add(student4);
    for (Student student : treeSet) {
        System.out.println(student);
    }
}
```

结论：

- 用TreeSet存储自定义对象集合的时候，带参方法使用的是**比较器排序**对元素进行排序的
- 自然排序，就是让集合构造方法接收Comparator的实现类，并且重写compareTo(Object o)方法
- 重写方法时，一定要按照规定的要求的主要条件和次要条件来编写

案例：用TreeSet集合类存储多个学生信息，并且按照总分成绩进行排序（语文成绩+数学成绩）

①创建Student类

```java
public class Student {

    private String name;
    private int chinese;
    private int math;

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", chinese=" + chinese +
                ", math=" + math + ", total=" +
                (math + chinese) + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return chinese == student.chinese && math == student.math && Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, chinese, math);
    }

    public Student(String name, int chinese, int math) {
        this.name = name;
        this.chinese = chinese;
        this.math = math;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getChinese() {
        return chinese;
    }

    public void setChinese(int chinese) {
        this.chinese = chinese;
    }

    public int getMath() {
        return math;
    }

    public void setMath(int math) {
        this.math = math;
    }
}
```

②编写主程序

```java
public static void main(String[] args) {
    TreeSet<Student> students = new TreeSet<Student>(new Comparator<Student>() {
        @Override
        public int compare(Student s1, Student s2) {
            int num = s1.getChinese() + s1.getMath() - s2.getChinese() - s2.getMath();
            int num2 = num == 0 ? s1.getName().compareTo(s2.getName()) : num;
            return -num2;
        }
    });
    Student student1 = new Student("张三", 60, 80);
    Student student2 = new Student("李四", 70, 60);
    Student student3 = new Student("王五", 85, 75);
    Student student4 = new Student("赵六", 90, 65);
    students.add(student1);
    students.add(student2);
    students.add(student3);
    students.add(student4);
    for (Student student : students) {
        System.out.println(student);
    }
}
```

输出结果实现了根据总分降序排列的需求，并且成绩相同的情况下根据姓名进行了排序。

> Student{name='王五', chinese=85, math=75, total=160}
> Student{name='赵六', chinese=90, math=65, total=155}
> Student{name='张三', chinese=60, math=80, total=140}
> Student{name='李四', chinese=70, math=60, total=130}

### Map

interface Map<K,V>

将键映射到值的对象，不能包含重复的键，每个键可以映射到最多一个值

举例：学生姓名和学号的关系，学号就是键，值就是姓名

创建Map采用多态的方式，我们选用的是hashMap

```java
public static void main(String[] args) {
    Map<String, String> map = new java.util.HashMap<String, String>();
    map.put("18408000101", "张三");
    map.put("18408000102", "李四");
    map.put("18408000103", "王五");
    // 键重复的时候，会使用新添加的值覆盖掉之前的值
    map.put("18408000103", "赵六");
    System.out.println(map);
    // {18408000101=张三, 18408000102=李四, 18408000103=赵六}
}
```

#### Map集合的基本功能

![image-20210428104144495](https://i.loli.net/2021/04/28/T6wHhSJLB1OtkUQ.png)

```java
public static void main(String[] args) {
    // 创建集合元素
    Map<Integer, String> map = new HashMap<Integer, String>();
    map.put(1, "张三");
    map.put(2, "李四");
    map.put(3, "王五");
    map.put(4, "王五");
    // 返回的是键所对应的值
    System.out.println(map.remove(1));
    System.out.println(map);
    // 移除所有键值对数据
    /*map.clear();
    System.out.println(map);*/
    // 是否包含键
    System.out.println(map.containsKey(2));
    // 是否包含数据
    System.out.println(map.containsValue("王五"));
    // 是否为空
    System.out.println(map.isEmpty());
    // 输出长度
    System.out.println(map.size());
}
```

#### Map集合的获取功能

![image-20210428105302542](https://i.loli.net/2021/04/28/jRtHJiPZoGdawTm.png)

```java
public static void main(String[] args) {
    // 创建集合元素
    Map<Integer, String> map = new HashMap<Integer, String>();
    map.put(1, "张三");
    map.put(2, "李四");
    map.put(3, "王五");
    // 根据键返回值
    System.out.println(map.get(1));;
    // 返回所有键的集合
    Set<Integer> integers = map.keySet();
    System.out.println(integers);
    // 返回所有值的集合
    Collection<String> values = map.values();
    System.out.println(values);
}
```

#### Map集合的遍历

```java
public static void main(String[] args) {
    // 创建集合元素
    Map<Integer, String> map = new HashMap<Integer, String>();
    map.put(1, "张三");
    map.put(2, "李四");
    map.put(3, "王五");

    // 1. 获取所有键的集合
    Set<Integer> integers = map.keySet();
    for (Integer integer : integers) {
        System.out.println(integer + "," + map.get(integer));
    }
    // 2. 利用entrySet获取对象集合
    Set<Map.Entry<Integer, String>> entrySet = map.entrySet();
    for (Map.Entry<Integer, String> entry : entrySet) {
        System.out.println(entry.getKey() + "," + entry.getValue());
    }
}
```

遍历Map有两种方式：获取所有键的集合，根据键找到对应的值；利用entrySet获取到Map中的每一对元素，之后调用getKey和getValue方法得到键值对的值

#### HashMap存储学生对象并遍历

```java
public static void main(String[] args) {
    Map<String, Student> map = new HashMap<String, Student>();
    Student student1 = new Student("张三", 18);
    Student student2 = new Student("李四", 19);
    Student student3 = new Student("王五", 20);
    map.put("001", student1);
    map.put("002", student2);
    map.put("003", student3);
    Set<Map.Entry<String, Student>> entries = map.entrySet();
    for (Map.Entry<String, Student> entry : entries) {
        System.out.println(entry.getKey() + entry.getValue().getName() + entry.getValue().getAge());
    }
    Set<String> set = map.keySet();
    for (String s : set) {
        System.out.println(s + map.get(s).getName() + map.get(s).getAge());
    }
}
```

这个项目中，想要保留键的唯一性的案例，就需要在键的类（Student）中重写equals方法和hashCode方法

#### ArrayList集合存储HashMap集合元素并遍历

①创建ArrayList集合

②创建HashMap集合，并添加键值对元素

③把HashMap作为元素添加到ArrayList集合

④遍历ArrayList集合

```java
public static void main(String[] args) {
    ArrayList<HashMap<String, String>> arrayList = new ArrayList<HashMap<String, String>>();
    HashMap<String, String> hashMap1 = new HashMap<String, String>();
    hashMap1.put("周瑜", "小乔");
    HashMap<String, String> hashMap2 = new HashMap<String, String>();
    hashMap2.put("孙策", "大乔");
    arrayList.add(hashMap1);
    arrayList.add(hashMap2);
    System.out.println(arrayList);
    for (HashMap<String, String> hashMap : arrayList) {
        Set<String> set = hashMap.keySet();
        for (String key : set) {
            System.out.println(key + "," + hashMap.get(key));
        }
    }
}
```

#### HashMap集合存储ArrayList元素并遍历

①创建HashMap集合

②创建ArrayList集合，添加元素

③把ArrayList元素作为元素添加进HashMap中

```java
public static void main(String[] args) {
    HashMap<String, ArrayList<String>> hashMap = new HashMap<String, ArrayList<String>>();
    ArrayList<String> arrayList1 = new ArrayList<String>();
    arrayList1.add("诸葛亮");
    arrayList1.add("赵云");
    ArrayList<String> arrayList2 = new ArrayList<String>();
    arrayList2.add("贾宝玉");
    arrayList2.add("林黛玉");
    hashMap.put("三国演义", arrayList1);
    hashMap.put("红楼梦", arrayList2);
    Set<String> set = hashMap.keySet();
    for (String key : set) {
        System.out.println("《" + key + "》");
        ArrayList<String> arrayList = hashMap.get(key);
        for (String s : arrayList) {
            System.out.println(s);
        }
        System.out.println("《" + key + "》" + ": " + arrayList);
    }
}
```

#### 统计字符串中每个字符出现的次数

要求编写一个程序，接收输入的字符串，统计字符串出现的次数并按照要求的格式输出

> 请输入字符：
> cccbbbaaaddd
> a(3)b(3)c(3)d(3)

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.println("请输入字符：");
    String line = scanner.nextLine();
    // 创建HashMap存储结果
    // 如果想要排序的结果，使用treeMap即可
    // HashMap<Character, Integer> hashMap = new HashMap<Character, Integer>();
    TreeMap<Character, Integer> hashMap = new TreeMap<Character, Integer>();
    // 遍历每一个字符，得到各字符对应的数字
    for (int i = 0; i < line.length() ; i++) {
        char key = line.charAt(i);
        // 去 hashMap 中寻找看看是否存在，不存在就添加，存在就+1
        Integer value = hashMap.get(key);

        if (value == null) {
            hashMap.put(key, 1);
        } else {
            value++; // 此处进行了拆箱操作，需要再进行装箱操作，才能传进去
            hashMap.put(key, value);
        }
    }

    // 遍历HashMap集合，按要求输出结果
    StringBuilder stringBuilder = new StringBuilder();

    Set<Character> characters = hashMap.keySet();
    for (Character key : characters) {
        stringBuilder.append(key).append("(").append(hashMap.get(key)).append(")");
    }
    System.out.println(stringBuilder);
}
```

### Collections

![image-20210429191917166](https://i.loli.net/2021/04/29/43AlcDeFSgaTYdP.png)

```java
public static void main(String[] args) {
    List<Integer> arrayList = new ArrayList<Integer>();
    arrayList.add(40);
    arrayList.add(20);
    arrayList.add(10);
    arrayList.add(50);
    arrayList.add(30);
    // 将list中的元素反转顺序输出
    Collections.reverse(arrayList);
    System.out.println(arrayList);
    // 将list中的元素排序输出
    Collections.sort(arrayList);
    System.out.println(arrayList);
    // 将list中的元素按照随机顺序排序
    Collections.shuffle(arrayList);
    System.out.println(arrayList);
}
```

输出结果中，第三行的结果每一次都不一样

> [30, 50, 10, 20, 40]
> [10, 20, 30, 40, 50]
> [50, 30, 40, 20, 10]

#### ArrayList集合存储学生对象并排序

使用ArrayList存储学生对象并排序，利用Collections对学生进行排序，并遍历ArrayList

```java
public static void main(String[] args) {
    ArrayList<Student> students = new ArrayList<Student>();
    Student student1 = new Student("zhangsan", 20);
    Student student2 = new Student("lisi", 19);
    Student student3 = new Student("wangwu", 18);
    Student student4 = new Student("wangw", 18);

    students.add(student1);
    students.add(student2);
    students.add(student3);
    students.add(student4);

    // 第一种方法，在Student内部实现Comparable
    // Collections.sort(students);
    // 第二种方法，使用匿名内部类
    Collections.sort(students, new Comparator<Student>() {
        @Override
        public int compare(Student s1, Student s2) {
            int num = s1.getAge() - s2.getAge();
            int num2 = num == 0 ? s1.getName().compareTo(s2.getName()) : num;
            return num2;
        }
    });

    System.out.println(students);

    for (Student student : students) {
        System.out.println(student);
    }
}
```

#### 案例：模拟斗地主中的洗牌、发牌、看牌

①创建一个牌盒，也就是创建一个ArrayList集合对象

②往牌盒里面装牌，添加元素

③洗牌，把牌的顺序打乱，用shuffle方法实现

④发牌，遍历集合，给三个玩家发牌

⑤看牌，三个玩家分别遍历自己的牌

```java
public class PokerSimulation {
    /*
    * 模拟斗地主中的洗牌、发牌和看牌
    * ①创建一个牌盒，也就是创建一个ArrayList集合对象
    * ②往牌盒里面装牌，添加元素
    * ③洗牌，把牌的顺序打乱，用shuffle方法实现
    * ④发牌，遍历集合，给三个玩家发牌
    * ⑤看牌，三个玩家分别遍历自己的牌
    */
    public static void main(String[] args) {
        // ①创建一个牌盒，也就是创建一个ArrayList集合对象
        ArrayList<String> array = new ArrayList<String>();
        // ②往牌盒里面装牌，添加元素
        /*
        * Joker1、Joker2
        * ♦2、♦3、、、♦K、♦A
        * ♣2、♣3、、、
        * ♠2、♠3、、、
        * ♥2、♥3、、、
        * */
        // 定义花色数组
        String[] colors = {"♠", "♥", "♣", "♦"};
        // 定义点数数组
        String[] numbers = {"2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"};
        // 添加进ArrayList
        for (String color : colors) {
            for (String number : numbers) {
                array.add(color + number);
            }
        }
        array.add("JokerSmall");
        array.add("JokerBig");
        // ③洗牌，把牌的顺序打乱，用shuffle方法实现
        Collections.shuffle(array);
        // ④发牌，遍历集合，给三个玩家发牌
        ArrayList<String> user1 = new ArrayList<String>();
        ArrayList<String> user2 = new ArrayList<String>();
        ArrayList<String> user3 = new ArrayList<String>();
        ArrayList<String> landlord = new ArrayList<String>();
        for (int i = 0; i < array.size(); i++) {
            String poke = array.get(i);
            if (i >= array.size() - 3) {
                landlord.add(poke);
            } else if (i % 3 == 0) {
                user1.add(poke);
            } else if (i % 3 == 1) {
                user2.add(poke);
            } else if (i % 3 == 2) {
                user3.add(poke);
            }
        }
        // ⑤看牌，三个玩家分别遍历自己的牌
        lookPoke("张三", user1);
        lookPoke("李四", user2);
        lookPoke("王五", user3);
        lookPoke("底牌", landlord);

        System.out.println(array);
    }

    private static void lookPoke (String name, ArrayList<String> arrayList) {
        System.out.print(name + "的牌是: ");
        for (String poke : arrayList) {
            System.out.print(poke + " ");
        }
        System.out.println();
    }

}
```

整体运行结果如下所示：

> 张三的牌是: ♥7 ♥Q ♠3 ♦6 ♦J ♥3 ♣5 ♥9 ♥4 ♠J ♠10 ♠4 ♥8 ♦K ♦A ♣9 ♠K 
> 李四的牌是: ♣2 ♥K ♦9 ♦3 ♣J ♥10 ♣4 ♣8 ♠6 ♠9 ♠A ♠7 ♠8 ♦7 ♥5 ♣7 ♣K 
> 王五的牌是: ♠2 ♥A ♦10 ♦Q ♦4 ♣3 ♠Q JokerSmall ♠5 ♥2 ♣Q ♦2 ♣6 ♦5 ♦8 ♣10 ♣A 
> 底牌的牌是: ♥J ♥6 JokerBig 

#### 案例：将斗地主中的牌进行排序

![image-20210429203158066](https://i.loli.net/2021/04/29/9OZtXanhV38ubs5.png)

①创建HashMao集合，键是编号，值是牌

②创建ArrayLIst存储编号

③将三个玩家的牌的编号存进TreeSet中

④将TreeSet中的编号取出来，从HashMap中获得对应的牌

⑤洗牌，将编号打乱，用Collections中的shuffle方法打乱

⑥发牌，发的也是编号，将编号用TreeSet存储，会直接输出有序序列

⑦看牌，定义看牌方法，根据编号从HashMap中获取到牌

⑧调用看牌方法

实现：

```java
public class PokeDemo {
    public static void main(String[] args) {
        // ①创建HashMao集合，键是编号，值是牌
        HashMap<Integer, String> hashMap = new HashMap<Integer, String>();
        // ②创建ArrayList存储编号
        ArrayList<Integer> array = new ArrayList<Integer>();
        // 定义花色数组
        String[] colors = {"♦", "♣", "♥", "♠"};
        // 定义点数数组
        String[] numbers = {"3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"};
        // 定义编号，从0开始往HashMap中存储数据
        int index = 0;
        for (String number : numbers) {
            for (String color : colors) {
                hashMap.put(index, color + number);
                array.add(index);
                index++;
            }
        }
        hashMap.put(index, "JokerSmall");
        array.add(index);
        index++;
        hashMap.put(index, "JokerBig");
        array.add(index);
        // ③洗牌，将编号打乱，用Collections中的shuffle方法打乱
        Collections.shuffle(array);
        // ④发牌，发的也是编号，将编号用TreeSet存储，会直接输出有序序列
        TreeSet<Integer> user1 = new TreeSet<Integer>();
        TreeSet<Integer> user2 = new TreeSet<Integer>();
        TreeSet<Integer> user3 = new TreeSet<Integer>();
        TreeSet<Integer> landlord = new TreeSet<Integer>();

        for (int i = 0; i < array.size(); i++) {
            if (i >= array.size() - 3) {
                landlord.add(array.get(i));
            } else if (i % 3 == 0) {
                user1.add(array.get(i));
            } else if (i % 3 == 1) {
                user2.add(array.get(i));
            } else if (i % 3 == 2) {
                user3.add(array.get(i));
            }
        }

        // ⑥调用看牌方法
        lookPoke("张三", user1, hashMap);
        lookPoke("李四", user2, hashMap);
        lookPoke("王五", user3, hashMap);
        lookPoke("底牌", landlord, hashMap);
    }

    // ⑤看牌，定义看牌方法，根据编号从HashMap中获取到牌
    private static void lookPoke(String name, TreeSet<Integer> treeSet, HashMap<Integer, String> hashMap) {
        System.out.print(name + "的牌是: ");
        for (Integer key : treeSet) {
            String value = hashMap.get(key);
            System.out.print(value + " ");
        }
        System.out.println();
    }
}
```

## 六、IO流

### File

是文件和目录的抽象表示

- 文件和目录是可以通过File封装成对象的
- 对于File而言，其封装的并不是一个真正存在的文件，仅仅是一个路径名而已。它可以是存在的，也可以是不存在的。将来是要通过具体的操作把这个路径的内容转换为具体存在的

![image-20210429213119090](https://i.loli.net/2021/04/29/lPAvDrtz6MXURqw.png)

```java
public static void main(String[] args) {
    File file1 = new File("D:\\Java\\java.txt");
    System.out.println(file1);
    File file2 = new File("D:\\Java", "java.txt");
    System.out.println(file2);
    File file3 = new File("D:\\Java");
    File file4 = new File(file3, "java.txt");
    System.out.println(file4);
}
```

输出内容：

> D:\Java\java.txt
> D:\Java\java.txt
> D:\Java\java.txt

磁盘中并没有添加新的文件，路径下没有新建的java.txt文件

#### File类创建功能

![image-20210429213839391](https://i.loli.net/2021/04/29/mzpvDVAc59SNuB6.png)

```java
public static void main(String[] args) throws IOException {
    File file1 = new File("D:\\Java\\java.txt");
    // boolean createNewFile 创建新文件，成功返回true，否则false
    System.out.println(file1.createNewFile());

    File file2 = new File("D:\\Java\\Test");
    // boolean mkdir 创建对应的目录，成功返回true，否则false
    // 创建由此命名的抽象目录
    System.out.println(file2.mkdir());

    File file3 = new File("D:Java\\JTest\\HTML");
    // boolean mkdirs 创建对应的抽象目录，成功返回true，否则false
    // 创建由此命名的抽象目录，包括必需但不存在的父目录
    System.out.println(file3.mkdirs());
}
```

#### File类判断和获取功能

![image-20210429215744326](https://i.loli.net/2021/04/29/LiQVvfOZ31YwkP6.png)

```java
public static void main(String[] args) throws IOException {
    File file = new File("D:\\Java\\java.txt");
    file.createNewFile();
    System.out.println(file.isDirectory());
    System.out.println(file.isFile());
    System.out.println(file.exists());

    System.out.println(file.getAbsolutePath()); // 返回文件的绝对路径
    System.out.println(file.getPath()); // 将此抽象路径名转换成字符串
    System.out.println(file.getName()); // 返回文件的名称
    System.out.println("-------------");

    File file1 = new File("D:\\Java");
    String[] list = file1.list(); // 返回的是抽象目录下的文件以及文件目录对应的名称字符串数组
    for (String str : list) {
        System.out.println(str);
    }
    System.out.println("-------------");
    File[] files = file1.listFiles(); // 返回此抽象目录中的文件以及文件目录的File对象
    for (File f : files) {
        System.out.println(f);
    }
}
```

输出结果：

> false
> true
> true
> D:\Java\java.txt
> D:\Java\java.txt
>
> java.txt
>
> apache-tomcat-8.5.65
> apache-tomcat-8.5.65-windows-x64.zip
> D:\Java\apache-tomcat-8.5.65
> D:\Java\apache-tomcat-8.5.65-windows-x64.zip
>
> Process finished with exit code 0

#### File类删除功能

![image-20210430153149746](https://i.loli.net/2021/04/30/uZegtorjz4d8O1J.png)

```java
public static void main(String[] args) throws IOException {
    File file = new File("D:\\Java\\java.txt");
    System.out.println(file.createNewFile());
    boolean delete = file.delete();   // boolean delete()返回的是布尔值，删除操作成功返回true
    System.out.println(delete);
    File file1 = new File("D:\\Java\\javatest");
    System.out.println(file1.mkdir());
    System.out.println(file1.delete());
}
```

### 递归

递归，指的是程序方法调用方法本身

解决的问题：

把一个复杂的问题层层转化为一个个与原问题相似的较小的问题

递归策略只需要少量的程序就可以描述出解题过程中所需要的多次重复计算

```java
/*打印斐波那契数列*/
public static void main(String[] args) {
    System.out.println(printNumber(20));
}

private static int printNumber(int n) {
    if (n == 1 || n == 2) {
        return 1;
    } else {
        return printNumber(n - 1) + printNumber(n - 2);
    }
}
```

#### 案例：递归求阶乘

```java
public static void main(String[] args) {
    System.out.println(factorial(5));
}
private static int factorial(int n) {
    if (n == 1) {
        return 1;
    } else {
        return factorial(n - 1) * n;
    }
}
```

运行结果：正常打印120

运行时的内存图：进栈过程

![image-20210430154848124](https://i.loli.net/2021/04/30/z57a8TUvXSLjKbE.png)

运行时的内存图：出栈过程

![image-20210430154933302](https://i.loli.net/2021/04/30/PojdIcuZreLmvRX.png)

#### 案例：遍历目录

给定一个指定的目录路径，遍历该目录下的所有内容，并将文件的绝对路径名打印出来

```java
public static void main(String[] args) {
    // ①根据给定的路径创建一个file对象
    File srcFile = new File("D:\\Java");
    // ⑥调用方法
    getFilePath(srcFile);
}
// ②定义一个方法，用于获取给定目录下的所有内容
private static void getFilePath(File srcFile) {
    // ③获取给定的File目录下的所有文件或者目录的File[]数组
    File[] files = srcFile.listFiles();
    // ④遍历该File数组，得到每一个对象
    if (files != null) {
        for (File file : files) {
            // ⑤判断该File对象是否是目录
            if (file.isDirectory()) {
                getFilePath(file); // 是目录，递归调用
            } else if (file.isFile()) {
                System.out.println(file.getAbsolutePath()); // 是文件，直接打印输出
            }
        }
    }
}
```

输出的是所有文件的绝对路径名以及文件名称、后缀名

### 字节流

- IO：input/output，输入输出
- 流：是一种抽象概念，是数据传输的总称，也就是说数据在设备之间的传输称为流，流的本质是数据传输
- IO流就是用来处理设备间的数据传输问题
  - 常见的应用：文件复制、文件上传、文件下载

#### 分类

- 按照数据的流向
  - 输入流：读数据
  - 输出流：写数据
- 按照数据类型
  - 字节流
    - 字节输入流、字节输出流
  - 字符流
    - 字符输入流、字符输出流

IO流的分类默认是按照**数据类型**来分类的。默认情况下，如果用记事本打开文件之后能读懂的内容，就使用字符流，否则字节流。

如果在不知道什么文件的情况下，使用字节流。

#### 字节流写数据

- InputStream：这个抽象类是表示字节输入流的所有类的超类

- OutputStream：这个抽象类是表示字节输出流的所有类的超类

- 子类名特点：子类名称都是以其父类名称作为子类名的后缀

FileOutputStream：文件输出流用于将数据写入File

- FileOutputStream(String name)：创建文件输出流以指定的名称写入文件
- FileOutputStream(File file)：创建文件输出流以写入由指定的File对象表示的文件
- FileOutputStream(String name, boolean append)：创建文件输出流以指定的名称写入文件，第二个参数为true，则从文件末尾写入数据而不是文件开头

使用字节输出流写数据的步骤：

- 创建字节输出流对象：调用系统功能创建了文件，创建字节输出流对象，让字节输出流对象指向文件
- 调用字节输出流的写数据方法
- 释放资源：关闭字节输出流对象以及所有和字节输出流相关的系统资源

#### 字节流写数据的三种方式

![image-20210430180513479](https://i.loli.net/2021/04/30/dlELF3RwPS24vjq.png)

```java
public static void main(String[] args) throws IOException {
    FileOutputStream fos = new FileOutputStream("D:\\Java\\java.txt");
    /*File file = new File("D:\\Java\\java.txt");
    FileOutputStream fos2 = new FileOutputStream(file);*/
    for (int i = 97; i <= 101; i++) {
        // 将指定的字节写入此文件输出流
        fos.write(i);
    }
    // 将b.length字节数组写入此文件输出流
    // byte[] bytes = {97, 98, 99, 100, 101};
    byte[] bytes = "abcde".getBytes(StandardCharsets.UTF_8);
    fos.write(bytes);
    // 将bytes数组从指定的位置开始，以指定的偏移量开始迁移，将这些字符写入该文件输出流
    // write(byte[] b, int off, int len)
    // fos.write(bytes, 0, bytes.length);
    fos.write(bytes, 1, 3);
    // 释放资源
    fos.close();
}
```

这里写入方法中，写入的内容，都需要转换为ASCII码对应的形式，或者直接调用getBytes方法转换。

①字节流写数据如何实现换行：

根据不同的系统，在写完数据的时候追加不同的换行符

WIndows：\r\n	LInux：\n	Mac：\r

```java
// 写数据
for (int i = 0; i < 10; i++) {
    fos.write("hello".getBytes());
    /*Windows:\r\n,Linux:\n,Mac:\r*/
    fos.write("\r\n".getBytes());
}
```

②字节流写数据如何追加数据：

字节流在写数据的时候，会将同名的文件内容清空

我们使用下面这种构造方法创建文件输出流对象

> FileOutputStream(String name, boolean append)：创建文件输出流以指定的名称写入文件，第二个参数为true，则从文件末尾追加数据而不是开头

```java
public static void main(String[] args) throws IOException {
    FileOutputStream fos = new FileOutputStream("D:\\Java\\java.txt", true);
    // 写数据
    for (int i = 0; i < 10; i++) {
        fos.write("hello".getBytes());
        /*Windows:\r\n,Linux:\n,Mac:\r*/
        fos.write("\r\n".getBytes());
    }
    // 释放资源
    fos.close();
}
```

#### 字节流写数据的异常处理

之前在写字节输出流的时候，有异常情况都是直接throws抛出，这个时候我们自己编写代码，捕获一场并进行处理操作

```java
public static void main(String[] args) {
    FileOutputStream fos = null;
    try {
        fos = new FileOutputStream("D:\\Java\\java.txt", true);
        fos.write("World".getBytes());
        fos.close();
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if (fos != null) {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

#### 字节流读数据（一次读一个数据）

FileInputStream：从文件系统中的文件获取输入字节

需求：把之前创建的java.txt文件中的数据读取出来在控制台输出

FileInputStream（String name）：通过打开与实际文件的连接创建一个FileInputStream对象，该文件由文件系统中的文件路径名+文件名命名

```java
public static void main(String[] args) throws IOException {
    // 创建字节流输入流对象
    FileInputStream fis = new FileInputStream("D:\\Java\\java.txt");
    // 调用字节输入流对象中的读取方法
    // int read() : 从字节输入流中读取一个字节的数据
    /*int read = fis.read();
    System.out.println(read);
    System.out.println((char) read);
    // 第二次读取数据（如果文件到达末尾，则返回-1）
    read = fis.read();*/
    /*int read = fis.read();
    while (read != -1) {
        System.out.print((char) read);
        read = fis.read();
    }*/
    int read;
    while ((read = fis.read()) != -1) {
        System.out.print((char) read);
    }
    System.out.println(read);
    System.out.println((char) read);
    // 关闭资源
    fis.close();
}
```

具体操作如上所示，最终打印的结果跟文件中的内容一致

#### 案例：复制文本文件

需求：将文件D:\\Java\\java.txt文件复制到模块目录下

分析：复制文本文件，其实就是将文本文件中的内容读取出来，写入到目的路径下的相同类型的文件中

```java
public static void main(String[] args) throws IOException {
    // 根据数据源创建字节输入流对象，读取操作
    FileInputStream fis = new FileInputStream("D:\\Java\\java.txt");
    // 根据目的地创建字节输出流对象，写入操作
    FileOutputStream fos = new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\java.txt");
    // 读取数据，一次性读入一个字节，一次性写入一个字节
    int by;
    while ((by = fis.read()) != -1) {
        fos.write(by);
    }
    // 释放资源
    fos.close();
    fis.close();
}
```

运行结果如下：在工作空间下的模块目录中新增了java.txt文件

![image-20210430203019769](https://i.loli.net/2021/04/30/g2LOXEdPjf6WkhI.png)

#### 字节流读数据（一次读一个字节数组数据）

把文件中的内容读取出来在控制台输出

```java
public static void main(String[] args) throws IOException {
    // 创建字节输入流对象
    FileInputStream fis =new FileInputStream("D:\\Java\\java.txt");

    // 调用字节输入流的读数据方法
    byte[] bytes = new byte[1024];
    /*int len = fis.read(bytes);
    System.out.println(len);
    System.out.println(new String(bytes, 0, len));*/
    int len;
    while ((len = fis.read(bytes)) != -1) {
        System.out.print(new String(bytes, 0, len));
    }

    // 释放资源
    fis.close();
}
```

最终读取出来的就是文件中的内容

#### 案例：复制图片

```java
public static void main(String[] args) throws IOException {
    // 根据数据源对象创建字节输入流对象
    FileInputStream fis = new FileInputStream("D:\\1.png");
    // 根据目的地创建字节输出流
    FileOutputStream fos = new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\1.png");

    // 复制操作
    byte[] bytes = new byte[1024];
    int len;
    while ((len = fis.read()) != -1) {
        fos.write(bytes, 0, len);
    }

    // 关闭资源
    fos.close();
    fis.close();
}
```

这样编写运行之后，图片就会从输入流的路径复制到输出流的路径下

### 字节缓冲流

![image-20210430210639846](https://i.loli.net/2021/04/30/FmiuXjevzbrVfgI.png)

使用过程

```java
public static void main(String[] args) throws IOException {
    // 创建缓冲字节输出流
    BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\bos.txt"));
    // 写数据
    bos.write("hello\r\n".getBytes());
    bos.write("world\r\n".getBytes());
    // 释放资源
    bos.close();
    // 创建缓冲字节输入流
    BufferedInputStream bis = new BufferedInputStream(new FileInputStream("D:\\Java\\IdeaProjects\\JavaBasic\\bos.txt"));
    // 读取文件数据
    byte[] bytes = new byte[1024];
    int len;
    while ((len = bis.read(bytes)) != -1) {
        System.out.print(new String(bytes, 0, len));
    }
    // 释放资源
    bis.close();
}
```

#### 案例：复制视频

需求：复制视频文件，将一个路径下的视频文件复制到另外的路径下

```java
public class CopyAviDemo {
    public static void main(String[] args) throws IOException {
        // 创建起始时间
        long startTime = System.currentTimeMillis();

        method1();

        // 结束时间
        long endTime = System.currentTimeMillis();
        // 一共耗时多少秒
        long totalTime = endTime - startTime;
        System.out.println("一共耗时：" + totalTime + "毫秒");
    }

    // 字节缓冲流一次读取一个字节数组
    private static void method4() throws IOException {
        // 字节缓冲流复制视频文件
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("D:\\Java\\demo.avi"));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\demo.avi"))；

        // 复制操作
        byte[] bytes = new byte[1024];
        int len;
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }

        // 关闭资源
        bos.close();
        bis.close();
    }

    // 字节缓冲流一次读取一个字节
    private static void method3() throws IOException {
        // 字节缓冲流复制视频文件
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("D:\\Java\\demo.avi"));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\demo.avi"))；

        // 复制操作
        int by;
        while ((by = bis.read()) != -1) {
            bos.write(by);
        }

        // 关闭资源
        bos.close();
        bis.close();
    }

    // 基本字节流一次读取一个字节数组
    private static void method2() throws IOException {
        // 字节流复制视频
        FileInputStream fis = new FileInputStream("D:\\Java\\demo.avi");
        FileOutputStream fos = new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\demo.avi");

        // 复制操作
        byte[] bytes = new byte[1024];
        int len;
        while ((len = fis.read(bytes)) != -1) {
            fos.write(bytes, 0, len);
        }

        // 关闭资源
        fos.close();
        fis.close();
    }


    // 基本字节流一次读取一个字节
    private static void method1() throws IOException {
        // 字节流复制视频
        FileInputStream fis = new FileInputStream("D:\\Java\\demo.avi");
        FileOutputStream fos = new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\demo.avi");

        // 复制视频操作
        int by;
        while ((by = fis.read()) != -1) {
            fos.write(by);
        }

        // 释放资源
        fos.close();
        fis.close();

    }
}
```

对比这四种方式，根据运行时间可以得到，字节缓冲流的速度大于字节流，读写字符数组的方式速度大于读写单个字节的速度

### 字符流

![image-20210501145954622](https://i.loli.net/2021/05/01/GSuJ4l3oF7XOzfA.png)

```java
/*
* 单个汉字在UTF-8编码下占3个字节，在GBK编码下占2个字节
* */
public static void main(String[] args) throws UnsupportedEncodingException {
    // String s = "abc"; // [97, 98, 99]
    String s = "中国"; // UTF-8:[-28, -72, -83, -27, -101, -67]
    // GBK:[-42, -48, -71, -6]
    byte[] bytes = s.getBytes("GBK");
    System.out.println(Arrays.toString(bytes));
}
```

#### 编码表

![image-20210501151654340](https://i.loli.net/2021/05/01/nyv61N9VoCIsXBL.png)

![image-20210501151717326](https://i.loli.net/2021/05/01/HqO7h6vpucDg94d.png)

![image-20210501151819302](https://i.loli.net/2021/05/01/udBcW8GZT2NriFO.png)

![image-20210501152003084](https://i.loli.net/2021/05/01/W2oU6LNq58EhHu9.png)

![image-20210501152119765](https://i.loli.net/2021/05/01/4CSciWLspEyeMAm.png)

#### 字符串中编码解码问题

![image-20210501152228740](https://i.loli.net/2021/05/01/zqcx8nDygGLFOd4.png)

```java
public static void main(String[] args) throws UnsupportedEncodingException {
    String s = "中国";
    byte[] bytes = s.getBytes(); // 默认使用UTF-8进行编码
    String ss = new String(bytes, "UTF-8");
    System.out.println(Arrays.toString(bytes));  // [-28, -72, -83, -27, -101, -67]
    System.out.println(ss);
    byte[] bytes1 = s.getBytes("GBK");
    String ss1 = new String(bytes1, "GBK");
    System.out.println(Arrays.toString(bytes1)); // [-42, -48, -71, -6]
    System.out.println(ss1);
}
```

使用何种方式编码，就要使用何种方式解码，否则将会出现乱码问题。

#### 字符流中的编码解码问题

字符流的基类

- Reader：字符输入流的抽象类
- Writer：字符输出流的抽象类

字符流中和编码解码相关的两个类

- InputStreamReader
- OutputStreamWriter

```java
public static void main(String[] args) throws IOException {
    OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\java.txt"), "GBK");
    osw.write("中国");
    osw.close();
    InputStreamReader isr = new InputStreamReader(new FileInputStream("D:\\Java\\IdeaProjects\\JavaBasic\\java.txt"), "GBK");
    int len;
    while ((len = isr.read()) != -1) {
        System.out.print((char) len);
    }
    isr.close();
}
```

#### 字符流写数据的五种方式

![image-20210501182733661](https://i.loli.net/2021/05/01/mzUKR7DAu9wkj1i.png)

![image-20210504133020515](https://i.loli.net/2021/05/04/rR4NOTJsuP6tXWk.png)

```java
public static void main(String[] args) throws IOException {
    // 创建osw对象
    OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\osw.txt"));
    // 写数据，此时数据还在缓冲区
    osw.write(97);
    // 调用刷新流，将数据从缓冲区转移到目的文件中
    // osw.flush();

    // 写入一个数组
    char[] bytes = {'h', 'e', 'l', 'l', 'o'};
    osw.write(bytes/*, 0, bytes.length*/);

    // 写入一个字符串
    osw.write("world");

    // 写入一个字符串的一部分
    osw.write("java", 0, 1);

    // 关闭资源，但是在关闭之前会自动调用一次刷新
    osw.close();
}
```

#### 字符流读数据的两种方式

![image-20210504133127153](https://i.loli.net/2021/05/04/1GpTFdl7YfQ5aut.png)

```java
public static void main(String[] args) throws IOException {
    // 创建字符流读取对象
    InputStreamReader isr = new InputStreamReader(new FileInputStream("D:\\Java\\IdeaProjects\\JavaBasic\\osw.txt"));
    // 读取数据，一次读取一个字符
    int ch;
    while ((ch = isr.read()) != -1) {
        System.out.print((char) ch);
    }
    // 一次性读入一个字符串
    char[] chs = new char[1024];
    int len;
    while ((len = isr.read(chs)) != -1) {
        System.out.print(new String(chs, 0, len));
    }
    // 释放资源
    isr.close();
}
```

#### 案例：复制java文件

```java
public static void main(String[] args) throws IOException {
    // 根据源文件创建字符输入流
    InputStreamReader isr = new InputStreamReader(new FileInputStream("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_06\\ConversionStringDemo.java"));
    // 根据目的地创建字符输出流
    OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("D:\\Java\\IdeaProjects\\JavaBasic\\ConversionStringDemo.java"));

    // 复制文件操作
    /*int ch;
    while ((ch = isr.read()) != -1) {
        osw.write(ch);
    }*/

    char[] chs = new char[1024];
    int len;
    while ((len = isr.read(chs)) != -1) {
        osw.write(chs);
    }

    // 释放资源
    osw.close();
    isr.close();
}
```

#### 案例：复制Java文件（改进版）

![image-20210504141549380](https://i.loli.net/2021/05/04/yYweO91XkmAQZSg.png)

```java
public static void main(String[] args) throws IOException {
    // 根据源文件创建输入流对象
    FileReader fr = new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_06\\ConversionStringDemo.java");
    // 根据目的地创建输出流对象
    FileWriter fw = new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\ConversionStringDemo.java");

    // 读写数据，复制文件
    int ch;
    while ((ch = fr.read()) != -1) {
        fw.write(ch);
    }

    char[] chars = new char[1024];
    int len;
    while ((len = fr.read(chars)) != -1) {
        fw.write(chars, 0, len);
    }

    // 释放资源
    fw.close();
    fr.close();
}
```

### 字符缓冲流

![image-20210507125006043](https://i.loli.net/2021/05/07/CUp2uLAaZQlgY4P.png)

```java
public static void main(String[] args) throws IOException {
    /*BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_07\\bw.txt"));
    bw.write("hello\r\n");
    bw.write("world\r\n");*/
    
    BufferedReader br = new BufferedReader(new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_07\\bw.txt"));

    // 一次读取一个字符
    /*int ch;
    while ((ch = br.read()) != -1) {
        System.out.print((char) ch);
    }*/

    // 一次读取一个字符数组
    char[] chs = new char[1024];
    int len;
    while ((len = br.read(chs)) != -1) {
        System.out.print(new String(chs, 0, len));
    }

    // 关闭资源
    br.close();
    // bw.close();
}
```

#### 案例：复制Java文件

![image-20210507130025862](https://i.loli.net/2021/05/07/PQ3mCWNEFow2YzS.png)

```java
public static void main(String[] args) throws IOException {
    // 创建字符缓冲流读取对象
    BufferedReader br = new BufferedReader(new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_06\\ConversionStringDemo.java"));
    // 创建字符缓冲流写入对象
    BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_07\\Copy.java"));
    // 一次读入一个字符
    /*int ch;
    while ((ch = br.read()) != -1) {
        bw.write(ch);
    }*/
    // 一次读取一个字符数组
    char[] chs = new char[1024];
    int len;
    while ((len = br.read(chs)) != -1) {
        bw.write(chs, 0, len);
    }

    // 释放资源
    bw.close();
    br.close();
}
```

#### 字符缓冲流特有功能

![image-20210507130849566](https://i.loli.net/2021/05/07/srImAlXF5MGnabf.png)

```java
public static void main(String[] args) throws IOException {
    /*BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_07\\bwDemo.txt"));

    for (int i = 1; i <= 10; i++) {
        bw.write("hello" + i);
        // bw.write("\r\n");
        bw.newLine();
        bw.flush();
    }

    // 释放资源
    bw.close();*/

    BufferedReader br = new BufferedReader(new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_07\\bwDemo.txt"));

    /*String line = br.readLine();
    System.out.println(line);
    line = br.readLine();
    System.out.println(line);
    line = br.readLine();
    System.out.println(line);
    line = br.readLine();
    System.out.println(line);
    // 当最终没有数据的时候，会输出null*/

    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }

    // 释放资源
    br.close();
}
```

#### 案例：复制Java文件（字符缓冲流特有功能实现）

![image-20210507132437294](https://i.loli.net/2021/05/07/FLxbEc1OuHl94Xt.png)

```java
public static void main(String[] args) throws IOException {
    // 根据数据源创建字符输入流对象
    BufferedReader br = new BufferedReader(new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_06\\ConversionStringDemo.java"));
    // 根据目的源创建字符输入流对象
    BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_07\\Copy.java"));
    // 读写数据，复制文件
    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line);
        bw.newLine();
        bw.flush();
    }
    // 释放资源
    bw.close();
    br.close();
}
```

### IO流小结

![image-20210507133726089](https://i.loli.net/2021/05/07/ILYbfg1HsOuVdX8.png)

![image-20210507133759490](https://i.loli.net/2021/05/07/7MdIBtp4PCo8eAU.png)

#### 案例：集合到文件

需求：把ArrayList集合中的数据写入到文本文件中；要求：每一个字符串元素作为文件中的一行数据

```java
public static void main(String[] args) throws IOException {
    // 创建ArrayList对象
    ArrayList<String> arrayList = new ArrayList<String>();
    arrayList.add("Hello");
    arrayList.add("World");
    arrayList.add("Java");
    // 创建字符缓冲输出流对象
    BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_08\\ArrayList.txt"));
    for (String line : arrayList) {
        bw.write(line);
        bw.newLine();
        bw.flush();
    }
    // 释放资源
    bw.close();
}
```

#### 案例：文件到集合

需求：与上述案例相反，将文件中的内容输出到集合中。

```java
public static void main(String[] args) throws IOException {
    // 创建字符缓冲输入流对象
    BufferedReader br = new BufferedReader(new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_08\\ArrayList.txt"));
    // 创建 ArrayList 集合对象
    ArrayList<String> arrayList = new ArrayList<String>();
    // 遍历文件，得到文本数据
    String line;
    while ((line = br.readLine()) != null) {
        arrayList.add(line);
    }
    // 释放资源
    br.close();
    // 遍历集合
    for (String s : arrayList) {
        System.out.println(s);
    }
}
```

#### 案例：点名器

需求：有一个文件中存储着班级同学的姓名，每一个姓名占一行，要求通过程序实现随机点名器

实现的思路：将文件中的姓名输入到集合中，之后在集合的范围中产生随机数作为索引，访问到相对应的同学姓名

```java
public static void main(String[] args) throws IOException {
    // 创建字符缓冲输入流对象
    BufferedReader br = new BufferedReader(new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_08\\names.txt"));
    // 创建 ArrayList 集合对象
    ArrayList<String> arrayList = new ArrayList<String>();
    // 读写文件数据，写入集合
    String line;
    while ((line = br.readLine()) != null) {
        arrayList.add(line);
    }
    // 释放资源
    br.close();
    // 使用随机数对象产生随机数，范围为[0,arraylist.size())
    Random random =  new Random();
    int index = random.nextInt(arrayList.size());
    // 利用索引找到集合中对应的元素
    String name = arrayList.get(index);
    // 输出随机抽取到的姓名
    System.out.println(name);
}
```

#### 案例：集合到文件（改进版）

需求：把ArrayList中的学生数据写入到文本文件，要求一个学生信息在同一行的位置

格式：学号，姓名，年龄，居住地

```java
public static void main(String[] args) throws IOException {
    // 创建集合对象
    ArrayList<Student> array = new ArrayList<Student>();
    // 创建学生对象
    Student s1 = new Student("1840800", "张三", 19, "北京");
    Student s2 = new Student("1840801", "张三", 20, "天津");
    Student s3 = new Student("1840802", "张三", 21, "上海");
    Student s4 = new Student("1840803", "张三", 22, "重庆");
    // 把学生对象添加进集合
    array.add(s1);
    array.add(s2);
    array.add(s3);
    array.add(s4);
    // 创建字符缓冲输出流对象
    BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_09\\Students.txt"));
    // 遍历集合，得到每一个学生对象
    for (Student student : array) {
        // 把学生对象数据拼接成指定格式的字符串
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(student.getStuId()).append(",").append(student.getName()).append(",").append(student.getAge()).append(",").append(student.getAddress());
        // 调用字符缓冲输出流对象写数据
        bw.write(stringBuilder.toString());
        bw.newLine();
        bw.flush();
    }
    // 释放资源
    bw.close();
}
```

#### 案例：文本到集合（改进版）

需求：将文本文件中的数据读取出来写入到集合中并实现遍历

要求每一行数据是一个对象的数据

```java
public static void main(String[] args) throws IOException {
    // 首先创建字符缓冲输入流
    BufferedReader br = new BufferedReader(new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_09\\Students.txt"));
    // 根据需求创建 ArrayList 集合对象
    ArrayList<Student> array = new ArrayList<Student>();
    // 读取文本数据，读取出对象内容
    String line;
    while ((line = br.readLine()) != null) {
        // 用 Split 方法分割读取到的字符串
        String[] split = line.split(",");
        // 格式：学号，姓名，年龄，住址
        Student student = new Student(split[0], split[1], Integer.parseInt(split[2]), split[3]);
        array.add(student);
    }
    // 释放资源
    br.close();
    // 遍历集合对象
    for (Student student : array) {
        System.out.println(student);
    }
}
```

#### 案例：集合到文件（数据排序改进版）

需求：键盘录入学生信息（姓名，语文成绩，数学成绩，英语成绩），要求将学生成绩按照总分降序排进文本文件

格式：姓名，语文成绩，数学成绩，英语成绩

思路：创建TreeSet对象实现

步骤一：创建Student类

```java
public class Student {
    private String name;
    private int Chinese;
    private int Mathematics;
    private int English;

    public int getSum() {
        return this.Chinese + this.Mathematics + this.English;
    }

    public Student(String name, int chinese, int mathematics, int english) {
        this.name = name;
        Chinese = chinese;
        Mathematics = mathematics;
        English = english;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getChinese() {
        return Chinese;
    }

    public void setChinese(int chinese) {
        Chinese = chinese;
    }

    public int getMathematics() {
        return Mathematics;
    }

    public void setMathematics(int mathematics) {
        Mathematics = mathematics;
    }

    public int getEnglish() {
        return English;
    }

    public void setEnglish(int english) {
        English = english;
    }
}
```

步骤二：创建主类

```java
public class TreeSetToFile {
    public static void main(String[] args) throws IOException {
        // 创建 TreeSet 集合对象
        TreeSet<Student> ts = new TreeSet<Student>(new Comparator<Student>() {
            @Override
            public int compare(Student s1, Student s2) {
                // 主要条件：总分是否相同
                int num = s2.getSum() - s1.getSum();
                // 次要条件：科目分数是否相同
                int num2 = num == 0 ? s2.getChinese() - s1.getChinese() : num;
                int num3 = num2 == 0 ? s2.getMathematics() - s1.getMathematics() : num2;
                // 次要条件：姓名是否相同
                int num4 = num3 == 0 ? s2.getName().compareTo(s1.getName()) : num3;
                return num4;
            }
        });
        // 从键盘录入学生数据
        for (int i = 0; i < 5; i++) {
            Scanner sc = new Scanner(System.in);
            System.out.println("请录入第" + (i + 1) + "个学生信息：");
            System.out.println("请输入姓名：");
            String name = sc.nextLine();
            System.out.println("语文成绩：");
            int Chinese = sc.nextInt();
            System.out.println("数学成绩：");
            int Mathematics = sc.nextInt();
            System.out.println("英语成绩：");
            int English = sc.nextInt();
            // 创建学生对象
            Student student = new Student(name, Chinese, Mathematics, English);
            // 把学生对象添加进集合
            ts.add(student);
        }

        // 创建字符缓冲输出流对象
        BufferedWriter bw = new BufferedWriter(new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_10\\ts.txt"));

        // 遍历学生对象，把学生对象的数据拼接成指定格式的字符串内容
        for (Student student : ts) {
            // 格式：姓名，语文成绩，数学成绩，英语成绩
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append(student.getName()).append(",").append(student.getChinese()).append(",").append(student.getMathematics()).append(",").append(student.getEnglish()).append(", 总分：").append(student.getSum());
            // 调用字符缓冲输出流对象写数据
            bw.write(stringBuilder.toString());
            bw.newLine();
            bw.flush();
        }

        // 释放资源
        bw.close();
    }
}
```

#### 案例：复制单级文件夹

![image-20210508162805260](https://i.loli.net/2021/05/08/QF3crU9TwEXdJCP.png)

复制单级文件夹，但是由于文件夹中的文件不是单一格式，所以我们采用字节流复制文件

```java
public class CopySingleFileFolder {
    public static void main(String[] args) throws IOException {
        // 创建源文件夹对象
        File srcFile = new File("D:\\temp");
        // 获取文件夹名称
        String srcName = srcFile.getName();
        // 创建目的文件夹对象
        File destFolder = new File("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_11", srcName);
        // 判断文件夹对象是否存在
        if (! destFolder.exists()) {
            destFolder.mkdir();
        }

        // 获取数据源目录下的所有文件对象
        File[] listFiles = srcFile.listFiles();

        // 遍历 listFiles 数组，将文件写入目的文件夹中
        for (File file : listFiles) {
            // 获取源文件的名称
            String srcFileName = file.getName();
            // 创建目的 File 对象
            File destFile = new File(destFolder, srcFileName);
            // 复制文件
            copyFile (srcFile, destFile);
        }
    }

    private static void copyFile(File srcFile, File destFile) throws IOException {
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(srcFile));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(destFile));

        byte[] bytes = new byte[1024];
        int len;
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }

        bos.close();
        bis.close();
    }
}
```

#### 案例：复制多级文件夹

需求：复制多级文件夹，该文件夹中可能包含子文件夹，子文件夹中包含其他文件

```java
public class CopyMultiFileFolder {
    public static void main(String[] args) throws IOException {
        // 创建数据源 File 目录对象
        File srcFile = new File("D:\\temp");
        // 创建目的 File 对象
        File destFile = new File("D:\\Java\\IdeaProjects\\JavaBasic\\day06_File\\src\\itheima_11\\temp_1");

        // 调用方法复制文件夹中的内容
        copyFolder (srcFile, destFile);
    }

    // 复制文件夹方法
    private static void copyFolder(File srcFile, File destFile) throws IOException {
        // 判断是否是文件夹
        if (srcFile.isDirectory()) {
            // 在目的地创建和数据源 File 一样的文件名称
            String srcFileName = srcFile.getName();
            File newFolder = new File(destFile, srcFileName);
            if (! newFolder.exists()) {
                newFolder.mkdir();
            }
            // 获取数据源对象中的所有文件
            File[] listFiles = srcFile.listFiles();
            for (File listFile : listFiles) {
                copyFile(listFile, newFolder);
            }
        } else {
            // 不是文件夹，是文件，直接复制
            File newFile = new File(destFile, srcFile.getName());
            copyFile(srcFile, newFile);
        }

    }

    // 字节缓冲流复制文件
    private static void copyFile(File srcFile, File destFile) throws IOException {
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(srcFile));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(destFile));

        byte[] bytes = new byte[1024];
        int len;
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
        }

        bos.close();
        bis.close();
    }
}
```

#### 复制文件的异常处理

复制文件中，对于可能出现异常情况的处理方案：

一共有以下四种：

```java
public class CopyFileException {

    public static void main(String[] args) throws IOException {
        method1();
        method2();
        method3();
        method4();
    }

    // 四、JDK9 对于 JDK7 方案的改进办法
    private static void method4 () throws IOException {
        // 此种写法最后会自动释放资源
        FileReader fr = new FileReader("fr.txt");
        FileWriter fw = new FileWriter("fw.txt");
        try (fr;fw) {
            char[] chars = new char[1024];
            int len;
            while ((len = fr.read(chars)) != -1) {
                fw.write(chars, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 三、JDK7 出现的改进方法
    private static void method3 () {
        // 此种写法最后会自动释放资源
        try (FileReader fr = new FileReader("fr.txt");
             FileWriter fw = new FileWriter("fw.txt");) {
            char[] chars = new char[1024];
            int len;
            while ((len = fr.read(chars)) != -1) {
                fw.write(chars, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 二、使用 Try-Catch 语句块捕获异常
    private static void method2 () {
        FileReader fr = null;
        FileWriter fw = null;
        try {
            fr = new FileReader("fr.txt");
            fw = new FileWriter("fw.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }

        char[] chars = new char[1024];
        int len;
        try {
            while ((len = fr.read(chars)) != -1) {
                fw.write(chars, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            fw.close();
            fr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 一、直接抛出处理
    private static void method1 () throws IOException {
        FileReader fr = new FileReader("fr.txt");
        FileWriter fw = new FileWriter("fw.txt");

        char[] chars = new char[1024];
        int len;
        while ((len = fr.read(chars)) != -1) {
            fw.write(chars, 0, len);
        }

        fw.close();
        fr.close();
    }
}
```

### 特殊操作流

#### 标准输入输出流

System类中有两个标准的输入输出流，都是静态成员变量

- public static final InputStream in：标准输入流。通常该流对应于键盘输入或由主机环境或用户指定的另一个输入源

- public static final OutputStream out：标准输出流。通常该流对应于显示输出或由主机环境或用户指定的另一个输出目标

**标准输入流**

自己实现键盘录入数据：

```java
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
```

调用Scanner类实现键盘录入数据：

```java
Scanner sc = new Scanner(System.in);
```

实现代码：

```java
public static void main(String[] args) throws IOException {
    // 使用多态的方式创建 标准输入流 对象
    /*InputStream is = System.in;
    // 字节流读取数据
    int by;
    while ((by = is.read()) != -1) {
        System.out.print((char) by);
    }
    // 释放资源
    is.close();*/

    // 上述代码不能实现中文的正常输出显示，转换为字符流实现
    /*InputStreamReader isr = new InputStreamReader(is);
    // 实现一行文字的读取，我们要转换成 字符缓冲流 实现
    BufferedReader br = new BufferedReader(isr);*/

    // 整合成一行代码，格式如下：
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    System.out.println("请输入一行文字：");
    String line = br.readLine();
    System.out.println(line);

    System.out.println("请输入一个整数：");
    int i = Integer.parseInt(br.readLine());
    System.out.println(i);

    // 但是上述实现过程太过复杂，我们直接使用 Scanner
    Scanner sc = new Scanner(System.in);
}
```

**标准输出流**

标准输出流本质上是PrintStream，也就是说PrintStream所具备的方法，System.out中也有，也可以直接调用

自己实现控制台打印输出：

```java
public static void main(String[] args) {
    PrintStream ps = System.out;

    // 调用打印方法
    ps.print(100);
    ps.print("Hello World");

    // 调用换行打印
    ps.println(100);
    ps.println("Hello World");
    
    // 直接调用
    System.out.println(100);
    System.out.println("Hello World");
    
    // 换行打印方法可以无参数，但是 print 方法不能没有参数
    ps.println();
    // ps.print();
}
```

#### 打印流

打印流只负责打印输出数据，不负责读取数据，有自己特有的方法

- 字节打印流：PrintStream
- 字符打印流：PrintWriter

**字节打印流**

创建字节打印流对象：

```java
PrintStream ps = new PrintStream(fileName);
```

使用字节打印流写数据：

调用父类的方法`write()`会转码输入数据；如果调用自己特有方法`print()`/`println()`写数据，则会原样写入数据

```java
public static void main(String[] args) throws FileNotFoundException {
    PrintStream ps = new PrintStream("D:\\Java\\IdeaProjects\\JavaBasic\\day07_IOStream\\src\\print\\ps.txt");

    // 使用普通方法写数据
    ps.write(97); // 会自动转码成 ASCII 对应的字母 a

    // 使用特有的方法写数据
    ps.print(97);   // 直接写进的就是数字 97
    ps.println(98); // 换行写数据，末尾添加换行符
    ps.println(99);

    // 释放资源
    ps.close();
}
```

**字符打印流**

![image-20210508200415410](https://i.loli.net/2021/05/08/2NKplZDGXF8htuc.png)

第二种方式创建PrintWriter对象，会自动执行刷新，将缓冲区的数据读取出来

```java
public static void main(String[] args) throws IOException {
    String fileName = "D:\\Java\\IdeaProjects\\JavaBasic\\day07_IOStream\\src\\print\\pw.txt";
    PrintWriter pw1 = new PrintWriter(fileName);
    // 写数据
    pw1.print("Hello1");
    pw1.println();
    pw1.flush();
    pw1.print("World1");
    // 释放资源，此步骤会实现自动刷新
    pw1.close();

    // 以这种方式创建字符输出流，会自动刷新
    PrintWriter pw2 = new PrintWriter(new FileWriter(fileName), true);
    // 写数据，此步骤不释放资源，自动刷新执行，数据写入
    pw2.println("Hello2");
    pw2.println("World2");
}
```

#### 案例：复制Java文件（打印流实现）

需求：利用打印流实现Java文件的复制

```java
public static void main(String[] args) throws IOException {
    /*// 根据数据源创建 缓冲输入流 对象
    BufferedReader br = new BufferedReader(new FileReader("day07_IOStream\\src\\print\\PrintStreamDemo.java"));
    // 根据目的地创建 缓冲输出流 对象
    BufferedWriter bw = new BufferedWriter(new FileWriter("day07_IOStream\\src\\print\\PrintStreamDemo_Copy.java"));
    // 读写数据，复制文件
    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line);
        bw.newLine();
        bw.flush();
    }
    // 释放资源
    bw.close();
    br.close();*/

    // 根据数据源创建 缓冲输入流 对象
    BufferedReader br = new BufferedReader(new FileReader("day07_IOStream\\src\\print\\PrintStreamDemo.java"));
    // 根据目的地创建 打印输出流 对象
    PrintWriter pw = new PrintWriter(new FileWriter("day07_IOStream\\src\\print\\PrintStreamDemo_Copy.java"), true);
    // 读写数据
    String line;
    while ((line = br.readLine()) != null) {
        pw.println(line);
    }
    // 释放资源
    pw.close();
    br.close();
}
```

相比于原方法，使用起来更加简单，执行更加高效

#### 对象序列化流

![image-20210508202806414](https://i.loli.net/2021/05/08/l6Q7m5qRYyKgFtV.png)

![image-20210508203000144](https://i.loli.net/2021/05/08/t2Djv5xiSCcBKWY.png)

对象序列化就是将对象的相关信息，存储到指定的文件中；等到需要重构对象的时候，再通过对文件调用对象反序列化流实现。

步骤一：在创建对象序列化对象的时候，首先要创建对象

```java
public class Student implements Serializable {
    private String name;
    private int age;
    // 对应的无参构造和全参构造，以及 Getter and Setter 方法
}
```

步骤二：创建对象序列化流对象，将指定对象进行序列化

```java
public class ObjectOutputStreamDemo {
    /*
    * NotSerializableException : 当一个实例需要实现Serializable接口。
    * 序列化运行时或实例类可以抛出此异常，参数应该是类的名称
    * Serializable : 一个类的串行化是由类实现java.io.serializable接口启用。
    * 类没有实现这个接口不会有任何序列化或反序列化其状态。
    * 序列化接口没有任何方法或字段只能识别可序列化的语义。
    * */
    public static void main(String[] args) throws IOException {
        // 创建 对象序列化流 对象
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("day07_IOStream\\src\\object_serialization_stream\\oos.txt"));
        // 创建对象
        Student s = new Student("雨下一整晚", 20);
        // 执行对象序列化
        oos.writeObject(s);
        // 释放资源
        oos.close();
    }
}
```

这个时候创建的新的oos.txt中的内容大部分是乱码，内容只有少部分信息可以看出。

这个时候我们要通过对象的反序列化流将oos.txt中的内容读取出来并创建相关的对象。

#### 对象反序列化流

![image-20210508210419862](https://i.loli.net/2021/05/08/ByZ2nfNbx5EM1rF.png)

需求：将之前的序列化后的对象文件实现 ***反序列化输出*** 创建原有的对象

```java
/*
* ObjectInputStream(InputStream in) : 创建一个对象输入流读取从指定的输入流。
* */
public static void main(String[] args) throws IOException, ClassNotFoundException {
    // 创建对象反序列化流
    ObjectInputStream ois = new ObjectInputStream(new FileInputStream("day07_IOStream\\src\\object_serialization_stream\\oos.txt"));
    // 从已有的文件中读取数据，将对象反序列化
    // readObject() : 从对象输入流对象
    Object object = ois.readObject();
    // 转成对应的序列化之前的对象
    Student student = (Student) object;
    System.out.println(student.getName() + "," + student.getAge());
    // 释放资源
    ois.close();
}
```

#### 相关问题

一、如果序列化后的类文件被修改之后，读取数据会不会出现问题？

类文件，也就是之前的Student类被修改，那么会不会出问题？

```java
public class ObjectStreamDemo {

    public static void main(String[] args) throws IOException, ClassNotFoundException {
        // write();
        read();
    }

    // 序列化
    private static void write () throws IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("day07_IOStream\\src\\object_serialization_stream\\oos.txt"));
        Student s = new Student("雨下一整晚Real", 20);
        oos.writeObject(s);
        oos.close();
    }

    // 反序列化
    private static void read () throws IOException, ClassNotFoundException {
        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("day07_IOStream\\src\\object_serialization_stream\\oos.txt"));
        Object object = ois.readObject();
        Student student = (Student) object;
        System.out.println(student.getName() + "," + student.getAge());
        ois.close();
    }
}
```

这个时候，我们首先调用write()方法，将对象进行序列化之后；我们修改Student类的代码，添加一个toString()方法，之后只调用read()方法，这个时候出现了异常

> Exception in thread "main" java.io.InvalidClassException: 
> object_serialization_stream.Student; 
> local class incompatible: stream classdesc serialVersionUID = 1337395739814197595, 
> local class serialVersionUID = -2611514023222870104

当序列化运行时检测到一个类中的下列问题之一时抛出：

- 类的串行版本与从流中读取的类的不匹配 
- 该类包含未知的数据类型 
- 类中没有一个可访问的无参数构造函数

通过观察异常产生的原因可以得知，是由于串行版本不一致导致的异常

> 序列化运行时与每个可序列化的类关联一个版本号，被称为serialVersionUID，用于在反序列化期间验证发送方和接收者有序列化对象，对象是相对于序列化兼容加载的类。如果接收者具有比相应的类的对象发送不同的serialVersionUID加载了一个类，然后反序列化将导致`InvalidClassException`

二、这种问题应该如何解决？

给序列化对象所属的类添加一个值：

```java
private static final long serialVersionUID = 42L;
```

三、如果某个对象中的某个值不想被序列化，应该如何实现？

给该属性添加关键字 `transient` —— adj.短暂的;转瞬即逝的;倏忽;暂住的;过往的;临时的

```java
// private int age;
private transient int age;
```

#### Properties

简单使用，和之前的集合的使用大致相同

注意：**创建的时候不用写泛型**

```java
public static void main(String[] args) {
    // 创建集合对象
    Properties properties = new Properties();
    // 存储对象元素
    properties.put("001", "张三");
    properties.put("002", "李四");
    properties.put("003", "王五");
    // 遍历对象元素
    Set<Object> keySet = properties.keySet();
    for (Object key : keySet) {
        Object value = properties.get(key);
        System.out.println(key + "," + value);
    }
}
```

Properties作为集合的特有方法：

![image-20210508223144530](https://i.loli.net/2021/05/08/Xp2sLKD43hHoEy8.png)

```java
public static void main(String[] args) {
    // 创建集合对象
    Properties prop = new Properties();
    // 调用 setProperties() 方法
    prop.setProperty("001", "张三");
    prop.setProperty("002", "李四");
    prop.setProperty("003", "王五");
    // 调用 getProperties() 方法
    String property = prop.getProperty("001");
    System.out.println(property);
    // 调用 stringPropertyNames() 获得键名
    Set<String> keySet = prop.stringPropertyNames();
    for (String value : keySet) {
        String s = prop.getProperty(value);
        System.out.println(value + "," + s);
    }
}
```

#### Properties和IO流结合的方法

![image-20210508224042428](https://i.loli.net/2021/05/08/3Fr1Y6kCu8pH5Gs.png)

```java
public class PropertiesDemo {
    public static void main(String[] args) throws IOException {
        // 把集合中的数据保存到文件
        myStore();
        // 把文件中的数据加载到集合
        myLoad();
    }

    private static void myLoad() throws IOException {
        Properties properties = new Properties();
        // 加载文件中的数据到集合中
        FileReader fr = new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day07_IOStream\\src\\properties\\Properties.txt");
        properties.load(fr);
        fr.close();
        System.out.println(properties);
    }

    private static void myStore() throws IOException {
        Properties properties = new Properties();
        // 往集合中添加数据
        properties.put("001", "张三");
        properties.put("002", "李四");
        properties.put("003", "王五");
        // 将集合中的数据写入文件
        FileWriter fw = new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day07_IOStream\\src\\properties\\Properties.txt");
        properties.store(fw, null);
        fw.close();
    }
}
```

#### 案例：游戏次数

需求：实现猜数字小游戏，每人只能玩三次；如果还想玩，提示：试玩已结束

![image-20210508225458225](https://i.loli.net/2021/05/08/xk1UeKg7OEyWP3S.png)

步骤一：创建游戏类 GuessNumber

```java
public class GuessNumber {
    public GuessNumber() {
    }

    // 猜数字游戏
    public static void start () {
        // 要完成猜数字的游戏，首先要有一个要猜的数字，使用随机数生成，范围0-100
        Random random = new Random();
        int number = random.nextInt(100) + 1;

        while (true) {
            // 使用程序实现猜数字，每次均要实现键盘输入
            Scanner sc = new Scanner(System.in);
            System.out.println("请输入你的答案：");
            int guessNumber = sc.nextInt();

            // 比较输入的数字和系统产生的数字的大小，根据大小输出相应的提示
            if (guessNumber > number) {
                System.out.println("你猜的数字" + guessNumber + "大了");
            } else if (guessNumber < number) {
                System.out.println("你猜的数字" + guessNumber + "小了");
            } else {
                System.out.println("恭喜你猜对了！");
                break;
            }
        }
    }
}
```

步骤二：创建game.txt文件

```properties
#Sat May 08 23:14:11 CST 2021
count=3
```

步骤三：编写判断主方法

```java
public class PropertiesGuessNumber {
    public static void main(String[] args) throws IOException {
        // 创建集合对象
        Properties properties = new Properties();

        // 从文件中读取数据
        FileReader fr = new FileReader("D:\\Java\\IdeaProjects\\JavaBasic\\day07_IOStream\\src\\properties\\game.txt");
        properties.load(fr);
        fr.close();

        // 通过 properties 集合获取到 count 的值
        String count = properties.getProperty("count");
        int number = Integer.parseInt(count);

        // 判断游戏运行的次数，并随着玩游戏的次数的增加，将 count 的值修改写入
        if (number >= 3) {
            // 如果次数到了，则提示试玩已结束
            System.out.println("试玩已结束！");
        } else {
            // 调用游戏开始方法
            GuessNumber.start();
            number ++;
            properties.setProperty("count", String.valueOf(number));
            // 创建 字符缓冲流 存储 count 值
            FileWriter fw = new FileWriter("D:\\Java\\IdeaProjects\\JavaBasic\\day07_IOStream\\src\\properties\\game.txt");
            properties.store(fw, null);
            fw.close();
        }
    }
}
```

当game.txt文件中的count = 3的时候，会提示“试玩已结束！”。
