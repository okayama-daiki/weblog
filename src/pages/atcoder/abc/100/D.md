---
tags: [絶対値, 貪欲法, ABC, E]
---

# ABC100 D - Patisserie ABC

[https://atcoder.jp/contests/abc100/tasks/abc100_d](https://atcoder.jp/contests/abc100/tasks/abc100_d)  
水色上位。貪欲法。

絶対値和の最大化ではなく、単純に和を最大化する問題であれば、 $\sum_ix_i+\sum_iy_i+\sum_iz_i=\sum_i(x_i+y_i+z_i)$ により、 $x_i+y_i+z_i$ の順にソートして大きい方から $m$ 個を選択すればよかった。

題意の $\sum_i|x_i|+\sum_i|y_i|+\sum_i|z_i|$ に対しては、絶対値を外した時に要素がすべて $1$ 倍 or $-1$ 倍されると考えると、
$\sum_i|x_i|+\sum_i|y_i|+\sum_i|z_i|=\max{\sum_i(\pm x_i\pm y_i\pm z_i)}$ と 8 通りの場合分けを行えばよいことになる。

```py
import itertools

n, m = map(int, input().split())
cakes = [list(map(int, input().split())) for _ in range(n)]

ans = float('-inf')
for dir_ in itertools.product([1, -1], repeat=3):
    cakes.sort(key=lambda x: sum(map(lambda e, d: d * e, x, dir_)))
    evaluates = [0] * 3
    for i in range(m):
        for j in range(3):
            evaluates[j] += cakes[i][j]
    ans = max(ans, sum(map(abs, evaluates)))

print(ans)

```
