---
tags: [配列の再利用, DP, 木, ABC, E]
---

# ABC222 E - Red and Blue Tree

[https://atcoder.jp/contests/abc222/tasks/abc222_e](https://atcoder.jp/contests/abc222/tasks/abc222_e)  
水色上位。DP。

**知見**
木上では任意の 2 頂点の最短経路は一つに定まる
木上での任意の 2 頂点の最短経路は DFS により求められる（BFS よりも計算量は小さそう？）
$a_1,a_2,\ldots,a_n$ の各要素から任意に選ぶ時、選んだ要素の合計が $j$ になるような選び方の場合の和は 1 次元の DP により求められる
内側の for ループを逆順に回せば良い
$a_1,a_2,\ldots,a_n$ の要素を二つに分けそれぞれの和を $x,y$ とするとき、 $x-y=k$ を満たすような分け方は何通りあるかという問題は、 $s=a_1+a_2+\dots+a_n$ として、 $\frac{s+k}{2}$ となる選び方が何通りあるかという問題に帰着できる
連立方程式 $x-y=k,x+y=s$ を解く要領
勿論 $\frac{s-k}{2}$ となる選び方の総数と一致する
$s+k$ が偶数、0 以上であることは保証されないことに注意

**解法**
木のままでは問題が考えにくいため、実際に操作を行った際にどの辺が使われるのかを考える。各操作について最短経路を求めていくが、木の上での最短経路は一意に定まることを考えると、どの辺が何回使われるのかという情報は事前に求めることができる。

```py
def dfs(u, p=-1):
    if u == target:
        return True
    for v, i in tree[u]:
        if v == p:
            continue
        if dfs(v, u):
            use[i] += 1
            return True
    return False


use = [0] * (n - 1)
for i in range(m - 1):
    target = a[i + 1]
    dfs(a[i])

```

あとは`use`の各要素を 2 つの部分集合に分け、それらの差が $k$ となるような分け方を求めれば良い。

（はまやんの解法では`dp[i][j] := use[:i]を利用して、和がjになるような選び方(jは整数)`と力ずくで求めていたが、バグらせて AC できなかったため、以下は公式解法）

2 つの部分集合の和を $a,b$ とすると、 $k=a-b$ と表現できる（ $a,b$ は入れ替えても一般性を失わない）。ここで $s=a+b$ を導入すると、 $a=\frac{s+k}{2}$ により、`use`の各要素から和が $\frac{s+k}{2}$ となるような選び方の総数が解となる。

以上から`use`の各要素を利用してある数 $x$ がいくつ作れるかを DP によって求めればよい。
だがしかし、`dp[i][j] := use[:i]を利用して、和がjになるような選び方(j>=0)`とすると $j$ は最大 $100,000$ となり、 $100\times100,000=10,000,000$ サイズの DP では少し計算時間が怪しいらしい。（実際に PyPy では TLE）
（ $j=100,000$ となるのはパスグラフで両端を行ったり来たりする例）

そこで配列の再利用を行うことにより、空間計算量 $O(100,000)$ で DP を行う。
2 本の配列を利用すれば（ギリギリ）問題ないが、2 つ目のループの更新を逆順にすれば 1 本の配列でも（貰う）DP が可能となる。

**（追記）2 周目のループの上限を動的に変更することにより、配列の再利用を行うことなく AC した例もある。**
[https://atcoder.jp/contests/abc222/submissions/26464265](https://atcoder.jp/contests/abc222/submissions/26464265)

```py
import sys

sys.setrecursionlimit(10**6)

MOD = 998244353

n, m, k = map(int, input().split())
a = list(map(lambda x: int(x) - 1, input().split()))

tree = [[] for _ in range(n)]
for i in range(n - 1):
    u, v = map(lambda x: int(x) - 1, input().split())
    tree[u].append((v, i))
    tree[v].append((u, i))


def dfs(u, p=-1):
    if u == target:
        return True
    for v, i in tree[u]:
        if v == p:
            continue
        if dfs(v, u):
            use[i] += 1
            return True
    return False


use = [0] * (n - 1)
for i in range(m - 1):
    target = a[i + 1]
    dfs(a[i])

max_k = sum(use)

# dp[i] := useの各要素のうち、選んだ要素の和がiになる場合の数
dp = [0] * (max_k + 1)
dp[0] = 1

for i in range(n - 1):
    for j in reversed(range(max_k + 1)):
        if j - use[i] >= 0:
            dp[j] += dp[j - use[i]]
            dp[j] %= MOD

if (max_k - k) % 2 == 0 and 0 <= (max_k - k) // 2 <= max_k:
    print(dp[(k + max_k) // 2])
else:
    print(0)
```
