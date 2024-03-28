---
tags: [MOD, ABC, F, 数学, Math]
---

# ABC161 F - Division

[https://atcoder.jp/contests/abc161/tasks/abc161_f](https://atcoder.jp/contests/abc161/tasks/abc161_f)

いくつかの実験の末、 $k=N$ を除けば、あらゆる解は
いくつかの除算の末に何回かのの減算を行って 1 になる
（いきなり）何回かの減算を行って 1 になる
ということに気付いた。（減算 -> 除算のようなパターンが存在しない）

この遷移は減算前後の値が $k$ を法として合同となるためである。つまり $m$ を自然数として
$N-mk\equiv1$ が成り立つような $k$ が解であり、これは $N-1\equiv mk$ により、 $N-1$ の約数の個数分存在する。

$N-1$ の約数の個数が上の 2 番目の解（すべて減算によって $N=1$ が得られるパターン）に対応し、1 番目のいくつかの除算の末に得られる解というのは、約数の数がそう多くないことを考えると、約数を列挙した上でその一つ一つをナイーブに判定すればよい。

ナイーブな判定では、まともに引き算すると当然間に合わないが、先の議論から減算が合同性に影響を与えない（つまり、引き算の後に割り切れることはない）ことを踏まえると、 $n-k-k-k-\ldots-k\rightarrow n\%k$ とできるので $O(\log{n})$ で判定が可能である。

```py
def naive(n, k):
    while n >= k and timer():
        print(n, k)
        if n % k == 0:
            n //= k
        else:
            n %= k
    return n == 1


def make_divs(n):
    divs = set()
    for d in range(1, int(n**.5) + 2):
        if n % d == 0:
            divs.add(d)
            divs.add(n // d)
    return divs


n = int(input())
ans = make_divs(n - 1)

for e in make_divs(n):
    if e == 1:
        continue
    if naive(n, e):
        ans.add(e)

print(len(ans) - 1)

```
