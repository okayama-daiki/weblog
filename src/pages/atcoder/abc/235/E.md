---
tags: [ABC, E, 最小全域木, クエリ先読み]
---

# ABC235 E - MST + 1

[https://atcoder.jp/contests/abc235/tasks/abc235_e](https://atcoder.jp/contests/abc235/tasks/abc235_e)

水色下位。最小全域木。

> このように全てのクエリの答えを並列に求めるテクニックは
> 500 点以上の問題でよく出てくるテクニックなので、クエリを与えられる問題が出たときは頭の片隅に入れておきましょう。
> とのこと。

初見ではまず元の辺のみを利用して MST を作成し、各クエリで辺を追加した際に生じる閉路のいずれかの辺のうち、クエリで追加された辺より小さいものが存在すれば Yes と出力すればよいかと考えたが、閉路検出に $O(N)$ のため現実でない。

想定解はクエリ並行処理を利用するもので、クエリで追加される辺も元の辺も同時に利用して MST を構成することを考える。クラスカル法を利用し、MST に追加せんとする辺がクエリの辺であれば、そのクエリには Yes と答え、実際の MST には追加しないという方法で全てのクエリに回答することが可能。

```py
from atcoder.dsu import DSU


n, m, q = map(int, input().split())
es = []

for _ in range(m):
    a, b, c = map(int, input().split())
    es.append((a, b, c, -1))

for i in range(q):
    u, v, w = map(int, input().split())
    es.append((u, v, w, i))

es.sort(key=lambda e: e[2])

ans = ['No'] * q
dsu = DSU(n + 1)

for a, b, c, i in es:
    if i != -1:
        if not dsu.same(a, b):
            ans[i] = 'Yes'
        continue
    dsu.merge(a, b)

print(*ans, sep='\n')

```
