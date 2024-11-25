---
tags: [二分探索, 基数変換, ABC, D]
---

# ABC192 D - Base n

[https://atcoder.jp/contests/abc192/tasks/abc192_d](https://atcoder.jp/contests/abc192/tasks/abc192_d)  
水色

$X$ を $n$ 進法表記とみなした数は狭義単調増加となる。よって $0\sim m$ の間で二分探索を行えばよい。

二分探索とは False, False, False, ..., False, True, True, .., True, の境界点を求めることである。
境界点を $M$ とすると、
$l < M < r$ なる $l, r$ を求める
$r - l = 1$ になるまで、 $l, r$ を更新する

注意すべきは $X$ が一桁の場合は答えが 0 か 1 にしかならないこと。
例えば $X=6$ のとき、6 進法とみなそうが、7 進法とみなそうが値は 6 のままであるためである。

```py
def int_base(n: str, base: int) -> int:
    return sum(map(lambda x: int(x[1]) * base ** x[0], enumerate(reversed(n))))

x = input()
m = int(input())
d = int(max(x))

c = lambda n: int_base(x, n) <= m

lo = d; hi = m + 1

while hi - lo > 1:
    mid = (lo + hi) // 2
    if c(mid):
        lo = mid
    else:
        hi = mid

if len(x) == 1:
    print(int(int(x) <= m))
else:
    print(max(lo - d, 0))
```
