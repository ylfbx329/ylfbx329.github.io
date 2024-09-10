---
title: 'AtCoder Beginner Contest 242'
summary: AtCoder Beginner Contest 242题解记录
date: 2022-03-11T09:51:37+08:00
categories: 题解
# draft: true
---
# AtCoder Beginner Contest 242

## A T-shirt 水题

## B Minimize Ordering 水题

## C 1111gal password

### 思路

数位DP
设 f[i][j] 表示考虑到前 i 个数位，第 i 个数位上填写的数字为 j 的数的个数
转移方程：$f[i][j]=f[i−1][k], max(1,j−1)≤k≤min(n,j+1)$

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e6 + 10;
const int mo = 998244353;
int f[N][10];
int main()
{
    int n;
    cin >> n;
    for (int i = 1; i <= 9; i++)
        f[1][i] = 1;
    for (int i = 2; i <= n; i++)
        for (int j = 1; j <= 9; j++)
            for (int k = j - 1; k <= j + 1; k++)
            {
                if (k < 1 || k > 9)
                    continue;
                (f[i][j] += f[i - 1][k]) %= mo;
            }
    int ans = 0;
    for (int i = 1; i <= 9; i++)
        (ans += f[n][i]) %= mo;
    cout << ans << endl;
    return 0;
}
```

## D ABC Transform

### 思路

依次写出进行 1~t 次变换的所有所有变化的话，可以发现，这些变化形成了 n 棵以原字符串的 n 个位置为根节点，深度为 t 的完全二叉树（根节点深度为 0）
每个根节点都对应一段最后生成字符串中的一个长度为 2t 的连续区间（叶节点），因此给出一个 k 我们可以在 O(log2n) 的时间复杂度内，定位编号为 k 的这个叶节点是哪个根节点派生的
考虑从编号为 k 的这个叶子节点往上去寻找从根节点的唯一路径，这条路径就可以推出当前叶子节点的答案。
模拟上述过程，可以发现，k的规模每次减少一半，log2k次计算后，必然为1，这意味着，由于 k 的规模的限制，在开始的很长一段时间内，都是往左子树走的
然后我们发现，**往左子树连续走 3 次是没有意义的**，因为会重新回到根节点的值，这样每次计算的规模就被我们简化到 3+log2k 次了，这样直接模拟就可以了
时间复杂度为O(|s|+Qlog2k)

### 代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;
inline char getleft(char x)
{
    return (x - 'A' + 1) % 3 + 'A';
}
inline char getright(char x)
{
    return (x - 'A' + 2) % 3 + 'A';
}
signed main()
{
    std::ios::sync_with_stdio(false);
    cin.tie(0), cout.tie(0);
    string s;
    cin >> s;
    int q;
    cin >> q;
    while (q--)
    {
        int t, k;
        cin >> t >> k;
        int id;
        if (t >= 60)
            id = 0;
        else
        {
            int left = 1, right = (1ll << t), x = 0;
            while (true)
            {
                if (k >= left && k <= right)
                {
                    id = x;
                    k = k - left + 1;
                    break;
                }
                x++;
                left += (1ll << t);
                right += (1ll << t);
            }
        }
        int tm = 0;
        char now = s[id];
        for (int i = 1; i <= t; i++)
        {
            if (k == 1)
            {
                tm = t - i + 1;
                break;
            }
            if (k & 1)
                now = getleft(now);
            else
                now = getright(now);
            k = (k - 1) / 2 + 1;
        }
        tm %= 3;
        for (int i = 1; i <= tm; i++)
            now = getleft(now);
        cout << now << '\n';
    }
    return 0;
}
```

## E (∀x∀)

### 思路

考虑回文字符串由前面大约 n/2 个字符翻转拼接而成
若前面这些字符串的字典序已经比原串的字典序小了，那么这个回文串的字典序一定比原串小
问题转化为，前 n/2 个字符构成的字符串，有多少个字符串的字典序比它小，可用数位dp，解决方式类似 C 题
若前 n/2 和原字符串字典序相同，还可能构成 1 个字符串，这样我们需要把这个字符串构造出来，和原串比较字典序即可

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int mo = 998244353;
const int N = 1e6 + 10;
string s;
int n, l;
int f[N][2];
int dfs(int now, bool lim)
{
    if (now == l + 1)
        return 1;
    if (f[now][lim] != -1)
        return f[now][lim];
    int res = 0;
    for (char i = 'A'; i <= (lim ? s[now] : 'Z'); i++)
        (res += dfs(now + 1, lim && i == s[now])) %= mo;
    return f[now][lim] = res;
}
int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        cin >> n;
        cin >> s;
        for (int i = 0; i <= n; i++)
            f[i][0] = f[i][1] = -1;
        l = (s.length() - 1) / 2;
        int ans = dfs(0, 1);
        string t = "";
        if (s.length() & 1)
        {
            for (int i = 0; i <= l; i++)
                t += s[i];
            for (int i = l - 1; i >= 0; i--)
                t += s[i];
        }
        else
        {
            for (int i = 0; i <= l; i++)
                t += s[i];
            for (int i = l; i >= 0; i--)
                t += s[i];
        }
        if (t > s)
        {
            ans = (ans - 1 + mo) % mo;
        }
        cout << ans << endl;
    }
    return 0;
}
```

## F Black and White Rooks

### 思路

若方案合法，则黑棋和白棋会在不同的行和列上。
设 f[x][y] 表示，b个黑棋放置在x个不同的行，y个不同的列上，不相互攻击的方案数
设g[x][y]表示，w个白棋放置在x个不同的行，y个不同的列上，不相互攻击的方案数
那么最后的答案就是：$\sum_{1≤x1,x2≤n,1≤y1,y2≤m,x1+x2≤n,y1+y2≤m}(n,x1)(n−x1,x2)(m,y1)(m−y1,y2)⋅f[x1][y1]⋅g[x2][y2]$。

考虑如何求 f[i][j] 和 g[i][j]，我们以前者为例。

首先，如果在这个 i×j 个格子中任意选择 b 个格子，摆放上黑子，方案数为(i⋅j,b)。

这些方案中，有一些方案，会有空的行或者列，也就意味着实际上的黑子集中在这样一个 p×q 的格子中(1≤p≤i,1≤q≤j，且 p=i 和 q=j 不同时成立)。

这样，原来的问题就化归到若干个规模更小的子问题上。即：
$f[x][y]=(x⋅yb)−∑1≤i≤x,1≤j≤y,(i,j)≠(x,y)f[i][j]$
同理，
$g[x][y]=(x⋅yw)−∑1≤i≤x,1≤j≤y,(i,j)≠(x,y)g[i][j]$
如果我们通过杨辉三角，预处理出 nm×nm 规模的组合数，就可以快速计算组合数的值

### 代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;
const int mo = 998244353;
const int N = 55;
int c[N * N][N * N];
int f[N][N], g[N][N];
signed main()
{
    c[0][0] = 1;
    for (int i = 1; i <= 50 * 50; i++)
    {
        c[i][0] = c[i][i] = 1;
        for (int j = 1; j <= 50 * 50; j++)
            c[i][j] = (c[i - 1][j - 1] + c[i - 1][j]) % mo;
    }
    int n, m, b, w;
    cin >> n >> m >> b >> w;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
        {
            f[i][j] = c[i * j][b];
            for (int f1 = 1; f1 <= i; f1++)
                for (int f2 = 1; f2 <= j; f2++)
                {
                    if (f1 == i && f2 == j)
                        continue;
                    f[i][j] = ((f[i][j] - f[f1][f2] * c[i][f1] % mo * c[j][f2] % mo) % mo + mo) % mo;
                }
        }
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
        {
            g[i][j] = c[i * j][w];
            for (int f1 = 1; f1 <= i; f1++)
                for (int f2 = 1; f2 <= j; f2++)
                {
                    if (f1 == i && f2 == j)
                        continue;
                    g[i][j] = ((g[i][j] - g[f1][f2] * c[i][f1] % mo * c[j][f2] % mo) % mo + mo) % mo;
                }
        }
    int ans = 0;
    for (int p1 = 1; p1 <= n; p1++)
        for (int p2 = 1; p1 + p2 <= n; p2++)
            for (int q1 = 1; q1 <= m; q1++)
                for (int q2 = 1; q1 + q2 <= m; q2++)
                {
                    (ans += c[n][p1] * c[n - p1][p2] % mo * c[m][q1] % mo * c[m - q1][q2] % mo * f[p1][q1] % mo * g[p2][q2] % mo) %= mo;
                }
    cout << ans << endl;
    return 0;
}
```
