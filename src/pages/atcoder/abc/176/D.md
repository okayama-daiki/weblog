---
tags: [BFS, 01BFS, ABC, D]
---

# ABC176 D - Wizard in Maze

[https://atcoder.jp/contests/abc176/tasks/abc176_d](https://atcoder.jp/contests/abc176/tasks/abc176_d)  
水色下位。01BFS

基本的には歩けるところを全部歩いて、必要であれば適宜ワープを行えばよい。
**最短経路問題**だが、歩く分のコストは 0、ワープ分のコストが 1 と考えるとこの問題は 01BFS で解くことが出来る。

通常の BFS ではエラーが起こるが、これはワープ分の遷移が歩く分の遷移より前に処理されているためと考えられる。（そりゃそうだ）

```py
import collections
import itertools

INF = float("inf")

h, w = map(int, input().split())
ch, cw = map(lambda x: int(x) - 1, input().split())
fh, fw = map(lambda x: int(x) - 1, input().split())
s = [list(input()) for _ in range(h)]

que = collections.deque([(ch, cw)])
visited = set()
cost = [[INF for _ in range(w)] for _ in range(h)]
cost[ch][cw] = 0

while que:
    nh, nw = que.popleft()
    if (nh, nw) in visited:
        continue
    visited.add((nh, nw))
    for dh, dw in (0, 1), (0, -1), (1, 0), (-1, 0):
        eh = nh + dh
        ew = nw + dw
        if not 0 <= eh < h or not 0 <= ew < w or s[eh][ew] == "#":
            continue
        cost[eh][ew] = min(cost[eh][ew], cost[nh][nw])
        que.appendleft((eh, ew))
    for dh, dw in itertools.product(range(-2, 3), repeat=2):
        eh = nh + dh
        ew = nw + dw
        if not 0 <= eh < h or not 0 <= ew < w or s[eh][ew] == "#":
            continue
        if cost[eh][ew] < cost[nh][nw] + 1:
            continue
        cost[eh][ew] = min(cost[eh][ew], cost[nh][nw] + 1)
        que.append((eh, ew))


if cost[fh][fw] is INF:
    print(-1)
else:
    print(cost[fh][fw])

```
