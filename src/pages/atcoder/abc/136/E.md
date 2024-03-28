---
tags: [GCD, ABC, E]
---

# ABC136 E - Max GCD

[https://atcoder.jp/contests/abc136/tasks/abc136_e](https://atcoder.jp/contests/abc136/tasks/abc136_e)  
青色下位。数学。

**重要な知見**
$A_1,A_2,\ldots,A_n$ の gcd は $A_1+A_2+\dots+A_n$ を割り切る
$\gcd{(A_1,A_2,\ldots,A_n)}=g$ とする。このとき、整数 $a_i$ を利用して $A_1=a_1g,A_2=a_2g,\ldots,A_n=a_ng$ と表現できるので、 $\gcd{(A_1+A_2\dots+A_n)}=\gcd{((a_1+a_2+\dots+a_n)g)}=kg$ ( $k$ は整数)

つまり、今回の問題では元の数列 $A_i$ の操作後の配列 $A_1',A_2',\ldots,A_n'$ の gcd $g$ が解となるが、これは $A_1'+A_2'+\dots+A_n'$ を割り切り、なおかつ $A_1'+A_2'+\dots+A_n'=A_1+A_2+\ldots+A_N$ が成り立つので、最終的な解 $g$ は元の数列 $A_i$ の総和の約数に限られるということである。

本問では計算された各約数 $g_i$ に対して一つずつ操作回数が $k$ 以下となるかを判定する。

例えば $g=7,A_k=20$ のとき $A_k\%g=6$ により、 $A_k$ には $+1$ か $-6$ の 2 つの選択肢が存在する。このような形で各 $A_i$ に対して愚直に足すか引くかの 2 通りを試すと計算時間に間に合わないため、まず $A_i$ を $g$ で割った余りを考え、その値をソートする。

$g=7$ で余りの値が $\{1,1,2,3,3,4\}$ のとき、これは前の方をマイナス、後ろの方をプラスとすることが最適である（仮にマイナス、プラスとするとき、逆にした場合必ず操作回数が減少するため）。よって前から累積和を計算し、残りの個数 \* g - 残りの和と一致したものが操作回数の最小値となる。

```py
import itertools

n, k = map(int, input().split())
a = list(map(int, input().split()))

sum_a = sum(a)
divs = set()
for d in range(1, int(sum_a**.5) + 2):
    if sum_a % d == 0:
        divs.add(d)
        divs.add(sum_a // d)

ans = 1
for x in divs:
    mods = sorted(e % x for e in a)
    acc = list(itertools.accumulate(mods, initial=0))
    for i in range(1, n):
        if acc[i] == (n - i) * x - (acc[n] - acc[i]) and acc[i] <= k:
            ans = max(ans, x)

print(ans)

```
