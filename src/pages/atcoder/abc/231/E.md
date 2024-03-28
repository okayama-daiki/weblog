---
tags: [DP, ABC, E]
---

# ABC231 E - Minimal payments

[https://atcoder.jp/contests/abc231/tasks/abc231_e](https://atcoder.jp/contests/abc231/tasks/abc231_e)  
青色下位。DP。

各硬貨 $A_i$ について、支払う金額を超えないように $X/A_i$ 枚払うか、お釣りをもらって $X/A_i+1$ 枚払うかの 2 通り存在する。
これらの支払いにおいて、 $A_{i-1}$ 以下の硬貨を使って支払うべき金額はそれぞれ $X\%A_i$ 円、 $A_i-X\%A_i$ 円となる。

$A_{i-1}$ 円でも上と同様に超える／超えないように支払うと、 $A_{i-2}$ 以下の硬貨を使って支払うべき金額は、 $X\%A_i\%A_{i-1}$ 円、 $A_{i-1}-X\%A_i\%A_{i-1}$ 円、 $(A_i-X\%A_i)\%A_{i-1}$ 円、 $A_{i-1}-(A_i-X\%A_i)\%A_{i-1}$ 円となる。

ここで、 $A_{i-1}\times k=A_i$ であることを踏まえると、上の各金額は結局 $X\%A_{i-1}$ 円、 $A_{i-1}-X\%A_{i-1}$ の 2 種類である。

よって、各硬貨で支払う際にその金額以下の硬貨で支払うべきような金額というのは、高々 2 種類に落ち着くので、金額の大きいコインから順番に、超えないように支払うか、お釣りをもらうように支払うかの 2 通りを考えていけば良い。

```py
def memorize(f):
    memo = {}

    def inner(*args):
        if args not in memo:
            memo[args] = f(*args)
        return memo[args]

    return inner


@memorize
def rec(i, x):
    if i == 0:
        return x
    return min(x // a[i] + rec(i - 1, x % a[i]),
               x // a[i] + 1 + rec(i - 1, -x % a[i]))


n, x = map(int, input().split())
a = list(map(int, input().split()))

print(rec(n - 1, x))

```
