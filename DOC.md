# Multi Language Support:
I want to add Multi Language Support to Fillin' It

## Proposed Solution
Language Settings Files

#### Python
```json
"python": {
	"constructor" : "def __init__(self, ",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "self.arg = arg",
}
```
#### Ruby
```json
"ruby": {
	"constructor" : "def initialize(",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "@arg = arg",
}
```
#### JavaScript
```json
"javascript": {
	"constructor" : "constructor(",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "this.arg = arg;",
}
```

# Explanation
```json
"python": { // language id (get using `Fill init: Get Language Id`)
	"constructor" : "def __init__(self, ", // defines the start of constructor (also the search term)
	"arguments" : "arg", // specifies how arguments are defined, allows for wildcards
	"separator" : ", ", // defines how to separate the args
	"fillSyntax" : "self.arg = arg", // how to fill in the body
}
```
```json
"cpp": { // language id (get using `Fill init: Get Language Id`)
	"constructor" : "ClassName(", // defines the start of constructor (also the search term)
	"arguments" : "* arg_", // specifies how arguments are defined, allows for wildcards
	"separator" : ", ", // defines how to separate the args
	"fillSyntax" : "arg = arg_", // how to fill in the body
}
```








