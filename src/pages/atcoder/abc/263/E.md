---
tags: [期待値DP, DP, ABC, E, 期待値]
---

# ABC263 E - Sugorok 3

[https://atcoder.jp/contests/abc263/tasks/abc263_e](https://atcoder.jp/contests/abc263/tasks/abc263_e)  
青色下位。期待値 DP。

最初に考えたこと
`dp[i] := マスiに到達するまでにサイコロを振る回数の期待値`

遷移方法がよく分からない。

`dp[i] := マスiからNに到達するまでに振るサイコロの回数の期待値`と公式解説にはある。

とりあえずこの下で考えると、
$dp_i=\frac{(dp_i+dp_{i+1}+dp_{i+2}+\ldots+dp_{i+a_i})}{a_{i}+1}+1$
$\Leftrightarrow (a_i+1)dp_i=dp_i+dp_{i+1}+dp_{i+2}+\ldots+dp_{i+a_i}+a_i+1$
$\Leftrightarrow a_idp_i=dp_{i+1}+dp_{i+2}+\ldots+dp_{i+a_i}+a_i+1$
$\Leftrightarrow dp_i=\frac{(dp_{i+1}+dp_{i+2}+\ldots+dp_{i+a_i}+a_i+1}{a_i}$

```py
from atcoder.segtree import SegTree

MOD = 998244353

n = int(input())
a = list(map(int, input().split()))

# dp[i] := マスiからNに到達するために投げるサイコロの回数の期待値
dp = SegTree(e=0, op=lambda a, b: (a + b) % MOD, v=n)

for i in reversed(range(n - 1)):
    dp.set(i, (dp.prod(i + 1, i + a[i] + 1) + a[i] + 1) *
           pow(a[i], MOD - 2, MOD) % MOD)

print(dp.get(0))

```
