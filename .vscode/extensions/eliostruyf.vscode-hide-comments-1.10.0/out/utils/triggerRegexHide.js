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
exports.triggerRegexHide = void 0;
const vscode_1 = require("vscode");
const extension_1 = require("../extension");
const ExtensionService_1 = require("../services/ExtensionService");
const triggerRegexHide = () => __awaiter(void 0, void 0, void 0, function* () {
    const ext = ExtensionService_1.ExtensionService.getInstance();
    const regExps = ext.getSetting(extension_1.CONFIG_REGEX);
    yield vscode_1.commands.executeCommand('setContext', extension_1.CONTEXT_KEYS.regex, (regExps && regExps.length > 0));
});
exports.triggerRegexHide = triggerRegexHide;
//# sourceMappingURL=triggerRegexHide.js.map