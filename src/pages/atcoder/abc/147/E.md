---
tags: [bitset, DP, ABC, E]
---

# ABC147 E - Balanced Path

[https://atcoder.jp/contests/abc147/tasks/abc147_e](https://atcoder.jp/contests/abc147/tasks/abc147_e)  
青色下位。DP。

**知見**
定数倍高速化
bitset

Python は多倍長演算がサポートされているため、整数型に対してビット演算が利用できる。
あるビットに対して`bit << i & 1`が`1`のとき、要素`i`を含むことにすると、たとえば $1001010_{(2)}$ は、要素として $1,3,6$ を含むことになる。

その時点でとりうる各値に対して、差が $d$ 増加するとは、対応するビットが左に $d$ 分シフトされることと等しく、減少する場合は右シフトすることと等しい。

マイナスの値をとりうるため、予め右にシフトしておき、最後にその分左シフトすればよい。

あまりに大きすぎる数を扱うことになるため、定数倍が大きくなりすぎないのかという点には疑問が残る。

```py
MAX_DIFF = 15000

h, w = map(int, input().split())
a = [list(map(int, input().split())) for _ in range(h)]
b = [list(map(int, input().split())) for _ in range(h)]

dp = [[0 for _ in range(w)] for _ in range(h)]
dp[0][0] |= 1 << (MAX_DIFF + a[0][0] - b[0][0])
dp[0][0] |= 1 << (MAX_DIFF + b[0][0] - a[0][0])

for i in range(h):
    for j in range(w):
        if i + 1 < h:
            diff = abs(a[i + 1][j] - b[i + 1][j])
            dp[i + 1][j] |= dp[i][j] << diff
            dp[i + 1][j] |= dp[i][j] >> diff
        if j + 1 < w:
            diff = abs(a[i][j + 1] - b[i][j + 1])
            dp[i][j + 1] |= dp[i][j] << diff
            dp[i][j + 1] |= dp[i][j] >> diff

ans = MAX_DIFF

for i in range(2 * MAX_DIFF):
    if dp[-1][-1] >> i & 1:
        ans = min(ans, abs(i - MAX_DIFF))

print(ans)

```
