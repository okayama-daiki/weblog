---
tags: [ABC, E, Math]
---

# ABC248 E - K-colinear Line

[https://atcoder.jp/contests/abc248/tasks/abc248_e](https://atcoder.jp/contests/abc248/tasks/abc248_e)

colinear は「共通の」の意味。

異なる 3 点が同一直線上にあるかの判断は、傾きではなくベクトルを用いる事。即ち 3 点 $A(x_0, y_0), B(x_1, y_1), P(x, y)$ が同一直線状にあるということは、 $(AP)^→ = k(AB)^→$ が成り立つ、つまり $(x_1-x_0)(y-y_0) = (y_1-y_0)(x-x_0)$ が成立することである。

重複を処理するのにかなり手間取った。
集合はハッシュ可能ではないので、集合の要素に集合を持つ事ができない
そのためソートしてからタプルに変換して集合に追加していくが、このソートが実行時間内に収まるかどうかは正直自信がなかった

```py
def colinear_line(x0,y0,x1,y1,x,y):
    return (x1-x0)*(y-y0) == (y1-y0)*(x-x0)

n,k_ = map(int,input().split())
xy = [list(map(int,input().split())) for _ in range(n)]

ans = set()
for i in range(n):
    for j in range(i+1,n):
        group = []
        (x1,y1),(x2,y2) = xy[i],xy[j]
        group.append(i)
        group.append(j)
        for k in range(n):
            if k == i or k == j:
                continue
            x,y = xy[k]
            if colinear_line(x1,y1,x2,y2,x,y):
                group.append(k)
        group = tuple(sorted(group))
        if len(group) >= k_ and group not in ans:
            ans.add(group)
print(len(ans) if k_ != 1 else 'Infinity')
```
