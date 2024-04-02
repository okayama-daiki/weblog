---
tags: [ABC, D, BFS]
---

# ABC235 D - Multiply and Rotate

[https://atcoder.jp/contests/abc235/tasks/abc235_d](https://atcoder.jp/contests/abc235/tasks/abc235_d)

> はじめに結論を言うと、この問題は『$1$ から $10^6-1$ までの正の整数を頂点』『$2$ つの操作を 別の頂点へのコスト $1$ の辺』とみなすことで、最短経路問題として扱うことができるので、BFS（幅優先探索）を使うことにより解くことができます。

問題の状況は、例えば $a = 32$ とすると、自然数の頂点と、 $(u,v) = (1,32), (32, 23), (23, 23*32), ...$ の辺が存在していることである。
これを頂点 $N$ に到達するまで BFS を行う。

但しこれをそのまま実装すると、頂点は無限に存在することになり TLE してしまうため、頂点がある程度の点に達したら、探索を打ち切る必要がある。

ここでどちらの操作も $x$ の桁数を減らすことはないことに着目すると、与えられた $N$ の桁数以上の頂点から、 $N$ に到達することはないと分かる。よって $N$ の桁数以上の値を超えたものは無視してよい。

```py
def lotate(n): return int(str(n)[-1]+str(n)[:-1])
from collections import deque
a,n = map(int,input().split())

max_ = pow(10, len(str(n))+1)
que = deque([1])
visited = [0 for _ in range(max_)]
visited[1] = 1

ans = -1
while que:
    now = que.popleft()
    if now == n:
        ans = visited[n] - 1
        break
    if now*a < max_ and not visited[now*a]:
        que.append(now*a)
        visited[now*a] = visited[now]+1
    if now % 10 and n > 9 and not visited[lotate(now)]:
        que.append(lotate(now))
        visited[lotate(now)] = visited[now]+1
print(ans)
```

PyPy で提出
