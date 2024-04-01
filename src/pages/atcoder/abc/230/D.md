---
tags: []
---

# ABC230 D - Destroyer Takahashi

[https://atcoder.jp/contests/abc230/tasks/abc230_d](https://atcoder.jp/contests/abc230/tasks/abc230_d)

緑下位。貪欲法。

貪欲法
動的計画法が考えられる遷移を全て考えて緩和処理を行ったのに対し、1 ステップ先のことのみを考えて最善な選択を繰り返す方法論のこと。
1 ステップ先の時点では最善ではないが、将来的には最適になる選択を切り捨てる可能性がある。
貪欲法によって最適解が導けるような問題は、その問題自体によい性質が内包されている可能性が高い。

貪欲法パターン：交換しても悪化しない

> x に対する関数[$ f(x)]の最大値を求めたいとします。ここで任意の[$ x]に対してそれを少し変形することで、ある性質[$ P]を満たすような、[$ x]とよく似た別の解[$ x^`] が得られて
> [$ f(x^`) ≧ f(x)]
> が成立することが示せたとします。このとき、[$ x]全体のうち[$ P]を満たすもののみに絞って考えたとしても、その中に[$ f(x)]が最大となるような[$ x]が含まれているといえます。
> この考え方を用いて探索範囲を有効に絞っていく。

一般に、**区間に関する問題は、区間の終端時間でソートする**と見通しがよくなりやすい。