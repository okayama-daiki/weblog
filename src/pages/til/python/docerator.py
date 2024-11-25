import typing as t


def deco(f: t.Callable[..., t.Any]) -> t.Callable[..., t.Any]:
    def wrapper(*args: t.Any, **kwargs: t.Any) -> t.Any:
        print(f"Calling {f.__name__}")
        return f(*args, **kwargs)

    return wrapper
