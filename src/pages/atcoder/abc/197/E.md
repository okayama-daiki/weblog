---
tags: [ABC, DP]
---

# ABC197 E - Traveler

[https://atcoder.jp/contests/abc197/tasks/abc197_e](https://atcoder.jp/contests/abc197/tasks/abc197_e)  
水色下位。DP。

同じ色のついたボールを取得する方法について、端から端まで順番にとっていく方法が最適となる。
その際、左から始めるか右から始めるかで 2 通りの選択肢があるため、ここを DP を用いて高速に計算する。

ここまで落とし込めたら基礎 DP かと思いきや、遷移式の抽象化にかなり苦労した。
まず「左端から右端の遷移」みたいなものを最初考えていたが、実は元の位置は別にどちらでもよい
つまり、左 → 右、左 → 左、右 → 左、右 → 左ではなく、x→ 右、x→ 左と抽象化できる
x から右端に行くには、左端を経由するべきだし、x から左端に行くには右端を経由すべきだから、結局 3 重ループで簡潔に遷移を表現できることになる

```py
INF = float('inf')

n = int(input())

# balls[i] := 色iのボールについて、（左端ボールの座標、右端ボールの座標）
balls = {-1: [0, 0]}

for _ in range(n):
    x, c = map(int, input().split())
    left, right = balls.get(c - 1, [INF, -INF])
    balls[c - 1] = [min(left, x), max(right, x)]

balls = [e for _, e in sorted(balls.items())]

# dp[i][j] := 色iのボールをすべて回収した時に(j == 0 ? 左 : 右)側にいる場合の時刻
dp = [[INF, INF] for _ in range(len(balls))]
dp[0] = [0, 0]

for i in range(len(balls) - 1):
    for j in range(2):
        x = balls[i][j]
        for k in range(2):
            dp[i + 1][k] = min(
                dp[i + 1][k], dp[i][j] + abs(balls[i + 1][~k] - x) +
                balls[i + 1][1] - balls[i + 1][0])

print(min(dp[-1][0] + abs(balls[-1][0]), dp[-1][1] + abs(balls[-1][1])))
```
