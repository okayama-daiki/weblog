# 3.11 次元削減・教師なし学習による特徴量

## なぜ次元削減が必要か？

- 学習コストの低下
- 可視化性能の向上

## 3.11.1 主成分分析 (PCA)

[Questions]

- 共分散行列の固有値問題を解くことがなぜ分散の最大化につながるのか？

[Keywords]

- 固有値問題
- ラグランジュの未定乗数法

---

多次元データのもつ情報をできるだけ損なわずに低次元空間に情報を縮約する手法。

$m$ 個の特徴量のデータが $n$ 点存在するとし、行列 $\boldsymbol{X}$ と各データ点に対応するベクトル $\boldsymbol{x}_i=(x_{i1}, x_{i2}, \ldots{}, x_{im}) \space{} (i=1,2,\ldots{n})$ を用いて与えられるとする。

$$
\boldsymbol{X} =
\begin{pmatrix}
  x_{11} & x_{12} & \dots{} & x_{1m} \\
  x_{21} & x_{22} & \dots{} & x_{2m} \\
  \vdots{} & \vdots{} & \ddots{} & \vdots{} \\
  x_{n1} & x_{n2} & \dots{} & x_{nm} \\
\end{pmatrix} =
\begin{pmatrix}
  \boldsymbol{x}_1 \\
  \boldsymbol{x}_2 \\
  \vdots{} \\
  \boldsymbol{x}_n \\
\end{pmatrix}
$$

$m$ 個の正規直交基底 $\boldsymbol{v}_1,\boldsymbol{v}_2,\ldots{},\boldsymbol{v}_m \in \R^m$ を用いて元データを近似することを考えたい。

- 正規直交基底 - 正規直交系である基底
  - 正規直交系 - $\R^n$ のベクトル $\boldsymbol{v}_1,\ldots{},\boldsymbol{v}_m$ が各々が長さ１で互いに直交する、つまり $\boldsymbol{v}_i\cdot{}\boldsymbol{v}_j=\delta_{ij}$ が成り立つとき、正規直交系と呼ぶ
  - 基底 - 座標系を作り出す 1 次独立なベクトルの集まり

具体的には、

$$
\boldsymbol{X} =
\begin{pmatrix}
  \boldsymbol{x}_1 \\
  \boldsymbol{x}_2 \\
  \vdots{} \\
  \boldsymbol{x}_n \\
\end{pmatrix} =
\begin{pmatrix}
  t_{11}\boldsymbol{v}_1 + t_{12}\boldsymbol{v}_2 + \cdots{} + t_{1m}\boldsymbol{v}_m \\
  t_{21}\boldsymbol{v}_1 + t_{22}\boldsymbol{v}_2 + \cdots{} + t_{2m}\boldsymbol{v}_m \\
  \vdots{} \\
  t_{n1}\boldsymbol{v}_1 + t_{n2}\boldsymbol{v}_2 + \cdots{} + t_{nm}\boldsymbol{v}_m \\
\end{pmatrix} \approx{}
\begin{pmatrix}
  t_{11}\boldsymbol{v}_1 + t_{12}\boldsymbol{v}_2 + \cdots{} + t_{1k}\boldsymbol{v}_k \\
  t_{21}\boldsymbol{v}_1 + t_{22}\boldsymbol{v}_2 + \cdots{} + t_{2k}\boldsymbol{v}_k \\
  \vdots{} \\
  t_{n1}\boldsymbol{v}_1 + t_{n2}\boldsymbol{v}_2 + \cdots{} + t_{nk}\boldsymbol{v}_k \\
\end{pmatrix}
$$

のように、$m$ 個の正規直交基底のうち、$k \space{} (\lt{} m)$ 個の正規直交基底を利用して各データ点を近似する。このとき、$\boldsymbol{v}_j$ を第 $j$ **主成分軸**、$t_{ij}$ をデータ点 $\boldsymbol{x}_i$ の第 $j$ 主成分軸における**主成分得点**と呼ぶ。($t_{ij}$ は主成分軸の基底 $v_j$ が決まれば求められることに注意)

![pca](./assets/pca.png)

### 主成分軸の算出

結論から述べると、特徴量の共分散行列 $\boldsymbol{S}$ に対する固有値問題を解くことで主成分軸は求められる。

ここで、共分散行列 $\boldsymbol{S}$ は、

$$
\begin{aligned}

\boldsymbol{S} &=
\frac{1}{n}
\begin{pmatrix}
\sum_{i=1}^{n} x_{i1}^2 & \sum_{i=1}^{n} x_{i1}x_{i2} & \cdots{} & \sum_{i=1}^{n} x_{i1}x_{im}\\
\sum_{i=1}^{n} x_{i2}x_{i1} & \sum_{i=1}^{n} x_{i2}^2 & \cdots{} & \sum_{i=1}^{n} x_{i2}x_{im}\\
\vdots{} & \vdots{} & \ddots{} & \vdots{} \\
\sum_{i=1}^{n} x_{im}x_{i1} & \sum_{i=1}^{n} x_{im}x_{i2} & \cdots{} & \sum_{i=1}^{n} x_{im}^2\\
\end{pmatrix} \\

&=
\frac{1}{n}
\begin{pmatrix}
  x_{11} & x_{21} & \dots{} & x_{m1} \\
  x_{12} & x_{22} & \dots{} & x_{m2} \\
  \vdots{} & \vdots{} & \ddots{} & \vdots{} \\
  x_{1n} & x_{2n} & \dots{} & x_{mn} \\
\end{pmatrix}
\begin{pmatrix}
  x_{11} & x_{12} & \dots{} & x_{1m} \\
  x_{21} & x_{22} & \dots{} & x_{2m} \\
  \vdots{} & \vdots{} & \ddots{} & \vdots{} \\
  x_{n1} & x_{n2} & \dots{} & x_{nm} \\
\end{pmatrix} \\

&=
\frac{1}{n} \boldsymbol{X}^T\boldsymbol{X}
\end{aligned}
$$

とかける。

- 共分散行列 (分散共分散行列) - $\boldsymbol{S}$ の $(i,j) \space(i\neq{}j)$ 成分は特徴量 $i$ と特徴量 $j$ の共分散を、$(i,i)$ 成分は特徴量 $i$ の分散を意味する

各データ点を第 $j$ 主成分軸に射影した点 $t_{1j}, \ldots{}, t_{nj}$ の分散を最大化することを考えたい。

$\boldsymbol{x}_i$ と $\boldsymbol{v}_j$ の内積がデータ点 $\boldsymbol{x}_i$ の主成分軸 $\boldsymbol{v}_j$ への射影になる、つまり $\boldsymbol{x}_i\cdot{}\boldsymbol{v}_j = t_{ij}$ であることを踏まえれば、射影した点 $t_{1j}, \ldots{}, t_{nj}$ の分散は次式のように計算できる。

$$
\begin{aligned}
\frac{1}{n}{\sum_{i=1}^{n}{t_{ij}^2}} &= \frac{1}{n}{\sum_{i=1}^{n}{(\boldsymbol{x}_i\cdot{}\boldsymbol{v}_j)^2}} \\
                                      &= \frac{1}{n}
                                      \begin{pmatrix}
                                        \boldsymbol{x}_1 \cdot{} \boldsymbol{v}_j & \boldsymbol{x}_2 \cdot{} \boldsymbol{v}_j & \cdots{} &  \boldsymbol{x}_n \cdot{} \boldsymbol{v}_j
                                      \end{pmatrix}
                                      \begin{pmatrix}
                                        \boldsymbol{x}_1 \cdot{} \boldsymbol{v}_j & \boldsymbol{x}_2 \cdot{} \boldsymbol{v}_j & \cdots{} &  \boldsymbol{x}_n \cdot{} \boldsymbol{v}_j
                                      \end{pmatrix}^T \\
                                      &=\frac{1}{n}
                                      \left(
                                      \begin{pmatrix}
                                        \boldsymbol{x}_1 \\
                                        \boldsymbol{x}_2 \\
                                        \vdots{} \\
                                        \boldsymbol{x}_n \\
                                      \end{pmatrix} \boldsymbol{v}_j
                                      \right)^T
                                      \left(
                                      \begin{pmatrix}
                                        \boldsymbol{x}_1 \\
                                        \boldsymbol{x}_2 \\
                                        \vdots{} \\
                                        \boldsymbol{x}_n \\
                                      \end{pmatrix} \boldsymbol{v}_j
                                      \right)
                                      \\
                                      &= \frac{1}{n} \left(\boldsymbol{X}\boldsymbol{v}_j\right)^T \left(\boldsymbol{X}\boldsymbol{v}_j\right) \\
                                      &= \frac{1}{n} \boldsymbol{v}_j^T\boldsymbol{X}^T\boldsymbol{X}\boldsymbol{v}_j \\
                                      &= \boldsymbol{v}_j^T\boldsymbol{S}\boldsymbol{v}_j
\end{aligned}
$$

よって、ある主成分軸 $j$ への射影後の各データ点の分散を最大化するには、$\boldsymbol{v}_j^T\boldsymbol{S}\boldsymbol{v}_j$ を最大化すればよいことが分かる。

特に、正規直交基底として $|\boldsymbol{v}_j|^2 = 1$ を仮定していたので、この問題は制約付き最大化問題としてラグランジュの未定乗数法を用いて解くことができる。

- ラグランジュの未定乗数法 - 多変数関数において条件付きの局地問題を解く方法
  - [定理] 束縛条件 $g(\boldsymbol{x})=0$ の下で、$f(\boldsymbol{x})$ を最大となる $\boldsymbol{x}$ を求める問題において、束縛条件に対して用意される定数 (未定乗数) を含めた新たな関数 $\mathcal{L}(\boldsymbol{x}, \lambda{}) = f(\boldsymbol{x}) + \lambda{}g(\boldsymbol{x})$ に対して、$f(\boldsymbol{x})$ が束縛条件 $g(\boldsymbol{x})=0$ の下で最大化されるとき、$\partial{\mathcal{L}}/\partial{\boldsymbol{x}}=\boldsymbol{0}, \partial{\mathcal{L}}/\partial{\lambda{}}=0$ が成立する。

要するに、

$$
\begin{aligned}
\text{max.} &\quad{} \boldsymbol{v}_j^T\boldsymbol{S}\boldsymbol{v}_j \\
\text{s.t.} &\quad{} \boldsymbol{v}_j^T\boldsymbol{v}_j = 1
\end{aligned}
$$

の解である $j$ 主成分軸のベクトル $\boldsymbol{v}_j$ は、ラグランジュの未定乗数法によれば、$\lambda{} \in{} \R$ を導入によって定義される $\mathcal{L}(\boldsymbol{v}_j, \lambda{}) = \boldsymbol{v}_j^T\boldsymbol{S}\boldsymbol{v}_j - \lambda{}(\boldsymbol{v}_j^T\boldsymbol{v}_j - 1)$ の極値問題を解くことで得られるということである。

$\mathcal{L}(\boldsymbol{v}_j, \lambda{})$ を $\boldsymbol{v}_j$ で微分すると、

$$
\begin{aligned}
  \partial{\mathcal{L}}/\partial{\boldsymbol{v}_j} &= 2\boldsymbol{S}\boldsymbol{v}_j - 2\lambda{}\boldsymbol{v}_j \\
                                                   &=2(\boldsymbol{S}\boldsymbol{v}_j - \lambda{}\boldsymbol{v}_j)
\end{aligned}
$$

であり、$\partial{\mathcal{L}}/\partial{\boldsymbol{v}_j} = 0$ として解けば $\boldsymbol{S}\boldsymbol{v}_j = \lambda{}\boldsymbol{v}_j$ が得られるが、これは共分散行列 $\boldsymbol{S}$ に対する固有値問題に他ならない。

同様にして、$\partial{\mathcal{L}}/\partial{\lambda{}} = 0$ 解いて得られる $\boldsymbol{v}_j^T\boldsymbol{v}_j = 1$ は、正規直交基底の条件そのものである。

## 3.11.2 非負値行列因子分解 (NMF)

非負行列を２つの非負行列の積で表現する手法。

![NMF](./assets/nmf.png)

Frobenius norm (ユークリッドノルム、L2 ノルムとも) を最小化する問題として定式化される。

## 3.11.3 Latent Dirichlet Allocation (LDA)

## 3.11.4 線形判別分析 (LDA, Linear Discriminant Analysis)

分類タスクについて教師ありで次元削減を行う手法。

## 3.11.5 t-SNE、UMAP

### SNE

データ点 $x_i,x_j$ の類似度を、「$x_j$ は $x_i$ **を中心とした正規分布に基づいて確率的に選択されると仮定した上で**、$x_i$ が与えられた時に、近傍として $x_j$ として選択する条件付き確率」と定義する。

$$
\begin{aligned}
P(j|i) = \frac{\exp{-||x_i-x_j||^2/2\sigma_i^2}}{\sum_{k\neq{}i}{\exp{-||x_i-x_k||^2/2\sigma_i^2}}}

\end{aligned}
$$

(参考) 正規分布の確率密度関数

$$
f(x|\mu, \sigma) = \frac{1}{\sigma\sqrt{2\pi}}\exp{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

### t-distributed Stochastic Neighbor Embedding (t 分布型確率的近傍埋め込み)

<https://jmlr.org/papers/volume9/vandermaaten08a/vandermaaten08a.pdf>

元の空間での点同士の近さが、圧縮後の空間での点同士の近さと出来るだけ同じになるように圧縮する手法。

## 3.11.6 オートエンコーダ

入力と同じものを出力するようにトレーニングされたニューラルネットワークを用いる手法。

## 3.11.7 クラスタリング

$$
$$
