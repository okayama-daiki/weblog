---
tags: [DP, 累積和, ABC, D]
---

# ABC179 D - Leaping Tak

[https://atcoder.jp/contests/abc179/tasks/abc179_d](https://atcoder.jp/contests/abc179/tasks/abc179_d)  
水色下位

累積和を用いて DP を更新する。
**DP テーブルの更新と同時に、累積和テーブルの方も更新していく**というのが新しい考え方であった。

$a$ の累積和を $acc$ とすると、 $acc_{n} = acc_{n-1} + a_{n}$ で更新が出来る。

詰まったポイントは、
配る DP だと累積和テーブルの更新方法が不明のため貰う DP に変更
配列外の参照ガードの書き方
`max(0, i)`のような書き方をする
貰う DP だと区間の大小が逆になる
区間`[l, r]`の場合、貰う範囲は`[i-r, i-l]`になる
累積和を考える関係上、右端の区間は $+1$ する
上の例だと、`acc[i-l+1] - acc[i-r]`が貰ってくる値となる

```py
n, k = map(int, input().split())
lr = [list(map(int, input().split())) for _ in range(k)]

dp = [0] * n
dp_acc = [0] * (n + 1)

dp[0] = dp_acc[1] = 1

for i in range(1, n):
    for l, r in lr:
        dp[i] += dp_acc[max(i - r, 0)] - dp_acc[max(i - l + 1, 0)]
        dp[i] %= 998244353
    dp_acc[i + 1] += dp_acc[i] + dp[i]

print(dp[n - 1])
```
