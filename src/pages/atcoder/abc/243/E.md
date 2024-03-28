---
tags: [ABC, E, 最短経路]
---

# ABC243 E - Edge Deletion

[https://atcoder.jp/contests/abc243/tasks/abc243_e](https://atcoder.jp/contests/abc243/tasks/abc243_e)  
青色下位。最短経路。

条件を言い換える。
「 $u$ , $v$ を結ぶコスト $c$ の辺が必要ない」<=>「頂点 $k$ を経由して $u$ から $v$ に辿り着くコストが $c$ 以下である」
$k$ を経由した方が早く着くのだから、当然直接結ぶ辺は必要がないということである。

```py
INF = float('inf')

n, m = map(int, input().split())
abc = [list(map(int, input().split())) for _ in range(m)]

d = [[INF] * n for _ in range(n)]
for i in range(m):
    a, b, c = abc[i]
    a -= 1
    b -= 1
    d[a][b] = d[b][a] = c

for k in range(n):
    for u in range(n):
        for v in range(n):
            if d[u][v] > d[u][k] + d[k][v]:
                d[u][v] = d[u][k] + d[k][v]

ans = 0
for i in range(m):
    a, b, c = abc[i]
    a -= 1
    b -= 1
    for k in range(n):
        if c >= d[a][k] + d[k][b]:
            ans += 1
            break

print(ans)
```
