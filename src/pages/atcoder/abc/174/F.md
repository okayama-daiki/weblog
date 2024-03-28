---
tags:
  [BIT, データ構造, ABC, F, 定数倍, 区間クエリ, オフラインクエリ, クエリ先読み]
---

# ABC174 F - Range Set Query

[https://atcoder.jp/contests/abc174/tasks/abc174_f](https://atcoder.jp/contests/abc174/tasks/abc174_f)  
水色上位。データ構造。

クエリに対してオフラインに回答することを考える。
まずはスケジューリング問題と同様にまずはクエリを右端の値でソートしておき、この順番に回答する。

左端のボールから順番に見ていくが、その時同じ色のボールは一番右側に位置するもののみ管理する。（区間の右端でソートしており、区間の左端のインデックスより大きいものにのみ興味があるため）。各色のボールにインデックスに対応する部分にフラグを立てておけば、BIT により区間和を計算することによって各クエリに回答できる。

```py
import sys

input = sys.stdin.readline


def add(p, x):
    p += 1
    while p <= n:
        bit[p - 1] += x
        p += p & -p


def sum(left, right):
    return _sum(right) - _sum(left)


def _sum(r):
    s = 0
    while r > 0:
        s += bit[r - 1]
        r -= r & -r

    return s


n, q = map(int, input().split())
c = list(map(lambda x: int(x) - 1, input().split()))
lr = [list(map(lambda x: int(x) - 1, input().split())) for _ in range(q)]

res = [None] * q

# balls[i] := 最も右端に位置する色iのボールのインデックス
balls = [None] * n

# bit[i] := インデックスiに条件を満たすボールが存在する
bit = [0] * n

pre_r = 0
for i in sorted(range(q), key=lambda i: lr[i][1]):
    l, r = lr[i]
    for j in range(pre_r, r + 1):
        if not balls[c[j]] is None:
            add(balls[c[j]], -1)
        balls[c[j]] = j
        add(balls[c[j]], 1)
    res[i] = sum(l, r + 1)
    pre_r = r

print(*res)

```

定数倍との勝負であり、何回か提出する必要がある。
