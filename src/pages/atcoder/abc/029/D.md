---
tags: [桁DP, DP, ABC, D]
---

# ABC029 D - D - 1

[https://atcoder.jp/contests/abc029/tasks/abc029_d](https://atcoder.jp/contests/abc029/tasks/abc029_d)

範囲の各数の各桁に含まれる 1 の個数を数える問題。

`dp[i][smaller][num_of_1]`の DP テーブルを用意。
`dp[len_n][:][num_of_1] * num_of_1`の総和を計算すれば答えが求まる。

```py
n = int(input())
str_n = str(n)
len_n = len(str_n)
n_ = lambda i: int(str_n[i])

# dp[i][smaller][num_of_1]
dp = [[[0 for _ in range(len_n + 1)] for _ in range(2)] for _ in range(len_n + 1)]
dp[0][0][0] = 1

for i in range(len_n):
    for smaller in 0, 1:
        for one in range(len_n):
            for x in range(10 if smaller else n_(i) + 1):
                dp[i + 1][smaller or x < n_(i)][one + (x == 1)] +=\
                    dp[i][smaller][one]

print(sum(i * (dp[len_n][0][i] + dp[len_n][1][i]) for i in range(len_n + 1)))
```
