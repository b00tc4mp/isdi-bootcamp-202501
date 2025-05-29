"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserInfoHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const getAllUserInfo_1 = require("../service/getAllUserInfo");
exports.getAllUserInfoHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req;
    return (0, getAllUserInfo_1.getAllUserInfo)(userId).then((userInfo) => {
        res.status(200).json(userInfo);
    });
});
