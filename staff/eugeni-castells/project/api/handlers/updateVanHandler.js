"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVanHandler = void 0;
const createHandler_1 = __importDefault(require("../middlewares/createHandler"));
const updateVan_1 = require("../service/updateVan");
exports.updateVanHandler = (0, createHandler_1.default)((req, res) => {
    const { userId } = req;
    const { id } = req.params;
    const { vanInfo } = req.body;
    //the multerHandler will have added the multer files to the request
    const files = req.files;
    const parsedVanInfo = JSON.parse(vanInfo);
    return (0, updateVan_1.updateVan)(userId, id, parsedVanInfo, files).then(() => {
        res.status(201).send();
    });
});
