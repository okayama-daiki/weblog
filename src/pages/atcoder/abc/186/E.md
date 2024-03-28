---
tags: [逆元, MOD, ABC, E, 合同方程式, 数学]
---

# ABC186 E - Throne

[https://atcoder.jp/contests/abc186/tasks/abc186_e](https://atcoder.jp/contests/abc186/tasks/abc186_e)  
水色上位。合同方程式。

解を $x$ として、 $s+xk\equiv0\mod{n}$ を求める。
上式は $x\equiv-\frac{s}{k}$ と変形できるため、 $\text{mod }n$ 下における $k$ の逆元が分かれば良い。

$k^{-1}$ を $k$ の逆元と定めると、 $\frac{1}{k}\equiv k^{-1}$ 。分母をはらって $k\times k^{-1}\equiv1\mod{n}$

ここで、 $n$ の倍数を左辺に加えると（ $\text{mod }n$ なので合同式的には問題ない）、拡張互除法により $k^{-1}$ が求まる。
$k\times k^{-1}+n\times y\equiv1\mod{n}$ 　
$ax+by=1$ の形が見える

本題はここからで、拡張互除法は $k^{-1},y$ のほかに $\gcd{(k,n)}$ を返すが、 $\gcd({k,n})\ne1$ のとき、少し話がややこしくなる。（ $\gcd{(k,n)}=1$ の場合は問題ない）

$\gcd({k,n})\ne1$ のとき、 $k,n$ は互いに素でないということだから、一見 $k$ の逆元は存在しないように思われるが、 $s\%\gcd{(k,n)}=0$ 、つまり $s$ が $\gcd{(k,n)}$ で割り切れる場合はその限りでない。

ここで $d=\gcd{(k,n)}$ として、 $s'=s/d,n'=n/d,k'=k/d$ を導入する。
このとき、元の式 $x\equiv-\frac{s}{k}\Leftrightarrow xk\equiv-s\mod{n}$ は、 $x'k'\equiv-s'\mod{n'}$ となるが、なんと $x'=x$ となる。

つまり、 $s$ が $\gcd{(k,n)}$ で割り切れるとき、 $s,k,n$ を $\gcd{(k,n)}$ で割り切った値で代用した合同方程式の解 $x'k'=-s'$ は元の合同方程式 $xk=-s$ も満たすということである。

---

具体例をいくつか。
$10x\equiv4\mod{6}\Leftrightarrow5x'\equiv2\mod{3}$ 、 $x'=x=1$
$\gcd{(10,6)}=2$ 、 $2$ は $s=4$ で割り切れるため $k'=k/2=5,s'=s/2=2,n'=n/2=3$ と変形可能
$21x\equiv6\mod{15}\Leftrightarrow7x'\equiv2\mod{5}$ 、 $x'=x=6$
$20x\equiv10\mod{25}\Leftrightarrow4x'\equiv2\mod{5}$ 、 $x'=x=3$

---

$s',n',k'$ の下では $\gcd{(k',n')}=1$ となるため、拡張互除法を利用して逆元を計算できる。

```py
def extgcd(a, b):
    '''
    >>> extgcd(a, b)
    gcd(a, b), x, y  # ax + by = gcd(a, b)
    '''
    if b == 0:
        return a, 1, 0
    d, x, y = extgcd(b, a % b)
    return d, y, x - a // b * y


t = int(input())
for _ in range(t):
    n, s, k = map(int, input().split())
    d, k_inv, _ = extgcd(k, n)
    if s % d != 0:
        print(-1)
    else:
        print((-(s // d) * k_inv) % (n // d))

```

余談だが、フェルマーの小定理によって逆元を求めるには $n$ が素数である必要があり。今回の問題では直接は使えない。（オイラーのトーシェント関数）
