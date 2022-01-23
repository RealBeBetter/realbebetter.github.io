---
title: 【Java】基础知识部分-IO流（上）
date: 2021-05-03
tags:
- Java
---
## 六、IO流（上）

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

