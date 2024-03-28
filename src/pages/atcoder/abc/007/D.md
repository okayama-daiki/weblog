---
tags: [桁DP, DP]
---

# ABC007 D - 禁止された数字

[https://atcoder.jp/contests/abc007/tasks/abc007_4](https://atcoder.jp/contests/abc007/tasks/abc007_4)

桁 DP。

```py
def solve(n: int):
    str_n = str(n)
    len_n = len(str_n)
    n_ = lambda i: int(str_n[i])

    # dp[i][smaller][4or9]
    dp = [[[0, 0] for _ in range(2)] for _ in range(len_n + 1)]
    dp[0][0][0] = 1

    for i in range(len_n):
        for smaller in 0, 1:
            for four_nine in 0, 1:
                for x in range(10 if smaller else n_(i) + 1):
                    dp[i + 1][smaller or x < n_(i)][four_nine or x in (4, 9)] +=\
                        dp[i][smaller][four_nine]

    return dp[len_n][0][1] + dp[len_n][1][1]

a, b = map(int, input().split())
print(solve(b) - solve(a - 1))
```

当初 `or`の部分を`|`としておりエラーが止まらなかった。
