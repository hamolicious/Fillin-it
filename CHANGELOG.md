# Change Log
All notable changes to the "auto--init--" extension will be documented in this file.

### 0.5.4
As of PR [5](https://github.com/hamolicious/Fillin-it/pull/5) and [6](https://github.com/hamolicious/Fillin-it/pull/6):
* Added support for more complex type hints:
  * `arg: Callable[[int], str]`
  * `dict[str, int]`
* Fixed inner brackets' commas being recognised as outer argument commas
* Optional type hint transference to `self.`'s

### 0.4.4
Added support for type hints:
* `arg: str`
* `arg: int`

### 0.3.4
Added support for list arguments such as:
* `arg=[3, 5, 2]`
* `arg=('Hello', 'World')`

### 0.2.4
Added support for special arguments such as:
- *args
- **kwargs
- argument=True

### 0.1.4
Fixed broken indents

### 0.1.3
Changed name to `Fillin' it` after the suggestion by reddit user [theoldreddituseraroo](https://www.reddit.com/user/theoldreddituseraroo/)

### 0.1.2
Added and implemented a settings system

### 0.0.1
Initial release of auto--init--