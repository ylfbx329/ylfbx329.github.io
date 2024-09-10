---
title: 'Java期末复习编程题'
summary: Java期末复习编程题，题目题解，学习记录
date: 2022-05-31T09:53:04+08:00
categories: 学习记录
# draft: true
---
# Java 期末复习-编程题

## A

假设已经封装好Book，请根据要求实现对应的方法

```java
public class Book {
    private String bookname;// 书名
    private String author;// 作者
    private String publish;// 出版社
    private double price;// 价格
    private int print;// 版次
    private int count;// 印数
    private String time; // 出版时间
    // 省略所有的getter及setter
}
```

（1）传入一个Book对象的List集合以及作者名，返回一个包含该作者出版的所有图书名字的List集合
（2）传入一个Book对象的List集合，返回一个按书定价从小到大排序的书的名字的集合
（3）传入一个Book对象的List集合，返回一个按出版社分组的Map，Map的key为出版社，value为该出版社的图书集合

- 说明：
  - 可自定义方法的名称及参数名，但最好做到见名知意，参数的类型及返回类型一定要和题意一致
  - 标清题号只提交三个方法的代码

1. 传入一个Book对象的List集合以及作者名，返回一个包含该作者出版的所有图书名字的List集合

    ```java
    public static List<String> getAuthorBookname(List<Book> list, String author) {
        return list.stream()
                .filter(b -> author.equals(b.getAuthor()))
                .map(Book::getBookname)
                .collect(Collectors.toList());
    }
    ```

2. 传入一个Book对象的List集合，返回一个按书定价从小到大排序的书的名字的集合

    ```java
    public static List<String> sortByPrice(List<Book> list) {
        return list.stream()
                .sorted(Comparator.comparing(Book::getPrice))
                .map(Book::getBookname)
                .collect(Collectors.toList());
    }
    ```

3. 传入一个Book对象的List集合，返回一个按出版社分组的Map，Map的key为出版社，value为该出版社的图书集合

    ```java
    public static Map<String, List<Book>> getGroupByPublish(List<Book> list) {
        return list.stream()
                .collect(Collectors.groupingBy(Book::getPublish));
    }
    ```

## B

苹果有不同的种类，而不同的品牌会同生产同一种苹果，苹果、种类和品牌三者可以构成一种嵌套关系。

```java
//品牌
public class Brand {
    private String brandName;
    // 省略brandName的getter/setter方法
}

// 种类
public class Kind {
    private Brand brand;
    // 省略brand的getter/setter方法
}

// 苹果
public class Apple {
    private Kind kind;
    // 省略kind的getter/setter方法
}
```

假设我想得到某个苹果的品牌信息，怎么办？请帮我完成下面的方法：

```java
public static String getAppleBrandName(Apple apple) {
    // ......
}
```

要求
（1）不能出现NullPointerException
（2）不能用if语句判断
说明：只提交getAppleBrandName()的代码

```java
public static String getAppleBrandName(Apple apple) {
    return Optional.ofNullable(apple)
            .map(Apple::getKind)
            .map(Kind::getBrand)
            .map(Brand::getBrandName)
            .orElse("null");
}
```

## C

编写一个方法，传入一个登记人数，输出登记人数，一旦传入参数为负数，且抛出自定义的异常。

```java
//（1）自定义异常类MyException  
public class Test {
    public void regist(int num) throws MyException {
        // （2）按题目要求完成方法体
    }

    public void manager() {
        // (3)调用regist(int num)完成登记，如果参数为负，显示“人数为负值，不合理”的提示信息
        System.out.print("本次登记操作结束");
    }

    public static void main(String args[]) {
        Test t = new Test();
        t.manager();
    }
}
```

```java
import java.util.Scanner;

class MyException extends Exception {
    @Override
    public void printStackTrace() {
        System.out.println("人数为负值，不合理");
    }
}

public class Test {
    public static void main(String[] args) {
        Test t = new Test();
        t.manager();
    }

    public void regist(int num) throws MyException {
        if (num < 0)
            throw new MyException();
        System.out.println("登记成功" + num + "人");
    }

    public void manager() {
        Scanner in = new Scanner(System.in);
        try {
            while (in.hasNextInt())
                regist(in.nextInt());
        } catch (MyException e) {
            e.printStackTrace();
        }
        System.out.print("本次登记操作结束");
    }
}
```

## D

AB两个人拥有同一个账户，两个人同时从这个账户取钱，假设账户已有钱数是10000元,A从柜台进行取钱，一次取300元,取后输出“A在柜台进行取钱，取了300元！目前账户还有XXX元”；B从ATM机进行取钱，一次取200元，取后输出“B从ATM机进行取钱，取了200元！目前账户还有XXX元”，直到账户钱数不足两人要取的数时，就不能取了，输出“余额不足。”，其中XXX是账户的余额数。
编程用个线程模拟AB两个人的取钱过程，要求
（1）两个人都有取钱的过程；
（2）不能出现钱数不一致的问题。
说明：该题提交完整的程序代码

```java
class Money implements Runnable {
    volatile int money = 10000;
    volatile int canTake = 1;

    synchronized void takeMoney() {
        if (Thread.currentThread().getName().equals("A") && money >= 300) {
            money -= 300;
            System.out.println("A在柜台进行取钱，取了300元！目前账户还有" + money + "元");
        } else if (money >= 200) {
            money -= 200;
            System.out.println("B从ATM机进行取钱，取了200元！目前账户还有" + money + "元");
        } else
            canTake = 0;
    }

    @Override
    public void run() {
        while (canTake == 1) {
            takeMoney();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Money money = new Money();
        new Thread(money, "A").start();
        new Thread(money, "B").start();
    }
}
```

## E

基于基本IO，以及字节数组缓冲区，实现文件的复制文件，无需考虑文件不存在问题。
要求：
（1）用基本IO，基于字节数组缓冲区实现，不能用nio包中的类
（2）在复制后的文件开始加上一行信息，具体内容是：自己的名字、学号及籍贯信息
（3）异常在方法内处理
（4）资源必须被正确关闭；

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class Test2 {
    public static void main(String[] args) {
        String fileName = "C:/example/file1.txt";
        String toFile = "C:/example/file2.txt";
        copyFile(fileName, toFile);
    }
    // start
    // 在此处添加 copyFile（）方法的实现，
    // end
}
```

说明：只提交copyFile（）方法的代码

```java
static void copyFile(String fileName, String toFile) {
    try (FileInputStream in = new FileInputStream(fileName);
            FileOutputStream out = new FileOutputStream(toFile);) {
        byte[] buffer = new byte[1024];
        int len;
        out.write("耿林康 2020212773 山东淄博".getBytes());
        while ((len = in.read()) != -1) {
            out.write(buffer, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```
