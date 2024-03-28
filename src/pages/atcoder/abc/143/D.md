---
tags: [ABC, D, 二分探索]
---

# ABC143 D - Triangles

[https://atcoder.jp/contests/abc143/tasks/abc143_d](https://atcoder.jp/contests/abc143/tasks/abc143_d)  
茶色上位。二分探索。

三角形であるために以下の不等式を満足させる必要がある。
$a<b+c$  
 $b<c+a$  
 $c<a+b$  
式が 3 つもあってややこしいが、これは $a<b<c$ という仮定をおくと、 $c<a+b$ のみ満たせばいい。

よって $a$ と $b$ を全探索するが、その際に $a<b$ を満たすように、つまり $a=1,2,\ldots,N,b=a+1,a+2,\ldots,N$ となるように探索し、 $c<a+b$ を満たす $c$ の個数を二分探索により求めれば良い。

NOTE
$a=1,2,\ldots$ はソート済みの $L$ の各インデックスに対応する要素のこと

```py
import bisect

n = int(input())
l = sorted(map(int, input().split()))

ans = 0
for i in range(n):
    for j in range(i + 1, n):
        ans += bisect.bisect_right(l, l[i] + l[j]) - j - 1

print(ans)

```
