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
exports.deactivate = exports.activate = exports.STATE_KEYS = exports.CONTEXT_KEYS = exports.CONFIG_TOKENS = exports.CONFIG_FOLD_ON_HIDE = exports.CONFIG_COMBINE_TOGGLE = exports.CONFIG_BACKUP = exports.CONFIG_COLOR = exports.CONFIG_REGEX = exports.CONFIG_CLEAN_START = exports.CONFIG_DEFAULT_ENABLED = exports.CONFIG_SECTION = void 0;
const triggerRegexHide_1 = require("./utils/triggerRegexHide");
const ExtensionService_1 = require("./services/ExtensionService");
const vscode = require("vscode");
const setComments_1 = require("./utils/setComments");
const setRegexLines_1 = require("./utils/setRegexLines");
const triggerCommentsHide_1 = require("./utils/triggerCommentsHide");
const toggleComments_1 = require("./utils/toggleComments");
exports.CONFIG_SECTION = "hideComments";
exports.CONFIG_DEFAULT_ENABLED = "defaultEnabled";
exports.CONFIG_CLEAN_START = "cleanStart";
exports.CONFIG_REGEX = "regex";
exports.CONFIG_COLOR = "color";
exports.CONFIG_BACKUP = "backup";
exports.CONFIG_COMBINE_TOGGLE = "combineToggle";
exports.CONFIG_FOLD_ON_HIDE = "foldOnHide";
exports.CONFIG_TOKENS = "tokenColorCustomizations";
exports.CONTEXT_KEYS = {
    comments: `${exports.CONFIG_SECTION}.commentsEnabled`,
    regex: `${exports.CONFIG_SECTION}.regexEnabled`,
    regexUsed: `${exports.CONFIG_SECTION}.regexUsed`,
};
exports.STATE_KEYS = {
    regexEnabled: `${exports.CONFIG_SECTION}.regexEnabled`,
};
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const ext = ExtensionService_1.ExtensionService.getInstance(context);
        const { subscriptions } = context;
        const config = vscode.workspace.getConfiguration("editor");
        const colors = config.get(exports.CONFIG_TOKENS);
        const extDefaultEnabled = ext.getSetting(exports.CONFIG_DEFAULT_ENABLED);
        const extCleanStart = ext.getSetting(exports.CONFIG_CLEAN_START);
        // Automatically start when the comments setting is not available
        if (extDefaultEnabled && config && colors && !colors["comments"]) {
            const choice = yield vscode.window.showInformationMessage("Do you want to hide comments in this project?", "Yes", "No");
            if (choice === "Yes") {
                setComments_1.setComments(true);
            }
            else {
                setComments_1.setComments(false);
            }
            yield ext.setState(exports.STATE_KEYS.regexEnabled, choice === "Yes");
            setRegexLines_1.setRegexLines();
        }
        if (extCleanStart) {
            if (config && colors && colors["comments"]) {
                setComments_1.setComments(false);
            }
            yield ext.setState(exports.STATE_KEYS.regexEnabled, false);
        }
        const toggleCommentsCmd = vscode.commands.registerCommand("hidecomments.toggle", () => __awaiter(this, void 0, void 0, function* () {
            toggleComments_1.toggleComments();
        }));
        const hideCommentsCmd = vscode.commands.registerCommand("hidecomments.hide", () => {
            setComments_1.setComments(true);
        });
        const showCommentsCmd = vscode.commands.registerCommand("hidecomments.show", () => {
            setComments_1.setComments(false);
        });
        const hideConsoleCmd = vscode.commands.registerCommand("hidecomments.regex.hide", () => __awaiter(this, void 0, void 0, function* () {
            yield ext.setState(exports.STATE_KEYS.regexEnabled, true);
            setRegexLines_1.setRegexLines();
        }));
        const showConsoleCmd = vscode.commands.registerCommand("hidecomments.regex.show", () => __awaiter(this, void 0, void 0, function* () {
            yield ext.setState(exports.STATE_KEYS.regexEnabled, false);
            setRegexLines_1.setRegexLines();
        }));
        // Set the type of action to show on the menu
        triggerCommentsHide_1.triggerCommentsHide(colors);
        triggerRegexHide_1.triggerRegexHide();
        // Show or hide the regex lines
        setRegexLines_1.setRegexLines();
        vscode.window.onDidChangeActiveTextEditor((e) => {
            setRegexLines_1.setRegexLines();
        }, null, context.subscriptions);
        vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration(exports.CONFIG_SECTION)) {
                setRegexLines_1.setRegexLines();
                triggerRegexHide_1.triggerRegexHide();
            }
        }, null, context.subscriptions);
        subscriptions.push(toggleCommentsCmd);
        subscriptions.push(hideCommentsCmd);
        subscriptions.push(showCommentsCmd);
        subscriptions.push(hideConsoleCmd);
        subscriptions.push(showConsoleCmd);
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map