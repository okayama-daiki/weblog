---
tags: [整数, ABC, C]
---

# ABC159 C - Maximum Volume

[https://atcoder.jp/contests/abc159/tasks/abc159_c](https://atcoder.jp/contests/abc159/tasks/abc159_c)

縦、横、高さを $x,y,z$ として、 $\max(x\times y\times z)$ を求める問題である。
$x+y+z=L$ であるから、
$\max(x\times y\times z)$
$=\max(x\times y\times (L-x-y))$
$=\max(Lxy-x^2y-xy^2)$
$=-\min(x^2y+xy^2-Lxy)$
$=-\min(y\times(x^2+(y-L)\times x))$
$=-min\left(y\times \left\{\left(x+\frac{y-L}{2}\right)^2-\left(\frac{y-L}{2}\right)^2\right\}\right)$

より、 $y$ を固定したとき $x=\frac{L-y}{2}$ で最大となり、最大値は $\left(\frac{y-L}{2}\right)^2\times y$ となる。
よって、制約の範囲内で $y$ を全探索すればよい。

```py
import numpy as np

L = int(input())

ans = 0
for y in np.linspace(0, L, 10**6):
    ans = max(ans, ((y - L) / 2) ** 2 * y)

print(ans)

```

---

実は $O(1)$ の解法が存在する。

相加相乗平均から、 $abc^{\frac{1}{3}}\le \frac{a+b+c}{3}$ 、即ち $abc\le \left(\frac{a+b+c}{3}\right)^3=\left(\frac{L}{3}\right)^3$
を計算すればよい。

```py
print((int(input()) / 3) ** 3)

```
