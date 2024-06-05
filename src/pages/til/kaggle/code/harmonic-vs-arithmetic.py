# -*- coding: utf-8 -*-

import matplotlib.pyplot as plt
import numpy as np

precision = np.linspace(0, 1, 100)
recall = np.linspace(0, 1, 100)
A, B = np.meshgrid(precision, recall)

harmonic_mean = np.divide(2 * A * B, A + B, out=np.zeros_like(A), where=A + B != 0)
arithmetic_mean = (A + B) / 2

fig, ax = plt.subplots(1, 2, figsize=(12, 5))

ax[0].contourf(A, B, harmonic_mean, levels=50, cmap="viridis")
ax[0].set_title("Harmonic Mean")
ax[1].contourf(A, B, arithmetic_mean, levels=50, cmap="viridis")
ax[1].set_title("Arithmetic Mean")

for ax_ in ax:
    ax_.set_xlabel("precision")
    ax_.set_ylabel("recall")
    fig.colorbar(
        plt.cm.ScalarMappable(cmap="viridis"),
        ax=ax_,
        orientation="vertical",
        label="Mean",
        shrink=0.8,
    )

fig.tight_layout()
fig.savefig("../assets/harmonic-vs-arithmetic.png")
