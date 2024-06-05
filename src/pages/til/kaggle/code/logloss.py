# -*- coding: utf-8 -*-

import matplotlib.pyplot as plt
import numpy as np

prod = np.linspace(0, 1, 100)
logloss = -np.log(prod + 1e-10)

fig, ax = plt.subplots(1, 1, figsize=(6, 5))

ax.plot(prod, logloss)
ax.set_title("Log Loss")
ax.set_xlabel("Probability")
ax.set_ylabel("Logloss")

fig.tight_layout()
fig.savefig("../assets/logloss.png")
