---
tags: [DP, 累積和, E, ABC]
---

# ABC183 E - Gueen on Grid

[https://atcoder.jp/contests/abc183/tasks/abc183_e](https://atcoder.jp/contests/abc183/tasks/abc183_e)

水色下位。

累積和で DP の遷移を高速化するタイプの問題。

右、下、右下と 3 方向への遷移が考えられるため、3 つの累積和テーブルを個別に用意しておく必要があるというのは分かるが、累積和テーブルの遷移が難しい。

公式解説では、`累積和[i] = 元配列[i-1] + 累積和[i-1]`のようなことをしているが、これでは`累積和[i]`は実際には`配列[0] ~ 配列[i-1]`の和を求めていることになる。

~~なにか気持ち悪いが~~、確かに`itertools.accumulate(array, initial=0)`とした時も意味的には同じになるのか別に問題ないかとも思った。

**追記：**遷移時に必要なのは直前までの累積和なのでこれでいい。

```py
MOD = 10**9 + 7

h, w = map(int, input().split())
s = [input() for _ in range(h)]

dp = [[0 for _ in range(w)] for _ in range(h)]

acc_right = [[0 for _ in range(w)] for _ in range(h)]
acc_bottom = [[0 for _ in range(w)] for _ in range(h)]
acc_diag = [[0 for _ in range(w)] for _ in range(h)]

dp[0][0] = 1

for i in range(h):
    for j in range(w):
        if s[i][j] == "#":
            continue
        # 右
        if j - 1 >= 0:
            acc_right[i][j] = dp[i][j - 1] + acc_right[i][j - 1]
            dp[i][j] += acc_right[i][j]
        # 下
        if i - 1 >= 0:
            acc_bottom[i][j] = dp[i - 1][j] + acc_bottom[i - 1][j]
            dp[i][j] += acc_bottom[i][j]
        # 右下
        if j - 1 >= 0 and i - 1 >= 0:
            acc_diag[i][j] = dp[i - 1][j - 1] + acc_diag[i - 1][j - 1]
            dp[i][j] += acc_diag[i][j]

        acc_right[i][j] %= MOD
        acc_bottom[i][j] %= MOD
        acc_diag[i][j] %= MOD
        dp[i][j] %= MOD

if not __debug__:
    print(*dp, sep="\n")

print(dp[h - 1][w - 1])

```
