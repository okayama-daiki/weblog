---
tags: [Graph, ABC, E, FunctionalGraph]
---

# ABC256 E - Takahashi's Anguish

[https://atcoder.jp/contests/abc256/tasks/abc256_e](https://atcoder.jp/contests/abc256/tasks/abc256_e)

水色下位。グラフ理論。

不満がたまるのは $i$ → $X_i$ を満たした時のみであるから、基本的には $X_i$ → $i$ を満たすように順番を決めれば不満が貯まることはない。

では一体どんな場合に不満が貯まるのかというと、この関係に閉路ができている場合である。具体的には、例えば 3 名 $1,2,3$ が $1$ → $2$ , $2$ → $3$ , $3$ → $1$ のような関係にある場合は不満が貯まるのは避けられない。

つまり $i$ → $X_i$ を辺と見た時にできる各閉路について、閉路を構成する要素のうちもっとも不満度が低いものが答えとなる。

$\{1, 2, 3, ..., N\}$ → $\{1, 2, 3, ..., N\}$ への写像であるような今回の問題は Functional Graph と呼ぶらしく、性質として各連結成分にはただひとつの閉路が必ず存在するらしい。
証明：[https://atcoder.jp/contests/abc256/tasks/abc256_e/editorial](https://atcoder.jp/contests/abc256/tasks/abc256_e/editorial)

```py
import sys


sys.setrecursionlimit(10 ** 7)

n = int(input())
x = list(map(lambda x: int(x) - 1, input().split()))
c = list(map(int, input().split()))


visited = [False] * n


def dfs(u):
    path.append(u)
    if visited[u]:
        return
    visited[u] = True
    dfs(x[u])


ans = 0
for start in range(n):
    if not visited[start]:
        path = []
        dfs(start)
        for i in range(len(path) - 1):
            if path[i] == path[-1]:
                ans += min(map(lambda i: c[i], path[i:]))

print(ans)

```

Functional Graph の場合、上のように DFS を行わなくても、DSU だけで閉路の検出と列挙が出来る。

```py
from atcode.dsu import DSU

n = int(input())
x = list(map(lambda x: int(x) - 1, input().split()))
c = list(map(int, input().split()))


dsu = DSU(n)
ans = 0
for u, v in enumerate(x):
    if not dsu.same(u, v):
        dsu.merge(u, v)
        continue
    drop = c[u]
    while x[v] != u:
        v = x[v]
        drop = min(drop, c[v])
    ans += min(drop, c[v])

print(ans)

```
