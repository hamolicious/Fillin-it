# Multi Language Support:
I want to add Multi Language Support to Fillin' It

## Proposed Solution
Language Settings Files

#### Python
```json
"python": {
	"constructorStart" : "def __init__(self, ",
	"constructorEnd" : "):",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "self.arg = arg",
}
```
#### Ruby
```json
"ruby": {
	"constructorStart" : "def initialize(",
	"constructorEnd" : ")",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "@arg = arg",
}
```
#### JavaScript
```json
"javascript": {
	"constructorStart" : "constructor(",
	"constructorEnd" : ") {",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "this.arg = arg;",
}
```

# Explanation
```json
"python": { // language id (get using `Fill init: Get Language Id`)
	"constructorStart" : "def __init__(self, ", // defines the start of constructor (also the search term)
	"constructorEnd" : "):", // defines the end of constructor

	"arguments" : "arg", // specifies how arguments are defined, allows for wildcards
	"separator" : ", ", // defines how to separate the args
	"fillSyntax" : "self.arg = arg", // how to fill in the body
}
```
```json
"cpp": { // language id (get using `Fill init: Get Language Id`)
	"constructorStart" : "ClassName(", // defines the start of constructor (also the search term)
	"constructorEnd" : ")", // defines the end of constructor
	"arguments" : "* arg_", // specifies how arguments are defined, allows for wildcards
	"separator" : ", ", // defines how to separate the args
	"fillSyntax" : "arg = arg_", // how to fill in the body
}
```








