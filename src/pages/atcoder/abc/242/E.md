---
tags: [ABC, E, 回文, 文字列]
---

# ABC242 E - (∀x∀)

[https://atcoder.jp/contests/abc242/tasks/abc242_e](https://atcoder.jp/contests/abc242/tasks/abc242_e)  
水色下位。文字列操作。

回文であるためには、前半 $\lceil N/2\rceil$ 文字と後半 $\lceil N/2\rceil$ 文字が一致している必要がある。
桁 DP の考え方に近いが $S$ に一致しているか否かが重要で、 $S$ より小さいのならば $A-Z$ の好きな文字を割り当てることができる。そのため、例えば $S$ の前半部分が`ABCD`であるなら、`ABCC`以下の文字では自由に回文を組むことができる。これは 26 進数であると考えれば容易に求まる。（繰り返し二乗法を利用しないと TLE 地獄が発生するので注意）

問題は $S$ の前半部分と完全一致しているような回文で、これは素直に回文を構築してやって、 $S$ と比較すれば良い。

```py
MOD = 998244353

t = int(input())
for _ in range(t):
    n = int(input())
    s = input()
    half_index = n // 2 + n % 2
    ans = 0
    for i in range(half_index):
        ans += (ord(s[i]) - ord('A')) * pow(26, (half_index - i - 1), MOD)
        ans %= MOD
    palindrome = s[:half_index] + s[:half_index - n % 2][::-1]
    if palindrome <= s:
        ans += 1

    print(ans % MOD)
```
