# -*- coding: utf-8 -*-

import matplotlib.pyplot as plt
import numpy as np
import scipy.integrate as integrate


def error_function(x: float) -> float:
    return 2 / np.sqrt(np.pi) * integrate.quad(lambda t: np.exp(-(t**2)), 0, x)[0]


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


x = np.linspace(-3, 3, 100)

fig, ax = plt.subplots(1, 1)
ax.plot(x, [error_function(xi) for xi in x], label="Error function")
ax.set_title("Error function")
ax.set_xlabel("x")
ax.set_ylabel("$erf(x)$")
ax.grid(True)

fig.savefig("./assets/error-function.png")

z = np.linspace(-1, 1, 100)

fig, ax = plt.subplots(1, 1)
ax.plot(z, [inverse_error_function(zi) for zi in z], label="Inverse error function")
ax.set_title("Inverse error function")
ax.set_xlabel("z")
ax.set_ylabel("$erf^{-1}(z)$")
ax.grid(True)

fig.savefig("./assets/inverse-error-function.png")
