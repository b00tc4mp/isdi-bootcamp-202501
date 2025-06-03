"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVanByIdHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const deleteVanById_1 = require("../service/deleteVanById");
exports.deleteVanByIdHandler = (0, createHandler_1.default)((req, res) => {
    const { id } = req.params;
    const { userId } = req;
    return (0, deleteVanById_1.deleteVanById)(userId, id).then(() => {
        res.status(200).send();
    });
});
