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
exports.toggleComments = void 0;
const setComments_1 = require("./setComments");
const vscode_1 = require("vscode");
const extension_1 = require("../extension");
const ExtensionService_1 = require("../services/ExtensionService");
const setRegexLines_1 = require("./setRegexLines");
const toggleComments = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = vscode_1.workspace.getConfiguration("editor");
    const colors = config.get(extension_1.CONFIG_TOKENS);
    if (config && colors) {
        let textMateRules = colors["textMateRules"] || [];
        let commentRuleIdx = textMateRules.findIndex((r) => r &&
            r.scope &&
            r.scope.includes("comment.line.double-slash") &&
            r.scope.includes("hidecomments"));
        const enabled = commentRuleIdx >= 0;
        setComments_1.setComments(!enabled);
        const commentsEnabled = ExtensionService_1.ExtensionService.getInstance().getSetting(extension_1.CONFIG_COMBINE_TOGGLE);
        if (commentsEnabled) {
            yield ExtensionService_1.ExtensionService.getInstance().setState(extension_1.STATE_KEYS.regexEnabled, !enabled);
            setRegexLines_1.setRegexLines();
        }
    }
});
exports.toggleComments = toggleComments;
//# sourceMappingURL=toggleComments.js.map