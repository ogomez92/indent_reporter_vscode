// The module 'vscode' contains the VS Code extensibility API
var playsound = require('play-sound')
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import player, { PlayerConfig } from './player';
const path = require('path')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
let oldIndex = -1
let config: PlayerConfig = {
	macVol: 1,
	winVol: 100,
	linuxVol: 100
};
let basePath: string = path.join(__dirname, 'indentSounds');
export function activate(context: vscode.ExtensionContext) {
	oldIndex = -1
	context.subscriptions.push(
		vscode.window.onDidChangeTextEditorSelection(function (e) {
			let editor = vscode.window.activeTextEditor
			if (editor == null) {
				vscode.window.showErrorMessage("editor error")
				return;
			}
			let text = editor.document.lineAt(editor.selection.active.line).text
			let index = -1
			if (text.length != 0) {
				index = editor.document.lineAt(editor.selection.active.line).firstNonWhitespaceCharacterIndex
				let char = editor.document.lineAt(editor.selection.active.line).text[0]

				if (index > 0) {
					if (char == " ") {
						index = index / 2
					}
				}
				index = Math.ceil(index)
			} else {
				index = 0
			}
			//vscode.window.showInformationMessage(String(index))
			if (index != oldIndex) {
				reportIndex(index)
			}
			oldIndex = index
		}));

}
function reportIndex(index: Number) {
	//vscode.window.showInformationMessage("reported")
	console.log("playing")
	player.play(basePath+"/"+index+".mp3", config)
}
export function deactivate() { }
