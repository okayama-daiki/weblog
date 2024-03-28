---
tags: [DFS, ABC, E]
---

# ABC198 E - Unique Color

[https://atcoder.jp/contests/abc198/tasks/abc198_e](https://atcoder.jp/contests/abc198/tasks/abc198_e)  
緑上位。

**木であるから**各頂点への最短経路は DFS を用いて求める事が出来る。
頂点の進入・退出時に色の情報を更新すればよい。

```py
import sys
import collections

sys.setrecursionlimit(10 ** 7)

n = int(input())
c = [None] + list(map(int, input().split()))

graph = collections.defaultdict(list)

for _ in range(n - 1):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)

def dfs(vertex):
    global ans
    visited[vertex] = True
    if colored[c[vertex]] == 0:
        ans.append(vertex)
    colored[c[vertex]] += 1
    for next_vertex in graph[vertex]:
        if visited[next_vertex]:
            continue
        dfs(next_vertex)
        colored[c[next_vertex]] -= 1

ans = []
visited = [False] * (n + 1)
colored = collections.defaultdict(int)

dfs(1)
print(*sorted(ans), sep='\n')
```
