# デコレータとクロージャ

Python の基本文法を一通り押さえた後、Web ページを作りたいというささやかな願いを持った私が [Flask のドキュメント](https://flask.palletsprojects.com/en/3.0.x/)を訪れるのは自然なことでした。当時 HTTP や Web サーバに関する知識は皆無だったため、ドキュメントに登場する用語に四苦八苦していましたが、それよりも [A Minimal Application](https://flask.palletsprojects.com/en/3.0.x/quickstart/#a-minimal-application) として例示された下記コードにて、

```py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
```

`@` から始まる見慣れない構文を必死に書き写したのを記憶しています。

Python における `@` は大別して二つの意味を持ちます。まず一つは、先のコードにも現れたデコレータとして。そしてもう一つは、Python 3.5 で追加[^1]された中置演算子としての `@` であり、これは `numpy` 等で行列乗算を行うのに用いられる他、自分でも振る舞いを定義することができます。

```py
>>> class Foo:
...     def __matmul__(self, other):
...         print('Called __matmul__!')
...
>>> Foo() @ Foo()
Called __matmul__!
```

[^1]: <https://docs.python.org/3/whatsnew/3.5.html#pep-465-a-dedicated-infix-operator-for-matrix-multiplication>

本エントリでは、Python におけるデコレータとデコレータを使いこなすために必要なクロージャについて概観し、Python

## デコレータ

デコレータとは呼び出し可能オブジェクトの一つで、呼び出し可能オブジェクトを引数にとり、新たな（あるいは引数として受け取ったオブジェクトと全く同じ）呼び出し可能オブジェクトを返すものです。

```py
import typing as t
```
