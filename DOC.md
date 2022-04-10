# Multi Language Support:
I want to add Multi Language Support to Fillin' It

## Proposed Solution
Language Settings Files

#### Python
```json
"py": {
	"constructor" : "def __init__(self, ",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "self.arg = arg",
}
```
#### Ruby
```json
"rb": {
	"constructor" : "def initialize(",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "@arg = arg",
}
```
#### JavaScript
```json
"js": {
	"constructor" : "constructor(",
	"arguments" : "arg",
	"separator" : ", ",
	"fillSyntax" : "this.arg = arg;",
}
```

# Explanation
```json
"py": { // filename extension to look for
	"constructor" : "def __init__(self, ", // defines the start of constructor (also the search term)
	"arguments" : "arg", // specifies how arguments are defined, allows for wildcards
	"separator" : ", ", // defines how to separate the args
	"fillSyntax" : "self.arg = arg", // how to fill in the body
}
```
```json
"cpp": { // filename extension to look for
	"constructor" : "ClassName(", // defines the start of constructor (also the search term)
	"arguments" : "* arg_", // specifies how arguments are defined, allows for wildcards
	"separator" : ", ", // defines how to separate the args
	"fillSyntax" : "arg = arg_", // how to fill in the body
}
```








