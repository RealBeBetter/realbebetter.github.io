---
title: 【Java】基础知识部分-IO流（下）
date: 2021-05-03
tags:
- Java
---
## 六、IO流（下）

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
