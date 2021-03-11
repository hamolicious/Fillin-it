const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('auto--init--.preFillFromArgs', function () {
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
	const settings = vscode.workspace.getConfiguration('auto--init--');
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
	const indentAmount = lineText.search(/\S/) + vscode.window.activeTextEditor.options.tabSize;
	lineText = lineText.match(re, '')[0].replace('(self, ', '').replace(')', '').split(', ');

	let text = '';
	lineText.forEach(argument => {
		text += (' '.repeat(indentAmount)) + 'self.' + argument + ' = ' + argument + '\n';
	});

	return text;
}

module.exports = {
	activate,
	deactivate
}
