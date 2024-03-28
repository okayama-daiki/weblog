---
tags: [DP, MinMax法, ABC, D, ゲーム理論]
---

# ABC270 D - Stones

[https://atcoder.jp/contests/abc270/tasks/abc270_d](https://atcoder.jp/contests/abc270/tasks/abc270_d)  
水色下位。

貪欲法は不可。DP で解く。

当初は $1 \leqq N \leqq 10^4$ と $1 \leqq K \leqq 100$ より、
`dp[i][j] := i個の石が山にあるとき、数列のk番目までを使ってゲームをしたときの高橋君が取得する石の最大値`
かと考えたが、遷移方法が分からなかった。

正しくは、
`dp[i] := i個の石が山にあるとき、高橋君が取得する石の最大値`
遷移部分で $O(K)$ 要するので、全体としての計算量は $O(NK)$ となる。

遷移式は`dp[i] = max(N - dp[i - k] | k ∈ K)`

式の意味について、
`i`個スタートで後手の取る事が出来る分は`N - dp[i]`個である
`k`個石を取ると順番は後手に周り（今全体での石の数は`N - k`個）、後手は自分の手を最大化するため自身が取れる石の個数は`(N - k) - dp[i - k]`個となる
以上により、`dp[i] = k + (N - k) - dp[i - k] = N - dp[i - k]`が最大となる`k`を選択するような遷移を行えばよい

```py
n, k = map(int, input().split())
a = list(map(int, input().split()))

# dp[i] := 石が i 個残っている状態からゲームを始めた時、先手が取ることのできる石の個数
dp = [0] * (n + 1)

for i in range(n + 1):
    dp[i] = max(
        dp[i],
        max((i - dp[i - j] for j in a if i - j >= 0),
            default=0)
    )

print(dp[n])
```
