---
title: 'Draft'
summary: Draft markdown
date: 2024-07-20T01:01:39+08:00
categories: 草稿
draft: true
---



# 第一章 计算机系统结构基本概念

$$
\begin{aligned}
& P(s|f_s,f_d,p,o)=softmax(W_e(f_s+W_{sd}f_d)+pW_so) \\
& P(p|f_p,f_d,s,o)=sigmoid(W_r(f_p+W_{pd}f_d)+sW_po) \\
& P(o|f_o,f_d,s,p)=softmax(W_e(f_o+W_{od}f_d)+sW_op)
\end{aligned}
$$
> 课程内容 A I P S N
>
> 工业革命

## 1.1 计算机系统结构的概念

$$P(<s,p,o>\mid f_s,f_{pv},f_o,f_{rp},f_d)$$
你好
$$
\begin{aligned}
    & P(s|f_s,f_d,p,o)=softmax(W_e(f_s+W_{sd}f_d)+pW_so) \\\\
    & P(p|f_p,f_d,s,o)=sigmoid(W_r(f_p+W_{pd}f_d)+sW_po) \\\\
    & P(o|f_o,f_d,s,p)=softmax(W_e(f_o+W_{od}f_d)+sW_op)
\end{aligned}
$$

你好$ab=123$ 这是行内公式

$$ab=123$$这是行间公式

引言

- 第一台通用计算机 1946
- 两个方面：制造技术、体系结构
- 计算机系统结构：architecture
  - 程序员所看到的计算机属性，即概念性结构与功能特性
  - 指令系统结构、组成、硬件
  - 计算机系统结构是程序员所看到的计算机属性，即（硬件子系统的）概念结构及其功能特性，是计算机软硬件的交界面
  - 计算机系统的软、硬件的界面，即机器语言程序员所看到的传统机器级所具有的属性
  - 实质：确定软硬件界面
- 计算机组成：计算机系统结构的逻辑实现
- 研究任务：软硬件功能分配、软硬件界面的确定
- 系列机：相同系统结构，不同组成和实现

层次结构

- 计算机系统 = 硬件/固件 + 软件
  - 固件：具有软件功能的硬件
- 计算机语言角度：把计算机系统按功能划分成多级层次结构，每一层以一种语言为特征
  - 物理机: 由硬件/固件实现
  - 虚拟机：由软件实现，某些操作可以由硬件或固件实现
  - 低层机器属性对高层机器程序员透明
- 机器级的实现：翻译、解释（慢，占用内存少）

分类

- Flynn分类法
  - 分类标准：指令流和数据流的多倍性
    - 多倍性：在系统最受限的部件上，同时处于同一执行阶段的指令或数据的最大数目
  - SISD
  - SIMD
  - MISD
  - MIMD
  - 基本结构
    - IS：指令流
    - DS：数据流
    - CS：控制流
    - CU：控制部件
    - PU：处理部件
    - MM、SM：存储器

![在这里插入图片描述](https://img-blog.csdnimg.cn/563789cba8fd45328fe75a8cf0ecb77a.png#pic_center)

- 冯氏分类法
  - 分类标准：最大并行度
    - 最大并行度：计算机系统在单位时间内能够处理的最大的二进制位数（字宽*字数）
    - 平均并行度：取决于系统的运用程度，与应用程序有关
      - 每个时钟周期同时处理的二进制位数为 Pi，T 个时钟周期
        - 平均并行度 $P_{a}=\frac{\sum_{i=1}^{T} P_{i}}{T}$
        - 平均利用率 $\mu=\frac{P_{a}}{P_{m}}=\frac{\sum_{i=1}^{T} P_{i}}{T P_{m}}$
  - 字串位串：n＝1，m＝1 每次只对一个字的一位进行处理，第一代计算机
  - 字串位并：n＞1，m＝1 同时处理单个字的多个位，单处理机，如16位、32位等
  - 字并位串：n＝1，m＞1 同时处理多个字的同一位（位片）
  - 字并位并：n＞1，m＞1 同时处理多个字的多个位

- Handler分类法
  - 分类标准：并行度和流水线
  - t(系统型号) = (k,d,w)
    - k：程序控制部件（PCU）的个数
    - d：算术逻辑部件（ALU）或处理部件（PE）的个数
    - w：每个算术逻辑部件包含基本逻辑线路(ELC)的套数
  - t(系统型号) = (k*k',d*d',w*w')
    - k'：宏流水线中程序控制部件的个数
    - d'：指令流水线中算术逻辑部件的个数
    - w'：操作流水线中基本逻辑线路的套数

## 1.2 计算机体系结构的发展

存储程序计算机体系结构及其发展

- 存储程序原理基本点：指令驱动
- 冯·诺依曼结构
  - 运算器为中心
  - 指令和数据同等对待
  - 存储器是按地址访问
  - 指令的执行是顺序的
  - 指令由操作码和地址码组成
  - 指令和数据均以二进制编码表示，采用二进制运算
- 非诺依曼体系结构
  - 数据驱动
  - 诺依曼瓶颈：中央处理器（ CPU ）和主存之间只有一条每次只能交换一个字的数据通路
  - 优点
    - 支持高度的并行操作
    - VLSI技术
    - 提高软件生产能力
  - 缺点
    - 操作开销过大
    - 不能有效地利用传统诺依曼体系结构计算机已积累起来的丰富的软件资源
- 系统结构改进
  - 输入/输出方式
    - 程序控制：等待、中断
    - DMA：成组传递、周期挪用
    - I/O处理机：通道、外围处理机
  - 并行处理技术
  - 存储器组织结构的发展
  - 指令系统的发展
    - 复杂指令集计算机CISC
    - 精减指令集计算机RISC

软件影响：可移植性

- 统一高级语言
- 系列机：同一厂家、相同系统结构、不同组成和实现
  - 向上（下）兼容
  - 向前（后）兼容：
    - 向后兼容：系列机的根本特征
  - 兼容机：不同厂家、相同系统结构
- 模拟和仿真
  - 在一种系统结构上实现另一种系统结构
  - 在一种机器上实现另一种机器的指令集
  - 模拟：虚拟机
    - 解释实现，速度较慢
  - 仿真：目标机
    - 比模拟快，系统结构差距不大

![在这里插入图片描述](https://img-blog.csdnimg.cn/6ff9eb37969a40819bb6615b0a428678.png#pic_center)

器件影响

- 系统结构发展的最活跃因素：
- 摩尔定律：集成电路芯片上所集成的晶体管数目每隔18个月就翻一番

应用影响

- 系统结构发展的最根本的动力：应用需求
- 特殊领域需要高性能的系统结构

## 1.3 系统结构中并行性的发展

并行性

- 概念：计算机系统在同一时刻或者同一时间间隔内进行多种运算或操作
  - 同时性：同一时刻
  - 并发性：同一时间间隔
- 并行性等级，由低到高
  - 数据处理
    - 字串位串：每次只对一个字的一位进行处理
    - 字串位并：同时处理单个字的多个位
    - 字并位串：同时处理多个字的同一位（位片）
    - 字并位并（全并行）：同时处理多个字的多个位
  - 执行程序
    - 指令内部并行：单条指令中各微操作之间的并行
    - 指令级并行：并行执行两条或两条以上的指令
    - 线程级并行：并行执行两个或两个以上的线程
    - 任务级或过程级并行：并行执行两个或两个以上的过程或任务（子程序/进程）
    - 作业或程序级并行：并行执行两个或两个以上的作业或程序
- 提高并行性技术途径
  - 时间重叠：处理过程错开，加快硬件周转
  - 资源重复：重复设置硬件资源
  - 资源共享：软件方法，顺序轮流使用同一套硬件设备
- 单机系统的并行性
  - 时间重叠：主导作用，部件功能专用化
  - 资源重复：多体存储器，多操作部件（指令级并行），阵列处理机
  - 资源共享：虚拟机，分时系统
- 多机系统的并行性
  - 分类：同构型多处理机、异构型多处理机、分布式系统
  - 耦合度：多机系统中各机器之间物理连接的紧密程度和交互作用能力的强弱
    - 紧密耦合系统（直接耦合系统）：总线或高速开关互连，共享主存
    - 松散耦合系统（间接耦合系统）：通道或通信线路互连，共享外存
    - 最低耦合：除某种中间介质外，无连接无共享
  - 功能专用化（时间重叠、异构型多处理机）
  - 机间互连（同构型多处理机系统）
- 并行机的发展
  - 并行机的萌芽阶段（1964年～1975年）
  - 向量机的发展和鼎盛阶段（1976年～1990年）
  - MPP出现和蓬勃发展阶段（1990年～1995年）
  - 各种体系结构并存阶段（1995年～2000年）
  - 机群蓬勃发展阶段（2000年以后）

## 1.4 系统结构的设计

任务

- 指令系统的设计、数据表示的设计、功能的组织、逻辑设计以及其物理实现等
- 三个方面
  - 确定用户对计算机系统的功能、价格和性能的要求
  - 软硬件功能分配（平衡）
  - 设计出生命周期长的系统结构（符合发展方向）

主要方法

- “由上往下”（top-down）设计
  - 适合于专用机的设计，而不适合通用机的设计
- “由下往上”（bottom-up）设计
  - 软件技术为被动状态，软硬件脱节，系统效率降低
  - 现在很少使用
- “从中间开始”（middle-out）设计
  - 中间：软硬件的交界面

程序局部性原理

- 时间局部性：即将用到的信息很可能就是目前正在使用的信息
- 空间局部性：即将用到的信息很可能与目前正在使用的信息在空间上相邻或者临近

设计准则

- 以经常性事件为重点（大概率事件优先原则）
  - 优化：分配更多资源

Amdahl 定律

- 系统加速比 $S_n$ ：> 1；改进前与改进后总执行时间之比 $S_n=\frac{T_0}{T_n}=\frac{1}{1-F_e+\frac{F_e}{S_e}}$
  - 可改进比例 $F_e$ ：< 1；改进前，可改进部分执行时间在总执行时间中的占比
  - 部件加速比 $S_e$ ：> 1；可改进部分改进后性能提高的倍数。改进前执行时间与改进后执行时间的比
  - 改进后程序的总执行时间 $T_n$ ：$T_0=(1-F_e+\frac{F_e}{S_e})$
    - $T_0$ 改进前总执行时间
- 如果只对整个任务的一部分做改进，则改进得越多，所得到的总体性能提升就越有限
  - 如果只对整个任务的一部分做改进，则加速比不超过 $\frac{1}{1-F_e}$

![在这里插入图片描述](https://img-blog.csdnimg.cn/5df1450b60d345348a281959d844572b.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/4b7ea219ddcb462aa57e2d46c027f84d.png#pic_center)

## 1.5 定量分析技术基础

性能评测

- 执行时间、吞吐率
- 用户：执行时间（单个程序所花的时间）
- 数据中心管理员：吞吐率（单位时间里能够完成的任务）
- CPU时间
  - CPU执行所给定的程序所花费的时间，不包含I/O等待时间以及运行其它程序的时间
  - 用户CPU时间：用户程序所耗费的CPU时间
  - 系统CPU时间：用户程序运行期间操作系统耗费的CPU时间

基准测试程序

- 最佳选择：真实应用程序
- 简化程序：不可靠
  - 核心测试程序：真实程序的关键代码段
  - 小测试程序：100行以内的小程序
  - 合成的测试程序：按比例合成
- 基准测试程序套件：真实应用程序构成
  - 分类：处理器性能测试程序，图形性能测试程序
  - SPEC系列

评价标准

- 主要性能指标
  - MIPS：每秒百万指令数
    - $MIPS = \frac{CI}{执行时间 \times 10^6} =\frac{1}{CPI \times T \times 10^6} = \frac{f}{CPI \times 10^6}$
  - MFLOPS：每秒百万浮点指令数
    - $MFLOPS = \frac{浮点操作次数}{执行时间 \times 10^6}$
  - 执行时间
    - 总执行时间：执行所有程序时间的加和
    - （加权）平均执行时间：各个测试程序的算术/加权平均值
    - 调和平均值法
      - 加权调和平均值公式
    - 几何平均值法
      - 加权几何平均值

CPU性能

- CPU时间：执行一个程序所需的CPU时间
  - CPU时间 = 执行程序所需的时钟周期数 × 时钟周期时间（系统时钟频率的倒数）
  - CPU时间 = IC × CPI × 时钟周期时间
  - 时钟周期时间：硬件实现、计算机组成
  - CPI：计算机组成、指令系统结构
  - IC：指令系统结构、编译技术
  - 计算机系统有 n 种指令
    - 时钟周期数 = $\sum_{i=1}^{n}(CPI_i \times IC_i)$
    - CPU时间 = $\sum_{i=1}^{n}(CPI_i \times IC_i)$ × 时钟周期时间
    - $CPI = \frac{\sum_{i=1}^{n}(CPI_i \times IC_i)}{IC} = \sum_{i=1}^{n}(CPI_i \times \frac{IC_i}{IC})$
- CPI：指令执行的平均时钟周期数
  - CPI = 执行程序所需的时钟周期数 / IC
- IC：执行的指令条数

@[TOC]

更新时间：2023.7.17

# 一、基础知识

# 二、专题整理

## 1.数组排序

### 冒泡排序

```c
// 数组x[N],中间变量t要与数组类型一致
for (int i = 1; i < N; i++)
{
    int flag = 0;
    for (int j = 0; j < N - i; j++)
    {
        if (x[j] > x[j + 1]) // 从小到大排序
        {
            t = x[j], x[j] = x[j + 1], x[j + 1] = t;
            flag = 1;
        }
    }
    if (flag == 0)
        break;
}
```

### 选择排序

```c
// 数组x[N],中间变量t要与数组类型一致
for (int i = 0; i < N - 1; i++)
{
    int k = i;
    for (int j = i + 1; j < N; j++)
    {
        if (x[j] < x[k]) // 从小到大排序
            k = j;
    }
    if (k != i)
        t = x[k], x[k] = x[i], x[i] = t;
}
```

# 三、错题整理

1. 有一个长度 ≤10 且只包含大写字母的单词。我们在写作时不小心把它写错了，写错的单词与正确的单词中每种字母的个数相同，那么有多少种不同的写错的单词呢？

   Input
   输入一行字符串，长度 $\le10$ 且只包含大写字母
   Output
   输出一个整数，即答案
   Sample Input
   EYE
   ZZZZZZZZ
   ACCEPT
   Sample Output
   2
   0
   359
   Hint
   写错的单词有两种：YEE、EEY

   ```c
   #include <stdio.h>
   #include <string.h>
   int main()
   {
       int a[100] = {0}, sum, sum1;
       char s[10];
       sum = sum1 = 1;
       gets(s);
       for (int i = 0; i < strlen(s); i++)
       {
           a[s[i]]++; // 用角标标记各个字母
           sum *= i + 1;
       }
       for (int i = 0; i < 100; i++)
       {
           if (a[i] >= 2)
           {
               for (int j = 1; j <= a[i]; j++)
                   sum1 *= j;
           }
       }
       printf("%d", sum / sum1 - 1);
       return 0;
   }
   ```

2. 现在你有一个包含N个正整数的数组Array，你只知道数组中的最小值是MIN，最大值是MAX，那么∑ ^N^~i=1~{Array[i]}有多少种不同的结果？
   Input
   输入三个正整数N,MIN,MAX
   1<=N<=10^9^,1<=MIN<=MAX<=10^9^
   Output
   输出一个正整数，即答案

   Sample Input
   2 5 6
   10000000 100 100
   1 100000 100000
   3 1 3

   Sample Output
   1
   1
   1
   3

   ```c
   #include <stdio.h>
   int main()
   {
       long long n, min, max;
       scanf("%lld%lld%lld", &n, &min, &max);
       printf("%lld", (n - 2) * max - (n - 2) * min + 1);
       return 0;
   }
   ```

3. 我们定义 $\varphi (x)$ 为x的因子个数，那么 $\varphi (1) = 1$，$\varphi (9) = 3$。如果 $\varphi (x) = 3$，那么我们就认为x是一个有趣的数，因此9是一个有趣的数。
   给定一个闭区间[1, N]，请你计算：在这个闭区间内有多少个有趣的数？
   输入描述:
   输入一个正整数N
   $1 \le N \le 10^{12}$
   输出描述:
   输出一个整数，即答案

   示例1
   输入
   10
   输出
   2
   说明
   [1, 10]内有两个有趣的数：4、9

   ```c
   #include <stdio.h>
   int main()
   {
       long long i, j, n, sum = 0;
       scanf("%lld", &n);
       for (i = 2; i * i <= n; i++)
       {
           for (j = 2; j * j <= i; j++)
           {
               if (i % j == 0)
                   break;
           }
           if (j * j > i)
               sum++;
       }
       printf("%lld", sum);
       return 0;
   }
   ```

4. 现在你有N堆硬币，每堆硬币中都有N枚硬币。其中N-1堆硬币中每枚硬币的重量都为1g，只有剩下的一堆硬币中每枚硬币的重量为2g，但你并不知道哪堆硬币中的硬币重量为2g。
   你有一个能称任意重量的电子秤，在最优策略下，请问最多需要称多少次就能知道哪堆硬币中的硬币重量为2g？（可以把不同堆的硬币混合在一起称重，只需知道哪堆硬币中的硬币重2g即可）
   输入描述:
   输入一个正整数N
   $1 \le N \le 10^{12}$
   输出描述:
   输出一个整数，即答案

   示例1
   输入
   2
   输出
   1
   说明
   从一堆硬币中拿出一枚硬币称重，如果重量为1g，那么另一堆硬币中硬币的重量都为2g；如果重量为2g，那么此堆硬币中的硬币重量都为2g
   示例2
   输入
   1
   输出
   0

   ```c
   #include <stdio.h>
   int main()
   {
       long n;
       scanf("%d", &n);
       if (n == 1)
           printf("0");
       else
           printf("1");
       return 0;
   }
   ```

@[TOC]

# 关于C与语言的杂七杂八

1. 标识符构造规则
   - 由字母、数字和下划线组成
   - 数字不能开头
   - 关键字和保留字不能用
2. double用`%lf`输入`%f`输出
3. 计算时先统一单位制
4. 做加法和乘法时小心溢出
5. `++` `--`的算子为变量
6. 数位`(int)log10(x)+1`
7. `log()`是ln，`log10()`是log10
8. 随机数
   - 随机数种子`int srand(unsigned int seed)`seed默认为1，取值范围0~4294967295(32位)
   - 时间函数`time_t time(time_t *_Time)`返回`long long`，做种子时被截断
   - 若产生 [m,n] 范围内的随机数`rand()%(n-m+1)+m`  

      ```cpp
      srand(time(0));
      int a = rand();
      ```

9. unsigned让变量最高位 1 无效，适用于作纯二进制运算
10. 传入`printf()`时`char`等转为`int`，`float`转为`double`
    - 注：可以看作是强制类型转换
11. 强制类型转换只是计算，不改变变量的值
12. `printf("%.3f",ans)`会四舍五入
13. 函数的大括号必须有！
14. C语言变量按堆自顶向下存放，故先定义的变量地址数值更大
15. `printf()`多行输出

    ```cpp
    printf("123456894\n"
           "151916169161\n"
           "15fds  sdsfd\n");
    ```

16. `%i`和`%d`
    - `scanf()`中`%i`可接受八进制和十六进制
    - `printf()`中二者相同
17. `++`比`*`优先级高
    - `*p++`取出`p`指向的变量，`p`向后移动一次
    - `(*p)++` `p`指向的变量自增
18. 指针常量
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210603202530464.png)
19. `int putchar(int_ch)`其他类型变量传入函数会转为`int`，返回值为运行状态
20. 字符串数组的`sizeof(a)`和`strlen(a)`不同！
21. 字符串常用函数
    - 长度`size_t strlen(const char *_Str)`

      ```cpp
      int mylen(const char *s)
      {
          int cnt = 0;
          while (*s++ != '\0')
              cnt++;
          return cnt;
      }
      ```

    - 比较`int strcmp(const char *_Str1, const char *_Str2)`

      ```cpp
      int mycmp(const char *s1, const char *s2)
      {
          while (*s1 == *s2 && *s1 != '\0')
          {
              s1++;
              s2++;
          }
          return *s1 - *s2;
      }
      ```

    - 复制`char * strcpy(char *__restrict__ _Dest, const char *__restrict__ _Source)`restrict关键字表示Dest与Source存储地址不能重叠

      ```cpp
      char *mycpy(char *dst, const char *src)
      {
          char *ret = dst;
          while (*dst++ = *src++)
              ;
          return ret;
      }
      ```

    - 连接`char * strcat(char *__restrict__ _Dest, const char *__restrict__ _Source)`

      ```cpp
      char *mycat(char *dst, const char *src)
      {
          char *ret = dst;
          while (*dst++)
              ;
          dst--;
          while (*dst++ = *src++)
              ;
          return ret;
      }
      ```

    - 搜索
      - 字符搜索
        - 自左向右`char * strchr(const char *_Str, int _Val)`
        - 自右向左`char * strrchr(const char *_Str, int _Ch)`
        - 应用
          - 找第n个

            ```cpp
            char a[] = "abgcdefghijgklmgn";
            int n;
            cin >> n;
            char *p = strchr(a, 'g');
            for (int i = 1; i < n; i++)
                p = strchr(p + 1, 'g');
            puts(p);
            ```

          - 获取右侧

            ```cpp
            char a[] = "abgcdefghijgklmgn";
            char *p = strchr(a, 'g');
            char *ret = (char *)malloc(strlen(p) + 1);
            strcpy(ret, p);
            puts(ret);
            free(ret);
            ```

          - 获取左侧 将p所指改为'\0'来截断字符串

            ```cpp
            char a[] = "abgcdefghijgklmgn";
            char *p = strchr(a, 'g');
            char tmp = *p;
            *p = '\0';
            char *ret = (char *)malloc(strlen(a) + 1);
            strcpy(ret, a);
            puts(ret);
            *p = tmp;
            free(ret);
            ```

      - 字符串搜索
        - 普通`char * strstr(const char *_Str, const char *_SubStr)`
    - 安全版本
      - strcpy()：`char * strncpy(char *__restrict__ _Dest, const char *__restrict__ _Source, size_t _Count)`最多拷贝count个字符
      - strcat()：`char * strncat(char *__restrict__ _Dest, const char *__restrict__ _Source, size_t _Count)`最多连接count个字符
    - 其他：strncmp()：`int strncmp(const char *_Str1, const char *_Str2, size_t _MaxCount)`只比较前maxcount个字符
22. 联合体
    - 定义

      ```cpp
      typedef union
      {
          int i;
          char ch[sizeof(int)];
      } intch;
      ```

    - 应用：`i`和`ch[]`共用一段内存，可用于探查整数`i`内各个字节的储存值
23. 标准头文件格式

    ```cpp
    #ifndef __NAME_H__
    #define __NAME_H__

    #include "max.h"
    double max(double, double);
    typedef struct
    {
        int a;
        double b;
    } sa;

    #endif
    ```

24. qsort()函数
    - 格式：qsort ( 数组名 ，元素个数，元素占用的空间(sizeof)，比较函数)
    - 比较函数 ==从大到小后减前，从小到大前减后==

      ```cpp
      int cmp(const void *a, const void *b)
      {
          return (*(struct sa *)b).score - (*(struct sa *)a).score;
      }
      ```

25. 复数乘法：(a+bi)(c+di)=(ac-bd)+(bc+ad)i
26. 指针类型
    - `int* a;`指向整形的指针
    - `int* a[5];`一维指针数组（存放着5个指向整形的指针）`a+i`指向第`i`个指针元素的地址
    - `int (*a)[5];`行指针（指向一个一维数组且一维数组含5个元素）`a+i`指向第`i`个一维数组的首地址
    - `int (*a)(int,int);`函数指针（指向`int f(int,int)`类型函数）
27. `int atoi(const char *_Str)`转string为int
28. 二维数组一遍过
    - 单纯指针篇
      - 最高级指针 a a+1 a+2 a+i 行指针
      - 第二层上半（上一层的取星*）`a[0] a[1] a[2] a[i]` 列指针指向行首元素
      - 第二层下半（上半的另一种形式）`*a *(a+1) *(a+2) *(a+i)` 列指针指向行首元素
      - 第三层上半（上一层列指针的行内平移）`a[i]+1 a[i]+2 a[i]+j` 列指针指向行内第j个元素
      - 第三层下半（上半的另一种形式）`*(a+i)+1 *(a+i)+2 *(a+i)+j`  列指针指向行内第j个元素
      - 第四层 （元素层，上一层的取星*）`a[i][j] *(*(a+i)+j)`
    - 存放字符串篇
      - 储存
        - scanf()
          `scanf("%s",a+i);`
          `scanf("%s",a[i]);`
          `scanf("%s",*(a+i));`
          `scanf("%s",&a[i][0]);`
        - gets()
          `gets(a[i]);`
          `gets(*(a+i));`
          `gets(&a[i][0]);`
      - 输出
        `printf("%s",a+i);`
        `printf("%s",a[i]);`
        `printf("%s",*(a+i));`
        `printf("%s",&a[i][0]);`
29. 四舍五入 变量类型一定要是`double`

    ```cpp
    double sum = 0;
    for (int i = 0; i < n; i++)
    {
        sum += data[i];
    }
    int ans = (int)(sum / n + 0.5);
    ```

30. gcd与lcm

    ```cpp
    int gcd(int a, int b)
    {
        return b ? gcd(b, a % b) : a;
    }
    int lcm(int a, int b)
    {
        return a / gcd(a, b) * b;
    }
    ```

31. 快速幂

    ```cpp
    ll fastPower(ll base, ll power)
    {
        ll result = 1;
        while (power > 0)
        {
            if (power & 1)
            {
                result = result * base % 1000; // 后三位
            }
            power >>= 1;
            base = (base * base) % 1000; // 后三位
        }
        return result;
    }
    ```

32. 整体

    ```cpp
    #include <math.h>
    #include <time.h>
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    typedef long long ll;
    int main()
    {

        return 0;
    }
    ```

33. 链表函数

    ```cpp
    typedef struct
    {
        char num[10], name[23], sex;
        double score[3], avg, sum;
    } sa;
    typedef struct node
    {
        sa data;
        struct node *next;
    } LNode;

    LNode *Head = NULL;

    LNode *findPre(LNode *H, LNode *p);
    LNode *createA();                           // n个节点 头插
    LNode *createB();                           // n个节点 尾插
    LNode *LinsertA(LNode *H, LNode *p, sa *x); // 前插
    LNode *LinsertB(LNode *H, LNode *p, sa *x); // 后插
    LNode *LdeleteA(LNode *H, LNode *p);        // 删前
    LNode *LdeleteX(LNode *H, LNode *p);        // 删当前
    LNode *LdeleteB(LNode *H, LNode *p);        // 删后
    LNode *Lfree(LNode *H);                     // 清空链表

    LNode *findPre(LNode *H, LNode *p)
    {
        LNode *pre = H;
        while (pre != NULL && pre->next != p)
            pre = pre->next;
        return pre;
    }

    LNode *createA() // n个节点 头插
    {
        LNode *Head;
        Head = (LNode *)malloc(sizeof(LNode));
        Head->next = NULL;
        int x;
        // for (int i = 0; i < n; i++)
        // {
        //     scanf("%d", &x);
        //     LinsertB(Head, Head, x);
        // }
        return Head;
    }

    LNode *createB() // n个节点 尾插
    {
        LNode *p = Head;
        Head = (LNode *)malloc(sizeof(LNode));
        Head->next = NULL;
        int x;
        // for (int i = 0; i < n; i++)
        // {
        //     scanf("%d", &x);
        //     LinsertB(Head, p, x);
        //     p = p->next;
        // }
        p->next = NULL;
        return Head;
    }

    LNode *LinsertA(LNode *H, LNode *p, sa *x)
    {
        LNode *pre = findPre(H, p);
        LNode *newNode = LinsertB(H, pre, x);
        return newNode;
    }

    LNode *LinsertB(LNode *H, LNode *p, sa *x)
    {
        LNode *newNode = (LNode *)malloc(sizeof(LNode));
        newNode->data = *x;
        newNode->next = p->next;
        p->next = newNode;
        return newNode;
    }

    LNode *LdeleteA(LNode *H, LNode *p)
    {
        LNode *pre = findPre(H, p);
        LNode *ppre = findPre(H, pre);
        LdeleteB(H, ppre);
        return H;
    }

    LNode *LdeleteX(LNode *H, LNode *p)
    {
        LNode *pre = findPre(H, p);
        LdeleteB(H, pre);
        return H;
    }

    LNode *LdeleteB(LNode *H, LNode *p)
    {
        LNode *theNode = p->next;
        p->next = theNode->next;
        free(theNode);
        return H;
    }

    LNode *Lfree(LNode *H)
    {
        LNode *p;
        while (H != NULL)
        {
            p = H->next;
            free(H);
            H = p;
        }
        return NULL;
    }
    ```

@[TOC]

# 课设记录

## 6月21日

### 学习内容

1. 确定课题主题 **《基于socket编程的网络订餐系统》**
2. 确定编程环境 Windows 10系统，vs code (version 1.57)
3. 借鉴前人所做订餐系统：
   - [数据库设计——订餐系统](https://blog.csdn.net/weixin_44091134/article/details/115069433?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162426015516780261931878%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=162426015516780261931878&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-2-115069433.pc_search_result_cache&utm_term=cyuya%E8%AE%A2%E9%A4%90&spm=1018.2226.3001.4187) 明确各个对象关系，了解各个对象的基本成员变量，了解大概的程序结构图，了解实践报告的书写样式
   - [订餐管理系统](https://blog.csdn.net/u011256974/article/details/89198342?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162426015516780261931878%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=162426015516780261931878&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-6-89198342.pc_search_result_cache&utm_term=cyuya%E8%AE%A2%E9%A4%90&spm=1018.2226.3001.4187) 引入管理员身份，设计注册和登录界面，有密码验证环节
4. 学习Socket原理 [Socket原理](https://blog.csdn.net/pashanhu6402/article/details/96428887?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162426078616780274133060%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=162426078616780274133060&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-96428887.pc_search_result_cache&utm_term=soxket&spm=1018.2226.3001.4187) 原理有这一篇就够了！
5. 找到Windows下socket编程的关键头文件 `winsock2.h`，了解其与 `winsock.h` 的区别
6. 发现Linux下socket编程的关键头文件 `sys/socket.h` 和 `sys/types.h` （在Windows下的`mingw64`文件夹内未找到）[基于C的计算机网络编程](https://www.bilibili.com/video/BV1pX4y1N7T4?p=21&spm_id_from=pageDriver)
7. 将socket服务端和客户端封装 [C/C++网络编程，从socket到epoll](https://www.bilibili.com/video/BV11Z4y157RY?p=18)
8. 解决Windows无法使用 `sys/socket.h` 和 `sys/types.h` 的问题 [在windows上使用sys/socket.h函数](https://m.jb51.cc/windows/372594.html)
9. 发现针对socket编程的对口视频 [windows网络编程：第一部分tcp/ip](https://www.bilibili.com/video/BV1cb411w7sZ?p=6)
10. 变更vs code终端为外部终端，并解决自动退出问题，变更`launch.json`中`program`的值为`"C:\\Windows\\system32\\cmd.exe"`，`args`的值为`"/C","${fileDirname}\\${fileBasenameNoExtension}.exe","&","pause"` [VS Code中C/CPP的完美配置](https://www.bilibili.com/read/cv5859441/)
11. 找到socket编程服务端和客户端的应用样例讲解视频 [Windows下Winsock网络编程的简单使用](https://www.bilibili.com/video/BV1s7411z7jK?from=search&seid=10502412387665349610)
12. 了解pragma预处理指令 [#pragma comment的使用方法 pragma预处理指令详解](https://blog.csdn.net/qq_35624156/article/details/79864947)
13. 了解 `dll` 的含义
14. 找到网络编程的合适视频 [Windows 网络编程开发实战 C/C++实现](https://www.bilibili.com/video/BV1G4411C7K2?p=1)
15. 根据样例讲解视频和教学视频了解各语句和含义 [MAKEWORD(2,2)解释](https://blog.csdn.net/happy_xiahuixiax/article/details/72637370) ，[WSAStartup( )详解](https://blog.csdn.net/m0_37624078/article/details/81217834) <--是一篇极好的文章！
16. 查看编译器文件时发现 `##` 符号，查询其含义 [VC #define EC(x) L##x 作用说明](https://blog.csdn.net/testcs_dn/article/details/18734197)

### 今日总结

感谢cjj大佬的提点，明确了设计方向。学习新技术的开端是极其痛苦的，尤其是第一门离现学知识比较远的技术，而且自学更是苦海作舟。但坚持啃下第一块硬骨头后就会豁然开朗，发现各种教程资料伸手就来，满眼皆是。之后的学习就要把这股冲劲压下去，沉稳地脚踏实地钻研学习技术，认真实践，加强动手。
明天要把找到的技术资源尽快地融入到课程设计程序中去，构思清楚成品的结构设计图，有针对性地去加强学习，以求解决实际问题。
晚安！

## 6月22日

### 学习内容

1. 编写第一个socket套接字程序

    ```c
    // 服务端
    #include <stdio.h>
    #include <string.h>
    #include <winsock2.h>
    int main()
    {
        // 初始化DLL
        WSADATA wsaData;
        WSAStartup(MAKEWORD(2, 2), &wsaData);
        // 创建套接字
        SOCKET serverSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        // 绑定套接字
        struct sockaddr_in socketaddr;
        ZeroMemory(&socketaddr, sizeof(socketaddr));
        socketaddr.sin_family = AF_INET;
        socketaddr.sin_addr.S_un.S_addr = inet_addr("10.191.81.110");
        socketaddr.sin_port = htons(1234);
        bind(serverSocket, (struct sockaddr *)&socketaddr, sizeof(socketaddr));
        // 进入监听模式（不阻塞）
        listen(serverSocket, 20);
        // 接收客户端请求（阻塞）
        struct sockaddr clientaddr;
        int size = sizeof(clientaddr);
        SOCKET clientsocket = accept(serverSocket, &clientaddr, &size);
        // 信息传递
        printf("Connect Ready!\n");
        char serverReceive[512] = {0};
        char serverSend[512] = {0};
        while (1)
        {
            memset(serverReceive, 0, sizeof(serverReceive));
            memset(serverSend, 0, sizeof(serverSend));
            scanf("%s", serverSend);
            send(clientsocket, serverSend, strlen(serverSend), 0);
            recv(clientsocket, serverReceive, 512, 0);
            printf("%s\n", serverReceive);
        }
        // 关闭套接字
        closesocket(clientsocket);
        closesocket(serverSocket);
        // 关闭DLL
        WSACleanup();
        return 0;
    }
    ```

    ```c
    // 客户端
    #include <stdio.h>
    #include <string.h>
    #include <winsock2.h>
    int main()
    {
        // 初始化DLL
        WSADATA wsaData;
        WSAStartup(MAKEWORD(2, 2), &wsaData);
        // 创建套接字
        SOCKET clientsocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
        // 绑定套接字
        struct sockaddr_in socketaddr;
        ZeroMemory(&socketaddr, sizeof(socketaddr));
        socketaddr.sin_family = AF_INET;
        socketaddr.sin_addr.S_un.S_addr = inet_addr("10.191.81.110");
        socketaddr.sin_port = htons(1234);
        connect(clientsocket, (struct sockaddr *)&socketaddr, sizeof(socketaddr));
        // 信息传递
        printf("Connect Ready!\n");
        char clientReceive[512] = {0};
        char clientSend[512] = {0};
        while (1)
        {
            memset(clientReceive, 0, sizeof(clientReceive));
            memset(clientSend, 0, sizeof(clientSend));
            recv(clientsocket, clientReceive, 512, 0);
            printf("%s\n", clientReceive);
            scanf("%s", clientSend);
            send(clientsocket, clientSend, strlen(clientSend), 0);
        }
        // 关闭套接字
        closesocket(clientsocket);
        // 停止使用DLL
        WSACleanup();
        return 0;
    }
    ```

2. 详解：

   - 服务端：
     - WinSock（Windows Socket）编程依赖于系统提供的动态链接库(DLL)，需在工程设置里链接`"ws2_32.lib"`。方法一：`#pragma comment (lib, "ws2_32.lib")`，方法二：工程设置里`"args"`中写入`"-lws2_32"`
     - `MAKEWORD(2, 2)`表示Windows Socket 2.2版本
     - `socket(协议族，类型，协议)`创建socket
     - 地址信息包括协议族，IP地址，端口号（1024~65535）
     - `bind(服务端套接字，服务端地址信息，地址信息大小)`给服务端套接字绑定地址
     - `listen(服务器套接字，最大排队数)`监听，转服务器套接字主动为被动
     - `accept(服务器套接字，客户端地址变量，地址变量大小)`与排队的第一个客户端建立连接，返回代表此客户端的新套接字，此套接字包含了服务端的地址信息
     - `send(生成的客户端套接字，数据缓冲区首地址，数据大小，flag)`，`recv(生成的客户端套接字，数据存放首地址，最大可接收大小，flag)`
     - 整体过程：你建立自己的套接字（`socket()` `bind()`），用这个套接字监听一个端口（`listne()`）端口有一群人排队等着跟你对话，你拉住第一个人给他一个套接字来标识这个人（`accept()`），然后开始说话（`send()` `recv()`），原来那个套接字还一直在监听这个端口上的那一群人
   - 客户端：
     - `connect(客户端套接字，服务器地址，地址大小)`

### 1.1.1计算机的编程语言

#### 一、辗转相除法

```c
int u=32,v=26;
while(v)
{
    int temp=u%v;
    u=v;
    v=temp;
}
cout<<u;
```

求a,b两数最大公约数，b赋给a，a%b赋给b，直到b为零时a的值为最大公约数

#### 二、算法

计算：所有计算机所作的事情都叫计算

算法：计算的步骤就是算法

### 1.1.2计算机的思维方式

#### 一、计算机的解题方法

枚举法，二分法

#### 二、程序执行的方式

1.解释：某一程序可看懂所写程序，逐行指挥计算机执行，只产生动作不产生额外文件  
解释型语言(Python) 有特殊的计算能力,如程序运行是能对源代码进行修改

2.编译：某一程序将所写程序整体翻译成计算机能懂的程序，产生额外文件不产生执行动作，执行用的是翻译产生的额外程序  
编译型语言(C) 有明确的运算性能，是多快就多快

### 1.2.1为什么是C

#### 一、主要原因

C语言占据很大的市场份额，且在某些领域具有不可替代性，如操作系统、嵌入式系统

#### 二、其他原因

1.现代编程语言（20世纪80年代至今）在语法上差异小，基本都是C-like语言  
2.语言的能力和适用领域决定于

- 库
- 传统：此领域的问题通常是由某种语言解决

### 1.2.2简单历史

#### 一、C语言的诞生

1.诞生：**"It was the summer of'69'"**  
2.发展历程：FORTRAN(1950年代,第一个高级程序设计语言)->BCPL->B语言->C语言  
3.主要特性：BCPL、B语言和C语言都支持指针间接方式  
4.其他影响：PL/1(底层/系统编程语言，接近于汇编和机器语言)，PDP-11的机器语言  
5.1973年3月 Unix上出现了C语言编译器，11月发布的Unix完全由C语言重新编写

#### 二、C语言的发展

1.经典C (K&R the C)

- BOOK:The C Programming Language

2.标准  

- 1989 ANSI（美国）发布——ANSI C
- 1990 ISO（国际）接受ANSI的标准——C89
- 1995——C95
- 1999——C99 可在任意处定义变量，变量可有const修饰符表示不能被修改且必须赋初值
- 2011——C11
- 2018——C18

### 1.2.3编程软件

#### 一、C语言的应用

- 操作系统
- 嵌入式系统
- 驱动程序
- 底层驱动（图形引擎、图像处理、声音效果）

#### 二、运行环境

- 编辑器
- 编译器
- IDE（集成开发环境，包含编辑器、编译器和调试器等）

### 1.3.1-2.2.1

1.输入以行为单位，标志为回车，即按回车之前不会读入任何东西  
2.同时定义多个变量，变量名之间用**逗号**隔开，变量名是一种标识符  
**3. 标识符构造规则**

- 只能由字母、数字和下划线组成
- 数字不能开头
- 关键字/保留字不能用

4.变量在等号右边，即使用前，应要赋值  
5.C99可在程序任意地方定义变量  
6.

```c
scanf("  ",  );
printf("  ",  );
```

结尾f为formatted，格式化输入输出，“ ”内为格式字符串，包含格式控制符  
7.直接写在程序里的数是直接量(literal)，如`int change = 100 - price;`里的100  
8.常量定义(C99) 优势：能给数值一个意义，易于阅读代码，易于修改

```c
int main()
{
    const int AMOUNT=100;
    return 0;
}
```

**9. double用`%lf`输入，`%f`输出**  
10. 计算时间差：先统一单位再处理

```C
int h1,m1,h2,m2;
scanf("%d%d%d%d",&h1,&m1,&h2,&m2);
int h,m;
h=((h2*60+m2)-(h1*60+m1))/60;
m=((h2*60+m2)-(h1*60+m1))%60;
printf("%d %d",h,m);
```

11. ++，--的算子必须是变量，不可出现常量或直接数等  
**12. `scanf("%d %d ",&a,&b);`输入两个数之后接空格或回车后要再给一个值才可**  
13. 代码尽量单一出口，如级联if else时不在各个条件后输出，而是只计算，在最后输出  
14. 写程序注意可读性，简洁性  
15. switch语句格式 case只标记开始位置，不会分割代码，所以必须有break，若不同case操作相同可不加break

```c
switch(a)
{
    case 1:
        printf("789");
        a=5;
        break;
    case 2:
        printf("564");
        break;
    default:
        printf("123");
}
```

16. 程序写的是运算步骤，而不是关系  
**17.数位相关**

- 数数位 正数负数都可，int只能到9位数，大数要改为long long

```c
int num(int x)
{
    int num=1;
    while(x/=10)
        num++;
    return num;
}
```

正数：`(int)log10(x)+1`

- 整数分解
  1. 倒序 ans[0]是个位
     1. C++函数封装，需要动态数组，记得清空,ans[0]是个位

        ```cpp
        void digit(int x,vector<int>&ans)
        {
            do
            {
                ans.push_back(x%10);
            } while (x/=10);
            return;
        }
        int main()
        {
            vector<int>ans;
            int x;
            while(cin>>x)
            {
                ans.clear();
                digit(x,ans);
                for(int i=0;i<ans.size();i++)
                    cout<<ans[i];
                cout<<"\n";
            }
            return 0;
        }
        ```

     2. C精简版

        ```c
        int x,digit;
        scanf("%d",&x);
        do
        {
            digit=x%10;
        }while(x/=10);
        ```

  2. 正序 ans[0]是最高位

    ```CPP
    void devint(int x,vector<int>&ans)
    {
        int t=x,num=1;
        while(t>9)
        {
            num*=10;
            t/=10;
        }
        while(num>0)
        {
            ans.push_back(x/num);
            x%=num;
            num/=10;
        }
        return;
    }
    int main()
    {
        vector<int>ans;
        int x;
        while(cin>>x)
        {
            ans.clear();
            devint(x,ans);
            for(int i=0;i<ans.size();i++)
                cout<<ans[i];
            cout<<"\n";
        }
        return 0;
    }
    ```

18. 求logxy log()是ln，log10()是log10

```c
double logxy(int x,int y)
{
    double ans=log(y)/log(x);
    return ans;
}
```

19. 随机数 `int srand(unsigned int seed)`seed默认为1，取值范围0~4294967295(32位)，time()为long long，做种子时自动被截断，如要产生[m,n]范围内的随机数`rand()%(n-m+1)+m`;

```c
srand(time(0));
int a;
a=rand();
```

20. goto语句 goto后面的标志可以自己设，只在跳出多重循环时用goto

```c
for(;;)
{
    for(;;)
    {
        for(;;)
        {
            if(a)
                goto out;
        }
    }
}
out:
```

21. 做加法和乘法时注意整型的溢出
22. 内存中的表达形式

- 整形：补码
- 浮点型：编码（不能直接在加法器中做加法）

23. 各类型所占字节数 sizeof()是静态运算符，其()内只判断表达式类型，不做计算**每个类型的范围是 -2^(n-1)~2^(n-1)-1 n是类型所占字节数**

```cpp
cout<<sizeof(char)<<endl;//1    -128~127
cout<<sizeof(short)<<endl;//2   -32768~32767
cout<<sizeof(int)<<endl;//4
cout<<sizeof(long)<<endl;//4
cout<<sizeof(long long)<<endl;//8
cout<<sizeof(float)<<endl;//4
cout<<sizeof(double)<<endl;//8
cout<<sizeof(long double)<<endl;//16
cout<<sizeof(bool)<<endl;//1
```

24. CPU内有寄存器(Reg)，寄存器的宽度为字长，也是内存(RAM)与CPU相连的总线一次传输的数据量
25. unsigned让变量最高位 1 不起作用，适用于做纯二进制运算（移位），也可以在数字后面加u或U，但还是变量类型优先
26. 整数格式化输入输出

- 小于int~int %d
- 大于int %ld
- unsigned %u
- unsigned long long %lu

27. a 11111111  
    c 11111111 11111111 11111111 11111111  
    传入`printf()`时`char`转为`int`，`float`转为`double`，即都为int类型的-1，此时再以无符号输出，则是32个1的十进制输出

    ```c
    char a=-1;
    int b=-1;
    printf("%u %u",a,b);//4294967295 4294967295
    ```

28. 八进制：0开头，%o输入输出
    十六进制：0x开头，%x输入输出（x大小写控制数字内字母大小写）
29. 编译器会有内存对齐，储存`char` `short`类型时会转为·`int`储存
30. 四舍五入`printf("%.3f",0.0049);//0.005`
31. 浮点数的不精确，做计算时用二进制计算或用整型去储存
32. `scanf()`必须用控制字符表明变量类型  
    `printf()`小于int的会转为int，有浮点会转浮点，有double转double
33. 强制类型转换只是计算，不改变变量的值
34. bool类型
    - 头文件`#include <stdbool.h>`
    - bool类型：非零即一
    - 可直接用`true` `false`
35. 优先级：!>&&>||
36. 条件运算符`条件 ? 满足时执行语句 : 不满足时执行语句;`
37. 逗号运算符：优先级比赋值运算符还要低，将逗号右边的表达式的值作为逗号运算的结果
38. 函数的大括号必须有！
39. void类型的函数可以没有`return;`
40. 函数声明可以不写变量名，只写变量类型，但这样不易阅读`void sum(int,int);`
41. 如果函数没有参数，声明作`void cheer(void);`
42. 函数内可以声明函数，但不能定义函数
43. c99之后可以用变量来定义数组大小
44. c99初始化数组的定位赋值的特殊写法`int a[]={[5]=2,4,6,[13]=12};`没有指定下标的会依次向下赋值
45. 数组元素个数`sizeof(a)/sizeof(a[0]);`
46. 数组做函数参数时常同时传入数组长度`sizeof(a)/sizeof(a[0])`，函数内不能再用`sizeof()`计算元素个数
47. 调试语句可以用大括号括起来避免变量冲突
48. 构建素数表
    - 图论：纯制表

    ```cpp
    const int N=100;//N以内（不含N）的素数
    int prime[N];
    fill(prime,prime+N,1);
    prime[0]=prime[1]=0;
    for(int i=2;i<N;i++)
    {
        if(prime[i])
        {
            for(int j=2;i*j<N;j++)
                prime[i*j]=0;
        }
    }
    ```

    - 数论：第n个素数

    ```cpp
    const int N=100;//第N个素数是prime[N-1]
    int prime[N+5]={2};
    int cnt=1;
    for(int i=3;cnt<=N-1;i++)
    {
        int flag=1;
        for(int j=0;j<cnt;j++)
        {
            if(i%prime[j]==0)
            {
                flag=0;
                break;
            }
        }
        if(flag)
            prime[cnt++]=i;
    }
    ```

49. 二维数组初始化
    - 行号可省，列号必有
    - 建议每行一个{}便于阅读
    - 最后的逗号
    - 省略则补零

    ```cpp
    int a[][5]={
        {1,2,5},
        {2,5},
        {2,3},
    };
    ```

50. 输出变量地址用`%p`直接为十六进制无0x前缀`printf("%p",&a);`
51. 地址与`int`不一定相同，这与架构有关
52. `&`只能操作明确的变量，不能是表达式
53. `sizeof(&a)`32位为4，64位为8
54. C语言变量按堆自顶向下存放，故先定义的变量地址数值更大
55. 用`%p`输出`&a`、`a`和`a[0]`相同
56. `printf()`多行输出

    ```cpp
    printf("123456894\n"
           "151916169161\n"
           "15fds  sdsfd\n");
    printf("123456894\n\
    151916169161\n\
    15fds  sdsfd\n");
    ```

57. 全局变量会默认初始为0，本地变量不会
58. 全局变量不应互相关联初始化`int a=b  //b是全局变量`
59. `__func__`指代当前函数名称字符串
60. 静态本地变量`static int a=12`是特殊的全局变量，只作一次初始化，全局生存期，本地作用域
61. 避免使用全局变量和静态本地变量
62. 函数或全局变量加上`static`表示只能在此.c文件中使用
63. `%i` `%d`在`scanf()`中`%i`可接受八进制和十六进制，在`printf()`中二者相同
64. `scanf()`返回读入项目数`printf()`返回输出字符数

### 指针

1. 指针类型的含义：其值储存某个变量的地址
2. 定义 好习惯：初始为零

    ```cpp
    int *t=0;
    int *p=0,*q=0,*r=0;
    ```

3. 赋值

    ```cpp
    int i=22,j=11;
    int *p,*q=&j;
    p=&i;
    (*p)++;
    (*q)++;
    printf("*p=%d\ti=%d\n",*p,i);
    printf("*q=%d\tj=%d\n",*q,j);
    ```

4. 参数中的指针

    ```cpp
    void fon(int *p)
    {
        printf("%p\n",p);
        printf("%d\n",*p);
        *p=23;
        printf("%d\n",*p);
    }
    fon(&a);
    ```

    可以直接在函数里改变主函数内数组的值
5. 返回值为指针
   - 危险
     - 返回本地变量的地址
   - 安全但有问题
     - 返回函数内malloc的内存
   - 安全
     - 返回全局变量或静态本地变量的地址
     - 返回传入的指针
6. 应用场景
   - 函数返回值不止一个，修改不止一个变量
   - 函数返回运算状态，指针参数返回运算结果
   - 传入较大数据作参数
   - 传入数组后对数组做操作
   - 动态申请内存
7. 指针的const
   - 指针本身是const`int * const p=&a;`不能指向别的变量
   - 指针的*是const（不是说指向的变量是const）`const int *p;`或`int const *p;`不能通过这个指针改变变量，此时指针可以指向`const int`类型变量，常用作传结构参数的地址
   - 应用：将`const int a[]`作为形参类型可以避免函数内修改数组
8. 指针的运算
   - 连续分配的空间`p+1`指向下一个单元，不是下一个字节，故值的变化与指针类型有关`*(p+n)==a[n]`
   - 指针相减也会自动除以`sizeof()`
   - `*p++` `++`优先级更高，意为：取出当前p所指的变量的值，然后p指向下一个值。多用于数组遍历
9. 动态内存分配

- malloc函数`void* malloc(size_t _Size);`，头文件`<stdlib.h>`
- 注意
  - 申请的空间以字节为单位，参数要计算，类型要转换
  - 释放首地址，只释放一遍
- 实例

  ```cpp
  int num=12;
  int *a;
  a=(int*)malloc(num*sizeof(int));    //此时a就可以当作a[num]数组  来用
  free(a);                            //用完要释放，只能释放首地  址
  ```

### 字符串

1. 定义方法
   - 数组`char a[]="Hello World";`可读可写
   - 指针`char *a="Hello World";`结尾要有`'\0'`，只读
     - 可用作函数参数
     - 动态分配空间
2. 输入输出`%7s`可以控制最多读取7位，之后的仍在缓冲区等待下次读入
3. 注意：`char a[]="";`长度为1！
4. 字符串数组
   - 数组`char a[15][10];`
   - 指针`char *a[15];`
5. `int putchar(int_ch);`其他类型的变量传入函数时会转为int，返回int作运行状态
6. 字符串数组的`sizeof(a)`和`strlen(a)`不同！
7. 常用函数
   - 长度`size_t strlen(const char *_Str)`

    ```cpp
    int mylen(const char *s)
    {
        int cnt=0;
        while(*s++!='\0')
            cnt++;
        return cnt;
    }
    ```

   - 比较`int strcmp(const char *_Str1, const char *_Str2)`

    ```cpp
    int mycmp(const char *s1, const char *s2)
    {
        while (*s1 == *s2 && *s1 != '\0')
        {
            s1++;
            s2++;
        }
        return *s1 - *s2;
    }
    ```

   - 复制`char * strcpy(char *__restrict__ _Dest, const char *__restrict__ _Source)`restrict关键字表示Dest与Source存储地址不能重叠

    ```cpp
    char *mycpy(char *dst, const char *src)
    {
        char *ret = dst;
        while (*dst++ = *src++)
            ;
        return ret;
    }
    ```

   - 连接`char * strcat(char *__restrict__ _Dest, const char *__restrict__ _Source)`

    ```cpp
    char *mycat(char *dst, const char *src)
    {
        char *ret = dst;
        while(*dst++);
        dst--;
        while (*dst++ = *src++)
            ;
        return ret;
    }
    ```

   - 搜索
     - 字符搜索
       - 自左向右`char * strchr(const char *_Str, int _Val)`
       - 自右向左`char * strrchr(const char *_Str, int _Ch)`
       - 应用
         - 找第n个

          ```cpp
          char a[]="abgcdefghijgklmgn";
          int n;
          cin>>n;
          char *p=strchr(a,'g');
          for(int i=1;i<n;i++)
              p=strchr(p+1,'g');
          puts(p);
          ```

         - 获取右侧

          ```cpp
          char a[]="abgcdefghijgklmgn";
          char *p=strchr(a,'g');
          char *ret=(char*)malloc(strlen(p)+1);
          strcpy(ret,p);
          puts(ret);
          free(ret);
          ```

         - 获取左侧 将p所指改为'\0'来截断字符串

          ```cpp
          char a[]="abgcdefghijgklmgn";
          char *p=strchr(a,'g');
          char tmp=*p;
          *p='\0';
          char *ret=(char*)malloc(strlen(a)+1);
          strcpy(ret,a);
          puts(ret);
          *p=tmp;
          free(ret);
          ```

     - 字符串搜索
       - 普通`char * strstr(const char *_Str, const char *_SubStr)`
       - 忽略大小写`strcasestr()`**未找到原型**
   - 安全版本
     - strcpy()：`char * strncpy(char *__restrict__ _Dest, const char *__restrict__ _Source, size_t _Count)`最多拷贝count个字符
     - strcat()：`char * strncat(char *__restrict__ _Dest, const char *__restrict__ _Source, size_t _Count)`最多连接count个字符
   - 其他：strncmp()：`int strncmp(const char *_Str1, const char *_Str2, size_t _MaxCount)`只比较前maxcount个字符

### 自定义结构

#### 枚举

1. 定义`enum flag{a,b,c,d,e,f,num};`或`enum flag{a=1,b,c=5,d,e,f,num};`
2. 巧用：最后的num值恰好是前面变量的个数

#### 结构体

1. 定义（三种）：分开、无名、合并
2. 初始化，部分初始化则其余为零
   - `struct sa a={12,50,654};`
   - `struct sa a={.x=12, .y=50, .z=654};`
3. 强制类型转换`p=(struct sa){5,10};`
4. 指针声明`struct sa *p;`应用为`p->name`
5. 嵌套`date.time.second`指针应用为`p->pt1.x`

#### 自定义类型名称

1. typedef只有最后一个单词是名字
2. 摆脱struct

    ```cpp
    typedef struct sa{
        int num;
        char name[15];
    } sa;
    typedef struct {
        int num;
        char name[15];
    } sa;
    ```

#### 联合

1. 定义

    ```cpp
    typedef union{
        int i;
        char ch[sizeof(int)];
    } intch;
    ```

2. `i`和`ch[]`共用一段内存，可用于探查整数`i`内各个字节的储存值

#### 宏

1. 定义`#define PI 3.14`**无分号！！**只有第一个单词是名称，后面都是值
2. 编译预处理会做文本替换，包括空格等，后面的注释一般不会视作值
3. 无值的宏可以作为条件编译的条件（检查其是否被定义）
4. 编译器预定义的宏
   - `__LINE__`当前行号`%d`
   - `__FILE__`文件名`%s`
   - `__DATE__`编译日期`%s`
   - `__TIME__`编译时间`%s`
   - `__STDC__`当要求程序严格遵循ANSIC标准时该标识符被赋值为1
5. 有参数的宏`#define cube(x) ((x)*(x)*(x))`一切都要有()！！
6. 应用`#define MIN(a,b) ((a)<(b)?(a):(b))`
7. 风险：无参数类型检查
8. inline函数有参数类型检查且高效，可能代替有参数的宏

### 头文件

1. `#include <stdio.h>`只是引入了函数原型，帮助检查参数，并没有引入函数源代码
2. `#include`加在引用的文件和源代码文件中，以便于检查函数参数和函数定义是否一致
3. 通常除主函数外的.c文件都应有同名的.h文件来保存对外公开的函数的原型和全局变量的**声明**
4. 变量在.h文件中的声明`extern int i;`
5. 标准头文件格式 利用宏的定义来避免重复预编译头文件

    ```cpp
    #ifndef __NAME_H__
    #define __NAME_H__

    #include "max.h"

    double max(double, double);
    typedef struct
    {
        int a;
        double b;
    } sa;

    #endif
    ```

### 标准输入输出

1. printf
    ![picture](../图片/翁凯c语言/pr_flag.png)
    ![picture](../图片/翁凯c语言/pr_width.png)
    ![picture](../图片/翁凯c语言/pr_类型修饰.png)
    ![picture](../图片/翁凯c语言/pr_type.png)
2. scanf
    ![picture](../图片/翁凯c语言/sc_flag.png)
    ![picture](../图片/翁凯c语言/sc_type.png)

### 文件 太难了13.1-3没听懂

1. 重定向`<`由文件输入 `>`输出到文件里 和`cin` `cout`相反
2. FILE基本格式

    ```cpp
    FILE *fp=fopen("class.h","r");  //未打开返回NULL
    if(fp)
    {
        int num;
        fscanf(fp,"%d",&num);
    }
    else
    ```

3. fopen
    ![picture](图片/翁凯c语言/fopen.png)

### 链表
