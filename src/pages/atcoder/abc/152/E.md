---
tags: [最大公約数, LCM, ABC, E]
---

# ABC152 E - Flatten

[https://atcoder.jp/contests/abc152/tasks/abc152_e](https://atcoder.jp/contests/abc152/tasks/abc152_e)  
水色上位。数学。

最大公約数の求め方
全ての数に対して素因数分解を行い、各素数の max を取る方法
a \* b // gcd(a, b) の結果を縮約する方法

おそらくどちらの方法でも計算量は変わらない（はず）

前者の方法だと逐次 MOD を取ることができるため、今回の問題設定上では高速に動作する。

```py
import functools


def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)


def lcm(a, b):
    return a * b // gcd(a, b)


MOD = 10**9 + 7

n = int(input())
a = list(map(int, input().split()))

t = functools.reduce(lcm, a) % MOD

ans = 0
for i in range(n):
    ans += t * pow(a[i], MOD - 2, MOD)
    ans %= MOD

print(ans)

```

```py
import collections
import functools


def factorize(n):
    res = collections.Counter()
    for d in range(2, int(n**.5) + 2):
        while n % d == 0:
            res[d] += 1
            n //= d
    if n != 1:
        res[n] += 1
    return res


MOD = 10**9 + 7

n = int(input())
a = list(map(int, input().split()))

_lcm = collections.Counter()
for e in a:
    for k, v in factorize(e).items():
        _lcm[k] = max(_lcm[k], v)

lcm = functools.reduce(lambda a, b: a * b % MOD,
                       (pow(k, v) for k, v in _lcm.items()),
                       1)

ans = 0
for i in range(n):
    ans += lcm * pow(a[i], MOD - 2, MOD)
    ans %= MOD

print(ans)
```
