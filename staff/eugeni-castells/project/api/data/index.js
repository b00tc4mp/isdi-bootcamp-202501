"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatComment = exports.Chat = exports.Review = exports.Location = exports.Doc = exports.Van = exports.Trip = exports.User = exports.data = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_js_1 = require("./models/index.js");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return index_js_1.User; } });
Object.defineProperty(exports, "Trip", { enumerable: true, get: function () { return index_js_1.Trip; } });
Object.defineProperty(exports, "Van", { enumerable: true, get: function () { return index_js_1.Van; } });
Object.defineProperty(exports, "Doc", { enumerable: true, get: function () { return index_js_1.Doc; } });
Object.defineProperty(exports, "Location", { enumerable: true, get: function () { return index_js_1.Location; } });
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return index_js_1.Review; } });
Object.defineProperty(exports, "Chat", { enumerable: true, get: function () { return index_js_1.Chat; } });
Object.defineProperty(exports, "ChatComment", { enumerable: true, get: function () { return index_js_1.ChatComment; } });
const com_1 = require("com");
const { SystemError } = com_1.errors;
const data = {
    connect(url, dbName) {
        return mongoose_1.default.connect(`${url}/${dbName}`).catch((error) => {
            throw new SystemError(error.message);
        });
    },
    disconnect() {
        return mongoose_1.default.disconnect();
    },
};
exports.data = data;
