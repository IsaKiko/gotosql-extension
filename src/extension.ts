// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


function dothething(filename:string) {
	vscode.workspace.findFiles('**/' + filename).then(
		files => {
			if ( files.length > 1) {
				vscode.commands.executeCommand("workbench.action.quickOpen", filename);
			}
			else if (files.length === 1) {
				let file = files[0].toString().substring(7);
				let uri = vscode.Uri.file(file);
				vscode.commands.executeCommand("vscode.open", uri);
			}
			else {
				vscode.window.showErrorMessage('Could not find file: ' + filename);
			}
		});
	}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gotosql" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gotosql.gotosqlfile', () => {
		let editor = vscode.window.activeTextEditor;
		if (editor){
			// Find first sql file and find it in the file explorer (if there is one)
			let line = editor.selection.active.line; // ln (0-indexed)
			let text = editor.document.lineAt(line).text; // text in the line
			let match = text.match(/[\w\-]+\.sql/);

			if (!match) {
				let match = text.match(/\"[\w\-]+\"/);
				let firstMatch = match?.toString();
				let filename = firstMatch?.substring(1,firstMatch?.length-1) + '.sql';
				if (match)
					{
						dothething(filename);
					}
				else if (!match){
					vscode.window.showErrorMessage('No string in this line matches the pattern');
				}
			}

			else if (match) {
				let filename = match.toString();
				dothething(filename);
			}
			}
		}
	);

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
