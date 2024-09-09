---
title: "Java笔记"
summary: 记录Java学习过程中的部分要点
date: 2022-01-19T20:17:58+08:00
categories: 笔记
# draft: true
---
# 第一章 Java 语言概述

[== >Java 背景知识< ==](https://www.cnblogs.com/HeavenZhi/p/14075331.html)

## 编程语言

1. 机器语言：01 代码
2. 汇编语言：用自己能识别的语法规则编程
3. 高级语言：Java、C、C++、C#、php、易语言

## Java 简介

1. 创始人：James Gosling 等人
2. 创建公司：Sun（Stanford University Network）
3. 1991 年推出 Oak 语言，1995 年更名为 Java
4. 特性：面向对象、健壮性（无指针，自动垃圾回收）安全（需要 jre 环境运行）、可移植（有 jre 环境即可运行）、跨平台（打包为字节码文件，不同操作系统不影响 jvm 虚拟机解析执行字节码文件）

## Java 体系

1. Java SE（Java Platform Standard Edition，Java 平台标准版）以前称为 J2SE，它允许开发和部署在桌面、服务器、嵌入式环境和实时环境中使用的 Java 应用程序。Java SE 包含了支持 Java Web 服务开发的类，并为 Java EE 提供基础，如 Java 语言基础、JDBC 操作、I/O 操作、网络通信以及多线程等技术
2. Java EE（Java Platform Enterprise Edition，Java 平台企业版）以前称为 J2EE。企业版本帮助开发和部署可移植、健壮、可伸缩且安全的服务器端 Java 应用程序。Java EE 是在 Java SE 基础上构建的，它提供 Web 服务、组件模型、管理和通信 API，可以用来实现企业级的面向服务体系结构（Service Oriented Architecture，SOA）和 Web 2.0 应用程序
3. Java ME（Java Platform Micro Edition，Java 平台微型版）以前称为 J2ME，也叫 K-JAVA。Java ME 为在移动设备和嵌入式设备（比如手机、PDA、电视机顶盒和打印机）上运行的应用程序提供一个健壮且灵活的环境。包括灵活的用户界面、健壮的安全模型、丰富的内置网络协议以及对可以动态下载的联网和离线应用程序。基于 Java ME 规范的应用程序只需编写一次就可以用于许多设备，而且可以利用每个设备的本机功能

## JDK 安装

1. [如何选择版本](https://www.cnblogs.com/Eva0110/p/14075653.html)
2. JDK 主要编程工具
   - java – Java 应用程序的加载器。该工具是一个解释器，可以解释 javac 编译器生成的字节码文件
   - javac – Java 编译器，将源代码转换为 Java 字节码
   - javadoc – 文档生成器，可从源代码注释自动生成文档
   - jdb – Java 调试器（debugger）
3. [环境变量配置与版本切换](https://www.cnblogs.com/jaxu/p/14972722.html)

## 第一个 Java 程序

```java
//访问修饰符：public---公开访问
//类标识符：class
//类名：HelloWorld
public class HelloWorld {
    // 静态修饰符：static
    // 返回类型：void
    // 方法名：main
    // 形式参数类型：String[]---字符串数组类型
    // 形式参数名：args---变量名
    public static void main(String[] args) {
        // 将"Hello World"输出打印到控制台
        System.out.println("Hello World");
    }
}
```

**注：文件名与公有类名一致，且公有类应唯一，采用大驼峰命名法**
编译：`javac HelloWorld.java`
执行：`java HelloWorld`

## 集成开发环境

IntelliJ IDEA

> IntelliJ IDEA：IntelliJ 在业界被公认为最好的 Java 开发工具，尤其在智能代码助手、代码自动提示、重构、JavaEE 支持、各类版本工具( git、svn 等)、JUnit、CVS 整合、代码分析、 创新的 GUI 设计等方面的功能可以说是超常的，支持 HTML，CSS，PHP，MySQL，Python，Kotlin 等。

Eclipse

> Eclipse：Eclipse 是著名的跨平台的自由集成开发环境（IDE）。最初主要用来 Java 语言开发，但是目前亦有人通过插件使其作为其他计算机语言比如 C++ 和 Python 的开发工具。

NetBeans

> NetBeans：NetBeans 是 Sun 公司在 2000 年创立的开放源代码供开发人员和客户社区的家园，旨在构建世界级的 Java IDE。NetBeans 当前可以在 Solaris、Windows、Linux 和 Macintosh OS X 平台上进行开发，并在 SPL (Sun 公用许可)范围内使用。 NetBeans 包括开源的开发环境和应用平台，NetBeans IDE 可以使开发人员利用 Java 平台能够快速创建 Web、企业、桌面以及移动的应用程序，NetBeans IDE 已经支持 PHP、Ruby、JavaScript、Groovy、Grails 和 C/C++ 等开发语言。

MyEclipse

> MyEclipse：由 Genuitec 公司开发的一款商业化软件，是在 Eclipse 基础上加上自己的插件开发而成的功能强大的企业级集成开发环境，主要用于 Java、Java EE 以及移动应用的开发。在最新版本的 MyEclipse 中，配合 CodeMix 使用支持也十分广泛，尤其是对各种开源产品和主流开发框架的支持相当不错。目前已支持 PHP、Python、Vue、Angular、React、Java、Java EE 等语言和框架开发。

## IntelliJ IDEA 的使用

1. [学生认证获得专业版](https://blog.csdn.net/qq_36667170/article/details/79905198)
2. [安装过程图解](http://c.biancheng.net/view/7592.html)
3. [汉化](https://blog.csdn.net/Cooperia/article/details/119329395)
4. 快捷键
   - 多光标：`鼠标中键 + 拖动` 或 `Shift + Alt + 鼠标左键`
   - 格式化代码：`Ctrl + Alt + L`
   - 整行换序：`Alt + Shift + Up/Down`
5. 代码补全
   - `psvm` 主函数 `public static void main(String[] args)`
   - `sout` 输出语句 `System.out.println();`

## Java 项目文件目录

![项目文件目录](https://img-blog.csdnimg.cn/93dc3deabfd84cea849a9b27091e5779.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbmVmdV_lj7bmtp_po47kuI3mga8=,size_7,color_FFFFFF,t_70,g_se,x_16#pic_center)

# 第二章 Java 编程基础

## 变量

1. 分类
   1. 按定义位置
      1. 成员变量：定义于类的内部，属于类的
      2. 局部变量：定义于方法内部，或方法的参数
   2. 按类型
      1. 基本数据类型变量：8 种
      2. 引用数据类型变量：类 class，接口 interface，数组 []
2. 基本数据类型
   1. 整数型
      1. byte
      2. short
      3. int（默认）
      4. long
   2. 浮点型
      1. float
      2. double（默认）
   3. 布尔型
      1. boolean：只有 0 和 1，非零数不做 true，故没有`while(n--)`用法
   4. 字符型
      1. char：两个字节（0 ~ 65535）
3. 强类型检查；自动向上转型；可向下强制类型转换，可能损失精度

## 注释

1. 方法或类注释 `/** */`：解释方法或类的功能，作者，时间，参数含义等
2. 块注释 `/* */`：
3. 行注释 `//`：测试代码，描述作用

## 标识符

1. 定义：对包、类、方法、变量、参数等要素命名的字符序列
2. 命名规则
   1. 由字母、数字、下划线、$组成
   2. 不能由数字开头
   3. 严格区分大小写
   4. 不能是 Java 关键字或保留字
3. 命名规范：驼峰命名法
   1. 包名：域名反写+项目名+各类包名
   2. 类：首字母大写，之后单词首字母大写（大驼峰式）
   3. 方法：
      1. 普通方法：首字母小写，之后单词首字母大写（小驼峰式）
      2. 构造方法：方法名与类名保持一致
4. 关键字全为小写

## 运算符

1. 转义字符
   1. \n
   2. \r：回车，删除光标返回本行开头，本行后有输出则之前数据全部删除，输出后面数据，无输出则输出之前数据
   3. \t
2. 基本运算符：+ - \* / % ++ --
3. 赋值运算符：+= -= \*= /= %=
4. 比较运算符：== > < >= <= != instanceof
   1. `对象 instanceof 类名` 是否是该类或其子类的对象
   2. String 类的 `==` 判断是否为相同对象，如：`str2=str1` `str1="123"; str2="123";` 双等判断为 `true`
5. 逻辑运算符：| & || &&
   1. | &：前后表达式均判断
   2. || &&：短路
6. 位运算符：~ & | ^ >> << >>>
   1. `>>` 正数补零，负数补一
   2. `>>>` 高位只补零，无视符号位
7. 三目运算符：x ? y : z 不支持一般语句的执行

## 数据输入

1. java.util.Scanner 类
2. 创建 `Scanner input = new Scanner(System.in);`
3. 常用方法
   1. 读取数据![读取](https://img-blog.csdnimg.cn/7f9a5b7360c6439683175519cd97d98e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbmVmdV_lj7bmtp_po47kuI3mga8=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
      **注：`next()`输入有效字符之前遇到的空白会被自动去掉，读取到有效字符之后遇空白结束**
      **`nextLien()`读取整行结束**
   2. 判断数据（只判断，不消耗输入）![判断](https://img-blog.csdnimg.cn/dca6b562469e44ac9cc1192687235c80.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbmVmdV_lj7bmtp_po47kuI3mga8=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

## 分支语句

1. `if(){} else if(){} else{}`
2. `switch(表达式){ case 常量:{} default:{} }` 表达式可以为 String，case 后加{}确定作用域，出口加 break

## 循环语句

1. while
2. do-while
3. for
4. 增强 for 循环 `for (int i : a)`

## 方法（函数）

1. 方法重载（overloading method）条件
   1. 方法名称保持一致
   2. 参数数量不同
   3. 参数类型不同
   4. 参数位置不同

注：**返回值类型不同不能构成重载**

## 数组

1. 定义
   1. 动态初始化：
      1. `数据类型[] 变量 = new 数据类型[数组长度]`
      2. `数据类型[] 变量`
         `变量 = new数据类型[数据长度]`
   2. 静态初始化：定义即赋值 3. `数据类型[] 变量 = new 数据类型[]{值,值}` 4. `数据类型[] 变量 = {值,值}`
   3. 二维数组
      1. `数据类型[][] 变量 = new 数据类型[3][5]` new 应给出最高维长度

# 第三章 类和对象

## 基本概念

1. 面向对象三个特性
   1. 封装：从实例中抽象共同性质，将数据与对数据的操作封装在一起
   2. 继承：子类继承父类的部分数据与操作，同时增加子类独有的数据与操作
   3. 多态：
      1. 功能多态性（静态多态性）：方法重载，根据传递消息不同实现不同功能
      2. 继承多态性：方法重写，调用的子类不同方法不同
      3. 运行多态性：变量编译（声明）与运行（实际赋值）类型不一致则可能出现多态
2. Java 程序编译运行
   1. 由若干类组成，有一个主类含有 main 方法，从主类的 main 方法开始执行
   2. 编译时每个类和接口都生成一个 .class 文件

## 类

1. 类声明
   1. final 修饰：无法被继承，称作最终类
   2. 不能被 protected private static 修饰
2. 类体

   1. 成员变量
      1. 特点
         1. 可以是任意数据类型，包括对象和接口
         2. 赋初值表明创建对象时的初始状态
      2. 分类
         1. 类变量（静态变量）：static 修饰，与类创建的所有对象关联
         2. 实例变量
         3. 常量：final 修饰
            1. 必须初始化，可在定义处或构造方法处
            2. 基本类型值不可变，引用类型引用不可变，引用空间内的值可变
   2. 方法
      1. 特点
         1. 形参传递引用类型时，与实参指向同一地址空间
         2. 局部变量使用时应初始化
         3. 局部变量（形参、方法内声明的变量）与成员变量重名时，成员变量被隐藏
         4. final 修饰
            1. 说明该方法提供功能已满足当前需求，不用扩展
            2. 不许子类重写，但可被继承使用，即只能被实现一次
         5. this 关键字
            1. 用于区别成员成员变量与局部变量，类变量还可用类名区分 `A.a`
            2. 构造方法中用 `this(参数列表)` 做首条语句，可调用其他构造方法
            3. 不可用在类方法中
      2. 分类
         1. 构造方法：无返回类型，允许多个构造方法但参数需不同（个数、类型、位置）
         2. 类方法（静态方法）：static 修饰，不能调用实例方法和操作实例变量，除非作为参数传入
         3. 实例方法：可以调用类内的其他方法
      3. 方法重载 一个类内可有多个相同名字的方法
         1. 条件
            1. 方法名称相同
            2. 参数不同（个数、类型、位置）
   3. 代码块
      1. 静态代码块：只在第一次给该类对象分配空间时运行一次
      2. 构造代码块：每次创建该类对象时都运行一次，且早于构造方法
   4. 内部类-外嵌类（包含内部类的类）

      1. 分类

         1. 成员内部类
            1. 不能包含静态变量和方法
            2. 可以访问外嵌类的所有变量和方法
            3. 外嵌类访问内部类应先实例化内部类
         2. 静态内部类
            1. 只能访问外嵌类的静态变量和方法
         3. 匿名内部类

            1. 用于继承或实现一次接口

               ```java
               interface inter {
                   int fon(int num);
               }// 也可换做抽象类

               public class Main {
                   public static void ffon(inter inter) {
                       System.out.println(inter.fon(12));
                   }

                   public static void main(String[] args) {
                       ffon(new inter() {
                           @Override
                           public int fon(int num) {
                               return num;
                           }
                       });
                   }
               }
               ```

         4. 局部内部类
            1. 定义在方法或代码块内
            2. 作用范围为代码块范围
            3. 不能被 public protected private static 修饰，可被 final 修饰
            4. 只能访问代码块内 final 修饰的参数

      2. 作用
         1. 可被 protected private 修饰，实现类的隐藏
         2. 组织类之间的逻辑，增加可读性
         3. 间接实现多继承
         4. Android 回调监听事件应用较多

## 对象

1. 内存使用
   1. 堆区：存放 new 出来的对象与对应的 class 信息
   2. 栈区：基础数据类型的值和对象以及基础数据的引用
   3. 方法区：存放永远唯一的元素，如 class 和 static 变量
2. 匿名对象 `new A();` 使用场景
   1. 对一个对象仅进行一次方法调用
   2. 作为实参传递给方法
3. 类型转换
   1. 向上转型：父类引用指向子类对象 `父类名 对象名 = new 子类名();`
      1. 成员变量、静态成员方法为父类，无法访问子类扩展的成员变量
      2. 成员方法若重写则为子类，否则为父类，无法访问子类扩展的方法
   2. 向下转型：将上转型对象强制转换为子类对象的过程
4. 对象数组，数组长度和各个元素两次申请空间
5. 单例模式：只存在一个该类的对象

   1. 饿汉式

      ```java
      public class A {
          private static A a = new A();// 静态变量预先加载，从而供get返回

          private A() {
          }

          public static A getAInstance() {
              return a;
          }
      }
      // A a = A.getAInstance();
      ```

   2. 懒汉式

      ```java
      public class Lazy {
          private static Lazy a = null;

          private Lazy() {
          }

          // 加 synchronized 考虑并发时多次创建对象
          public static synchronized Lazy getLazy() {
              if (a == null)
                  a = new Lazy();
              return a;
          }
      }
      // Lazy a = Lazy.getLazy();
      ```

## 包

1. package 语句为 Java 源文件的第一条语句 `package 包名`
2. 若省略包语句，则被定义在无名包下
3. -d 指定 .class 文件保存路径，若有包语句则在路径下创建包目录结构
4. import 语句 `import 包名[.子包名...].<类名|*>`
   1. 引入指定包层次下所需类或全部类，不导入其子包，若为 java.lang，则默认导入所有类
   2. 在包语句和类定义语句之间
   3. 不是必须，可坚持使用其他类的全名

## 访问权限

|  修饰符   | 类内部 | 同一个包 | 子类 | 任何地方 |
| :-------: | :----: | :------: | :--: | :------: |
|  private  |  YES   |          |      |          |
|  default  |  YES   |   YES    |      |          |
| protected |  YES   |   YES    | YES  |          |
|  public   |  YES   |   YES    | YES  |   YES    |

注：**class 只能由 public 或 default 修饰**

## UML 类图

1. 类名
2. 修饰符：public +，protected #，private ~
3. [修饰符]属性名：属性类型
4. [修饰符]方法名(参数名：参数类型)：返回类型
5. 构造方法下划线标出

## 基本数据类型的类包装

1. 对应关系

   | 基本数据类型 |  对应类   |
   | :----------: | :-------: |
   |     byte     |   Byte    |
   |    short     |   Short   |
   |     int      |  Integer  |
   |     long     |   Long    |
   |    float     |   Float   |
   |    double    |  Double   |
   |   boolean    |  Boolean  |
   |     char     | Character |

2. 常用方法

   1. 构造方法 `类名(数据类型 num)`
   2. 返回数据 `数据类型Value()`
   3. Character 类中常用方法

      ```java
      public static boolean isDigit(char ch) // 如果ch是数字字符方法返回true，否则返回false。
      public static boolean isLetter(char ch) // 如果ch是字母字符返回true，否则返回false。
      public static boolean isLetterOrDigit(char ch) // 如果ch是数字字符或字母字符返回true，否则返回false。
      public static boolean isLowerCase(char ch) // 如果ch是小写字母字符返回true，否则返回false。
      public static boolean isUpperCase(char ch) // 如果ch是大写字母字符返回true，否则返回false。
      public static char toLowerCase(char ch) // 返回ch的小写形式。
      public static char toUpperCase(char ch) // 返回ch的大写形式。
      public static boolean isSpaceChar(char ch) // 如果ch是空格返回true
      ```

   4. 新特性：JDK1.5 后自动装箱（基本数据类型转对应类）拆箱（类转基本数据类型）

## 反编译、文档生成器、jar 文件

1. `javap` 反编译字节码文件，查看源码类的成员变量和方法，默认为 public 权限，-p 显示所有类和成员
2. `javadoc` 生成源文件类结构的 html 格式文档，-d 可指定文档存放路径
3. `jar` 将多个文档打包为一个文件，可被项目引用

## 继承

1. 继承：子类享有父类的属性和方法，并存在扩展的属性和方法
2. `extends` 关键字，缺省被认为是 java.lang.Object 的子类
3. 别名：
   1. 父类（parent class）基类（base class）超类（super class）
   2. 子类（child class）派生类（derived class）次类（sub class）扩展类（extended class）
4. 继承方式：单继承，多重继承，共同继承，不支持多继承
5. 创建子类对象
   1. 先追溯到初类，自上向下依次执行各自构造方法
   2. 若子类未显式调用父类构造方法，则自动调用无参构造方法，若父类没有无参构造方法或无权限访问则编译出错
6. 继承范围：public 和 protected 一定可以继承，default 要看是否在同一个包内，构造方法不能继承
7. 隐藏父类成员变量
   1. 同名即可隐藏，与类型或是否静态无关
   2. 子类对象优先搜索子类独有空间，再搜索父类空间
8. 重写与隐藏父类方法
   1. 重写条件
      1. 两同：方法名、参数列表相同
      2. 两小：返回值类型、抛出异常类型小于等于父类
      3. 一大：访问权限大于等于父类
   2. 静态方法只能被子类静态方法隐藏，不能重写
   3. 非静态方法不能被子类静态方法重写
9. super 关键字
   1. 在子类构造方法首行，显式调用父类构造方法，其与 `this(参数列表);` 都要求首行故冲突
   2. 引用父类成员，受权限限制

# 第四章 抽象类与接口

## 抽象类

1. 概念：提供一个合适的父类，以派生其他类
2. `abstract` 关键字
3. 包含：变量、常量、构造方法、普通方法、抽象方法
4. 特点
   1. 不能直接实例化对象
   2. 可以声明对象，做上转型对象
   3. 可以有抽象方法，也可以没有
5. 抽象方法：只许声明，不许实现
   1. 不许用 static final private 修饰
   2. 抽象类的所有具体子类必须实现所有抽象方法

## 接口

1. 概念：抽象出重要行为标准，该标准用抽象方法表示
2. `interface` 声明接口，`implements` 声明实现类
3. 包含
   1. 常量、抽象方法
   2. Java8 及以后可创建默认方法（在接口内实现）、静态方法（不能重写）、私有方法（Java9）
   3. 实现多个接口时，若有同名默认方法，必须重写
4. 特点
   1. 必定是 public，被编译为 .class 文件
   2. Java8 之前接口内只有常量和抽象方法
   3. 无构造方法，不能 new
   4. 子接口继承父接口全部属性和方法，可多继承
5. 默认常量定义和抽象方法定义
   1. 变量自动为 public static final
   2. 方法自动为 public abstract
6. 实现类
   1. 抽象类：可以不实现全部方法
   2. 普通类：必须实现全部方法
7. 接口回调
   1. 方式
      1. 上转型对象 `接口名 接口对象名 = new 实现类名();`
      2. 形参为接口类型，实参为实现类的对象的引用
   2. 特点
      1. 仅可调用接口声明的方法
      2. 不可访问实现类的成员变量
8. 函数式接口：能且只能包含 1 个抽象方法
   1. @FunctionalInterface 注解
9. 开闭原则：开放软件功能扩展，封闭原有代码修改

## 函数式编程

1. 概念：函数输出仅依赖于函数本身，不依赖于外部数据（闭包）
2. Lambda 表达式 `(参数)->{表达式/函数体}`
   1. 包含 0 个或多个参数，无参数声明空括号，单个参数可省略括号
   2. 不必标注类型，编译器自动类型推导
   3. 只有一条 return 语句时要加{}
   4. 只对参数结果进行操作时用 `类型::方法` 简化代码

# 第五章 常用类

## Collection Frameworks

1. 集合框架：表示和操作集合的体系结构，包含接口、实现和算法![在这里插入图片描述](https://img-blog.csdnimg.cn/02c5d9eace234faa93f00ff127fbf95f.png#pic_center)
2. 泛型 `<E>`
   1. 设计时不关心具体类型，实现时具体化为某一引用类型
   2. 优点：安全方便
      1. 无须类型强转，提高效率，避免了强转出错
      2. 通配符"?"的使用提高了程序的阅读性
      3. 限制通配符(<? extends T>、<? super T>)提高了程序的健壮性
3. Iterator 接口 `public interface Iterator<E>`
   1. 实现此接口的类对象支持 ForEach 循环，其本身不属于集合框架
   2. 作用：方便遍历和移除集合元素
   3. 常用方法
      1. 创建 `Iterator<引用类型> iterator = 实现类对象.iterator();`
      2. 判断 `iterator.hasNext()`
      3. 后移 `iterator.next()` 先后移再返回前一个位置的对象
      4. 删除 `iterator.remove()`
4. Collection 接口 `public interface Collection<E> extends Iterable<E>`
   1. 继承自 Iterable 接口，支持 ForEach 循环，包含最具通用性的集合操作方法
   2. 常用方法
      1. 长度 `int size();`
      2. 判空 `boolean isEmpty();`
      3. 迭代器 `Iterator<E> iterator();`
      4. 添加
         1. `boolean add(E e);` 添加一个元素，若更改了集合返回 true
         2. `boolean addAll(Collection<? extends E> c);` 添加一个集合
      5. 删除
         1. `boolean remove(Object o);` 删除指定元素
         2. `boolean removeAll(Collection<?> c);` 删除指定集合
         3. `removeIf()` 传入 lambda 表达式构建的规则，底层依赖迭代器实现
      6. 包含
         1. `boolean contains(Object o);` 是否包含指定元素
         2. `boolean containsAll(Collection<?> c);` 是否包含指定集合
      7. 转换 `<T> T[] toArray(T[] a);` 将集合转换为指定类型数组
      8. 清空 `void clear();`
5. List 接口 `public interface List<E> extends Collection<E>`
   1. 有序的，允许包含重复元素（值或引用相同）的集合，扩展了基于位置索引的操作方法
   2. 集合保存对象引用地址，可同时包含多个对同一对象的引用，对集合元素操作时就是在操作实际引用的对象，故在 foreach 内修改即可
   3. 实现类
      1. `java.util.ArrayList<E>` 对象数组
      2. `java.util.LinkedList<E>` 双向链表
   4. 创建：不用指定实现类的类型，会自动推导泛型
      1. ArrayList 对象数组
         1. `List<Integer> integerList = new ArrayList<>();` 创建空对象数组
         2. `List<Integer> integerList = new ArrayList<>(int initialCapacity);` 创建初始长度为 initialCapacity
            的空对象数组，可随添加自动扩容
         3. `List<Integer> integerList = new ArrayList<>(Collection<? extends E> c);` 基于集合创建
      2. LinkedList 双向链表
         1. `List<String> stringList = new LinkedList<>();` 创建空双向链表
         2. `List<String> stringList = new LinkedList<>(Collection<? extends E> c);` 基于集合创建
   5. 常用方法
      1. 添加 `void add(int index, E element);` 指定位置元素后移，插入新元素，不可添加父类对象，可添加子类对象
      2. 删除 `E remove(int index);`
      3. 替换 `E set(int index, E element);`
      4. 访问 `E get(int index);` 可用 ForEach 循环访问
      5. 转换：全部为引用类型
         1. List to Array `Integer[] integers = integerList.toArray(new Integer[0]);` 必须给 0，否则数组长度为传入值，`a[size]=null`
            后续可能抛出空指针异常
         2. Array to List `List<Integer> integerList = Arrays.asList(integers);` 适配器模式方法，仅转换了类型，底层仍是数组，故执行任何修改集合长度方法(
            增/删)，抛出异常
   6. 异常：在 for/foreach 改变集合长度（增/删）会产生 ConcurrentModificationException 异常或其他错误
      1. Java8 以前用迭代器
      2. Java8 以后基于 stream 流，结合 Lambda 表达式实现
6. Set 接口 `public interface Set<E> extends Collection<E>`
   1. 不含重复元素的集合，所有方法均继承自 Collection 接口，没有基于索引操作等扩展方法
   2. 实现类
      1. `java.util.HashSet<E>` 元素无序，遍历时无序输出，底层基于 HashMap 确定元素是否重复，可通过重写 hashCode 和 equals 方法自定义判断规则，先判断 hashCode
         返回值，若相同则判断 equals 返回值，String 类已重写 hashCode 和 equals 方法，均基于字符串内容判断而不是对象
      2. `java.util.LinkedHashSet<E>` 元素有序
      3. `java.util.TreeSet <E>` 元素有序
   3. 创建
      1. HashSet
         1. `Set<Integer> integerSet = new HashSet<>();` 创建空集合
         2. `Set<Integer> integerSet = new HashSet<>(int initialCapacity);` 创建初始大小为 initialCapacity 的空集合，可随添加自动扩容
         3. `Set<Integer> integerSet = new HashSet(Collection<? extends E> c);` 基于集合创建
      2. LinkedHashSet `Set<Integer> integerSet = new LinkedHashSet<>();`
      3. TreeSet `Set<Integer> integerSet = new TreeSet<>();`
7. Map 接口 `public interface Map<K,V>` **不继承自 Collection 接口，不是集合**
   1. 存放键值对，key 与 value 的类型为引用类型，通过 hash 值判断 key 是否相同（普通对象根据是否是同一个对象判断，8 种基本数据类型和 String 类型根据具体值是否相同判断）
   2. 实现类
      1. `java.util.HashMap<K, V>` 查询效率与内存占用最平衡，非线程安全，通过单向链表或红黑树处理哈希冲突
      2. `java.util.TreeMap <K, V>` 线程安全
      3. `java.util.HashTable<K, V>` 线程安全
   3. 创建
      1. `Map<Integer, Integer> integerMap = new HashMap<>();`
      2. `Map<String, String> stringMap = new TreeMap<>();`
   4. 常用方法
      1. 长度 `int size();`
      2. 判空 `boolean isEmpty()`
      3. 添加
         1. `V put(K key, V value)` 添加一个键值对，若存在则替换为新 value 并返回
         2. `void putAll(Map<? extends K, ? extends V> m)` 基于指定 map 添加，存在则替换
      4. 删除 `V remove(Object key)`
      5. 包含
         1. `boolean containsKey(Object key)`
         2. `boolean containsValue(Object value)`
      6. 访问
         1. `V get(Object key)` 不存在返回 null
         2. `V getOrDefault(Object key, V defaultValue)` 不存在返回默认值 defaultValue
      7. 清空 `void clear()`
      8. 转换
         1. 键集合 `Set<K> keySet()`
         2. 值集合 `Collection<V> values()`

## Functional Programming

1. 基本概念
   1. 函数式编程：一种构建程序结构的编程范式，一种程序设计思想，与面向对象程序设计完全不同，完全闭包，不可使用外部变量，可使用实际或**逻辑**上的 finall 量
   2. 函数式接口：仅包含一个函数，其目的是便于动态实现并调用该函数，不再由具体实现类来实现，实际为接口变量指向一个函数，通过传递该接口变量实现调用
2. stream 接口 `public interface Stream<T> extends BaseStream<T, Stream<T>>`

   1. 集合是容器，stream 是操作集合元素的管道，会创建新集合保存操作结果，不影响原集合结构，通过 Collection 接口的 stream 方法获取流对象
   2. 单个函数仅操作一次，多个函数序列会被优化处理顺序从而提高效率
   3. 包括：Intermediate Operations 中间操作、Terminal Operations 终止操作
   4. 中间操作：返回新的 stream 后续基于新的流操作

      1. 过滤 `Stream<T> filter(Predicate<? super T> predicate);` 传入 Lambda 表达式描述的 boolean 类型表达式，若有多个条件可拆分为多个 filter 语句
      2. 映射 `<R> Stream<R> map(Function<? super T, ? extends R> mapper);` 基于条件把元素映射为新类型元素
      3. 排序：Collections.sort 是在原集合排序，而流式操作不影响原集合结构

         1. `Stream<T> sorted();` 自然排序
         2. `Stream<T> sorted(Comparator<? super T> comparator);` 传入比较器

            1. Comparator 接口静态方法 comparing `.sorted(Comparator.comparing(形参 -> 形参.获取排序关键字函数());`
            2. Comparator 接口实现 compare 这个“唯一”的抽象方法，返回正整数：o1>o2，返回 0：o1=o2，返回负整数：o1<o2

               1. 匿名类

                  ```java
                  .sorted(new Comparator<A>() {
                      @Override
                      public int compare(类名 形参1, 类名 形参2) {
                          return 形参1.获取排序关键字函数() < 形参2.获取排序关键字函数() ? -1 : 形参1.获取排序关键字函数() == 形参2.获取排序关键字函数() ? 0 : 1;
                      }
                  });
                  ```

               2. lambda 表达式
                  `.sorted((o1, o2) -> 形参1.获取排序关键字函数() < 形参2.获取排序关键字函数() ? -1 : 形参1.获取排序关键字函数() == 形参2.获取排序关键字函数() ? 0 : 1);`

            3. `Comparator<T> reversed()` 倒序
            4. Comparator 接口
               1. 除 compare 外还有 equals 这个重写 Object 方法的抽象方法，但是不影响其是一个函数式接口，具体参照 `@FunctionalInterface` 的注释
               2. 由此引出关于接口是否继承自 object 类，众说纷纭，我偏向一种通过实现类的逻辑继承
               3. [深入理解比较器请参照](https://blog.csdn.net/qq_31635851/article/details/120286722)

      4. 截取（Java9）
         1. `Stream<T> takeWhile(Predicate<? super T> predicate)` 从头选取，直到符合为止
         2. `Stream<T> dropWhile(Predicate<? super T> predicate)` 直到符合才开始选取
      5. 合并多层映射 `<R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper);`

   5. 终止操作
      1. 计数 `long count();`
      2. 迭代
         1. `void forEach(Consumer<? super T> action);` 集合流，传入 Lambda 表达式描述的处理函数，
         2. `void forEach(BiConsumer<? super K, ? super V> action);` map 接口的默认方法
      3. 聚合 `<R, A> R collect(Collector<? super T, A, R> collector);` 传入收集器，可通过 `java.util.stream.Collectors` 工具类转换集合类型
         1. list `Collector<T, ?, List<T>> toList()` 返回 `List<T>`
         2. set `Collector<T, ?, Set<T>> toSet()` 返回 `Set<T>`
         3. map
            1. `Collector<T, ?, Map<K,U>> toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper)`
               自定义 K，V 类型，返回 `Map<K, V>`
            2. `<T, K> Collector<T, ?, Map<K, List<T>>> groupingBy(Function<? super T, ? extends K> classifier)` 自定义
               K 类型，返回 `Map<K, List<T>>`
      4. 选取
         1. `Optional<T> findFirst();` 封装第一个符合条件的元素为 Optional
         2. `Optional<T> findAny();` 封装任意一个符合条件的元素为 Optional
      5. 判断
         1. `boolean anyMatch(Predicate<? super T> predicate);` 任一元素符合返回 true
         2. `boolean allMatch(Predicate<? super T> predicate);` 全部元素符合返回 true

## Optional

1. Optional 类：封装单值元素的容器，作为库或工具方法使用，解决空指针异常，不应作为类内属性，不建议作为方法的参数或返回类型
2. 创建
   1. `Optional<A> optional = Optional.ofNullable(new A());` 基于可能为空对象创建 optional 容器
   2. `Optional<A> optional = Optional.of(new A());` 基于必不为空对象创建 optional 容器，注入空对象将抛出 NullPointerException 异常
3. 操作
   1. `void ifPresent(Consumer<? super T> consumer)` 非空时执行指定函数，为空忽略，仅检测当前对象，嵌套对象仍可能为空
   2. `void ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction)`（Java9）非空执行第一个函数，为空执行第二个
4. 中间操作：返回新的 Optional 后续基于新的容器操作
   1. `Optional<T> filter(Predicate<? super T> predicate)` 无论过滤后是否为空容器，均返回
   2. `<U> Optional<U> map(Function<? super T, ? extends U> mapper)` 为空返回同类型空容器，否则返回装有映射结果的新容器
   3. `Optional<T> or(Supplier<? extends Optional<? extends T>> supplier)`（java9）为空执行函数，函数必须返回一个相同类型的容器或空容器
5. 终止操作：返回容器内的对象
   1. `T orElse(T other)` 为空返回 other
   2. `T orElseGet(Supplier<? extends T> other)` 为空通过 lambda 描述的函数返回相同类型对象
   3. `T get()` 为空抛 NoSuchElementException 异常
6. 判空
   1. `boolean isEmpty()`（Java11）？？
   2. `boolean isPresent()`

# 第六章 异常处理

1. 程序错误：编译错误、运行错误、逻辑错误
2. Throwable 类
   1. 子类
      1. Error：错误，Java 虚拟机无法解决的严重问题，一般不编写针对性代码处理，由系统处理，常与硬件有关
         1. 内存或栈溢出
         2. 虚拟机错误
      2. Exception：异常，程序运行时可被捕获并处理
         1. RuntimeException 类及其子类，非受检异常，运行时异常，编译器不检查，不必须处理，多由逻辑错误引起
            1. 空引用
            2. 数组越界
         2. 其他异常，受检异常，非运行时异常，必须处理，否则编译不通过
            1. java.io.IOExeption
               1. FileNotFoundException
               2. EOFException
            2. java.lang.ClassNotFoundException
            3. java.lang.InterruptedException
            4. java.sql.SQLException
   2. 常用方法
      1. `Throwable getCause()` 返回异常原因，未知返回 null
      2. `String getMessage()` 返回异常的消息信息
      3. `void printStackTrace()` 输出异常名、异常信息、堆栈信息
      4. `String toString()` 返回简单异常信息
3. 异常处理
   1. try-catch-finally 可以嵌套
      1. try 包裹可能产生异常语句
      2. catch 处理异常
      3. finally 无论是否有异常必须执行的语句，即使 catch 中有 return 也会被执行
   2. throw 手动抛出异常，需是 Throwable 及其子类的实例
   3. throws 声明方法抛出的异常列表
      1. 将异常抛给上一级处理，直到 main
      2. 重写时不能抛出范围更大的异常
4. 自定义异常类是 Throwable 或 Exception 的子类

# 第七章 多线程

## 线程

1. 基本概念
   1. 程序：静态代码
   2. 进程：程序动态执行过程，系统进行资源分配和调度的基本单位
   3. 线程：进程的一个执行路径，所有线程共享进程资源
2. 创建进程

   1. 继承 Thread 类 `class Thread implements Runnable`
      1. `class MyThread extends Thread`
      2. 重写 run 方法
      3. 添加带参构造方法，调用 `super(name)` 设置线程名
      4. 创建线程对象 `MyThread thread = new MyThread(threadName)`
      5. 编写简单，可添加变量方法扩展线程类的功能，不能继承其他类
   2. 实现 Runnable 接口 `interface Runnable`
      1. `class MyThread implements Runnable`
      2. 实现 run 方法
      3. 创建线程对象 `MyThread myThread = new MyThread(); Thread thread= new Thread(myThread, threadName);`
      4. 可实现多继承，多个线程共享变量
   3. 实现 Callable 接口，FutureTask 类包装 `interface Callable<V>` `class FutureTask<V> implements RunnableFuture<V>`
      1. `class MyThread implements Callable<返回值的引用类型>`
      2. 重写 call 方法，带有返回值 `返回值的引用类型 call() throws Exception`
      3. 创建线程对象 `MyThread myThread = new MyThread(); FutureTask<返回值的引用类型> futureTask = new FutureTask<>(myThread); Thread thread = new Thread(futureTask, threadName);`
      4. 获取返回值 `futureTask.get()`
      5. 可获取返回值
   4. 匿名类与 lambda 表达式

      1. 不单独创建 MyThread 类
      2. 匿名类

         ```java
         new Thread() {
             @Override
             public void run() {
             }
         };
         ```

         ```java
         new Thread(new Runnable() {
             @Override
             public void run() {
             }
         });
         ```

      3. lambda 表达式 `new Thread(() -> {});`

3. Thread 类
   1. 静态方法
      1. 获取当前进程对象 `Thread currentThread();`
      2. 让步 `void yield();` 使线程回到就绪状态一次，但依旧可能被立刻再次执行
      3. 休眠 `void sleep(long millis) throws InterruptedException;` 休眠 millis 毫秒，会自动唤醒到就绪状态，不释放锁
   2. 实例方法
      1. 获取线程信息
         1. 线程标识符 `long getId()`
         2. 线程名 `String getName()`
         3. 线程优先级 `int getPriority()` 只是在 Java 虚拟机中优先级高，仅作参考意义
      2. 启动线程 `void start()`
         1. 转为就绪状态，获得 CPU 时间片后再开始运行 run 方法
         2. 只能启动一次，否则抛出异常
      3. 等待 `void join()` 阻塞调用此方法的线程，直到 thread 完成，常用在 main 主线程
4. Object 类挂起/唤醒方法
   1. `void wait() throws InterruptedException` 挂起本线程，释放锁，必须等待唤醒
   2. `void notify();` 随机唤醒一个挂起线程
   3. `void notifyAll();` 唤醒所有相关挂起线程

## 同步

1. volatile 关键字
   1. 线程对内存数据更改后立刻刷新到内存，并强制所有缓存了该数据的线程清空，以便重新从内存获取数据
   2. 存在原子性问题 `a+=1;`
2. synchronized 关键字
   1. 自动获取与释放锁
   2. 普通同步方法（实例方法）锁是当前实例对象，进入同步代码前要获得当前实例的锁
   3. 静态同步方法（类方法）锁是当前类的 class 对象，进入同步代码前要获得当前类对象的锁
   4. 同步方法块，锁是括号里面的对象（常用 this 或类内创建的 object 对象），对给定对象加锁，进入同步代码库前要获得给定对象的锁
3. Lock 接口 ReentrantLock 实现类

   1. 创建锁对象 `ReentrantLock reentrantLock = new ReentrantLock();`
   2. 实现锁

      ```java
      reentrantLock.lock();
      try {
      } finally {
          reentrantLock.unlock();
      }
      ```

## 线程池

1. 减少线程无限制创建与销毁浪费资源，提高线程可复用性
2. ThreadPoolExecutor 类构造方法参数
   1. `int corePoolSize` 核心线程数，不被销毁
   2. `int maximumPoolSize` 线程总数 = 核心线程数 + 非核心线程数
   3. `long keepAliveTime` 非核心线程最大闲置时间
   4. `TimeUnit unit long keepAliveTime` 单位
   5. `BlockingQueue<Runnable> workQueue` 等待队列
   6. `ThreadFactory threadFactory` 创建非核心线程的参数
   7. `RejectedExecutionHandler handler` 用于抛出异常
3. Executors 类
   1. 创建
      1. `Executors.newSingleThreadExecutor();` 创建单一线程池
      2. `Executors.newFixedThreadPool(10);` 创建固定数量线程池
      3. `Executors.newCachedThreadPool();` 创建带缓存线程池
      4. `Executors.newScheduledThreadPool(12);` 创建定时间调度线程池
      5. `Executors.newWorkStealingPool();` 创建流式线程池
   2. 应用
      1. `ExecutorService executorService = Executors.newFixedThreadPool(10);` `executorService.submit(() -> {});`

# 第八章 输入输出

## I/O 流

1. 基本概念
   1. I/O：输入源与输出目标
   2. I/O 流：对不同输入输出流的抽象，固定一套统一的操作方式
   3. 文件以 byte（0~255） 保存和传输，字符 char 占字节数与编码有关，英文 1byte、中文 2byte-GBK 3byte-UTF-8
2. java.io.InputStream/OutputStream 抽象类，以字节方式操作二进制数据
   1. int read() throws IOException 抽象方法，返回流中下一字节的十进制表示，无字节返回-1
   2. int read(byte[] b) 实例方法，按字节读取输入流数据到 b 数组，返回读取的字节数组的长度或-1
   3. long transferTo(out) throws IOExecption Java9 InputStream 类的实例方法，直接将输入流传递至输出流，返回总字节长度，默认使用 8192 长度 byte 数组
   4. byte[] readAllBytes​() throws IOException Java9 InputStream 类的实例方法，直接将输入流中所有字节读入到字节数组，不适用于大量数据，配合 String
      类基于字节数组的构造函数 `String(byte bytes[], Charset charset)` 保存为字符串
   5. void write(int b) throws IOException 抽象方法，将十进制数按字节写入输出流
   6. void write(byte[] b, int off, int len) 实例方法，将 `b[off]~b[off + len - 1]` 写入输出流，共 len 长
   7. 子类 ByteArrayInputStream/ByteArrayOutputStream，FileInputStream/FileOutputStream
3. FileInputStream 类
   1. 创建
      1. `FileInputStream in = new FileInputStream("d:/in.txt");`
      2. `FileOutputStream out = new FileOutputStream("d:/out.txt");`
      3. 抛出 java.io.FileNotFoundException 异常
   2. 关闭
      1. 所有 I/O 流不会因失去引用而自动释放内存，必须正确关闭，以防内存溢出，无论是否有异常
      2. `in.close();` `out.close();`
      3. 抛出 java.io.IOException 异常
      4. 自动关闭资源 try-with-resources 语句（Java7）
         1. try 语句声明需要关闭的资源（必须实现 java.lang.AutoCloseable 接口或子接口如：java.io.Closeable），将在执行完 try 块后自动关闭，无论是否发生异常
         2. 执行顺序：try-close(-catch)-finally
         3. Java9 简化：可在 try 以外创建，仅需在 try 语句内声明即可 `try (in; out)`
4. java.io.Reader/Writer 读写字符
   1. InputStreamReader/OutputStreamWriter 封装了 InputStream/OutputStream 处理字符流
   2. BufferedReader/BufferedWriter 封装了 InputStreamReader/OutputStreamWriter 处理字符流

## File

1. 基本概念
   1. 文件系统：在某种形式的介质上存储和组织文件，以便于检索，均以树型或分层结构存储文件
   2. Linux：/home/sally/statusReport Windows：C:\home\sally\statusReport 或 C:/home/sally/statusReport
   3. 绝对/相对路径：D:/test/a.txt，a.txt，相对路径最终也必须基于绝对路径描述
2. java.io.File 类，耦合了文件路径声明和文件操作方法，同步阻塞，无基于运行系统自动转换路径
3. java.nio.file.Path/Files 分离文件路径与文件操作，异步非阻塞
   1. Path 接口，表示一个不依赖于系统的绝对/相对的文件/目录的路径，也可用于网页
      1. 创建
         1. Paths 工具类静态方法 `Path get(String path)`
         2. Path 接口静态方法 `Path of(String path)`
      2. 常用方法
         1. `Path getFileName()` 返回文件名或名称元素序列的最后一个元素，即最后一个路径描述，无多余斜杠
         2. `Path getParent()` 返回父目录的路径，即除了最后一个路径描述的剩余部分，无多余斜杠
         3. `Path getRoot()` 返回路径的根，有`\`
         4. `Path resolve(Path other)` 拼接路径，
         5. 重写了 `equals()` 根据路径比较
      3. 相对路径不能以`/`开始
   2. Files 工具类，提供静态方法，读取/写入/操作文件与目录
      1. 常用方法
         1. 检查
            1. `boolean exists/notExists(Path path)` Path 路径是否存在
            2. `boolean isDirectory(Path path)` path 是否为目录，非文件
         2. 创建
            1. `Path createDirectory(Path dir) throws IOException` 创建最终级目录，目录已存在或父级未创建抛异常
            2. `Path createDirectories(Path dir) throws IOException` 自动创建多级不存在目录，目录已存在无异常，dir 不是目录抛异常
            3. `Path createFile(Path path) throws IOException` 基于指定路径创建文件。同名文件已存在抛异常，通常先用 `createDirectories(path.getParent)` 创建目录
         3. 复制
            1. `Path copy(Path source, Path target, CopyOption... options) throws IOException` 将文件复制到目标文件，同名文件已经存在抛异常，可通过参数选择改变策略
            2. `Path move(Path source, Path target, CopyOption... options) throws IOException` 将文件移动或重命名为目标文件，目标文件存在抛异常，若目录相同则改名，可通过参数选择改变策略
         4. 删除
            1. `void delete(Path path) throws IOException` 删除指定路径，路径不存在或非空目录抛异常
            2. `boolean deleteIfExists(Path path) throws IOException` 路径不存在则不删除，返回是否删除成功，非空目录抛异常
         5. 遍历
            1. `Stream<Path> walk(Path start) throws IOException` 遍历路径下的所有目录和文件
            2. `Stream<Path> walk(Path start, int maxDepth) throws IOException` 基于指定深度遍历
            3. 检索 `.filter(p -> p.getFileName().equals(file))`
            4. 全删 `.sorted(Comparator.reverseOrder())`
         6. 读取
            1. `String Files.readString(path, charset) throws IOException` 基于指定路径及字符集读取文本文件
