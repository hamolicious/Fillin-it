# Fillin' it
**There is a new [market place page and download](https://marketplace.visualstudio.com/items?itemName=Hamolicious.fillinit)**


[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
[![Badge for rating for Visual Studio Code extension Hamolicious.fillinit](https://vsmarketplacebadge.apphb.com/rating/Hamolicious.fillinit.svg)](https://marketplace.visualstudio.com/items?itemName=Hamolicious.fillinit)
[![Badge for installs for Visual Studio Code extension Hamolicious.fillinit](https://vsmarketplacebadge.apphb.com/installs/Hamolicious.fillinit.svg)](https://marketplace.visualstudio.com/items?itemName=Hamolicious.fillinit)
![maintained? yes boss!](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

A VSCode extension that will automatically fill in the ```__init__()``` method using the provided arguments
![GIF preview of the extension](https://github.com/hamolicious/Fillin-it/blob/master/images/preview.gif?raw=true)

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
* `fillinit.maxSearchSize` : The maximum amount of lines to search for a ```__init__``` method (centered around the cursor)

## Known Issues
* ~~Optional arguments containing lists are not parsed correctly i.e. `arg1=[255, 255, 255]`~~

## TODO
- [ ] Add a testing framework and write unit tests
