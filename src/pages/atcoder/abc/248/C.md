---
tags: [DP, 数列]
---

# ABC248 C - Dice Sum

[https://atcoder.jp/contests/abc248/tasks/abc248_c](https://atcoder.jp/contests/abc248/tasks/abc248_c)

> 数列を先頭から決めていく際、覚えておくべき必要があるものはその時点での数列の総和のみであり、具体的に各要素の値が何であったかは捨象してよい。

DP テーブルは次のように定義できる。
`dp[n][s]` := n 項目までの和が s である数列の総数
初期化は`dp[0][0] = 0`。緩和は配る DP 方式で、現在地から右下へ隣 m 個分。

以下提出コード。

```py
MOD = 998244353
n,m,k = map(int,input().split())
dp = [[0 for _ in range(k+1)] for _ in range(n+1)]
dp[0][0] = 1

for row in range(n):
    for column in range(k):
        for i in range(m):
            try:
                dp[row+1][column+i+1] += dp[row][column]
            except IndexError:
                break

print(sum(dp[-1]) % MOD)
```
