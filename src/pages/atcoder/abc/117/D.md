---
tags: [XOR, 桁DP, ABC]
---

# ABC117 D - XXOR

[https://atcoder.jp/contests/abc117/tasks/abc117_d](https://atcoder.jp/contests/abc117/tasks/abc117_d)  
水色上位。XOR。

基本的には bit 独立で見ていけばいい。
**入力例 1**
`1: 001`
`6: 110`
`3: 011`
`4: 100` ← 解

**入力例 2**
`7: 0111`
`4: 0100`
`0: 0000`
`3: 0011`
`9: 1001`

各桁で 1 の個数と 0 の個数をカウントするが、このとき各ビットについて XOR の和をとるので、数の多い方の逆を答えてやればいい。つまり、各桁が`[1, 0, 0, 1, 1]`であった場合、1 の数の方が多いので、逆の 0 を答えにする。

ただし、 $K$ より小さくなる必要があるのがポイントで、bitDP 的なことを行う必要がある。
桁の大きい方から見てやって、各 bit で最適な値を選択すればよいのだが、既に $K$ より小さいことが確定しているなら好きな値を、 $K$ と一致している状況下では値が制限される。

```py
n, k = map(int, input().split())
a = list(map(int, input().split()))

BIT_LENGTH = max(*a, k).bit_length()

x = 0

is_small = False
for digit in range(BIT_LENGTH)[::-1]:

    if is_small or k >> digit & 1:  # 1をおいてもok
        bit1 = 0
        for e in a:
            if e >> digit & 1:
                bit1 += 1
        if bit1 * 2 <= n:
            x += 1 << digit
        else:
            is_small = True

print(sum(map(lambda e: e ^ x, a)))
```
