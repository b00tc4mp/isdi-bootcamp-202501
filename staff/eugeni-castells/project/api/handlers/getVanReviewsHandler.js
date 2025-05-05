"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVanReviewsHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const getVanReviews_1 = require("../service/getVanReviews");
exports.getVanReviewsHandler = (0, createHandler_1.default)((req, res) => {
    const { id } = req.params;
    const { userId } = req;
    return (0, getVanReviews_1.getVanReviews)(userId, id).then((van) => {
        res.status(200).json(van);
    });
});
