---
tags: [ABC, F, DP]
---

# ABC291 F - Teleporter and Closed off

[https://atcoder.jp/contests/abc291/tasks/abc291_f](https://atcoder.jp/contests/abc291/tasks/abc291_f)

水色上位。DP。

**keywords**
頂点を通らない　頂点 k を通らない　特定の頂点を通らない　ある頂点を通らない　ある都市を通らない　 k を通らない

---

`# dp0[i] := v(0) ~ v(i)への最短距離`
`# dp1[i] := v(i) ~ v(N - 1)への最短距離`

2 つの DP 配列を用意することで任意の辺を通るような最短距離を求めることが出来る。
今回の制約では、各頂点に隣接した頂点が高々 10 個かつ連続した頂点番号上に存在するため、`k`を通らないような辺を全探索すればよいこととなる。

躓いた点は
`dp0`,`dp1`の計算を最初 DFS 順でやっていた
TLE（頂点`i`に対して頂点`i+1~i+m`が隣接しているようなグラフにおいて、計算量は $O(M^N)$ ）
`dp1`をどう埋めるか
有効辺の逆辺を管理し、その情報に基づいて`dp1`を逆順に埋めようと試みたが WA した
`for i in range(n)[::-1]: for j in graph[j] ...`としていたことに後々気づく
実は有効辺の逆辺を保存していなくても、もとの有効辺のみで`dp1`を埋めることができる（実装例参照）

```py
INF = float("inf")

n, m = map(int, input().split())

graph = [[] for _ in range(n)]

edges = set()

for i in range(n):
    s = input()
    for j in range(m):
        if s[j] == "1":
            graph[i].append(i + j + 1)
            edges.add((i, i + j + 1))

# dp0[i] := v(0) ~ v(i)への最短距離
dp0 = [INF] * n
# dp1[i] := v(i) ~ v(N - 1)への最短距離
dp1 = [INF] * n

dp0[0] = 0
for u in range(n):
    for v in graph[u]:
        dp0[v] = min(dp0[v], dp0[u] + 1)

dp1[-1] = 0
for u in range(n)[::-1]:
    for v in graph[u]:
        dp1[u] = min(dp1[u], dp1[v] + 1)

for k in range(1, n - 1):
    ans = INF
    for via in range(k - m, k):
        for exit in range(k + 1, k + m + 1):
            if (via, exit) in edges:
                ans = min(ans, dp0[via] + dp1[exit] + 1)
    if ans is INF:
        print(-1)
    else:
        print(ans)

```
