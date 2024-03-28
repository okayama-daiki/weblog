---
tags: [DP, ABC, E]
---

# ABC265 E - Warp

[https://atcoder.jp/contests/abc265/tasks/abc265_e](https://atcoder.jp/contests/abc265/tasks/abc265_e)  
水色上位。動的計画法。

$(a,b),(c,d),(e,f)$ への移動を $N$ 回行うとすると、感覚的には $3^N$ の程度の状態数を持ちそうだが、以下のコードが AC したことを考えると大体 $N=300$ でも $O(10^5)$ 個数程度であると分かる。

実験的ではあるが、状態数が多くなりそうなケース $(1, 1), (100, 101), (-100, -1)$ でも状態数の増加量は、その時までの操作回数以下である（つまり状態数はそれぞれ高々 $2,3,4,5\ldots$ と増加していく）ので、最終的な状態数は $O(N^2)$ 程度であると推測した。

以上からおそらく $O(N^3)$ で解ける。

---

**追記**
$N$ 回の操作後のあり得る座標は操作の順番に依らず最終的に $x=(a,b),y=(c,d),z=(e,f)$ が各何回ずつ加えられたかを考えればよく、これは $x,y,z$ から重複を許して合計 $N$ 個選ぶ重複組合せに帰着でき、それは $(n+2)!/(n!2!)=(n+1)(n+2)/2$ 。よって $O(n^2)$

---

`collections.defaultdict`などを使うと生成時のオーバーヘッドにより TLE するので注意。

```py
MOD = 998244353

n, m = map(int, input().split())
a, b, c, d, e, f = map(int, input().split())
block = set()
for _ in range(m):
    x, y = map(int, input().split())
    block.add((x, y))

# dp[i][xy] = i回目の移動後にxyに到達できるような移動経路の総数
dp = [{} for _ in range(n + 1)]
dp[0][0, 0] = 1

for i in range(n):
    for (x, y), v in dp[i].items():
        for dx, dy in (a, b), (c, d), (e, f):
            if (x + dx, y + dy) in block:
                continue
            dp[i + 1][x + dx, y + dy] = (dp[i + 1].get(
                (x + dx, y + dy), 0) + v) % MOD

print(sum(dp[i + 1].values()) % MOD)

```
