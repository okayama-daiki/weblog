---
tags: [BFS, 01BFS, ABC, E]
---

# ABC184 E - Third Avenue

[https://atcoder.jp/contests/abc184/tasks/abc184_e](https://atcoder.jp/contests/abc184/tasks/abc184_e)  
水色上位。01BFS。

同じアルファベットのマスに辺を張ると、グラフによっては辺の数が指数レベルで大きくなる。
そこで、各アルファベットに対して隣接するような超頂点を作成し、アルファベットから超頂点へのコストが 1、超頂点からアルファベットへのコストが 0 となるように辺を張る。

このグラフ上で 01BFS をすればよい。

```py
import collections

INF = float('inf')

h, w = map(int, input().split())
a = [input() for _ in range(h)]

alpha = {chr(i + 97): [] for i in range(26)}
alpha_nodes = set()

for y in range(h):
    for x in range(w):
        if a[y][x] == 'S':
            sy, sx = y, x
        elif a[y][x] == 'G':
            gy, gx = y, x
        elif a[y][x].isalpha():
            alpha[a[y][x]].append((y, x))
            alpha_nodes.add((y, x))

visited = [[False] * w for _ in range(h)]
visited_alpha = {chr(i + 97): False for i in range(26)}

dists = [[INF] * w for _ in range(h)]
dists_alpha = {chr(i + 97): INF for i in range(26)}

dists[sy][sx] = 0

que = collections.deque([(sy, sx)])
while que:
    uy, ux = que.popleft()
    # real node
    if isinstance(uy, int):
        if visited[uy][ux]:
            continue
        visited[uy][ux] = True
        for dy, dx in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            vy, vx = uy + dy, ux + dx
            if not (0 <= vy < h and 0 <= vx < w):
                continue
            if visited[vy][vx]:
                continue
            if a[vy][vx] == '#':
                continue
            if (vy, vx) in alpha_nodes:
            # alphaの頂点からコスト0の辺を張るのではなく、 alphaに隣接する頂点からコスト1の辺を超頂点に張っている。これは、alphaの頂点からコスト0の辺を張っているのと等価
                dists_alpha[a[vy][vx]] = min(dists_alpha[a[vy][vx]],
                                             dists[uy][ux] + 1)

                que.appendleft((a[vy][vx], None))
                # ここでcontinueしない
            dists[vy][vx] = min(dists[vy][vx], dists[uy][ux] + 1)
            que.append((vy, vx))
    # super node
    else:
        if visited_alpha[uy]:
            continue
        visited_alpha[uy] = True
        for vy, vx in alpha[uy]:
            if visited[vy][vx]:
                continue
            dists[vy][vx] = min(dists[vy][vx], dists_alpha[uy] + 1)
            que.append((vy, vx))

if dists[gy][gx] == INF:
    print(-1)
else:
    print(dists[gy][gx])

```
