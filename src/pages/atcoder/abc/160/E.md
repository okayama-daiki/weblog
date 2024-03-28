---
tags: [ABC, E, 貪欲法]
---

# ABC160 E - Red and Green Apples

[https://atcoder.jp/contests/abc160/tasks/abc160_e](https://atcoder.jp/contests/abc160/tasks/abc160_e)  
緑上位。貪欲法。

無色リンゴの色塗りは遅延させてもよいというのがポイント。先に条件を満たすように、赤リンゴから $X$ 個、緑リンゴから $Y$ 個を大きいものから取ってきておき、そこに無色リンゴを全部追加した上で、これらのリンゴの中で大きい方から順に $X+Y$ 個を選んだものが最適解となる。（その後に条件を満たすように色を塗ってやればいい）

制約 $X\le A, Y\le B$ がポイントであった。

```py
x, y, a, b, c = map(int, input().split())
p = list(map(int, input().split()))
q = list(map(int, input().split()))
r = list(map(int, input().split()))

apples = sorted(p)[-x:] + sorted(q)[-y:] + r

print(sum(sorted(apples)[-(x + y) :]))

```
