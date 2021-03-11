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
			const classLine = editor.selection.active.line-1;

			const viewRange = new vscode.Range(classLine, 0, classLine, Infinity);
			const editRange = new vscode.Range(currentLine, 0, currentLine, Infinity);

			const classLineText = document.getText(viewRange);

			const edit = getArgs(classLineText);


			// Get the word within the selection
			editor.edit(editBuilder => {
				editBuilder.replace(editRange, edit);
			});
		}

	});
	context.subscriptions.push(disposable);
}

function deactivate() {}

function getArgs(lineText) {
	//    def __init__(self, arg1, arg2, arg3):
	const re = /\(.+\)/;
	const indentSize = 4; //TODO need to figure out how to read this value from VSCode
	const indentAmount = ((lineText.search(/\S/) / indentSize) + 1) * indentSize;
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
