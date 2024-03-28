---
tags: [ABC, D, ダブリング]
---

# ABC136 D - Gathering Children

[https://atcoder.jp/contests/abc136/tasks/abc136_d](https://atcoder.jp/contests/abc136/tasks/abc136_d)  
茶色上位。ダブリング。

実験により、ある状態までいくとそこからは周期 2 の状態を繰り返すことがわかる。
鳩の巣原理のように、 $10^5$ 程度回後の移動が分かれば、少なくともそれ以降は周期 2 のループが起こっていると想像できる。

$2^{16}<10^5<2^{17}$ より、ダブリングを利用して $2^{17}$ 回移動後の状態を求める。
ここで、[* $2^{17}$ と $10^{100}$ の偶奇が一致している]ことから、 $2^{17}$ 回移動後の状態がそのまま $10^{100}$ 回移動後の状態として扱っていい。

```py
s = input()

# dob[p][i] := i番目のマスから2^p回移動した先のマス
dob = [[0] * len(s) for _ in range(18)]

for i in range(len(s)):
    if s[i] == 'R':
        dob[0][i] = i + 1
    if s[i] == 'L':
        dob[0][i] = i - 1

for p in range(17):
    for i in range(len(s)):
        dob[p + 1][i] = dob[p][dob[p][i]]

ans = [0] * len(s)
for i in range(len(s)):
    ans[dob[17][i]] += 1

print(*ans)
```
