"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVansHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const index_1 = require("../service/index");
exports.getVansHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req;
    return (0, index_1.getVans)(userId).then((vans) => {
        res.json(vans);
    });
});
