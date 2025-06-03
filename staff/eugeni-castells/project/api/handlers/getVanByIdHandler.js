"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVanByIdHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const getVanById_1 = require("../service/getVanById");
exports.getVanByIdHandler = (0, createHandler_1.default)((req, res) => {
    const { id } = req.params;
    return (0, getVanById_1.getVanById)(id).then((van) => {
        res.status(200).json(van);
    });
});
