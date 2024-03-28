---
tags: [整数, ABC]
---

# ABC103 C - Modulo Summation

[https://atcoder.jp/contests/abc103/tasks/abc103_c](https://atcoder.jp/contests/abc103/tasks/abc103_c)

$m\mod{a_i}$ の最大値は $k \times a_{i}-1$ となる( $k$ は 1 以上の整数)
（ $m \mod 3$ は $2$ や $5$ が最大）

各項で最大値を取るためには、 $a_1, a_2, ..., a_n$ の最小公倍数を求めてそこから 1 を引けばよい。
（ $a = \{3, 5\}$ のとき、 $m \mod 3$ と、 $m \mod 5$ をそれぞれ最大化するには、 $15 - 1 = 14$ ）

各項で最大値を得る $m$ の存在が示せたので、遠慮なく最大値を答える。
実際に $m$ を求めても良いが、もれなく計算資源が枯渇すると思われる。

```py
n = int(input())
a = list(map(int, input().split()))

print(sum(a) - n)

```
