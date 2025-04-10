"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAlias = exports.authenticateUser = exports.registerUser = void 0;
const registerUser_js_1 = __importDefault(require("./registerUser.js"));
exports.registerUser = registerUser_js_1.default;
const authenticateUser_js_1 = __importDefault(require("./authenticateUser.js"));
exports.authenticateUser = authenticateUser_js_1.default;
const getUserAlias_js_1 = __importDefault(require("./getUserAlias.js"));
exports.getUserAlias = getUserAlias_js_1.default;
