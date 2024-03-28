---
tags: [期待値DP, ABC, E]
---

# ABC280 E - Critical Hit

[https://atcoder.jp/contests/abc280/tasks/abc280_e](https://atcoder.jp/contests/abc280/tasks/abc280_e)  
水色下位。期待値 DP

DP テーブルは`dp[i] := 体力がiのとき、体力が0以下になるまでに行う攻撃回数の期待値`とするが、これは典型的な置き方でないかと思う。

これも条件付き期待値の考え方に則ると、体力を`i`にするには`i-1`からと`i-2`からの遷移しか有り得ないため、遷移式は次のようになる。
`dp[i] = (1 + dp[i-1]) * (1 - p) + (1 + dp[i-2]) * p`

例によって回答が有理数の MOD だが、`1 - p`は問題文中で $1-\frac{P}{100}$ に対応し、これは`(100 - P) * pow(100, -1, MOD)`として求めることに注意する。

```py
MOD = 998244353
INV100 = pow(100, -1, MOD)

n, p = map(int, input().split())

dp = [0] * (n + 1)
dp[0] = 0
dp[1] = 1

for i in range(2, n + 1):
    dp[i] = ((1 + dp[i - 1]) * (100 - p) * INV100 + (1 + dp[i - 2]) * p * INV100) % MOD

print(dp[n])
```
