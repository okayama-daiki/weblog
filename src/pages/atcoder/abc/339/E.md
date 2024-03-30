---
tags: ["ABC", "E", "DP", "SegmentTree"]
---

# ABC339 E - Smooth Subsequence

https://atcoder.jp/contests/abc339/tasks/abc339_e  
緑上位。DP。

次の DP はすぐ思いついたが、$O(\max{(A_i)}N)$ と計算量が大きいし、これ以上改善できる方法が見つからない。

```py
# dp[i][j] := a[:i] の中で直前の要素が j であるような条件を満たす部分列の最大長
dp = [[0] * (max_a + 1) for _ in range(n + 1)]
dp[0] = [1] * (max_a + 1)

for i in range(n):
    for j in range(max_a + 1):
        dp[i + 1][j] = max(dp[i + 1][j], dp[i][j])
        if abs(j - a[i]) <= d:
            dp[i + 1][a[i]] = max(dp[i + 1][a[i]], dp[i][j] + 1)

```

まず、各ステップで主に更新されるのは `dp[i + 1][a[i]]` １点のみであるから、`dp` 配列の各行は使い回しで良い。（他の `dp[i + 1][j]` は `dp[i][j]` と等しくなる）

```py
# 末尾が i であるような条件を満たす部分列の最大長
dp = [0] * (max_a + 1)

for i in range(n):
    for j in range(max_a + 1):
        if abs(j - a[i]) <= d:
            dp[i + 1][a[i]] = max(dp[i + 1][a[i]], dp[i][j] + 1)

```

次に、内側のループで `dp[i + 1][a[i]]` を更新するために参照しているのは、`dp[i][j]` のうち $|j-a[i]|\le{d}$ の部分のみなので、より簡潔に次のように書ける。

```py
# 末尾が i であるような条件を満たす部分列の最大長
dp = [0] * (max_a + 1)

# 注意: range が [0, max_a) の範囲を出た場合のエラーハンドリングが必要
for i in range(n):
    dp[i + 1][a[i]] = max(
      dp[i][j] for j in range(a[i] - d, a[i] + d + 1)
    ) + 1
```

ここまで来れば、ある範囲の最大値の計算に SegmentTree を利用することで、この問題を $O(N\log{\max{(A_i)}})$ で解くことができる。

## 提出コード

```py showLineNumbers
# -*- coding: utf-8 -*-

import atcoder.segtree as segtree

n, d = map(int, input().split())
a = list(map(int, input().split()))
max_a = max(a)

# dp[i] := 末尾が i であるような条件を満たす部分列の最大長
dp = segtree.SegTree(op=max, e=0, v=[0] * (max_a + 1))

for i in range(n):
    dp.set(a[i], dp.prod(max(0, a[i] - d), min(max_a, a[i] + d) + 1) + 1)

print(dp.all_prod())

```

[Python (PyPy 3.10-v7.3.12), 838ms](https://atcoder.jp/contests/abc339/submissions/51751942)

## 類題

- Minimize maximizer (POJ No.1769)
