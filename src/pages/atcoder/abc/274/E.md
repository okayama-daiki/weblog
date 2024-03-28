---
tags: [bit演算, bitDP, TSP, ABC, E]
---

# ABC274 E - Booster

[https://atcoder.jp/contests/abc274/tasks/abc274_e](https://atcoder.jp/contests/abc274/tasks/abc274_e)  
水色上位。bitDP。

取り敢えず宝箱も含めて bitDP をした後に、街を回り切っているものから直接原点に帰させるものも含めて最小値を考えたらよい。

定数倍の高速化の難易度が高く難儀した。
`functools.lru_cache`を利用すると TLE してしまった。
maxsize=None がいけなかったのだろうか
$001000, 010000, 011000, 100000, 101000, 110000, 111000, \ldots$ のような配列を出力するには`range`の第 3 引数が利用できる。またシフト演算を利用しても実現できる

```py
INF = float('inf')

n, m = map(int, input().split())
xy = [list(map(int, input().split())) for _ in range(n)]
pq = [list(map(int, input().split())) for _ in range(m)]

xy += pq


def dist(x1, y1, x2, y2):
    return ((x1 - x2)**2 + (y1 - y2)**2)**.5


ans = INF

dp = [[INF] * (n + m) for _ in range(1 << (n + m))]
for u in range((n + m)):
    dp[1 << u][u] = dist(0, 0, *xy[u])

for s in range(1 << (n + m)):
    boost = 0
    for u in range(n, n + m):
        if (1 << u) & s:
            boost += 1
    for u in range(n + m):
        if not (1 << u) & s:
            continue
        for v in range(n + m):
            if (1 << v) & s:
                continue
            dp[s | (1 << v)][v] = min(
                dp[s | (1 << v)][v],
                dp[s][u] + dist(*xy[u], *xy[v]) / 2**boost)

for s in range(1 << m):
    s = (s << n) - 1
    boost = 0
    for u in range(n, n + m):
        if (1 << u) & s:
            boost += 1
    for u in range(n + m):
        ans = min(ans, dp[s][u] + dist(*xy[u], 0, 0) / 2**boost)

print(ans)

```
