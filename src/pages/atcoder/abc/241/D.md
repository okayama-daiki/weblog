---
tags: [ABC, D, 主客転倒, UnionFind]
---

# ABC241 D - Sum of Maximum Weights

[https://atcoder.jp/contests/abc214/tasks/abc214_d](https://atcoder.jp/contests/abc214/tasks/abc214_d)

水色下位。UnionFind。

任意の 2 頂点について調べると $O(N^2)$ なり間に合わない。
数列 $A$ の各要素間の二乗和 $\sum^n_{i=1}\sum^n_{j=i+1}A_i\times A_j$ 等であれば式変形により $O(N)$ の解法を見つけられそうだが、今回は木の上であるため思いつかず。

**POINT**
辺が $N-1$ 個しか存在しないことを考えると、 $f(i, j)$ の解になり得るのは高々 $N-1$ 個しかないため、**i, j を全探索するのではなく、f(i, j)の取り得る値を全探索する**のが解法への道となる。主客転倒（しゅかくてんとう）というらしい。

また、異なる連結成分に属する頂点間の最短パスには、その連結成分を結ぶ辺を必ず通ることになるため、辺の重みの小さい順に UnionFind で木を構成していくことにより問題を解くことができる。

```py
from atcoder.dsu import DSU


n = int(input())
uvw = [list(map(int, input().split())) for _ in range(n - 1)]
uvw.sort(key=lambda x: x[2])

dsu = DSU(n)
ans = 0
for u, v, w in uvw:
    ans += dsu.size(u - 1) * dsu.size(v - 1) * w
    dsu.merge(u - 1, v - 1)

print(ans)

```
