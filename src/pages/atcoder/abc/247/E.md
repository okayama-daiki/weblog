---
tags: [尺取り法, ABC, E]
---

# ABC247 E - Max Min

[https://atcoder.jp/contests/abc247/tasks/abc247_e](https://atcoder.jp/contests/abc247/tasks/abc247_e)  
水色下位。尺取り法。

いかにも尺取り法を使う問題であるが、配列中に条件を満たさない要素 $(A_i < X\space|\space Y<A_i)$ が存在するためそのままでは尺取り法の適用が難しい。

そのような場合は条件を満たす（可能性のある）連続部分列の中で尺取り法を適用すればよいだけのこと。言い換えれば、配列から条件を満たさない要素を切り取ればいい。

```py
n, x, y = map(int, input().split())
a = list(map(int, input().split()))


def two_pointers_technique(a):
    print(a)
    res = 0
    right = 0
    count_x = count_y = 0
    for left in range(len(a)):
        while right < len(a) and (count_x == 0 or count_y == 0):
            count_x += a[right] == x
            count_y += a[right] == y
            right += 1
        if count_x > 0 and count_y > 0:
            res += len(a) - right + 1
        count_x -= a[left] == x
        count_y -= a[left] == y
    return res


out_of_range = [-1]
for i in range(n):
    if not y <= a[i] <= x:
        out_of_range.append(i)
out_of_range.append(n + 1)

ans = 0
for base_left, base_right in zip(out_of_range, out_of_range[1:]):
    ans += two_pointers_technique(a[base_left + 1: base_right])

print(ans)
```
