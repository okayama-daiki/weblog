---
tags: [期待値DP, ABC, D]
---

# ABC194 D - Journey

[https://atcoder.jp/contests/abc194/tasks/abc194_d](https://atcoder.jp/contests/abc194/tasks/abc194_d)  
緑上位

**重要な知見**
[* 成功確率 p の試行を成功するまで行った際の期待値は、 $1 / p$ ]

**証明**
求める期待値を $X$ とすると、
$X = 1 + (1 / p) \times X$
$X$ について解くと、 $X = 1 / p$

問題下で考えられる状況は、
$n - 1$ 個の頂点に未到達
$n-2$ 個の頂点に未到達
...
$1$ 個の頂点に未到達
であり、各々についてその頂点に辿り着く確率は、 $(N - 1) / N$ 、 $(N - 2) / N$ 、...、 $1 / N$ となる。各状況についての期待値の総和が解となる。

```py
n = int(input())
print(sum(map(lambda i: n / (n - i), range(1, n))))
```
