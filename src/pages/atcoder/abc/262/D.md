---
tags: [DP, ABD, D]
---

# ABC262 D - I Hate Non-integer Number

水色下位

4 重 DP

当初の DP テーブルは
`dp[i][j][k] := a_1, ..., a_iの中でj(j <= i)個選択した時に、それらの和がk (mod j)となる選び方の個数`
であったが、これの問題点は
`j`が増えた時に遷移を考えることが出来ない
例えば、`4 + 1`個選択するときに、それまでに求めたものは全て`mod 4`の値である。（必要なのは`mod 5`の値）
そのため、`mod`を取る値を固定して考える必要がある。

考える DP テーブルは
`dp[i][j][k][l] := Aの先頭j項からk個の項を選ぶ方法であって、選んだ項の総和をiで割った余りがlとなるようなものの個数`

遷移は、`a[j]` を取る・取らないの 2 通り。
`dp[i][n][i][0] (i = 1 ~ n)`の総和が求めたい答え。

ハマった点は、
`k == i`、即ち既にこれ以上選択出来ない場合でもそれまでの結果を`j + 1`に伝える必要があること

```py
n = int(input())
a = list(map(int, input().split()))


ans = 0
for i in range(1, n + 1):
    # dp[j][k][l] := Aの先頭j項からk個の項を選ぶ方法であって、選んだ項の総和をiで割った余りがlとなるようなものの個数
    dp = [[[0 for _ in range(i)] for _ in range(i + 1)] for _ in range(n + 1)]
    dp[0][0][0] = 1

    for j in range(n):
        for k in range(i + 1):
            for l in range(i):
                dp[j + 1][k][l] += dp[j][k][l]
                dp[j + 1][k][l] %= 998244353
                if k == i:
                    continue
                dp[j + 1][k + 1][(l + a[j]) % i] += dp[j][k][l]
                dp[j + 1][k + 1][(l + a[j]) % i] %= 998244353

    ans += dp[n][i][0]

print(ans % 998244353)
```
