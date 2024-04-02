---
tags: [ABC, E, 逆順]
---

# ABC329 E - Stamp

<https://atcoder.jp/contests/abc329/tasks/abc329_e>  
水色上位。貪欲法。

入力例 1 に対する操作を行うと、X は以下の順番で変化する。

0. $X=$ `#######`
1. $X=$ `##ABC##`
2. $X=$ `ABCBC##`
3. $X=$ `ABCBABC`

これを**逆順から見る**と、問題は $S$ を `#` のみの文字列に変えれるかという問題に変換できる。

つまり、$T=$ `ABC` の各文字かあるいは `#` に一致する $S$ の連続部分文字列を `#` に変えていき、最終的に全ての文字を `#` にすることができれば、この問題の答えは Yes となる。

1. $S=$ `ABCBABC`
2. $S=$ `ABCB###`
3. $S=$ `###B###`
4. $S=$ `#######` (Yes)

$T$ に一致する $S$ の連続部分文字列から左右に広げていくことでこの問題を解ける。（実装が若干重く感じた。）

## 提出コード

```py
# -*- coding: utf-8 -*-


def match(sub: list[str]) -> bool:
    if len(sub) != len(t):
        return False
    for e1, e2 in zip(sub, t):
        if e1 != e2 and e1 != "#":
            return False
    return True


n, m = map(int, input().split())
s = list(input())
t = input()

que: list[int] = []
for i in range(n):
    if match(s[i : i + m]):
        s[i : i + m] = ["#"] * m
        que.append(i)

checked = [False] * n
for i in que:
    if checked[i]:
        continue
    checked[i] = True
    # left side
    for j in range(1, m + 1):
        if i - j < 0:
            break
        if checked[i - j]:
            continue
        if match(s[i - j : i - j + m]):
            s[i - j : i - j + m] = ["#"] * m
            que.append(i - j)
    # right side
    for j in range(1, m + 1):
        if i + j >= n:
            break
        if checked[i + j]:
            continue
        if match(s[i + j : i + j + m]):
            s[i + j : i + j + m] = ["#"] * m
            que.append(i + j)
            checked[i + j] = True

if all(e == "#" for e in s):
    print("Yes")
else:
    print("No")

```

[Python (PyPy 3.10-v7.3.12), 303ms](https://atcoder.jp/contests/abc329/submissions/51958170)
