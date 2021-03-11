# auto__init__

A VSCode extension that will automatically fills in the ```__init__()``` method using the provided arguments
![GIF preview of the extension](https://github.com/hamolicious/Auto-__init__/blob/master/images/preview.gif?raw=true)

## Features

Fills out the ```__init__()``` method with the passed in arguments
```python
class SomeClass:
	def __init__(self, arg1, arg2, arg3):
		self.arg1 = arg1
		self.arg2 = arg2
		self.arg3 = arg3
```

## How to use
Type out a class like so:
```python
class SomeClass:
	def __init__(self, arg1, arg2, arg3):
```
and leave the cursor somewhere in the vicinity of the dunder method

Then open the command pallete in VSCode and type "```Fill init```", hit enter and the class will be filled in... alternatively, you can asign a keybind to the command and use a keybind to fill in the class.

## Requirements
*currently not applicable*

## Extension Settings
* `auto--init--.maxSearchSize` : The maximum amount of lines to search for a ```__init__``` method (centered around the cursor)

## Known Issues
*currently not applicable*

## Release Notes
### 0.1.2
Added and implemented a settings system

### 0.0.1
Initial release of auto--init--
