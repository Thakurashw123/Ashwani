"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRegexLines = void 0;
const vscode_1 = require("vscode");
const extension_1 = require("../extension");
const ExtensionService_1 = require("../services/ExtensionService");
const consoleTextDecoration = vscode_1.window.createTextEditorDecorationType({
    textDecoration: "none; visibility: hidden",
});
const setRegexLines = () => __awaiter(void 0, void 0, void 0, function* () {
    const ext = ExtensionService_1.ExtensionService.getInstance();
    const isRegExEnabled = yield ext.getState(extension_1.STATE_KEYS.regexEnabled);
    const regExps = ext.getSetting(extension_1.CONFIG_REGEX);
    const editor = vscode_1.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const document = editor.document;
    const text = document.getText();
    const decorators = [];
    if (regExps && regExps.length > 0) {
        for (const regExp of regExps) {
            if (!regExp.regex) {
                continue;
            }
            const crntRegEx = RegExp(regExp.regex, regExp.flags || "igm");
            if (isRegExEnabled) {
                let match;
                while (match = crntRegEx.exec(text)) {
                    const matched = match[0];
                    if (!matched) {
                        continue;
                    }
                    const startIndex = match[0].indexOf(matched);
                    const startIdx = document.positionAt(match.index + startIndex);
                    const endIdx = document.positionAt(match.index + startIndex + matched.length);
                    const range = new vscode_1.Range(startIdx, endIdx);
                    decorators.push({ range });
                }
            }
        }
    }
    editor.setDecorations(consoleTextDecoration, decorators);
    yield vscode_1.commands.executeCommand('setContext', extension_1.CONTEXT_KEYS.regexUsed, !isRegExEnabled);
});
exports.setRegexLines = setRegexLines;
//# sourceMappingURL=setRegexLines.js.map