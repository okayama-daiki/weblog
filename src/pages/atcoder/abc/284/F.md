---
tags: [ローリングハッシュ, ABC, F, 文字列]
---

# ABC284 F - ABCBAC

[https://atcoder.jp/contests/abc284/tasks/abc284_f](https://atcoder.jp/contests/abc284/tasks/abc284_f)  
水色上位。文字列。

与えられた文字列 $T$ が $f_i(S)$ に合致するということは、 $T$ の部分文字列`T[:i] + T[n+i:]`と`T[i:i+N]`を反転させたものが一致していることに言い換えられる。 $f_0(S), f_1(S), ..., f_i(S), ..., f_n(S)$ を考えるにあたって、各部分文字列は決まった変化をすることを考えればローリングハッシュにより高速に判定することが可能となる。

例）`T = 'abcbac'`のとき、
`i  T[:i] + T[n+i:], rev(T[i:i+N])`
`0:     bac        , cba         `
`1:     aac        , bcb         `
`2:     abc        , abc         `
`3:     abc        , cab         `
`T[:i] + T[n+i:]`では、先頭`i`文字目から順に`T[i]`に置換する
`rev(T[i:i+N])`では、`T[i]`を消去し、`T[n+i]`を加える
と試行錯誤しながらロジックに落とし込む。

```py
def f(s, i):
    return s[:i] + s[-(n - i) :]


B = 10**9 + 7 + 7
H = 998244353

n = int(input())
t = input()

# powers[k] := B^k mod H
powers = [1]
for _ in range(n):
    powers.append(powers[-1] * B % H)

base = f(t, 0)

hash_a = sum(map(lambda i: ord(base[i]) * powers[i], range(n))) % H
hash_b = sum(map(lambda i: ord(t[-i - 1 - n]) * powers[i], range(n))) % H


for i in range(n):
    if hash_a == hash_b:
        print(f(t, i))
        print(i)
        break
    hash_a += powers[i] * ord(t[i]) - powers[i] * ord(base[i])
    hash_a %= H
    hash_b = hash_b * B + ord(t[n + i]) - ord(t[i]) * powers[n]
    hash_b %= H
else:
    print(-1)
```
