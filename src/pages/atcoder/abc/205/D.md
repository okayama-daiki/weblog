---
tags: [ABC, D, 二分探索]
---

# ABC205 D - Kth Excluded

[https://atcoder.jp/contests/abc205/tasks/abc205_d](https://atcoder.jp/contests/abc205/tasks/abc205_d)

茶色上位。二分探索。

正の整数列 A について、各々の要素以下の数で、かつそれ以前の整数列に出現しない整数の個数をカウントしておく。

```py
a = list(map(int,input().split()))
a_lower = [e-i for i,e in enumerate(a,1)]
```

`a_lower`は単調増加する。

例えば入力が`1 3 5 8 9 10 12 15 17 30`だとすると、`a_lower`は`0 1 2 4 4 4 5 7 8 20`となる。
以下はこの例をもとに考える。

`K = 3`のときを考える。
`a_lower`上で`3`が`2`と`4`の間に位置することから、それに対応する`a`での`5`と`8`の間に解は存在する。`a_lower`の`2`に対応する、`a`での`5`から`3-2=1`分進んだ`6`が解となる。

`K = 4`のときを考える。
`a_lower`上で`4`が`2`と`4`の間に位置することから、それに対応する`a`での`5`と`8`にの間に解は存在する。`a_lower`の`2`に対応する、`a`での`5`から`4-2=2`分進んだ`7`が解となる。

`K = 7`のときを考える。
`a_lower`上で`7`が`5`と`7`の間に位置することから、それに対応する`a`での`12`と`15`にの間に解は存在する。`a_lower`の`5`に対応する、`a`での`12`から`7-5=2`分進んだ`14`が解となる。

以上よりターゲット値で二分探索(左)を行い、得られた値を`i`とすると、インデックス`i-1`に対応する`a`の値から、ターゲット値からインデックス`i-1`に対応する`a_lower`に値を引いたものを加えればよいこととなる。

```py
from bisect import bisect_left
k = <target>
i = bisect_left(a_lower,k)
print(a[i-1] + (k - a_lower[i-1]))
```

尚、インデックスを-1 することから、ターゲットが`a_lower[0]`以下の値であった場合、即ち二分探索して、0 が返ってくるような場合はは別途処理が必要である。

```py
from bisect import bisect_left
n,q = map(int,input().split())
a = list(map(int,input().split()))
a_lower = [e-i-1 for i,e in enumerate(a)]
for _ in range(q):
    k = int(input())
    if k <= a_lower[0]:
        print(k)
    else:
        i = bisect_left(a_lower,k)
        print(a[i-1] + (k-a_lower[i-1]))
```
