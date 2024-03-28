---
tags: [合成数, 素数, ABC, D]
---

# ABC096 D - Five, Five Everywhere

[https://atcoder.jp/contests/abc096/tasks/abc096_d](https://atcoder.jp/contests/abc096/tasks/abc096_d)

水色下位。構築系

任意の 5 つの和が合成数となるような素数の組み合わせを求めたい。

合成数を 5 の倍数であると考えれば、条件は各素数の mod5 が 1 であることと等しい。

$55555$ 以下の素数は数千個存在し、その中から mod5 が 1 である $N\le55$ 個を選ぶ。

```py
def create_sieve(n):
    sieve = [True] * n
    sieve[:2] = [False] * 2
    for p in range(2, n):
        if not sieve[p]:
            continue
        i = p
        while i + p < n:
            i += p
            sieve[i] = False
    return sieve


n = int(input())

sieve = create_sieve(55555)
prime = []
for i in range(55555):
    if sieve[i] and i % 5 == 1:
        prime.append(i)

print(*prime[:n])
```
