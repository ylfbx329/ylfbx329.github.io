---
title: 'ACM笔记'
summary: ACM竞赛学习笔记
date: 2022-03-09T09:47:51+08:00
categories: 笔记
# draft: true
---

# ACM笔记

## 二维数组与结构体

### 二维数组

1. C语言中字符串输入输出
   - `scanf("%s", str); // 无&`
   - `printf("%s", str);`
2. 二维数组本质上是以数组作为数组元素的数组，即“数组的数组”。
3. 定义时，可以省略第一维的大小，但第二维的大小不可省略。
4. 二维数组行优先。
5. 二维数组的初始化可以按行分段赋值，也可以按行连续赋值。
   - `int a[2][2] = {{1, 2}, {3, 4}};`
   - `int a[2][2] = {1, 2, 3, 4};`
6. 可以只对部分元素赋初值，未赋初值的元素自动取 0 。
   - `int a[3][3] = {{1}, {2}, {3}};`

### 结构体(struct) (c++)

1. `swap(a, b)` 交换两个变量的值，可以是结构体变量

## 排序与cmp函数

### sort排序(c++)

1. `sort()`复杂度n*log(n)
2. 头文件`#include <algorithm>`
3. `sort(起始地址, 结束地址, 排序方法（默认从小到大）);`
   - `sort(a + i, a + j + 1);`从`a[i]`到`a[j]`
   - `sort(vis.begin() + i, vis.begin() + j + 1);`从`vis[i]`到`vis[j]`
4. 两种排序方法
   - 从小到大`sort(a, a + n, less<要进行排序的数据类型>());`
   - 从大到小`sort(a, a + n, greater<要进行排序的数据类型>());`

### cmp函数

1. 将结构体元素按a从大到小排序
   - 写法一：

        ```cpp
        int cmp(const sa &a, const sa &b)
        {
            return a.a > b.a;
        }
        ```

   - 写法二：

        ```cpp
        bool cmp(sa a, sa b)
        {
            return a.a > b.a;
        }
        ```

## gcd与lcm

### 预备知识

1. 符号
   - % 求余符号，a%b=r，a=kb+r
   - | 整除符号，a|b，a能整除b，b=ka，b%a==0
   - ≡ 同余符号，a≡𝑏(𝑚𝑜𝑑 𝑐)，同余式，a%c=b%c
2. 计算
   - (a + b) % p = (a % p + b % p) % p
   - (a - b) % p = (a % p - b % p) % p
   - (a *b) % p = (a % p* b % p) % p
   - a ^ b % p = ((a % p)^b) % p

### 求最大公约数

1. 辗转相除法（欧几里得算法）(gcd) O(log(n))

    ```cpp
    int gcd(int a, int b)
    {
        return b ? gcd(b, a % b) : a;
    }
    ```

2. 辗转相减法（更相减损术）O(n)特判零和负数
3. 素因子法

### 求最大公倍数

1. lcm()

    ```cpp
    int lcm(int a, int b)
    {
        return a / gcd(a, b) * b;
    }
    ```

### gcd的性质

1. 计算
   - gcd(a , b) = gcd(b , a-b)
   - gcd(ma , mb) = m*gcd(a , b), m为一个自然数
   - gcd(a+mb , b) = gcd(a , b)
   - m=gcd(a , b)  则gcd(a/m,b/m)=gcd(a,b)/m
   - gcd(a, lcm(b, c)) = lcm(gcd(a, b), gcd(a, c))
   - lcm(a, gcd(b, c)) = gcd(lcm(a, b), lcm(a, c))
2. n个数的gcd则两两合并

## 快速幂

### 样板函数

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

## 二进制与二进制枚举

### 二进制操作

1. `& | ~ ^`与、或、非、异或
2. 异或：同0异1，不进位的二进制加法，**同一值异或两次为原值**
3. `<< >>`左移乘2，右移除2

### 二进制枚举

1. 原理：二进制下n位数有2^n个，n个元素的集合的子集也有2^n个
2. 操作

    ```cpp
    for (int i = 1; i < (1 << n); i++)
    {
        for (int j = 0; j < n; j++)
        {
            if (i & (1 << j)) // 判断各位是0还是1
            {
                // 1
            }
            else
            {
                // 0
            }
        }
    }
    ```

## 素数筛  //有待完善

### 实现方法

1. 不知名方法 O(nlog(n))

    ```cpp
    vector<int> su;
    const int N = 6000;
    void prime(int n) // 找n以内的素数
    {
        int flag[N];
        memset(flag, 1, sizeof(flag));
        flag[0] = flag[1] = 0;
        su.push_back(0);
        for (int i = 2; i <= n; i++)
        {
            if (flag[i])
            {
                su.push_back(i);
                for (int j = i * 2; j <= n; j += i)
                {
                    flag[j] = 0;
                }
            }
        }
        return;
    }
    ```

2. 埃氏筛 O(nlog(log(n)))

    ```cpp
    vector<int> su;
    const int N = 6000;
    void prime(int n) // 找n以内的素数
    {
        int flag[N];
        memset(flag, 1, sizeof(flag));
        flag[0] = flag[1] = 0;
        su.push_back(0);
        for (int i = 2; i <= n; i++)
        {
            if (flag[i])
            {
                su.push_back(i);
                for (int j = i * 2; j <= n; j += i)
                {
                    flag[j] = 0;
                }
            }
        }
        return;
    }
    ```

3. 线性筛 O(n)  
   解释：我们要筛1~n中的素数，然后先默认他们都是素数，最外层枚举1~n的所有数，如果它是素数，就加到素数表，对于每一个枚举的i ,枚举素数表里的数，然后素数就会标记自己 i倍的数不是素数，（素数的倍数不是素数）枚举素数表什么时候停？枚举到i的最小质因子，标记完就可以停了，保证每个数只被他的最小质因子筛掉。例如：外层i=15时，素数表里：2,3,5,7,11,13   2*15=30，把30筛掉；3*15=45，把45筛掉，因为15%3==0，退出里面的循环；15是被3筛掉的，因为3是15的最小素因子。

    ```cpp
    const int N = 500002;
    bool flag[N];
    int prime[N];
    int cnt;
    void getprime(int n)
    {
        memset(flag, 1, sizeof(flag));
        flag[0] = flag[1] = cnt = 0;
        for (int i = 2; i <= n; i++)
        {
            if (flag[i] == 1)
                prime[++cnt] = i;
            for (int j = 1; j <= cnt && prime[j] * i <= n; j++)
            {
                flag[i * prime[j]] = 0;
                if (i % prime[j] == 0)
                    break;
            }
        }
    }
    ```

4. 唯一分解定理
5. 求因子和

## 队列

### 基本操作

1. 头文件`#include <queue>`
2. 初始化`queue<typename>vis;`
3. 入队`vis.push(x);`
4. 出队`vis.pop();`
5. 判断空队列`vis.empty();`
6. 元素数量`vis.size();`
7. 队首元素`vis.front();`
8. 队尾元素`vis.back();`

## 栈

### 定义

一组地址**连续的**存储单元依次**自栈底到栈顶**存放栈的数据元素

### 基本操作

1. 头文件`#include <stack>`
2. 初始化`stack<typename>vis;`
3. 入栈`vis.push(x);`
4. 出栈`vis.pop();`
5. 判断空栈`vis.empty();`
6. 元素数量`vis.size();`
7. 栈顶元素`vis.top();`

## string

### 基本操作

1. 头文件`#include <string>`
2. 定义`string str;`
3. 初始化`string str="abcd";`
4. 访问
   - 下标

        ```cpp
        for (int i = 0; i < str.length(); i++)
            printf("%c", str[i]);
        ```

   - 迭代器 可加减`str.begin()+2`

        ```cpp
        for (string::iterator it = str.begin(); it != str.end(); it++)
            printf("%c", *it);
        ```

5. 输入输出（没有其他方式）
   - `cin` `cout`
   - `printf("%s",str.c_str());`
6. 运算
   - 加法：拼接字符串（变量`str`、常量`"123"`）、字符（单字符`'1'`、字符串元素`str[0]`）
   - 关系：按字典序比较字符串**变量**
7. 函数
   - 长度`str.lengh();` `str.size();`O(1)
   - 清空`str.clear();`O(1)
   - 子串：从下标pos开始长度为len`str.substr(pos,len);`O(n)
   - 插入 O(n)
     - 在下标pos插入str1`str.insert(pos,str1);`
     - 在it上插入it2到it3的字符串（左闭右开区间）`str.insert(it, it2, it3);`
   - 删除 O(n)
     - 单个元素`str.erase(it);`
     - 迭代器从first到last左闭右开区间`str.erase(first,last);`
     - 从下标pos开始长度为len`str.erase(pos,len);`
   - 查找 O(n*m)
     - 匹配str1（字符串、字符），返回第一次出现的下标或-1(`string::npos`) `str.find(str1);`
     - 从下标pos开始匹配`str.find(str1,pos);`
   - 替换 O(n)
     - `str.replace(pos,len,str1);`相当于`str.erase(pos,len);`后`str.insert(pos,str1);`
     - `str.replace(it1,it2,str1);`相当于`str.erase(it1,it2);`后`str.insert(pos,str1);`

### 其他

1. `max(x,y)` `min(x,y)`适用于基本数据类型，可套用
2. `abs(x)` `fabs(x)`分别适用于整型和浮点型，返回绝对值
3. `swap(x,y)`交换值
4. `reverse()`
   - `reverse(a+i,a+j+1);`反转`a[i]`到`a[j]`的元素
   - `reverse(it1,it2);`反转容器的it1到it2（左闭右开）元素
5. `next_permutation()`从`a[i]`到`a[j]`，先排序得到最小字典序，再循环全排列

    ```cpp
    int a[n];
    sort(a + i, a + j + 1);
    do {
    } while (next_permutation(a + i, a + j + 1));
    ```

6. `fill()` `memset()`
   - `fill()`按**单元**在数组或容器的某一区间内赋值
     - `fill(a + i, a + j + 1, x);`从a[i]到a[j]
     - `fill(vis.begin() + i, vis.begin() + j + 1, x);`从vis[i]到vis[j]
   - `memset()`按**字节**给数组赋值

## map、pair与set

**这里不可以在迭代器上直接加减！！！**

### map

1. 头文件`#include <map>`
2. 初始化`map<typename1,typename2> vis;`
3. 访问
   - 下标`vis[‘c’]=124;`
   - 迭代器

        ```cpp
        map<typename1, typename2>::iterator it;
        it->first;
        it->second;
        ```

4. 函数
   - 映射对数`vis.size();`O(1)
   - 清空`vis.clear();`O(n)
   - 查找：
     - 返回键值key的映射的迭代器`vis.find(key);`O(log(n))
     - 返回值是bool值`vis.count(key)`
   - 删除
     - 单个元素`vis.erase(it);`O(1)`vis.erase(key);`O(log(n))
     - 迭代器从first到last左闭右开区间`vis.erase(first,last);`O(n)
5. map会**自动按照key进行排序**

### pair

1. 定义：二元结构体

    ```cpp
    struct pair
    {
        typename1 first;
        typename2 second;
    };
    ```

2. 头文件`#include <utility>`map头文件自带utility
3. 初始化`pair<typename1,typename2> vis;`

### set

1. 特点：自动**去重**、升序排序、内部用红黑树实现
2. 头文件`#include <set>`
3. 初始化`set<typename> vis;`
4. 访问：迭代器

    ```cpp
    for (set<typename>::iterator it = vis.begin(); it != vis.end(); it++)
        cout << *it;
    ```

5. 函数
   - 元素个数`vis.size();`
   - 清空`vis.clear();`
   - 插入`vis.insert(x);`
   - 删除
     - 单个元素`vis.erase(it);` `vis.erase(x);`
     - 迭代器从first到last左闭右开区间`vis.erase(first,last);`
   - 查找：存在1不存在0`vis.count(x);`
   - 特殊定位 **要升序排列**
     - `vis.lower_bound(x);`返回第一个大于等于x的定位器
     - `vis.upper_bound(x);`返回第一个大于x的定位器

## vector

### 基本操作

1. 头文件`#include <vector>`
2. 初始化`vector<typename> vis;`
3. 访问
   - 下标

        ```cpp
        for (int i = 0; i < vis.size(); i++)
            cout << vis[i];
        ```

   - 迭代器 可加减`vis.begin()+2`

        ```cpp
        for (vector<typename>::iterator it = vis.begin(); it != vis.end(); it++)
            cout << *it;
        ```

4. 函数
   - 元素个数`vis.size();`可用于二维`vis[i].size();`O(1)
   - 清空`vis.clear();`O(n)
   - 添加`vis.push_back(x);`O(1)
   - 删除尾元素`vis.pop_back();`O(1)
   - 插入：在迭代器it处插入x`vis.insert(it,x);`O(n)
   - 删除
     - 单个元素`vis.erase(it);`
     - 迭代器从first到last左闭右开区间`vis.erase(first,last);`

## 优先队列

### 基本操作

1. 头文件`#include <queue>`
2. 初始化：通常为结构体`priority_queue<typename> vis;`
3. 队首元素（堆顶元素）
   - 访问`vis.top();`
   - 删除`vis.pop();`

### 排序比较

1. 重载：样板写法

    ```cpp
    struct sa
    {
        int id;
        int time;
        int now;
        friend bool operator<(sa a, sa b)
        {
            if (a.now != b.now)
                return a.now > b.now;
            else
                return a.id > b.id;
        }
    };
    ```

2. 手写堆
   - 小根堆：从小到大排列`priority_queue<typename,vector<typename>,greater<typename> > vis;`
   - 大根堆：从大到小排列`priority_queue<typename,vector<typename>,less<typename> > vis;`

## ACM公选课

1. 题目复杂度`1e7*4=1s`
2. 字符串输入
   - C
     - `char ch[100]; gets(ch);`
   - C++ 可加入第三个参数作结束标识符，但要注意换行符的问题//???????????????????
     - `char ch[100]; cin.getline(ch,100);`
     - `string str; getline(cin,str);`
3. 文件处理
   - `freopen()``FILE * freopen(const char *__restrict__ _Filename, const char *__restrict__ _Mode, FILE *__restrict__ _File)`将输入或输出流由键盘缓存区重定向至文件，不能做到既文件读取又键盘读入
   - `fopen()``FILE * fopen(const char *__restrict__ _Filename, const char *__restrict__ _Mode)`
4. 快速幂可以到ll
5. n^n的个位数字循环，在初始化二维数组时可以把循环节最后一个数字放在第一，以方便用`n%循环节`来确定
6. n的阶乘用log10()来计算
7. 任意数的位数为`(int)log10(x)+1`
8. 大数的最高位为`d = (int)(10^(log10(x)-(int)log10(x));`
9. 一个变量对一个数(<=300)疯狂取余，用循环节解决
   - 7——49
   - 11——100
   - 100——500
   - 300——1000
10. 动态找周期：一般判断前两个相同即可
11. 逆元法

## hash

1. 常用哈希函数
   - 进制哈希 $$ Hash(s)= \sum_{i=0}^{\vert s\vert - 1} {s[i]\cdot p^i} $$
     - 优势：对子串哈希友好
     - 后缀`i`（倒数第`i`个）的哈希值 $$ Hash_s(i) = \begin{cases} 0, & i=\vert s\vert \\ Hash_s(i+1)\cdot p + s[i], & 0\leq i < \vert s \vert \end{cases} $$
     - 从`i`起始，长度为`len`的子串 $$ Hash_s(i,len)= Hash_s(i)- Hash_s(i+len)\cdot p^{len} $$ $$ Hash_s(i,len)= Hash_s(i+1,len)\cdot p-s[i+l]\cdot p^{len}+s[i] $$
2. 说明：
   - 针对某一哈希算法的冲突数据需经过特意挑选
   - 由概率论知：对N取模时超过$\sqrt{N}$会哈希冲突

## KMP算法

1. 最大公共前后缀，next数组
