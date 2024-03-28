---
tags: [組み合わせ, 数学, DP, ABC, F]
---

# ABC234 F - Reordering

[https://atcoder.jp/contests/abc234/tasks/abc234_f](https://atcoder.jp/contests/abc234/tasks/abc234_f)  
水色上位。DP。

まず任意の部分列を並び替えてよいという条件から、元の文字列の並びに意味はない。そのため文字列としてではなく各アルファベットの出現頻度として $s$ を管理する。

利用するアルファベットの種類数及び文字数を添字に持つ DP 配列を考える。

`dp[i][j] := \u00{i+60}までのアルファベットの中で、使った文字数の合計がj個であるようなSの並び替え部分文字列の総数`

遷移は`alpha = 'abcdefgh...'`として
`dp[i + 1][j] = Σ dp[i][j-k] * jCk | k = 0, ..., Sに含まれる alpha[i]の個数, j-k >= 0`

例えば`dp[3][3]`の更新には（簡単のために $s$ には全てのアルファベットが十分数含まれているとする／実際は要素数を値として持つことに注意）、
`k=0`のとき
`dp[2][3-0] = {aaa, aab, aba, abb, baa, bab, bba, bbb}` と、0 個の`c`を考える。このとき、3 つのスロット ◯◯◯ に、`c`を 0 個入れて、開いたところに`dp[2][3-0]`の各要素を入れる
`{aaa, aab, aba, abb, baa, bab, bba, bbb} = 8 * 3C0 = 8通り`
`k=1`のとき
`dp[2][3-1] = {aa, ab, ba, bb}`と、1 個の`c`を考える。このとき、3 つのスロット ◯◯◯ に、`c`を 1 つ入れて、開いたところに`dp[2][3-1]`の各要素を入れる
`{caa, aca, aac, cab, acb, abc, cba, bca, bac, cbb, bcb, bbc} = 4 * 3C1 = 12通り`
`k=2`のとき
`dp[2][3-2] = {a, b}`と、2 個の`c`を考える。このとき、3 つのスロット ◯◯◯ に、`c`を 2 つ入れて、開いたところに`dp[2][3-2]`の各要素を入れる
`{cca, cac, acc, ccb, cbc, bcc} = 2 * 3C2 = 6通り`
`k=3`のとき
`dp[2][3-3] = {}`と 3 個の`c`を考える。例外的に`{ccc} = 1 * 3C3 = 1通り`のみ得られる

よって`dp[3][3] = 8 + 12 + 6 + 1 = 27`と更新される。

```py
import collections


def make_comb(max_n, mod=998244353):
    facts = [1]
    ifacts = [1]
    for i in range(1, max_n + 1):
        facts.append(facts[-1] * i % mod)
        ifacts.append(ifacts[-1] * pow(i, mod - 2, mod) % mod)

    def comb(n, r):
        if n < 0 or r < 0 or n < r:
            return 0
        return facts[n] * ifacts[n - r] % mod * ifacts[r] % mod

    return comb


MOD = 998244353
s = input()
n = len(s)

comb = make_comb(len(s) + 1)

# freq[s] := \u00{s+61}の出現回数
freq = collections.Counter(map(lambda e: ord(e) - 97, s))

# dp[i][j] := \u00{i+60}までのアルファベットの中で、使った文字数の合計がj個であるようなSの並び替え部分文字列の総数
dp = [[0] * (n + 1) for _ in range(27)]
dp[0][0] = 1

for i in range(26):
    for j in range(n + 1):
        for k in range(min(freq[i], j) + 1):
            dp[i + 1][j] += dp[i][j - k] * comb(j, k)
            dp[i + 1][j] %= MOD

ans = 0
for i in range(n + 1):
    ans += dp[26][i]
    ans %= MOD

print(ans - 1)

```
