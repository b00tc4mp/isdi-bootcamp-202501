"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerVanHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const index_1 = require("../service/index");
exports.registerVanHandler = (0, createHandler_1.default)((req, res) => {
    var _a;
    const { userId, vanInfo } = req.body;
    return (_a = (0, index_1.registerVan)(userId, vanInfo)) === null || _a === void 0 ? void 0 : _a.then(() => {
        res.status(200).send();
    });
});
