---
tags: [ABC, D, 鳩の巣原理]
---

# ABC200 D - Happy Birthday! 2

[https://atcoder.jp/contests/abc200/tasks/abc200_d](https://atcoder.jp/contests/abc200/tasks/abc200_d)  
水色上位。鳩の巣原理。

実験してみると 200 で割った余りのため、すぐ $B,C$ が見つかると気付く。
鳩の巣原理から、 $200<2^8$ の先頭 8 項を探索すれば $B,C$ はすぐに見つかる。

```py
import collections

n = int(input())
a = list(map(int, input().split()))

counter = collections.defaultdict(list)

for bit in range(1, (1 << min(n, 8))):
    total = 0
    for shift in range(min(n, 8)):
        if (bit >> shift) & 1:
            total += a[shift]
            total %= 200
    counter[total].append(bit)

for value in counter.values():
    if len(value) > 1:
        print('Yes')
        b, c, *_ = value
        for t in b, c:
            count = 0
            ans = []
            for shift in range(min(n, 8)):
                if (t >> shift) & 1:
                    ans.append(shift + 1)
                    count += 1
            print(count, *ans)
        break
else:
    print('No')

```
