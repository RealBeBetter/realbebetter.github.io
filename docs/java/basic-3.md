---
title: 【Java】基础知识部分-集合容器之Set、Map
date: 2021-05-03
tags:
- Java
---
## 五、集合（下）

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

![image-20210427221941612](https://s2.loli.net/2022/04/06/oDMQs964yFpLamZ.png)

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

![image-20210427222307522](https://s2.loli.net/2022/04/06/8MrNEhg9oyO4eTK.png)

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

LinkedHashSet 集合特点

- 哈希表和链表实现的 Set 接口，具有可预测的迭代次序
- 由链表保证元素有序，也就是说元素的存储和取出顺序是一致的
- 由哈希表保证元素唯一，也就是说没有重复的元素

LinkedHashSet 集合练习：存储字符串并遍历

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

TreeSet 集合特点

- 元素有序，这里的顺序不是指存储和取出的顺序，而是按照一定的规则进行排序，具体排序方式取决于构造方法
- `TreeSet()`：根据其元素的自然排序进行排序
  `TreeSet(Comparator comparator)`：根据指定的比较器进行排序
- 没有带索引的方法，所以不能使用普通 for 循环遍历
- 由于是 Set 集合，所以不包含重复元素的集合

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

![image-20210428104144495](https://s2.loli.net/2022/04/06/ic72oMsarUk8WSV.png)

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

![image-20210428105302542](https://s2.loli.net/2022/04/06/zqFW5Ka67rPkACD.png)

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

![image-20210429191917166](https://s2.loli.net/2022/04/06/nP7Q9GTsIaFNSHh.png)

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

![image-20210429203158066](https://s2.loli.net/2022/04/06/znjcsBoHLUD1NmQ.png)

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

