"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVanHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const index_1 = require("../service/index");
exports.updateVanHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req;
    const { vanInfo } = req.body;
    //the multerHandler will have added the multer files to the request
    const files = req.files;
    const parsedVanInfo = JSON.parse(vanInfo);
    return (0, index_1.registerVan)(userId, parsedVanInfo, files).then(() => {
        res.status(201).send();
    });
});
