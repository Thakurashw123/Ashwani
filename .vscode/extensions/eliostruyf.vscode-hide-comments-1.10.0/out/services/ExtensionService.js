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
exports.ExtensionService = void 0;
const vscode_1 = require("vscode");
const extension_1 = require("../extension");
class ExtensionService {
    constructor(ctx) {
        this.ctx = ctx;
    }
    /**
     * Creates the singleton instance for the extension
     * @param ctx
     */
    static getInstance(ctx) {
        if (!ExtensionService.instance && ctx) {
            ExtensionService.instance = new ExtensionService(ctx);
        }
        return ExtensionService.instance;
    }
    /**
     * Get state
     * @param propKey
     * @param type
     * @returns
     */
    getState(propKey, type = "global") {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "global") {
                return yield this.ctx.globalState.get(propKey);
            }
            else {
                return yield this.ctx.workspaceState.get(propKey);
            }
        });
    }
    /**
     * Store value in the state
     * @param propKey
     * @param propValue
     * @param type
     */
    setState(propKey, propValue, type = "global") {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "global") {
                yield this.ctx.globalState.update(propKey, propValue);
            }
            else {
                yield this.ctx.workspaceState.update(propKey, propValue);
            }
        });
    }
    /**
     * Get a config setting
     * @param key
     * @returns
     */
    getSetting(key) {
        const extConfig = vscode_1.workspace.getConfiguration(extension_1.CONFIG_SECTION);
        return extConfig.get(key);
    }
    /**
     * Update a config setting
     * @param key
     * @param value
     * @returns
     */
    updateSetting(key, value) {
        const extConfig = vscode_1.workspace.getConfiguration(extension_1.CONFIG_SECTION);
        return extConfig.update(key, value);
    }
}
exports.ExtensionService = ExtensionService;
//# sourceMappingURL=ExtensionService.js.map