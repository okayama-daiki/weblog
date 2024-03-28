---
tags: [BIT, 転置数, ABC, F, データ構造]
---

# ABC261 F - Sorting Color Balls

[https://atcoder.jp/contests/abc261/tasks/abc261_f](https://atcoder.jp/contests/abc261/tasks/abc261_f)  
水色上位。データ構造。

明らかに転置数を求める問題であるが、ポイントは色をどう処理するかである。

一度に処理しようとすると、BIT を色の種類数分持つ必要があり空間計算量は $O(N^2)$ となり間に合わない。

**発想の転換**
同色でないものを転置させる際にコストがかかり、同色であるものを転置させるとコストがかからない。そのため、余事象的な考え方から、予め全て同色でないと仮定した上で転置数を求め（一般的な転置数）、その後同色であるものを転置させたと考えた時のコストを減じればよい。

つまり予め色を無視した転置数を求め、その後各色で**順番に**BIT を作成しその上で求めた転置数を先の転置数から減算すれば良い。

以下の例では同じ BIT を再利用している。

```py
from atcoder.fenwicktree import FenwickTree

n = int(input())
c = list(map(lambda x: int(x) - 1, input().split()))
x = list(map(lambda x: int(x) - 1, input().split()))

swap = 0
origin_bit = FenwickTree(n)

for e in x:
    swap += origin_bit.sum(e + 1, n)
    origin_bit.add(e, 1)

colors = [[] for _ in range(n)]
for i, color in enumerate(c):
    colors[color].append(x[i])

bit = FenwickTree(n)

for color in colors:
    for e in color:
        swap -= bit.sum(e + 1, n)
        bit.add(e, 1)
    for e in color:
        bit.add(e, -1)

print(swap)

```
