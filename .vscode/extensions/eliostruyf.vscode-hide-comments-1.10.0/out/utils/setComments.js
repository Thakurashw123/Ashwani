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
exports.setComments = void 0;
const vscode_1 = require("vscode");
const extension_1 = require("../extension");
const triggerCommentsHide_1 = require("./triggerCommentsHide");
const ExtensionService_1 = require("../services/ExtensionService");
const setComments = (enabled) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const config = vscode_1.workspace.getConfiguration("editor");
    const colors = config.get(extension_1.CONFIG_TOKENS);
    const ext = ExtensionService_1.ExtensionService.getInstance();
    const commentColor = ext.getSetting(extension_1.CONFIG_COLOR);
    let backup = ext.getSetting(extension_1.CONFIG_BACKUP) || {};
    if (config && colors) {
        let textMateRules = colors["textMateRules"] || [];
        let commentRuleIdx = textMateRules.findIndex((r) => r && r.scope && r.scope.includes("comment.line.double-slash"));
        if (enabled) {
            if (colors["comments"]) {
                backup["comments"] = colors["comments"];
            }
            if (textMateRules.length > 0) {
                backup["textMateRules"] = textMateRules;
            }
            colors["comments"] = commentColor || "#00000000";
            if (commentRuleIdx >= 0) {
                textMateRules[commentRuleIdx].settings.foreground =
                    commentColor || "#00000000";
            }
            else {
                textMateRules.push({
                    scope: [
                        "hidecomments",
                        "comment",
                        "comment.block",
                        "comment.line",
                        "comment.line.double-slash",
                        "variable.other.jsdoc",
                        "storage.type.class.jsdoc",
                        "punctuation.definition.block.tag.jsdoc",
                        "punctuation.definition.bracket.curly.begin.jsdoc",
                        "punctuation.definition.bracket.curly.end.jsdoc",
                        "entity.name.type.instance.jsdoc",
                        "comment.block.documentation.ts",
                        "comment.block.documentation.js",
                        "comment.block.documentation.cs",
                        "comment.block.documentation.cs entity.other.attribute-name.localname.cs",
                        "comment.block.documentation.cs entity.other.attribute-name.cs",
                        "comment.block.documentation.cs punctuation.definition.tag.cs",
                        "comment.block.documentation.cs punctuation.definition.string.begin.cs",
                        "comment.block.documentation.cs punctuation.definition.string.end.cs",
                        "comment.block.documentation.cs punctuation.definition.bracket.curly.begin.cs",
                        "comment.block.documentation.cs punctuation.definition.bracket.curly.end.cs",
                        "comment.block.documentation.cs punctuation.definition.block.tag.cs",
                        "comment.block.documentation.cs string.quoted.double.cs",
                        "comment.block.documentation.cs entity.name.tag.localname.cs",
                    ],
                    settings: {
                        foreground: commentColor || "#00000000",
                    },
                });
            }
        }
        else {
            if (!(backup === null || backup === void 0 ? void 0 : backup.comments) &&
                colors["comments"] &&
                colors["comments"] !== commentColor) {
                backup["comments"] = colors["comments"];
            }
            else {
                colors["comments"] = (backup === null || backup === void 0 ? void 0 : backup.comments) || "";
            }
            if ((backup === null || backup === void 0 ? void 0 : backup.textMateRules) &&
                backup.textMateRules &&
                ((_a = backup.textMateRules) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                textMateRules = backup["textMateRules"];
            }
            else if (commentRuleIdx >= 0) {
                textMateRules = textMateRules.filter((r) => r &&
                    r.scope &&
                    !r.scope.includes("comment.line.double-slash"));
            }
        }
        colors["[*Light*]"] = undefined;
        colors["[*Dark*]"] = undefined;
        colors["textMateRules"] = textMateRules;
        yield config.update(extension_1.CONFIG_TOKENS, colors);
        yield ext.updateSetting(extension_1.CONFIG_BACKUP, Object.keys(backup).length > 0 ? backup : undefined);
        triggerCommentsHide_1.triggerCommentsHide(colors);
    }
});
exports.setComments = setComments;
//# sourceMappingURL=setComments.js.map