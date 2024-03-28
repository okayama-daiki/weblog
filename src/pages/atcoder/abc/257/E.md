---
tags: [ABC, E, 貪欲法]
---

# ABC257 E - Addition and Multiplication 2

[https://atcoder.jp/contests/abc257/tasks/abc257_e](https://atcoder.jp/contests/abc257/tasks/abc257_e)

水色下位。貪欲法。

ある数字を最大化する問題に関する Tips。

1. 桁数
2. 上位桁の値

数を最大化には、何よりまず桁数を確保すること。

```py
n = int(input())
c = list(map(int, input().split()))

dig = n // min(c)
base = 9 - c[::-1].index(min(c))
base_cost = min(c)
remain = n - min(c) * dig
for _ in range(dig):
    for i in range(9)[::-1]:
        if remain >= c[i] - base_cost:
            remain -= c[i] - base_cost
            print(i + 1, end='')
            break
    else:
        print(base, end='')
```
