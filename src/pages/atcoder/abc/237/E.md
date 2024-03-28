---
tags: [最短経路, ABC, ポテンシャル, E, ダイクストラ法]
---

# ABC237 E - Skiing

[https://atcoder.jp/contests/abc237/tasks/abc237_e](https://atcoder.jp/contests/abc237/tasks/abc237_e)  
水色下位。最短経路。

負辺の存在によりナイーブにはダイクストラ法を適用できない。そこで問題の性質に着目する。

少し問題設定を変え、上りのコストを $1\times(H_y-H_x)$ と定める。すると例えば広場 $a_1,$ 広場 $a_2,$ $\ldots,$ 広場 $a_n$ のように移動したとき、そのコストの合計は $(H_{a_2}-H_{a_1})+(H_{a_3}-H_{a_2})+\ldots+(H_{a_n}-H_{a_{n-1}})=H_{a_n}-H_{a_1}$ により、これは最初と最後の広場の高さの差となる。
任意の広場は行き来可能なため、広場 $1$ から最も標高の低い広場との標高の差がこの問題設定上での解として得られる。（つまり最短経路問題を解くことなく任意に終点を決定した時のコストが $O(1)$ で定まるということ）

実際には上りのコストは $2\times(H_y-H_x)$ であるから、上りのコストに $(H_y-H_x)$ 、下りのコストに $0$ がかかると考えれば、負辺の存在しないダイクストラ法を解くことにより、広場 1 から任意の広場に到達するまでの**上りにかかるのコストの和**
が求められる。

よって各頂点について、広場の差に上りコストの和を除いたものを求め、それらの最大値をとったものが最終的な解となる。

```py
import heapq

INF = float('inf')

n, m = map(int, input().split())
h = list(map(int, input().split()))
graph = [[] for _ in range(n)]
for _ in range(m):
    u, v = map(lambda x: int(x) - 1, input().split())
    graph[u].append((v, max(h[v] - h[u], 0)))
    graph[v].append((u, max(h[u] - h[v], 0)))

que = []
costs = [INF] * n

que.append((0, 0))
costs[0] = 0

while que:
    temp_cost, u = heapq.heappop(que)
    if costs[u] < temp_cost:
        continue
    for v, c in graph[u]:
        if costs[v] > costs[u] + c:
            costs[v] = costs[u] + c
            heapq.heappush(que, (costs[v], v))

ans = 0
for u in range(n):
    ans = max(ans, h[0] - h[u] - costs[u])

print(ans)

```
