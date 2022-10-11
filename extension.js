const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('fillinit.preFillFromArgs', function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;

			const currentLine = editor.selection.active.line;
			const viewRange = searchForDunderInit(editor, currentLine);
			if (!viewRange) {
				vscode.window.showErrorMessage('No __init__ method found');
				return;
			}
			const editRange = new vscode.Range(viewRange.start.line+1, 0, viewRange.start.line+1, Infinity);

			const classLineText = document.getText(viewRange);

			const edit = getArgs(classLineText);
			editor.edit(editBuilder => {
				editBuilder.replace(editRange, edit);
			});
		}
	});
	context.subscriptions.push(disposable);
}

function deactivate() {}

function searchForDunderInit(editor, activeLine) {
	/*
	Searches for the dunder init method
	*/
	const settings = vscode.workspace.getConfiguration('fillinit');
	const document = editor.document;

	let increase = 0;
	let dir = 1;
	let maxSearchSize = settings['maxSearchSize'];
	while (true) {
		dir *= -1;
		increase++;

		const checkRange = new vscode.Range(activeLine, 0, activeLine, Infinity);
		const checkText = document.getText(checkRange);

		if (checkText.includes('__init__')) {
			return new vscode.Range(activeLine, 0, activeLine, Infinity);;
		} else {
			activeLine += dir * increase;
		}

		if (increase > maxSearchSize) {
			return null;
		}

	}

}

function paramStringBuilder(paramName, indentAmount, selfName = "self") {
	/*
	Parse the argument (in that case python argument) and build self parameter initialization string
	So far it checks for type hints, default values.
	Naming convention and linting is left for python server (e.g. Pylance) responsible as we do not want to 
	fix and take care of all the possible problems of the world :)
	*/
	const settings = vscode.workspace.getConfiguration('fillinit');
	let typeHint = ""

	// trimming * and ** in args, kwargs as they are not needed
	paramName = paramName.trim().replace(/^\**/, "")

	// checking if there is a default param value as we don't need it
	if (paramName.includes("=")) {
		paramName = (paramName.split("=")[0])
	}

	// check if there is a type hinting included
	if (paramName.includes(":")) {
		[paramName, typeHint] = paramName.split(":")
		paramName = paramName.trim()
		typeHint = typeHint.trim()
		if (settings.includeTypeHints) {
			return `${' '.repeat(indentAmount)}${selfName}.${paramName}: ${typeHint} = ${paramName}\n`
		}
	}
	return `${' '.repeat(indentAmount)}${selfName}.${paramName} = ${paramName}\n`
}

function parseInitParamString(_str) {
	const params = [];
	let position_from = 0;
	let bracket_counter = 0;

	for (var cur_pos = 0; cur_pos < _str.length; cur_pos++) {
		if ("[(".includes(_str[cur_pos])) {
			bracket_counter += 1;
			continue;
		}
		if (")]".includes(_str[cur_pos])) {
			bracket_counter -= 1;
			continue;
		}
		if (_str[cur_pos] == "," && bracket_counter==0) {
			params.push(_str.substring(position_from, cur_pos));
			position_from = cur_pos + 1;
		}
		continue;
	}
	params.push(_str.substring(position_from, _str.length));
	return params.map(item => item.trim())

}

function getArgs(lineText) {
	/*
	Creates and indents the arguments inside of the dunder init method
	```    def __init__(self, arg1, arg2, arg3):```

	Returns:
		self.arg1 = arg1
		self.arg2 = arg2
		self.arg3 = arg3
	*/

	const re = /\((.+)\)/;
	let indentAmount = lineText.search(/\S/) + vscode.window.activeTextEditor.options.tabSize;
	// assumes that no-one will ever use single-spaced indents
	// and if you happen to use single-spaced indents, you should not be allowed to use a computer
	if (lineText.search(/\S/) == 1) {
		indentAmount += vscode.window.activeTextEditor.options.tabSize-1;
	}
	lineText = lineText.match(re)[1];
	lineText = parseInitParamString(lineText);

	let text = '';
	lineText.forEach(argument => {
		text += paramStringBuilder(argument, indentAmount, lineText[0]);
	});

	return text;
}

module.exports = {
	activate,
	deactivate
}
