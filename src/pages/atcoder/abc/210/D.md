---
tags: [ABC, D, DP, 式変形]
---

# ABC210 D - National Railway

[https://atcoder.jp/contests/abc210/tasks/abc210_d](https://atcoder.jp/contests/abc210/tasks/abc210_d)  
水色上位。累積最小値。

式に絶対値がある場合、仮定を設けることで絶対値の解消を図る
問題の場合は、 $i'\le i,j'\le j$ と定め、**そのままの場合とグリッドを 90 度回転させた場合**で計算することで、一般性を失わず計算できる
2 変量の場合、どちらか片方を固定し、もう片方に対する解を高速に求めるというのは典型テクニック
二分探索
累積的に求める

$(i,j)$ を固定したときに、 $i'<i,j'<j$ を満たすコスト建設最小の $(i',j')$ を求めたい。

式変形をしよう
$\min \{C\times ((i-i')+(j-j'))+A_{i',j'}+A_{i,j}\}$
$=\min\{C\times (i+j)+A_{i,j}-C\times(i'+j')+A_{i',j'}\}$
$=C\times (i+j)+A_{i,j}+\min\{-C\times(i'+j')+A_{i',j'}\}$

このように、 $i,j$ で独立に計算できるため累積的に計算を行うことで $O(1)$ で $(i,j)$ に対する解 $(i',j')$ を $O(1)$ で求めることが可能。

```py
INF = float('inf')

h, w, c = map(int, input().split())
a = [list(map(int, input().split())) for _ in range(h)]


def solve(a, h, w):
    # dp[i][j] := [0,i],[0,j]での -C*(i+j)+a_ijの最小値
    dp = [[INF] * w for _ in range(h)]
    ans = INF
    for i in range(h):
        for j in range(w):
            if i > 0:
                dp[i][j] = min(dp[i][j], dp[i - 1][j])
            if j > 0:
                dp[i][j] = min(dp[i][j], dp[i][j - 1])
            ans = min(ans, c * (i + j) + a[i][j] + dp[i][j])
            dp[i][j] = min(dp[i][j], -c * (i + j) + a[i][j])

    return ans


print(min(solve(a, h, w), solve(list(zip(*reversed(a))), w, h)))

```

?
