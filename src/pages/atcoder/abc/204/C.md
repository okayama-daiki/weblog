---
tags: [ABC, C, Graph]
---

# ABC204 C - Tour

[https://atcoder.jp/contests/abc204/tasks/abc204_c](https://atcoder.jp/contests/abc204/tasks/abc204_c)

茶色上位。グラフ探索。

最初は経路が何通りか求める問題と勘違いをしていた。
スタート地点とゴール地点の組の個数を答えるだけ。

```py
import sys
sys.setrecursionlimit(10**7)

n,m = map(int,input().split())
graph = [[] for _ in range(n)]
for _ in range(m):
    a,b = map(lambda x:int(x)-1,input().split())
    graph[a].append(b)

def rec(now):
    if close[now]: return
    close[now] = 1
    for nex in graph[now]:
        rec(nex)

ans = 0
for start in range(n):
    close = [False for _ in range(n)]
    rec(start)
    ans += sum(close)

print(ans)
```

再帰上限の設定を忘れて RE をもらったので注意。
