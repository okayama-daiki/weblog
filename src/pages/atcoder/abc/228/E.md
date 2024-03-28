---
tags: [フェルマーの小定理, ABC, E, MOD]
---

# ABC228 E - Integer Sequence Fair

[https://atcoder.jp/contests/abc228/tasks/abc228_e](https://atcoder.jp/contests/abc228/tasks/abc228_e)  
水色上位。MOD。

 フェルマーの小定理は逆元の計算にのみ利用されるかと思ったが、今回のように累乗計算を高速化するのにも利用される。

まず解は $m^{k^n}$ であるが、 $m^{k^n \% MOD} \% MOD \equiv m^{k^n} \% MOD$ は成り立たない。

そこでフェルマーの小定理 $a^p \equiv a$ を利用する。 $a^{p-1} \equiv 1$ により、 $k^n$ を $p-1$ で割ったあまりを考えると、

$m^{k^n} \equiv m^{k^n\%(p-1)}$ が成り立ち、 $m^{k^n}\mod{MOD}$ を高速に計算できる。

累乗計算では、 $m$ が $MOD$ で割り切れる時解は $0$ になるので注意すること。

```py
MOD = 998244353
n, k, m = map(int, input().split())

if m % MOD:
    r = pow(k, n, MOD - 1)
    print(pow(m, r, MOD))
else:
    print(0)

```
