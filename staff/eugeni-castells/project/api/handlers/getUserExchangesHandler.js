"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserExchangesHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const service_1 = require("../service");
exports.getUserExchangesHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req;
    return (0, service_1.getUserExchanges)(userId).then((exchanges) => {
        res.status(200).json(exchanges);
    });
});
