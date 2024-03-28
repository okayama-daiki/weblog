---
tags: [式変形, ABC, E]
---

# ABC166 E - This Message Will Self-Destruct in 5s

[https://atcoder.jp/contests/abc166/tasks/abc166_e](https://atcoder.jp/contests/abc166/tasks/abc166_e)

条件は `i - j = a[i] + a[j]` or `j - i = a[i] + a[j]`
変形すると、`i - a[i] = j + a[j]` or `i + a[i] = j - a[j]`

事前に`i - a[i]`と`i + a[i]`を計算しておき、`a`の前から交互に見ていく。

```py
import itertools
import operator
import collections

n = int(input())
a = list(map(int, input().split()))

a_plus = list(itertools.starmap(operator.add, enumerate(a, 1)))
a_minus = list(itertools.starmap(operator.sub, enumerate(a, 1)))

a_plus_dict = collections.defaultdict(int)
a_minus_dict = collections.defaultdict(int)

ans = 0
for a_p, a_m in zip(a_plus, a_minus):
    ans += a_plus_dict[a_m]
    ans += a_minus_dict[a_p]
    a_plus_dict[a_p] += 1
    a_minus_dict[a_m] += 1

print(ans)
```

---

2023/03/26 追記

$j<i$ という仮定をおくことで、条件は次のように変形できる
$|i-j|=A_i+A_j\iff i-j=A_i+A_j\space(j<i)\iff i-A_i=A_j+j$

つまり、 $i=1,2,...N$ と $i$ の小さい方からみていき、 $A_i+i$ の個数をカウントしていく。同時にそれまでの $i-A_i$ の個数の和が答えとなる。

```py
import collections

n = int(input())
a = list(map(int, input().split()))

counter = collections.Counter()

ans = 0
for i, e in enumerate(a):
    counter[e + (i + 1)] += 1
    ans += counter[(i + 1) - e]

print(ans)
```
