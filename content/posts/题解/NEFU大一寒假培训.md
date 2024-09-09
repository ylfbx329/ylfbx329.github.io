---
title: 'NEFU 大一寒假培训'
summary: ACM竞赛练习记录
date: 2020-12-24T12:38:45+08:00
categories: 笔记
# draft: true
---


## 主题：二维数组、结构体

### A 二维矩阵对角线和

*Description*
计算m×m的方阵的对角线所有元素的和
*Input*
输入数据有多组，每组第1行为m (2<=m<=10)，接下来有m行m列的数据 1<=a(i,j)<=100
*Output*
对于你刚输入的这个矩阵，输出方阵的对角线所有元素的和（交叉位置元素要多次计算）
*Sample Input*
3
1 2 3
4 5 6
7 8 9
*Sample Output*
30

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int x[12][12], m, sum;
    while (cin >> m)
    {
        sum = 0;
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= m; j++)
                cin >> x[i][j];
        }
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                if (i == j)
                    sum += x[i][j];
                if (i + j == m + 1)
                    sum += x[i][j];
            }
        }
        cout << sum << endl;
    }
}
```

*总结*
==i=j判断为主对角线元素，i+j=m+1判断为辅对角线元素，分为两个 if 判断均满足则为交叉位置元素==

### B 矩阵的外围

*Description*
在军事训练中，战士们站成一个方阵（也可能是一个长方形），每个战士身上都有1个编号，现在军队领导想知道，站在队伍外围战士们的编号之和是多少？
*Input*
输入数据有多组，每组第一行n和m $(1 < n, m \le 10)$，代表行数和列数。接下来是n行m列个战士的编号值value[i] $(0 \le value[i] \le 100)$
*Output*
在一行内输出外围战士的编号之和
*Sample Input*
3 3
1 2 3
4 5 6
0 1 0
*Sample Output*
17

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int x[12][12], n, m, sum;
    while (cin >> n >> m)
    {
        sum = 0;
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
                cin >> x[i][j];
        }
        for (int j = 1; j <= m; j++)
            sum += x[1][j] + x[n][j];
        for (int i = 2; i <= n - 1; i++)
            sum += x[i][1] + x[i][m];
        cout << sum << endl;
    }
}
```

*总结*
==两个for循环分别加和首行、尾行和中间行的首尾==

### C 五人帮

*Description*
5人帮的含义就是该数字所对应的上、下、左、右和自己本身的数值之和，请求出矩阵中5人帮的最大值是多少？
*Input*
输入数据有多组，每组第1行为2个数m和n $(1 < n, m < 10)$,代表行数和列数； 接下来输入这m行和n列个数data(i,j) $(1 < data(i,j) < 100)$
*Output*
输出该矩阵5人帮的最大值！
*Sample Input*
3 4
1 2 3 4
3 4 5 6
2 3 3 9
*Sample Output*
24

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int a[15][15], m, n, sum, ma;
    while (cin >> m >> n)
    {
        memset(a, 0, sizeof(a));
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
                cin >> a[i][j];
        }
        ma = -1;
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                sum = a[i][j] + a[i][j + 1] + a[i][j - 1] + a[i + 1][j] + a[i - 1][j];
                ma = max(sum, ma);
            }
        }
        cout << ma << endl;
    }
    return 0;
}
```

*总结*
==本题陷阱：外围的各元素也可作为五人帮核心元素
解题核心：数组元素全设置为零，从`a[1][1]`开始赋值，利用最外圈零元素巧妙计算外圈作为五人帮核心时的数值
注：
1.memset(数组名,0,sizeof(数组名))，对于int类型数组只能初始化为0，1或-1（定为1时元素值不是1）
2.max(a,b)，返回a，b较大的一个，min(a,b)返回a，b较小的一个==

### D 回转小矩阵

*Description*
现在有一个n*m行的矩阵A，逆时针旋转90度形成一个新的矩阵B，将B矩阵输出来
*Input*
多组样例，第一行两个整数n,m $(1 \le n, m \le 100)$ 然后是n行m列矩阵
*Output*
输出矩阵B
*Sample Input*
3 5
1 2 3 4 5
2 4 9 2 1
3 4 5 7 9
*Sample Output*
5 1 9
4 2 7
3 9 5
2 4 4
1 2 3  

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int x[12][12], n, m;
    while (cin >> n >> m)
    {
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
                cin >> x[i][j];
        }
        for (int j = m; j >= 1; j--)
        {
            for (int i = 1; i < n; i++)
                cout << x[i][j] << " ";
            cout << x[n][j] << endl;
        }
    }
}
```

*总结*
==从最后一列的第一行开始向下逐个输出，输出时注意格式==

### E 矩阵相乘

*Description*
计算2个方阵的乘积
*Input*
输入数据有多组，每组第1行为m $(1 < m < 10)$ 表示方阵的大小，接下来为2个m行m列的数据data(i,j) $(1 < data(i,j) < 100)$
*Output*
输出这2个方阵的乘积
*Sample Input*
2
1 2
1 2
3 1
1 3
*Sample Output*
5 7
5 7

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int m, a[15][15], b[15][15], ans[15][15];
    while (cin >> m)
    {
        memset(ans, 0, sizeof(ans));
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= m; j++)
                cin >> a[i][j];
        }
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= m; j++)
                cin >> b[i][j];
        }
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                for (int k = 1; k <= m; k++)
                    ans[i][j] += a[i][k] * b[k][j];
            }
        }
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j < m; j++)
                cout << ans[i][j] << " ";
            cout << ans[i][m] << endl;
        }
    }
    return 0;
}
```

*总结*
==计算部分，用两个for循环确定当前所计算的元素的位置，再用一个k来循环 a 的 i 行和 b 的 j 列==

### F 结构体应用

*Description*
读入学生的信息：学号（8位整数）、姓名（20个字符）、1门课的成绩（2位小数） 要求用输入、输出函数实现部分子功能
*Input*
 输入数据有1组，每组有n个学生信息。
*Output*
 输出读入的学生信息,每行1个学生信息，各信息之间用2个空格分隔。
*Sample Input*
5
20140101
Li Ming
85
20140202
Zhao Li
98
20140013
Qiao En
92.5
20140404
Tian Ya
88.5
20140015
Lu Yao
89.4
*Sample Output*
20140101  Li Ming  85.00
20140202  Zhao Li  98.00
20140013  Qiao En  92.50
20140404  Tian Ya  88.50
20140015  Lu Yao  89.40

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    char name[30], num[10];
    double score;
} stu[100];
int main()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        cin >> stu[i].num;
        getchar();
        gets(stu[i].name);
        cin >> stu[i].score;
    }
    for (int i = 1; i < n; i++)
    {
        cout << stu[i].num << "  " << stu[i].name;
        printf("  %.2f\n", stu[i].score);
    }
    cout << stu[n].num << "  " << stu[n].name;
    printf("  %.2f", stu[n].score);
    return 0;
}
```

*总结*
==名字内有空格，不能用cin来读取，需用gets()整行读取，gets()前要用getchar()把之前的回车吃掉，否则gets()的字符串为空==

### G 身高问题

*Description*
输入 n 个学生的信息，每个学生信息包括姓名、身高、学号。编程输出身高最高的学生的信息。
*Input*
第 1 行一个正整数 n，表示学生个数，n≤100。
以下 n 行，每一行依次输入学生的姓名、身高、学号。
*Output*
输出最高的学生信息，如存在身高一样的请输出学号小的那个同学。
*Sample Input*
5
John 172 20160302
David 173 20160306
Jason 168 20160309
Jack 152 20160311
Kitty 147 20160319
*Sample Output*
David 173 20160306

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    char name[30];
    int height, num;
} stu[105];
int cmp(sa a, sa b)
{
    if (a.height != b.height)
        return a.height > b.height;
    else
        return a.num < b.num;
}
int main()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
        cin >> stu[i].name >> stu[i].height >> stu[i].num;
    sort(stu + 1, stu + 1 + n, cmp);
    cout << stu[1].name << " " << stu[1].height << " " << stu[1].num;
    return 0;
}
```

*总结*
==结构体定义时储存学号的num需为int，否则不易于参与排序
注：sort(a+i,a+i+n,cmp)可实现数组a从a[i]到a[i+n]n项的排序，可自定义cmp()函数来制定排序规则，默认为从小到大==

### H 成绩统计

*Description*
兴趣小组收集学员成绩信息，每个学员的成绩有两种表示方法，一种用 best、good、poor 三种等级来表示，还有一种就是直接用分数来表示（百分制）。请保存学员成绩信息，并且统计有多少人是用等级来表示成绩的，用分数来表示成绩的人的平均分是多少（取整就行）
*Input*
第 1 行一个正整数 n（n≤1000）表示学员人数
第 2~n+1 行，每行一个字符和一个字符串，中间用一个空格隔开。第一个字符表示这个学生成绩类型，有 C、N 两种分别代表等级表示和分数表示，第二个字符串表示成绩信息。
*Output*
一行两个整数，分别表示用等级表示成绩的人数和用分数表示成绩时人的平均分（取整），中间用一个空格隔开
*Sample Input*
5
C best
C good
N 90
C poor
N 98
*Sample Output*
3 94

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, score, sum, numc, numn;
    char mode, grade[10];
    cin >> n;
    numc = numn = sum = 0;
    for (int i = 1; i <= n; i++)
    {
        cin >> mode;
        if (mode == 'C')
        {
            cin >> grade;
            numc++;
        }
        else
        {
            cin >> score;
            numn++;
            sum += score;
        }
    }
    cout << numc << " " << sum / numn;
    return 0;
}
```

*总结*
==本题不用储存成绩信息，故不用使用结构体==

### I 优秀学生

*Description*
读入学生的信息(最多不超过100个)：学号(不超过八位)、姓名（不超过20个字符）、C语言成绩（用整数表示）。统计优秀学生的信息（成绩在90分以上，包括90分）及个数（要求用结构体实现）
*Input*
输入数据有多组，每组为n个学生的信息;
*Output*
输出优秀学生的信息及个数。
*Sample Input*
5
2015001
ZhangSan
90
2015002
LiMing
80
2015003
WangHong
70
2015004
ZhangXiao
95
2015005
WangFang
100
3
2015001
ZhangSan
60
2015002
LiMing
80
2015003
WangHong
85
*Sample Output*
2015001 ZhangSan 90
2015004 ZhangXiao 95
2015005 WangFang 100
3
0

```cpp
#include <bits/stdc++.h>
using namespace std;
struct student
{
    char num[10], name[20];
    int score;
} stu[105];
int main()
{
    int n, num, best[105];
    while (cin >> n)
    {
        num = 0;
        memset(best, 0, sizeof(best));
        for (int i = 1; i <= n; i++)
        {
            cin >> stu[i].num >> stu[i].name >> stu[i].score;
            if (stu[i].score >= 90)
            {
                num++;
                best[i]++;
            }
        }
        if (num)
        {
            for (int i = 1; i <= n; i++)
            {
                if (best[i])
                    cout << stu[i].num << " " << stu[i].name << " " << stu[i].score << endl;
            }
        }
        cout << num << endl;
    }
    return 0;
}
```

*总结*
==构建best数组来标记优秀学生的位置，输出时判断num是否为零可减少无优秀学生时的运行时间，多组输入，记得重置num和best数组==

### J 谁不及格？

*Description*
把不及格的同学的名单打印。
*Input*
输入包含多组数据，每组输入一个数n(1<=n<=10)，然后接下来输入n个同学的信息，每个同学的信息分3行，第一行姓名name（姓名长度不超过20个字母），第二行学号x，长度为10（例：2015215098），第三行学生的平均加权成绩。
*Output*
每组数据第一行输出一个数k，表示不及格学生的个数，然后接下来输出3*k行不及格学生信息，==第一个k行==输出不及格学生姓名（按输入顺序），==第二个k行==输出学生学号（按输入顺序），==第三个k行==输出学生成绩（按输入顺序）（保留2位小数）。若是没有同学不及格，那么输出“They are Great!!”。
*Sample Input*
2
zhu dan
2015213678
79.99
wang meng
2015213902
83.78
1
tiancai
2015234930
59.08
*Sample Output*
They are Great!!
1
tiancai
2015234930
59.08

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    char name[30], num[20];
    double score;
} stu[20];
int main()
{
    int n, num, fall[20];
    while (cin >> n)
    {
        num = 0;
        memset(fall, 0, sizeof(fall));
        for (int i = 1; i <= n; i++)
        {
            getchar();
            gets(stu[i].name);
            cin >> stu[i].num >> stu[i].score;
            if (stu[i].score < 60)
            {
                num++;
                fall[i]++;
            }
        }
        if (num)
        {
            cout << num << endl;
            for (int i = 1; i <= n; i++)
            {
                if (fall[i])
                    cout << stu[i].name << endl;
            }
            for (int i = 1; i <= n; i++)
            {
                if (fall[i])
                    cout << stu[i].num << endl;
            }
            for (int i = 1; i <= n; i++)
            {
                if (fall[i])
                    printf("%.2lf\n", stu[i].score);
            }
        }
        else
            cout << "They are Great!!" << endl;
    }
    return 0;
}
```

*总结*
==思路与上一题相同，但本题的输入输出数据和格式都有所不同
输入姓名有空格，配套使用getchar()和gets()读取，学号长度超过int型上限，要用字符串储存
输出需用三个for循环分别输出姓名、学号和分数==

## 主题：排序、cmp函数

### A 谁考了第k名-排序

*Description*
在一次考试中，每个学生的成绩都不相同，现知道了每个学生的学号和成绩，求考第k名学生的学号和成绩。
*Input*
第一行有两个整数，分别是学生的人数n（1≤n≤100），和求第k名学生的k（1≤k≤n）。
其后有n行数据，每行包括一个学号（整数）和一个成绩（浮点数），中间用一个空格分隔。
*Output*
输出第k名学生的学号和成绩，中间用空格分隔。（注：请用%g输出成绩）
*Sample Input*
5 3
90788001 67.8
90788002 90.3
90788003 61
90788004 68.4
90788005 73.9
*Sample Output*
90788004 68.4

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    char num[15];
    double score;
} stu[105];
int cmp(sa a, sa b)
{
    return a.score > b.score;
}
int main()
{
    int n, k;
    while (cin >> n >> k)
    {
        for (int i = 1; i <= n; i++)
            cin >> stu[i].num >> stu[i].score;
        sort(stu + 1, stu + 1 + n, cmp);
        printf("%s %g", stu[k].num, stu[k].score);
    }
    return 0;
}
```

*总结*
==sort()排序，cmp()自定义排序规则，%g 输出 %f 和 %e 中较短的一个==

### B 奇数单增序列

*Description*
给定一个长度为N（不大于500）的正整数序列，请将其中的所有奇数取出，并按升序输出
*Input*
共2行：
第1行为 N；
第2行为 N 个正整数，其间用空格间隔。
*Output*
增序输出的奇数序列，数据之间以==逗号==间隔。数据保证至少有一个奇数。
*Sample Input*
10
1 3 2 6 5 4 9 8 7 10
*Sample Output*
1,3,5,7,9

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, x, j, a[505];
    cin >> n;
    j = 0;
    for (int i = 1; i <= n; i++)
    {
        cin >> x;
        if (x % 2 != 0)
        {
            a[j] = x;
            j++;
        }
    }
    sort(a, a + j);
    for (int i = 0; i < j - 1; i++)
        cout << a[i] << ",";
    cout << a[j - 1];
    return 0;
}
```

*总结*
==j 记录奇数个数，排序函数写为sort(首地址，首地址+元素个数)，默认从小到大排序==

### C 成绩排序

*Description*
给出班里某门课程的成绩单，请你按成绩从高到低对成绩单排序输出，如果有相同分数则名字字典序小的在前。
*Input*
第一行为n (0 < n < 20)，表示班里的学生数目；
接下来的n行，每行为每个学生的名字和他的成绩, 中间用单个空格隔开。名字只包含字母且长度不超过20，成绩为一个不大于100的非负整数。
*Output*
把成绩单按分数从高到低的顺序进行排序并输出，每行包含名字和分数两项，之间有一个空格。
*Sample Input*
4
Kitty 80
Hanmeimei 90
Joey 92
Tim 28
*Sample Output*
Joey 92
Hanmeimei 90
Kitty 80
Tim 28

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    char name[30];
    int score;
} stu[30];
int cmp(sa a, sa b)
{
    if (a.score != b.score)
        return a.score > b.score;
    else
        return a.name < b.name;
}
int main()
{
    int n;
    while (cin >> n)
    {
        for (int i = 1; i <= n; i++)
            cin >> stu[i].name >> stu[i].score;
        sort(stu + 1, stu + 1 + n, cmp);
        for (int i = 1; i <= n; i++)
            cout << stu[i].name << " " << stu[i].score << endl;
    }
    return 0;
}
```

*总结*
==字典序排序可直接通过cmp()函数来实现==

### D 没必要的排序1

*Description*
羽裳有n个数，她想知道前k大的数的和为多少
*Input*
首先输入两个数n，k，代表有n个数，求前k大的和，接下来输入n个数，==这n个数或是0或是1==
1<=k<=n<=1000
*Output*
输出一个数，为前k大的和
*Sample Input*
5 3
0 0 1 0 1
*Sample Output*
2

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, k, x, a[2] = {0};
    cin >> n >> k;
    for (int i = 1; i <= n; i++)
    {
        cin >> x;
        a[x]++;
    }
    if (k < a[1])
        cout << k;
    else
        cout << a[1];
    return 0;
}
```

*总结*
==桶排序==

### E 没必要的排序2

*Description*
羽裳有n个数，她想知道前k大的数的和是多少
*Input*
输入n，k代表有n个数，求前k大的和,之后输入n个数，第i个数为a[i]
1<=n<=10000000(1e7)
1<=k<1000
对任意的i
1<=a[i]<=100000(1e5)
*Output*
输出一个数ans，ans是前k大数的和
*Sample Input*
2 1
99999 1
*Sample Output*
99999
*Hint*
排序会超时

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, k, x, num, flag, a[100005] = {0};
    long long sum;
    scanf("%d%d", &n, &k);
    for (int i = 1; i <= n; i++)
    {
        scanf("%d", &x);
        a[x]++;
    }
    num = sum = 0;
    for (int i = 100000; num < k; i--)
    {
        if (a[i])
        {
            sum += i * a[i];
            num += a[i];
            flag = i;
        }
    }
    if (num > k)
        sum -= (num - k) * flag;
    printf("%ld", sum);
    return 0;
}
```

*总结*
==数据量很大，能省时间就省，主要应用桶排序，找从大桶开始计数，退出时若num=k，则要减去多加的数（flag！！不是a[flag]！！）
另：sum设为int也能过==

### F 老和尚的导员

*Description*
所有和尚的期末考试成绩按降序排列来发奖学金
*Input*
寺中主要考试科目有C语言，线性代数，高等数学和英语四个科目，输入的第一行是和尚的人数N（N<=100），第二行至第N+1行分别为C语言a[i]，线性代数b[i]，高等数学c[i]和英语的成绩d[i] (0 <= a[i],b[i],c[i],d[i] <= 100)
*Output*
现需要你将和尚们的成绩以总成绩降序排列，输出数据的每行有两个数字，第一个数字为和尚的编号（输入时的第一个和尚成绩即为和尚1，第二个为和尚2），第二个数字为和尚的总成绩（如果总成绩相同，则按C语言的成绩排列，如在相同，则按线性代数输出编号，以此类推。）
*Sample Input*
5
98 50 27 65
58 52 24 16
98 96 90 89
31 65 98 78
65 67 66 90
*Sample Output*
3 373
5 288
4 272
1 240
2 150

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    int c, x, g, y, s, num;
} stu[105];
int cmp(sa a, sa b)
{
    if (a.s != b.s)
        return a.s > b.s;
    else if (a.c != b.c)
        return a.c > b.c;
    else if (a.x != b.x)
        return a.x > b.x;
    else if (a.g != b.g)
        return a.g > b.g;
    else if (a.y != b.y)
        return a.y > b.y;
}
int main()
{
    int n;
    while (cin >> n)
    {
        for (int i = 1; i <= n; i++)
        {
            cin >> stu[i].c >> stu[i].x >> stu[i].g >> stu[i].y;
            stu[i].s = stu[i].c + stu[i].x + stu[i].g + stu[i].y;
            stu[i].num = i;
        }
        sort(stu + 1, stu + 1 + n, cmp);
        for (int i = 1; i <= n; i++)
            cout << stu[i].num << " " << stu[i].s << endl;
    }
    return 0;
}
```

*总结*
==简单结构体应用，num储存编号==

### G 健忘的老和尚

*Description*
当小和尚排完名单后，老和尚突然一拍脑袋：“导员把每个人的人名都给我了，可我忘记告诉你了。”
*Input*
输入数据为多组，输入的第一行为和尚的人数N，可以得到奖学金的人数M，和需要补考的人数O（在这里可以满足M+O<=N，即得到奖学金的和尚一定不用参加补考）。之后的N行每行都有一个字符串（即为和尚的名字，长度小于100）和尚考试的总分a[i] (0 <= a[i] <= 1000)。
*Output*
==前M行==，每行是获得奖学金的小和尚的名字；
==后O行==，每行是补考的小和尚的名字；
无论是奖励还是惩罚都按照==总成绩从低到高输出==和尚的名字即可。
*Sample Input*
5 1 2
a 192
aa 212
ab 351
bab 128
bbaa 654
*Sample Output*
bbaa
bab
a

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    char name[105];
    int score;
} stu[120];
int cmp(sa a, sa b)
{
    return a.score > b.score;
}
int main()
{
    int n, m, o;
    while (cin >> n >> m >> o)
    {
        for (int i = 1; i <= n; i++)
            cin >> stu[i].name >> stu[i].score;
        sort(stu + 1, stu + 1 + n, cmp);
        for (int i = m; i >= 1; i--)
            cout << stu[i].name << endl;
        for (int i = n; i > n - o + 1; i--)
            cout << stu[i].name << endl;
        cout << stu[n - o + 1].name;
    }
    return 0;
}
```

*总结*
==题目对输出的要求很多，注意读题，计算准确数据脚标==

### H 戏说三国

*Description*
每个官员有一个智育、德育、武育三个分数，分别以==b%，a%，c%==的比率计入加权总分，按总分降序排列，总分相同按智育折合后的分数降序，智育相同按德育，依次类推最终决定排名。（保证没有排名一样的两个人）
Input
输入第一行t(1<=t<=1000)表示输入的组数。接下来每组第一行1个整数n（1<=n<=100000）三个实数a,b,c(a+b+c=100)接下来n行每行包括英雄的名字，字符串s（1<=len<=20,全为小写字母） 智育、德育、武育的分数（整数）。（1~100）
Output
每组第一行输出是第几组输出Case #t：接下来输出n行每行包括英雄的名字，总分，智育、德育、武育折合后的分数（保留四位小数）。
Sample Input
1
3 20.00  20.00  60.00
zhugeliang 90 80 0
zhangfei 0 0 100
guanyu 10 100 100
Sample Output
Case #1:
guanyu 82.0000 2.0000 20.0000 60.0000
zhangfei 60.0000 0.0000 0.0000 60.0000
zhugeliang 34.0000 18.0000 16.0000 0.0000

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    double zy, dy, wy, sum;
    char name[30];
} stu[105];
int cmp(sa a, sa b)
{
    if (a.sum != b.sum)
        return a.sum > b.sum;
    else if (a.zy != b.zy)
        return a.zy > b.zy;
    else if (a.dy != b.dy)
        return a.dy > b.dy;
    else if (a.wy != b.wy)
        return a.wy > b.wy;
}
int main()
{
    int t, n;
    double a, b, c;
    while (cin >> t)
    {
        for (int j = 1; j <= t; j++)
        {
            cin >> n >> a >> b >> c;
            for (int i = 1; i <= n; i++)
            {
                cin >> stu[i].name >> stu[i].zy >> stu[i].dy >> stu[i].wy;
                stu[i].zy *= b * 0.01;
                stu[i].dy *= a * 0.01;
                stu[i].wy *= c * 0.01;
                stu[i].sum = stu[i].zy + stu[i].dy + stu[i].wy;
            }
            sort(stu + 1, stu + 1 + n, cmp);
            cout << "Case #" << j << ":" << endl;
            for (int i = 1; i <= n; i++)
                printf("%s %.4lf %.4lf %.4lf %.4lf\n", stu[i].name, stu[i].sum, stu[i].zy, stu[i].dy, stu[i].wy);
        }
    }
    return 0;
}
```

*总结*
==注意看题（b，a，c！！）case后输出当前 j 的值==

### I 相约摩洛哥

*Description*
acm大赛排名规则：
    最后的获胜者为正确解答题目最多且总用时最少的队伍。每道试题用时将从竞赛开始到试题解答被判定为正确为止，其间每一次提交运行结果被判错误的话将被加罚20分钟时间，未正确解答的试题不记时。例如：A、B两队都正确完成两道题目，其中A队提交这两题的时间分别是比赛开始后1:00和2:45，B队为1:20和2:00，但B队有一题提交了2次。这样A队的总用时为1:00+2:45=3:45而B队为1:20+2:00+0:20=3:40，所以B队以总用时少而获胜。
*Input*
多组输入，每组一个正整数n（1<=n<=100000），代表有n个队伍参赛。接下来的n行，每行分别有一个字符串（只包含小写英文字母）作为队伍名，长度1<=len<=10;ABC三道题的ac时间（以分钟为单位），时间为-1表示该题没有ac。接下来又有n行，表示每道题的提交次数,用3个正整数表示。（保证没有成绩完全相同两支队伍）
*Output*
输出排行榜。n行，每行一个队伍的名字、解题数和总用时。
*Sample Input*
3
team 30 10 20
behappy 20 20 90
newbee 15 16 17
1 1 1
1 1 10
1 1 1
*Sample Output*
newbee 3 48
team 3 60
behappy 3 310

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    char name[15];
    int actime[4], sub[4], num, alltime;
} stu[100005];
int cmp(sa a, sa b)
{
    if (a.num != b.num)
        return a.num > b.num;
    return a.alltime < b.alltime;
}
int main()
{
    int n, x;
    while (cin >> n)
    {
        for (int i = 1; i <= n; i++)
        {
            cin >> stu[i].name;
            stu[i].num = 0;
            for (int j = 1; j <= 3; j++)
            {
                cin >> stu[i].actime[j];
                if (stu[i].actime[j] != -1)
                    stu[i].num++;
            }
        }
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= 3; j++)
                cin >> stu[i].sub[j];
        }
        for (int i = 1; i <= n; i++)
        {
            stu[i].alltime = 0;
            for (int j = 1; j <= 3; j++)
                if (stu[i].actime[j] != -1)
                    stu[i].alltime += stu[i].actime[j] + (stu[i].sub[j] - 1) * 20;
        }
        sort(stu + 1, stu + 1 + n, cmp);
        for (int i = 1; i <= n; i++)
            cout << stu[i].name << " " << stu[i].num << " " << stu[i].alltime << endl;
    }
    return 0;
}
```

*总结*
==未答对题目不罚时！！冷静分析需储存数据，先让程序跑起来再优化==

### J 结构体排序题一

*Description*
现在给定一组二维平面上面的点的坐标,保证它的坐标是int类型的整数且大于等于0小于等于99.请你按照数据所给要求进行排序.
首先先以横坐标进行排序,若横坐标相同则按纵坐标排序,降序或升序将以0和1的形式表示,0表示降序,1表示升序.
比如,若数据开头给出0 1的要求,则表示先以横坐标降序排列,若横坐标相同则按纵坐标升序排列.
再比如,若数据开头给出1 1的要求,则表示先以横坐标升序排列,若横坐标相同则按纵坐标升序排列.
保证点的数量大于等于3小于等于99
*Input*
第1行包含三个数字,第一个数字和第二个数字分别表示横坐标和纵坐标的排序要求,0表示降序,1表示升序,第三个数字n表示有几个点需要排序.
余下第2~n+1行每行各有两个类型为n个点的坐标,例如第2行第一个数字表示第一个点横坐标,第二个数字表示第一个点的纵坐标.
*Output*
输出n行坐标,一行表示一个点,格式如下:
(x0,y0)
*Sample Input*
0 0 4
1 1
1 2
2 1
2 2
1 1 4
2 2
2 1
1 2
1 1
*Sample Output*
(2,2)
(2,1)
(1,2)
(1,1)
(1,1)
(1,2)
(2,1)
(2,2)

```cpp
#include <bits/stdc++.h>
using namespace std;
int flagx, flagy, n;
struct sa
{
    int x, y;
} stu[100];
int cmp(sa a, sa b)
{
    if (!flagx && !flagy)
    {
        if (a.x != b.x)
            return a.x > b.x;
        else
            return a.y > b.y;
    }
    else if (!flagx && flagy)
    {
        if (a.x != b.x)
            return a.x > b.x;
        else
            return a.y < b.y;
    }
    else if (flagx && !flagy)
    {
        if (a.x != b.x)
            return a.x < b.x;
        else
            return a.y > b.y;
    }
    else if (flagx && flagy)
    {
        if (a.x != b.x)
            return a.x < b.x;
        else
            return a.y < b.y;
    }
}
int main()
{
    while (cin >> flagx >> flagy >> n)
    {
        for (int i = 1; i <= n; i++)
            cin >> stu[i].x >> stu[i].y;
        sort(stu + 1, stu + 1 + n, cmp);
        for (int i = 1; i <= n; i++)
            printf("(%d,%d)\n", stu[i].x, stu[i].y);
    }
    return 0;
}
```

*总结*
==可写多个cmp函数来对应不同flagx，flagy的值，也可只用一个cmp函数，通过全局变量的调用来判别排序方式==

### K 最强编码同学票数统计

*Description*
为了找出林大2020新生中最擅长编写代码的同学，学校发起了一场投票。通过同学报名、前期遴选等环节，共提名了100名同学作为选举人进行评选，假设他们的编号从1到100。现在学院已经采集到了n名同学的投票结果，请你找出得票最多的程序员获得的票数(注：就是让你找相同数字的个数的最大值)。
*Input*
输入：
第一行一个数n(1≤n≤100) , 代表有多少位同学投票。
第二行n个数:a1,a2⋯an,  ai(1≤ai≤100)代表第 i 位同学投票所选的林大最擅长编码的那个程序员的编号。输入数据有多组！
*Output*
输出：
每组数据的输出占一行 , 输出得票最多的那个同学获得的票数（相同编号的个数的最大值）。
*Sample Input*
输入样例1：
6
1 2 4 7 7 7
4
5 5 5 5
*Sample Output*
输出样例1：
3
4

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, x, a[105], ma;
    while (cin >> n)
    {
        memset(a, 0, sizeof(a));
        for (int i = 1; i <= n; i++)
        {
            cin >> x;
            a[x]++;
        }
        ma = -1;
        for (int i = 1; i <= 100; i++)
            ma = max(ma, a[i]);
        cout << ma << endl;
    }
    return 0;
}
```

*总结*
==经典桶排序计数==

## 主题：暴力枚举

### A 二倍的问题

*Description*
给定2到15个不同的正整数，你的任务是计算这些数里面有多少个数对满足：数对中一个数是另一个数的两倍。比如给定1 4 3 2 9 7 18 22，得到的答案是3，因为2是1的两倍，4是2个两倍，18是9的两倍。
*Input*
输入包括n组测试数据。每组数据包括一行，给出2到15个两两不同且小于100的正整数。每一行最后一个数是0，表示这一行的结束后，这个数不属于那2到15个给定的正整数。
*Output*
对每组输入数据，输出一行，给出有多少个数对满足其中一个数是另一个数的两倍。
*Sample Input*
3
1 4 3 2 9 7 18 22 0
2 4 8 10 0
7 5 11 13 1 3 0
*Sample Output*
3
2
0

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, x, j, ans, a[20];
    cin >> n;
    while (n--)
    {
        j = ans = 0;
        while (cin >> x && x)
            a[++j] = x;
        for (int i = 1; i <= j; i++)
        {
            for (int k = i + 1; k <= j; k++)
            {
                if (a[i] == 2 * a[k] || a[k] == 2 * a[i])
                    ans++;
            }
        }
        cout << ans << endl;
    }
    return 0;
}
```

==以上为不优化的暴力解法，两层for循环遍历数组，逐个判断==

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, x, j, ans, a[20], vis[205];
    cin >> n;
    while (n--)
    {
        memset(vis, 0, sizeof(vis));
        j = ans = 0;
        while (cin >> x && x)
            a[++j] = x;
        sort(a + 1, a + 1 + j);
        for (int i = 1; i <= j; i++)
        {
            if (vis[a[i]])
                ans++;
            vis[2 * a[i]]++;
        }
        cout << ans << endl;
    }
    return 0;
}
```

==优化后时间复杂度仅为数组长度 j ==
*总结*
==虽然暴力求解，但也需要优化算法来降低复杂度，提高运行效率==

### B 大乐透

*Description*
纸牌游戏里玩家必须从{1,2,……，49}中选择6个数。玩Lotto的一个流行策略是：就是从这49个数中，选出k（k>6）个数组成一个子集S，然后只从S里拿出牌来玩几局游戏。例如，k=8，s={1,2,3,5,8,13,21,34}，那么有28场可能的游戏：[1,2,3,5,8,13],[1,2,3,5,8,21],[1,2,3,5,8,34],[1,2,3,5,13,21],……,[3,5,8,13,21,24]。
读取数字k和一组数S，输出由S中的数组成的所有可能的游戏。
*Input*
输入数据有多组，每组一行，每行有多个整数，其中第一个整数为数字k，接下来有k个整数，即子集S。当k为0，输入结束。
*Output*
输出由S中的数组成的所有可能的游戏。每种游戏一行。
*Sample Input*
7 1 2 3 4 5 6 7
0
Sample Output
1 2 3 4 5 6
1 2 3 4 5 7
1 2 3 4 6 7
1 2 3 5 6 7
1 2 4 5 6 7
1 3 4 5 6 7
2 3 4 5 6 7

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int k, a[50];
    while (cin >> k && k)
    {
        for (int i = 1; i <= k; i++)
            cin >> a[i];
        for (int i = 1; i <= k; i++)
        {
            for (int j = i + 1; j <= k; j++)
            {
                for (int m = j + 1; m <= k; m++)
                {
                    for (int n = m + 1; n <= k; n++)
                    {
                        for (int p = n + 1; p <= k; p++)
                        {
                            for (int q = p + 1; q <= k; q++)
                                cout << a[i] << " " << a[j] << " " << a[m] << " " << a[n] << " " << a[p] << " " << a[q] << endl;
                        }
                    }
                }
            }
        }
    }
    return 0;
}
```

*总结*
==没啥意思，找 k 个元素的集合中包含6个元素的子集，考虑是否可以用二进制枚举优化==

### C 密码箱

*Description*
小明的密码箱打不开了，小明的密码箱是传统的3位滚轮密码。小明完全不记得他的密码了，所以他从 000开始以升序开始尝试，他已经试到第abc位密码了，可是箱子还是没有打开，他希望你将之后所有可能尝试的密码输出，这样他就可以完全不去思考，让他波动密码盘更有效率
*Input*
每行输入一个整数n(0 < n < 1000);n没有前缀0。
*Output*
n之后所有可能尝试的密码;输出有前缀0的。
*Sample Input*
989
*Sample Output*
990
991
992
993
994
995
996
997
998
999

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    while (cin >> n)
    {
        n++;
        while (n < 1000)
        {
            printf("%03d\n", n);
            n++;
        }
    }
    return 0;
}
```

*总结*
==%03d可自动在前补零==

### D 字符串统计

*Description*
对于给定的一个字符串，统计其中数字字符出现的次数。
*Input*
输入数据有多组，第一行是一个整数n，表示测试实例的个数，后面跟着n行，每行包括一个由字母和数字组成的字符串。
*Output*
对于每个测试实例，输出该串中数值的个数，每个输出占一行。
*Sample Input*
2
asdfasdf123123asdfasdf
asdf111111111asdfasdfasdf
*Sample Output*
6
9

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, num;
    char str[300];
    while (cin >> n)
    {
        for (int i = 1; i <= n; i++)
        {
            cin >> str;
            num = 0;
            for (int j = 0; str[j] != '\0'; j++)
            {
                if (str[j] <= '9' && str[j] >= '0')
                    num++;
            }
            cout << num << endl;
        }
    }
    return 0;
}
```

*总结*
==c++简单应用==

### E 丑数

*Description*
只有质数2,3,5,7这几个作为因子的数叫做,丑数,比如前20个丑数是(从小到大来说) 1,2,3,4,5,6,7,8,9,10,12,14,15,16,18,20,21,24和25.
*Input*
我们给你个n（1<=m<=5842）当输入n为0结束。
*Output*
输出第n个丑数。每个数一行。
*Sample Input*
1
2
3
4
11
*Sample Output*
1
2
3
4
12

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, cnt, a[6000] = {0, 1};
    int p2, p3, p5, p7;
    p2 = p3 = p5 = p7 = 1;
    cnt = 2;
    while (cnt <= 5842)
    {
        a[cnt] = min(min(2 * a[p2], 3 * a[p3]), min(5 * a[p5], 7 * a[p7]));
        if (a[cnt] == 2 * a[p2])
            p2++;
        if (a[cnt] == 3 * a[p3])
            p3++;
        if (a[cnt] == 5 * a[p5])
            p5++;
        if (a[cnt] == 7 * a[p7])
            p7++;
        cnt++;
    }
    while (cin >> n && n)
    {
        cout << a[n] << endl;
    }
    return 0;
}
```

*总结*
==用四个指针px指向目前没有乘x的最大元素，下一个 ==

### F 矩形

*Description*
在测试超大规模集成电路时，对给定的一个设计，专家要检测元件是否相互遮盖。一个元件可视为一个矩形，假设每个矩形都是水平排列的（边与x轴或y轴平行），所以长方形由最小的和最大的x，y坐标表示。编程计算完全被覆盖的矩形个数。
*Input*
输入有多组长方形实例。对每组长方形，第一个数字是长方形的数量，然后是长方形的最小和最大x，y坐标（最小x，最大x，最小y，最大y）。
*Output*
对每组输入数据，输出一行，是被完全覆盖的长方形数量。
*Sample Input*
3
100 101 100 101
0 3 0 101
20 40 10 400
4
10 20 10 20
10 20 10 20
10 20 10 20
10 20 10 20
*Sample Output*
0
4

```cpp
#include <bits/stdc++.h>
using namespace std;
struct sa
{
    int x1, x2, y1, y2;
} sq[100];
int main()
{
    int n, num;
    while (cin >> n)
    {
        for (int i = 1; i <= n; i++)
        {
            cin >> sq[i].x1 >> sq[i].x2 >> sq[i].y1 >> sq[i].y2;
        }
        num = 0;
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (i == j)
                    continue;
                if (sq[i].x1 >= sq[j].x1 && sq[i].x2 <= sq[j].x2 && sq[i].y1 >= sq[j].y1 && sq[i].y2 >= sq[j].y2)
                {
                    num++;
                    break;
                }
            }
        }
        cout << num << endl;
    }
    return 0;
}
```

*总结*
==结构体数组储存，暴力判断，条件：编号不同、完全覆盖，不用全部完全覆盖==

### G 抽奖

*Description*
n 个不同的获奖号码，小谢的号码 num，如果小谢获奖了，请输出他中的是第几个号码；如果没有中奖，请输出 0。
*Input*
第一行一个正整数 n，表示有 n 个获奖号码，2<n≤100。
第二行包含 n 个正整数，之间用一个空格隔开，表示依次公布的 n 个获奖号码。
第三行一个正整数 num，表示小谢抽奖券上的号码。
1≤获奖号码，num<10000。
*Output*
一行一个整数，如果小谢中奖了，表示中奖的是第几个号码；如果没有中奖，则为 0。
*Sample Input*
7
17 2 3 4 9555 6 1
3
*Sample Output*
3
*Hint*
暴力
单组输入

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int n, num, a[105], flag;
    cin >> n;
    flag = 0;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
    }
    cin >> num;
    for (int i = 1; i <= n; i++)
    {
        if (num == a[i])
        {
            cout << i;
            flag = 1;
            break;
        }
    }
    if (!flag)
        cout << "0";
    return 0;
}
```

*总结*
==暴力比对==

[牛奶碑文](http://acm.nefu.edu.cn/problemShow.php?problem_id=1644)
字符串子串的经典处理方法，要牢记会用

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
int main()
{
    int n;
    char str[100005];
    cin >> n >> str;
    ll sum1 = 0, sum2 = 0, sum3 = 0;
    for (int i = 0; i < n; i++)
    {
        if (str[i] == 'C')
            sum1++;
        else if (str[i] == 'O')
            sum2 += sum1;
        else if (str[i] == 'W')
            sum3 += sum2;
    }
    cout << sum3 << endl;
    return 0;
}
```
