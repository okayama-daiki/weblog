# -*- coding: utf-8 -*-

import matplotlib.pyplot as plt
import numpy as np

samples = 10000

y = np.random.randint(0, 2, samples)
y_pred = (y - abs(np.random.normal(0, 0.3, samples)) * (y * 2 - 1)).clip(0, 1)

fig, ax = plt.subplots(1, 1, figsize=(6, 5))

thresholds = np.linspace(0, 1, 100)
false_positive = np.array(
    [np.sum((y_pred >= threshold) & (y == 0)) for threshold in thresholds]
)
true_positive = np.array(
    [np.sum((y_pred >= threshold) & (y == 1)) for threshold in thresholds]
)

ax.plot(
    false_positive / np.sum(y == 0), true_positive / np.sum(y == 1), label="ROC curve"
)
ax.plot(thresholds, thresholds, label="Random classifier", linestyle="--")
ax.set_xlabel("False positive rate")
ax.set_ylabel("True positive rate")
ax.set_title("ROC curve")
ax.legend()

fig.savefig("../assets/auc.png")
