---
tags: [ABC, D, XOR]
---

# ABC147 D - Xor Sum 4

[https://atcoder.jp/contests/abc147/tasks/abc147_d](https://atcoder.jp/contests/abc147/tasks/abc147_d)  
水色上位。XOR

**POINT**
XOR は桁ごとに
基本演算
$1 \oplus 0= 0\oplus1=1$

入力例 1 は、
$A_1= 01_{(2)}$
$A_2 = 10_{(2)}$
$A_3=11_{(2)}$

各桁ごとに見るため、 $\{0,1,1\}$ と $\{1,0,1\}$ と個別にチェックする。
このとき題意の $\sum_{i-1}^{N-1}\sum_{j=i+1}^{N}A_i\oplus A_j$ は任意の 2 点間の XOR の総和を求めており、これは各桁に含まれる(0 の個数)と(1 の個数)の積に一致する。

よって各桁ごとに 0 の個数と 1 の個数をカウントし、その積を求め**元々の桁に注意して**繰り上がりを考えたらよい。

```py
MOD = 10**9 + 7
MAX_BIT = 60

n = int(input())
a = list(map(int, input().split()))

ans = 0

for bit in range(MAX_BIT):
    counter = [0, 0]
    for i in range(n):
        counter[a[i] >> bit & 1] += 1

    ans += (counter[0] * counter[1]) << bit
    ans %= MOD


print(ans)

```

ちなみに`bin()`を使うと[TLE](https://atcoder.jp/contests/abc147/submissions/38472306) する
