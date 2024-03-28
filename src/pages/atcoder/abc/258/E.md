---
tags: [ABC, E, 周期性, ダブリング]
---

# ABC258 E - Packing Potatoes

[https://atcoder.jp/contests/abc258/tasks/abc258_e](https://atcoder.jp/contests/abc258/tasks/abc258_e)  
水色上位。周期性。ダブリング。

各箱のじゃがいもの重さや個数も周期的ではあるものの、これだけではじゃがいもの種類の区別ができない。
1, 7 と 3, 5 は共にじゃがいもの重さの和と個数が等しいが、中身が区別できない

ここで[* 「じゃがいも $i$ から箱詰めを始めた時、次の箱の最初のじゃがいもの種類 $j$ 」]を考えると見通しがよくなり、[ABC167 D - Teleporter](https://atcoder.jp/contests/abc167/tasks/abc167_d) と同じ要領で解ける。

最初の初期化の部分の肝心で、じゃがいも $i$ から箱詰めを始めた時、箱がいっぱいになるのは何個目かという計算は愚直にやると $O(NX)$ となってしまう（ $W_i=1$ の場合）。
そのため $S=\sum_{i=0}^{N-1}W_i$ を 1 周期分として、 $X$ を $S$ で割った余りに対して二分探索を行うことで高速に初期化を行うことができる。

また、聞かれているのは箱にいれるじゃがいもの個数なので別途求めておく必要がある。

```py
import bisect
import itertools

n, q, x = map(int, input().split())
w = list(map(int, input().split()))
k = [int(input()) for _ in range(q)]

# dob[p][i] = 2^p個目の箱に対して、i(mod N)番目のじゃがいもから詰めていったとき、次の箱に入れる最初のじゃがいもの番号(mod N)
dob = [[0] * n for _ in range(41)]

# count[i] := i(mod N)番目のじゃがいもから詰めていく時、蓋をするまでに入れるじゃがいもの個数
count = [0] * n

sum_w = sum(w)
acc_ww = [0] + list(itertools.accumulate(w + w))

for i in range(n):
    target = acc_ww[i] + x % sum_w
    index = bisect.bisect_left(acc_ww, target)
    dob[0][i] = index % n
    count[i] = index - i + x // sum_w * n

for p in range(40):
    for i in range(n):
        dob[p + 1][i] = dob[p][dob[p][i]]

for k in k:
    ans = 0
    for shift in range(40):
        if (k - 1 >> shift) & 1:
            ans = dob[shift][ans]
    print(count[ans])

```
