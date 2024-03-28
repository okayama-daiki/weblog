---
tags: [ABC]
---

# ABC054 B - Template Matching

[https://atcoder.jp/contests/abc054/tasks/abc054_b](https://atcoder.jp/contests/abc054/tasks/abc054_b)

図形の平行移動
コピペ用に。

```py
n,m = map(int,input().split())
a = [input() for _ in range(n)]
b = [input() for _ in range(m)]

b_width = len(b[0])

for y in range(n-m+1):
    for x in range(n-b_width+1):
        if b ==  [a[y+height][x:x+b_width] for height in range(m)]:
            print('Yes')
            raise SystemExit
print('No')
```
