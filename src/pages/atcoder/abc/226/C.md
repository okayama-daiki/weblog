---
tags: [ABC, Tips_集, DFS]
---

# ABC226 C - Martial artist

[https://atcoder.jp/contests/abc226/tasks/abc226_c](https://atcoder.jp/contests/abc226/tasks/abc226_c)

茶色下位。グラフ探索。

どうやら依存関係ときたらグラフを考えると良さそうな感じがする。
ただ今回は技 1 を始点とするのではなく、技 N を始点としてグラフ探索することが思いつかなかった。

```python
n = int(input())
graph = [[] for _ in range(n)]
time = []
for i in range(n):
    t,_,*a = map(int,input().split())
    time.append(t)
    for a in a:
        a -= 1
        graph[i].append(a)

visited = set()
que = [n-1]
while que:
    now = que.pop()
    visited.add(now)
    for nex in graph[now]:
        if nex in visited:
            continue
        que.append(nex)
ans = 0
for node in visited:
    ans += time[node]
print(ans)
```
