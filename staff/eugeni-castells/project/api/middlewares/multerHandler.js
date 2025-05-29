"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerHandler = void 0;
const multer_1 = __importDefault(require("multer"));
// Configurem multer per pujar fitxers a memòria (RAM) És possible configurar el middleware perquè es guardi a diskStorage que és el disc dur
//de moment amb le simatges que tindré i el volum no caldrà.
const storage = multer_1.default.memoryStorage();
//Això farà que es processi qualsevol fitxer que tingui el nom images
exports.multerHandler = (0, multer_1.default)({ storage }).array("images");
