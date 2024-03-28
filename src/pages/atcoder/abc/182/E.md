---
tags: [ABC, E, 光]
---

# ABC182 E - Akari

[https://atcoder.jp/contests/abc182/tasks/abc182_e](https://atcoder.jp/contests/abc182/tasks/abc182_e)

緑上位。

重要な点は、**直線的に進み続ける光源においては、既にそこに光が存在する場合、他の光は不要である**ことである。

ボードを縦と横で分けて考えた場合、そこに光があるならば、横方向、または縦方向には既に限界まで照らされているので再度調べる必要はないということであった。

```py
h, w, n, m = map(int, input().split())
ab = [list(map(int, input().split())) for _ in range(n)]
cd = [list(map(int, input().split())) for _ in range(m)]

board_LR = [[0] * w for _ in range(h)]
for a, b in ab:
    board_LR[a - 1][b - 1] = 1
for c, d in cd:
    board_LR[c - 1][d - 1] = -1

for h_ in range(h):
    for w_ in range(w - 1):
        if board_LR[h_][w_] == 1 and board_LR[h_][w_ + 1] == 0:
            board_LR[h_][w_ + 1] = 1
    for w_ in range(1, w)[::-1]:
        if board_LR[h_][w_] == 1 and board_LR[h_][w_ - 1] == 0:
            board_LR[h_][w_ - 1] = 1

board_UD = [[0] * w for _ in range(h)]
for a, b in ab:
    board_UD[a - 1][b - 1] = 1
for c, d in cd:
    board_UD[c - 1][d - 1] = -1

for w_ in range(w):
    for h_ in range(h - 1):
        if board_UD[h_][w_] == 1 and board_UD[h_ + 1][w_] == 0:
            board_UD[h_ + 1][w_] = 1
    for h_ in range(1, h)[::-1]:
        if board_UD[h_][w_] == 1 and board_UD[h_ - 1][w_] == 0:
            board_UD[h_ - 1][w_] = 1

ans = 0
for h_ in range(h):
    for w_ in range(w):
        ans += board_LR[h_][w_] == 1 or board_UD[h_][w_] == 1

print(ans)
```
