---
tags: [セグメントツリー, オイラーツアー, ABC, E]
---

# ABC239 E - Subtree K-th Max

[https://atcoder.jp/contests/abc239/tasks/abc239_e](https://atcoder.jp/contests/abc239/tasks/abc239_e)

緑上位。

学ぶことが多かった問題
セグメントツリーで殴る
オイラーツアー

大きい方から k 番目を取得したい場合、セグメントツリーで取得した最大値を除外していくのを k 回行えば目的を達成できる。コツは、
セグメントツリーに格納する値を（値、配列のインデックス）のタプルにしてやれば値の位置が $O(1)$ で分かる
除外とは、例えば-INF 等に置き換えるということである
操作によって壊れたセグメントツリーは、操作を記憶しておき、後々復元する必要がある

```py
import sys
import collections


from atcoder.segtree import SegTree

sys.setrecursionlimit(10**7)


def graph2tree(graph, root):
    tree = collections.defaultdict(list)

    visited = [False] * n
    stack = [root]

    while stack:
        u = stack.pop()
        visited[u] = True
        for v in graph[u]:
            if visited[v]:
                continue
            tree[u].append(v)
            stack.append(v)

    return tree


INF = float("inf")

n, q = map(int, input().split())
x = list(map(int, input().split()))

graph = collections.defaultdict(list)

for _ in range(n - 1):
    a, b = map(lambda x: int(x) - 1, input().split())
    graph[a].append(b)
    graph[b].append(a)

tree = graph2tree(graph, 0)

in_ = [0] * n
out_ = [0] * n
passed = []

time = 0


def dfs(u):
    global time
    in_[u] = time
    time += 1
    passed.append(u)
    for v in tree[u]:
        dfs(v)
    passed.append(-u)
    out_[u] = time
    time += 1


dfs(0)


seg = SegTree(max, (-INF, None), len(passed))
for i, e in enumerate(passed[:-1]):
    if e >= 0:
        seg.set(i, (x[e], i))


for _ in range(q):
    v, k = map(int, input().split())
    v -= 1
    safe = []
    while k > 1:
        m, i = seg.prod(in_[v], out_[v])
        k -= 1
        safe.append((i, m))
        seg.set(i, (-INF, None))

    print(seg.prod(in_[v], out_[v])[0])
    for index, value in safe:
        seg.set(index, (value, index))
```

[https://atcoder.jp/contests/abc239/submissions/37984299](https://atcoder.jp/contests/abc239/submissions/37984299)
