---
tags: [Math, 数学, ABC, E]
---

# ABC221 E - LEQ

[https://atcoder.jp/contests/abc221/tasks/abc221_e](https://atcoder.jp/contests/abc221/tasks/abc221_e)  
水色上位。数学。

題意は $A$ の $A_1'\le A_k'$ を満たす部分列 $A_1',\ldots,A_k'$ の総数を求める。

部分列の両端のインデックス $i,j$ が決まれば、間の $j-i-1$ 個の要素に関しては取る／取らないの 2 通りの選択により部分列が構成されるため、この場合の部分列の総数は $2^{j-i-1}$ 個となる。

つまり $A_i\le A_j$ となる $i,j(i<j)$ に対して、 $2^{j-i-1}$ の総和を求めればよいこととなる。

$\sum_{i=0}^{n}\sum_{j\in\{i<j,A_i\le A_j\}}^{n}{2^{j-i-1}}$  
 $=\sum_{i=0}^{n}\sum_{j\in\{i<j,A_i\le A_j\}}^{n}{\frac{2^{j-1}}{2^i}}$
$=\sum_{i=0}^{n}\frac{1}{2^i}\sum_{j\in\{i<j,A_i\le A_j\}}^{n}{2^{j-1}}$

今、 $\sum_{j\in\{i<j,A_i\le A_j\}}^{n}{2^{j-1}}$ は Binary Indexed Tree により高速に計算ができるので、 $i$ について全探索すれば解が得られる。

```py
from atcoder.fenwicktree import FenwickTree

MOD = 998244353

n = int(input())
a = list(map(int, input().split()))

compressed = {e: i for i, e in enumerate(sorted(set(a)))}
bit = FenwickTree(n)

remain = []
ans = 0
for i in reversed(range(n)):
    e = compressed[a[i]]
    ans += bit.sum(e, n) * pow(pow(2, MOD - 2, MOD), i, MOD)
    ans %= MOD
    if i > 0:
        bit.add(e, pow(2, i - 1, MOD))
    else:
        bit.add(e, pow(2, MOD - 2, MOD))

print(ans)

```

逆元の計算に手間取った。
