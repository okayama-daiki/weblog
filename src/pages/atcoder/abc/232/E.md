---
tags: [DP, ABC, E]
---

# ABC232 E - Rook Path

[https://atcoder.jp/contests/abc232/tasks/abc232_e](https://atcoder.jp/contests/abc232/tasks/abc232_e)

水色下位。DP。

$O(HWmax(H,W)K)$ のとんでも DP を思いつくが、間に合うわけもなく。それでも他にすることがないため、実際に実装し DP テーブルを見てみると、各テーブルにおいて 4 種類の値しかとらないことに気付く。
(x1, y1)
(x1, _)
(_, y1)
それ以外

（愚直 DP）

```py
dp = [[[0 for _ in range(w)] for _ in range(h)] for _ in range(k + 1)]
dp[0][x1 - 1][y1 - 1] = 1

for i in range(k):
    for x in range(h):
        for y in range(w):
            dp[i + 1][x][y] += sum(dp[i][x][y_] for y_ in range(w) if y != y_)
            dp[i + 1][x][y] += sum(dp[i][x_][y] for x_ in range(h) if x != x_)
```

よってこれらの 4 種類のみを管理する DP を行えば良い。遷移も定義から考えばそんなに難しくないはず。状態圧縮というらしい。

```py
MOD = 998244353

h, w, k = map(int, input().split())
x1, y1, x2, y2 = map(int, input().split())


center = 1
cross_ud = 0
cross_lr = 0
rectangle = 0
for i in range(k):

    center, cross_ud, cross_lr, rectangle =\
        (cross_lr * (w - 1) + cross_ud * (h - 1),
         cross_ud * (h - 2) + center + rectangle * (w - 1),
         cross_lr * (w - 2) + center + rectangle * (h - 1),
         cross_lr + cross_ud + rectangle * (h + w - 4))
    center %= MOD
    cross_lr %= MOD
    cross_ud %= MOD
    rectangle %= MOD


if x1 == x2:
    if y1 == y2:
        ans = center
    else:
        ans = cross_lr
else:
    if y1 == y2:

        ans = cross_ud
    else:
        ans = rectangle

print(ans)

```

遷移の部分を行列の掛け算とみれば、 $O(logK)$ で解くことも可能らしい。
