const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let fillinitCommand = vscode.commands.registerCommand('fillinit.preFillFromArgs', function () {
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
	context.subscriptions.push(fillinitCommand);


	let debugCommand = vscode.commands.registerCommand('fillinit.__secretDebugCommand', function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			vscode.window.showErrorMessage(getExtensionType());
		}
	});
	context.subscriptions.push(debugCommand);
}

function deactivate() {}

function getExtensionType() {
	return vscode.window.activeTextEditor.document.languageId;
}

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

function getArgs(lineText) {
	/*
	Creates and indents the arguments inside of the dunder init method
	```    def __init__(self, arg1, arg2, arg3):```

	Returns:
		self.arg1 = arg1
		self.arg2 = arg2
		self.arg3 = arg3
	*/

	const re = /\(.+\)/;
	let indentAmount = lineText.search(/\S/) + vscode.window.activeTextEditor.options.tabSize;
	// assumes that no-one will ever use single-spaced indents
	// and if you happen to use single-spaced indents, you should not be allowed to use a computer
	if (lineText.search(/\S/) == 1) {
		indentAmount += vscode.window.activeTextEditor.options.tabSize-1;
	}
	lineText = lineText.match(re, '')[0].replace('(self, ', '').replace(')', '').split(', ');

	let text = '';
	lineText.forEach(argument => {
		let validArg = true;

		// checks for *args or **kwargs parameters
		if (argument.includes('*')) {
			validArg = false;
		}
		// checks for optional parameters
		if (argument.includes('=')) {
			argument = argument.split('=')[0]
		}
		// checks for type hints in parameters
		if (argument.includes(':')) {
			argument = argument.split(':')[0]
		}
		// I should have commented this... wtf does this regex do?!
		// if (!/^[a-zA-Z0-9_.-]*$/.test(argument)) {
		// 	validArg = false;
		// }
		// checks for digits in front of variables
		if (/^\d/.test(argument)) {
			validArg = false;
		}

		// adds a new line to the arguments in the for of ```self.var = var```
		if (validArg) {
			text += (' '.repeat(indentAmount)) + 'self.' + argument + ' = ' + argument + '\n';
		}
	});

	return text;
}

module.exports = {
	activate,
	deactivate
}
