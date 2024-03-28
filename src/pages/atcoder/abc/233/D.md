---
tags: [ABC, D, 区間和]
---

# ABC233 D - Count Interval

[https://atcoder.jp/contests/abc233/tasks/abc233_d](https://atcoder.jp/contests/abc233/tasks/abc233_d)

茶色上位の問題
区間和に関する問題は累積和を取ることがポイント

```py
from itertools import accumulate
import sys

sys.setrecursionlimit(10**6)

n,k = map(int,input().split())
a = map(int,input().split())
acc = [0]+list(accumulate(a))
cnt = 0
checked = set()
def check(l,r):
    global cnt
    if not l <= r <= n:
        return
    if (l,r) not in checked and acc[r] - acc[l-1] == k:
        cnt += 1
        checked.add((l,r))
    check(l,r+1)
    check(l+1, r)

check(1,1)
print(cnt)
```

愚直に実装したが、このままでは余裕で TLE
再帰部分で $O(N^2)?$ 程度の計算時間がかかってしまっている。

`acc[r]- acc[l-1] = k`となる回数をカウントしたが、これを`acc[l-1] = acc[r] - k`と式変形を行う。
上式が何を意味するかというと、`acc[l-1]`という数がまず存在し、後に`acc[r] - k`という数の存在も確認できれば、`acc[r]- acc[l-1] = k`となることが言え、回数をカウントできるということである。

これを用いて次のように書ける。

```py
from itertools import accumulate

n,k = map(int,input().split())
a = map(int,input().split())
acc = [0] + list(accumulate(a))

cnt = 0
dic = {}
for i in range(1,n+1):
    dic.setdefault(acc[i-1], 0)
    dic[acc[i-1]] += 1
    cnt += dic.get(acc[i]-k,0)
print(cnt)
```

今、`l <= r`が保障されているので、先に`acc[l-1]`の数を数え、`acc[r] - k`が存在するかのチェックをその後に行ったとしても問題ない。
