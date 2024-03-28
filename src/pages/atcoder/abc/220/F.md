---
tags: [ABC, F, 木DP, 全方位木DP]
---

# ABC220 F - Distance Sums 2

[https://atcoder.jp/contests/abc220/tasks/abc220_f](https://atcoder.jp/contests/abc220/tasks/abc220_f)  
水色下位。全方位木 DP。

頂点 1 を根とする木を考えると、各頂点を根とする部分木の頂点数は木 DP により $O(N)$ で求まる。

頂点 $u$ に対する解が求まったとして、頂点 $u$ に隣接する頂点 $v$ に対する解を考えたい。
頂点 $v$ を頂点とする部分木に対する頂点群への距離は 1 縮まり、それ以外の頂点に関しては距離が 1 増えたと考えられるため、`dp[v] = dp[u] + d[v] - (n - d[v])`として計算できる。(`d`は部分木の頂点数)

```py
import sys

sys.setrecursionlimit(10**6)


def dfs(u, p=-1):
    d[u] += 1
    for v in tree[u]:
        if v == p:
            continue
        dfs(v, u)
        d[u] += d[v]


def dfs2(u, p=-1):
    for v in tree[u]:
        if v == p:
            continue
        dp[v] = dp[u] - d[v] * 2 + n
        dfs2(v, u)


n = int(input())

tree = [[] for _ in range(n)]
for _ in range(n - 1):
    u, v = map(lambda x: int(x) - 1, input().split())
    tree[u].append(v)
    tree[v].append(u)

# d[u] := 頂点1をrootとしたときの、頂点uを頂点とする部分木の個数
d = [0] * n

dfs(0)

dp = [0] * n
dp[0] = sum(d) - n

dfs2(0)

print(*dp, sep='\n')

```
