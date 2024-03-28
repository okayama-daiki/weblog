---
tags: [ABC, D, 二分探索, 累積和, 二次元累積和]
---

# ABC203 D - Pond

[https://atcoder.jp/contests/abc203/tasks/abc203_d](https://atcoder.jp/contests/abc203/tasks/abc203_d)  
青色下位。二分探索、累積和

最大値の最小化等で二分探索が利用されるが、同様にして「中央値の最小化」といった問題にも二分探索が有効である。

判定関数`c(x)`は中央値の最小値が`x`以上かであり、これを高速に判定する必要がある。

ここで「とある区間の中央値が $x$ 以上」という条件は、「とある区間に含まれる $x$ 以上の数が $\lfloor \frac{K^2}{2}\rfloor+1$ である
と言い換えられるため、累積和によって区間に含まれる $x$ 以上の数の個数を高速に求める必要がある。

累積和を計算するにあたって、グリッドの各要素は $x$ 以上 $x$ か以下かにしか興味がないため、`0,1`にエンコードすることで高速に区間の $x$ 以上の個数を求めることができる。

```py
n, k = map(int, input().split())
a = [list(map(int, input().split())) for _ in range(n)]

lo = 0
hi = max(map(max, a)) + 1


def c(x):
    '''全ての区間の中央値がx未満'''
    a_binary = [[0] * (n + 1) for _ in range(n + 1)]
    for i in range(n):
        for j in range(n):
            a_binary[i + 1][j + 1] = a[i][j] >= x

    for i in range(n):
        for j in range(n + 1):
            a_binary[i + 1][j] += a_binary[i][j]
    for i in range(n + 1):
        for j in range(n):
            a_binary[i][j + 1] += a_binary[i][j]

    for i in range(n - k + 1):
        for j in range(n - k + 1):
            count_1 = a_binary[i + k][j + k]\
                    - a_binary[i][j + k]\
                    - a_binary[i + k][j]\
                    + a_binary[i][j]
            if count_1 < k**2 // 2 + 1:
                return True
    return False


while hi - lo > 1:
    mid = (lo + hi) // 2
    if c(mid):
        hi = mid
    else:
        lo = mid

print(lo)
```

**NOTE**
二分探索の初期値を適当に決めるとエラーの元になるので特に断りがなければ`lo=0; hi=MAX_A`にしておこう
