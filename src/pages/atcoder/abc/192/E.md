---
tags: [ダイクストラ法, 最短経路, グラフ, ABC, E]
---

# ABC192 E - Train

[https://atcoder.jp/contests/abc192/tasks/abc192_e](https://atcoder.jp/contests/abc192/tasks/abc192_e)  
緑上位。

次の列車までの時刻を計算することで、ダイクストラ法が適用できる。
蟻本のダイクストラ法実装では間に合わないので注意。

蟻本の問題点
枝刈りが行われていない
`d`(スタートから各ノードについての最短距離)の更新が複数回行われている

改善点
`d`(スタートから各ノードについての最短距離)の更新は各ノードにつき一度にする
`heapq`から初めて取り出されたものが最短距離
探索の枝刈り（効果のある順番に）
(1) 最短距離が確定した（`d`で値の更新があった）ノードについては探索を行わない
(2) 目的ノードの距離が確定したら探索終了
(3) 探索が終了したノードについては`heapq`に入れない

他にも`heapq`にタプルを突っ込まないなどの工夫があるようだがここでは割愛。
詳しくは[https://qiita.com/ansain/items/8a2762446cdf2eb47759](https://qiita.com/ansain/items/8a2762446cdf2eb47759) まで

```py
import heapq
import math

n, m, x, y = map(int, input().split())
x -= 1; y -= 1
graph = [[] for i in range(n)]

for _ in range(m):
    a, b, t, k = map(int, input().split())
    a -= 1; b -= 1
    graph[a].append((b, t, k))
    graph[b].append((a, t, k))

que = [(0, x)]
d = [-1] * n

while que:
    elapsed, now = heapq.heappop(que)
    if d[now] != -1:  # (1) 値が確定している頂点は探索しない（ネックなのはこっち）
        continue
    d[now] = elapsed
    if now == y:  # (2) 目的の頂点の値が確定したら探索終了
        break
    for to, t, k in graph[now]:
        if d[to] != -1:  # 値が確定している頂点は探索しない
            continue
        heapq.heappush(que, (math.ceil(elapsed / k) * k + t, to))

print(d[y])
```
