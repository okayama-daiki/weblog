---
tags: [ABC, E, XOR]
---

# ABC171 E - Red Scarf

[https://atcoder.jp/contests/abc171/tasks/abc171_e](https://atcoder.jp/contests/abc171/tasks/abc171_e)

茶色上位。XOR

与えられた $a_i$ は次のように表現できる。

$x_2 \oplus x_3\oplus x_4\oplus ...\oplus x_n=a_1$
$x_1 \oplus x_3\oplus x_4\oplus ...\oplus x_n=a_2$
$:$
$x_1 \oplus x_2\oplus x_3\oplus ...\oplus x_{n-1}=a_n$

辺々を XOR すると、 $x_1\oplus x_1\oplus ...\oplus x_1\oplus x_2\oplus x_2\oplus ...\oplus x_2\oplus ...\oplus x_n\oplus x_n ... \oplus x_n=a_1\oplus a_2\oplus ...\oplus x_n$ が得られ、制約より、各 $x_i$ は $N-1$ 個の奇数個存在するので、 $x_1\oplus x_2\oplus...\oplus x_n=a_1\oplus a_2\oplus...\oplus a_n$ となる。

ここで $A=a_1\oplus a_2\oplus ...\oplus a_n$ とする。

上の $a_i$ の式を順に加えると、
$x_1\oplus x_2\oplus...\oplus x_n \oplus x_2\oplus x_3\oplus...\oplus x_n=A \oplus a_1$
$x_i\oplus x_i=0$ を利用すると上式は、 $x_1=A\oplus a_1$ と $x_1$ を求める事が出来る。他の $x_i$ も同様にして求まる。

```py
import functools
import operator

n = int(input())
a = list(map(int, input().split()))

x = functools.reduce(operator.xor, a)

for e in a:
    print(x ^ e)

```

---

**補足: XOR の性質**
可換
$x\oplus y=y\oplus x$
偶数個足すと 0 になる
奇数個足すと元に戻る

---
