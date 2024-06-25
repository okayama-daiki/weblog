# -*- coding: utf-8 -*-

import matplotlib.pyplot as plt
import numpy as np


def inverse_error_function(z: float) -> float:
    return (
        1
        / 2
        * np.sqrt(np.pi)
        * (
            z
            + z**3 * np.pi / 12
            + z**5 * 7 * np.pi**2 / 480
            + z**7 * 127 * np.pi**3 / 40320
            + z**9 * 4369 * np.pi**4 / 5806080
        )
    )


z = np.linspace(-1, 1, 1000)
inv_err_values = [inverse_error_function(zi) for zi in z]

# Create a grid layout
fig = plt.figure(figsize=(10, 10))
gs = fig.add_gridspec(4, 4)

# Main plot
ax_main = fig.add_subplot(gs[0:3, 0:3])
ax_main.plot(z, inv_err_values, marker=".")
ax_main.set_title("Rank Gauss with Inverse Error Function")
ax_main.set_xlabel("z")
ax_main.set_ylabel("$erf^{-1}(z)$")
ax_main.grid(True)


# Function to create circular histogram
def circular_hist(ax, data, bins, orientation="vertical"):
    counts, bin_edges = np.histogram(data, bins=bins)
    bin_centers = 0.5 * (bin_edges[1:] + bin_edges[:-1])
    max_count = counts.max()

    for count, bin_center in zip(counts, bin_centers):
        for i in range(count):
            if orientation == "vertical":
                ax.scatter(bin_center, i, color="grey", alpha=0.7)
            else:
                ax.scatter(i, bin_center, color="grey", alpha=0.7)


# Bottom histogram with circles
ax_histx = fig.add_subplot(gs[3, 0:3], sharex=ax_main)
circular_hist(ax_histx, z, bins=30, orientation="vertical")
ax_histx.axis("off")

# Right histogram with circles
ax_histy = fig.add_subplot(gs[0:3, 3], sharey=ax_main)
circular_hist(ax_histy, inv_err_values, bins=30, orientation="horizontal")
ax_histy.axis("off")

plt.tight_layout()
fig.savefig("./assets/rank-gauss.png")
