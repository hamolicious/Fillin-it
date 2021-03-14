# Fillin' it

# DEPRECATED
**There is new [repository](https://github.com/hamolicious/Fillin-it) with a new [market place page and download](https://marketplace.visualstudio.com/items?itemName=Hamolicious.fillinit)**


<!-- TODO Fix the badges to use the new extension page -->
[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
[![Badge for rating for Visual Studio Code extension Hamolicious.fillinit](https://vsmarketplacebadge.apphb.com/rating/Hamolicious.autoinit.svg)](https://marketplace.visualstudio.com/items?itemName=Hamolicious.autoinit)
[![Badge for installs for Visual Studio Code extension Hamolicious.fillinit](https://vsmarketplacebadge.apphb.com/installs/Hamolicious.autoinit.svg)](https://marketplace.visualstudio.com/items?itemName=Hamolicious.autoinit)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)

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
* ~~Indentation is incorrect when adding new lines~~ **FIXED**

## Release Notes

### 0.1.4
Fixed broken indents

### 0.1.3
Changed name to `Fillin' it` after the suggestion by reddit user [theoldreddituseraroo](https://www.reddit.com/user/theoldreddituseraroo/)

### 0.1.2
Added and implemented a settings system

### 0.0.1
Initial release of auto--init--
