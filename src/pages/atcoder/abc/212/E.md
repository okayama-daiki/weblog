---
tags: [ABC, E, DP]
---

# ABC212 E - Safety Journey

[https://atcoder.jp/contests/abc212/tasks/abc212_e](https://atcoder.jp/contests/abc212/tasks/abc212_e)  
水色上位。DP。

まともに解くと $O(N^3)$ のところを、余事象の考え方を利用して $O((N+2M)N)$ にまで落とす。
通れない部分が $5000$ 以下と少ないため、とりあえず全て通れるとした時の場合の和から、通れない部分の分を引いてやればよい。

```py
MOD = 998244353

n, m, k = map(int, input().split())
uv = [list(map(lambda x: int(x) - 1, input().split())) for _ in range(m)]

# dp[i][j] := i日目に町jに辿り着く方法の数
dp = [[0] * n for _ in range(k + 1)]
dp[0][0] = 1

for i in range(k):
    pre_total = sum(dp[i]) % MOD
    for j in range(n):
        dp[i + 1][j] += pre_total - dp[i][j]
        dp[i + 1][j] %= MOD
    for u, v in uv:
        dp[i + 1][u] -= dp[i][v]
        dp[i + 1][u] %= MOD
        dp[i + 1][v] -= dp[i][u]
        dp[i + 1][v] %= MOD

print(dp[k][0])

```
