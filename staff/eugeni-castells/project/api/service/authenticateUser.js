"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const com_1 = require("com");
const data_1 = require("../data");
const errors_1 = require("com/errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { SystemError } = com_1.errors;
const authenticateUser = (email, password) => {
    com_1.validate.email(email, "authenticate email");
    com_1.validate.password(password, "authenticate password");
    let user;
    let isUserMatched;
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            user = yield data_1.User.findOne({ email }).lean();
            if (!user)
                throw new errors_1.NotFoundError("user not found");
            isUserMatched = yield bcryptjs_1.default.compare(password, user.password);
            if (!isUserMatched)
                throw new errors_1.CredentialsError("wrong credentials");
        }
        catch (error) {
            console.error(error);
            throw new SystemError(error.message);
        }
        return user._id.toString();
    }))();
};
exports.authenticateUser = authenticateUser;
