const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// TEMPOARY
	let debugCommand = vscode.commands.registerCommand(
    "fillinit.__secretDebugCommand",
    function () {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        vscode.window.showErrorMessage(getExtensionType());
      }
    }
    );
    context.subscriptions.push(debugCommand);




	let fillinitCommand = vscode.commands.registerCommand('fillinit.preFillFromArgs', function () {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const settings = loadLanguageConfig();
			const document = editor.document;
			const activeLine = editor.selection.active.line;

			const lineContent = document.getText(new vscode.Range(activeLine, 0, activeLine, Infinity));
			if (isConstructor(settings, lineContent).toString()) {
				const args = getArgs(settings, lineContent);
				const formattedArgs = formatArgs(settings, args);
			}
		}
	});
	context.subscriptions.push(fillinitCommand);

	let getLanguageIDCommand = vscode.commands.registerCommand("fillinit.getLanguageID", function () {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        vscode.window.showInformationMessage(
          "Language ID: " + getExtensionType(),
			"Copy",
			"OK"
        ).then(function(selection) {
			if (selection === "Copy") {
				vscode.env.clipboard.writeText(getExtensionType());
			}
		});
      }
    });
    context.subscriptions.push(getLanguageIDCommand);
}

function deactivate() {}

function getExtensionType() {
	return vscode.window.activeTextEditor.document.languageId;
}

function loadLanguageConfig() {
	const languageId = getExtensionType();
	const settings = vscode.workspace.getConfiguration("fillinit.LanguageConfigs");

	if (settings[languageId]) {
		return settings[languageId];
	} else {
		vscode.window.showErrorMessage('No configuration found for ' + languageId);
	}
}

function isConstructor(settings, lineContent) {
	return lineContent.includes(settings.constructor)
}

function getArgs(settings, lineContent) {
	/*
	Returns the arguments of the constructor
	*/
	const args = [];
	const noConstructor = lineContent.replace(settings.constructorStart, '').replace(settings.constructorEnd, '');
	return noConstructor.split(settings.separator);
}

function formatArg(settings, arg) {
	return settings.fillSyntax.replaceAll(settings.arguments, arg.trim());
}

function formatArgs(settings, args) {
	let formattedArgs = '';
	for (let i = 0; i < args.length; i++) {
		formattedArgs += formatArg(settings, args[i]) + '\n';
	}
	return formattedArgs;
}

module.exports = {
	activate,
	deactivate
}
