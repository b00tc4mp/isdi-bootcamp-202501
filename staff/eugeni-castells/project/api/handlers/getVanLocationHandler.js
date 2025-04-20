"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVanLocationHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const getVanLocation_1 = require("../service/getVanLocation");
exports.getVanLocationHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req.body;
    const { vanId } = req.params;
    return (0, getVanLocation_1.getVanLocation)(userId, vanId).then((van) => {
        res.status(200).json({ van });
    });
});
