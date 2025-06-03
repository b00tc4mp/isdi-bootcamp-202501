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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const chai_1 = require("chai");
const mongoose_1 = require("mongoose");
const data_1 = require("../data");
const chat_1 = require("../data/models/chat");
const chatComment_1 = require("../data/models/chatComment");
const index_1 = require("./index");
const errors_1 = require("com/errors");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe("sendMessage", () => {
    before(() => data_1.data.connect(MONGO_URI, MONGO_DB_TEST));
    beforeEach(() => Promise.all([
        data_1.User.deleteMany({}),
        chat_1.Chat.deleteMany({}),
        chatComment_1.ChatComment.deleteMany({}),
    ]));
    it("sends a message successfully if user is a participant", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: new mongoose_1.Types.ObjectId(),
        });
        const chat = yield chat_1.Chat.create({
            participants: [user._id],
            history: [],
            createdAt: new Date(),
        });
        yield (0, index_1.sendMessage)(user._id.toString(), chat._id.toString(), "Hola!");
        const updatedChat = yield chat_1.Chat.findById(chat._id).populate("history");
        (0, chai_1.expect)(updatedChat.history).to.have.lengthOf(1);
        (0, chai_1.expect)(updatedChat.history[0].text).to.equal("Hola!");
    }));
    it("throws NotFoundError if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const chat = yield chat_1.Chat.create({
            participants: [new mongoose_1.Types.ObjectId()],
            history: [],
            createdAt: new Date(),
        });
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.sendMessage)(fakeUserId, chat._id.toString(), "Hola!");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        }
    }));
    it("throws NotFoundError if chat does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: new mongoose_1.Types.ObjectId(),
        });
        const fakeChatId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.sendMessage)(user._id.toString(), fakeChatId, "Hola!");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("chat not found");
        }
    }));
    it("throws OwnershipError if user is not a participant of the chat", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: new mongoose_1.Types.ObjectId(),
        });
        const otherUser = new mongoose_1.Types.ObjectId();
        const chat = yield chat_1.Chat.create({
            participants: [otherUser],
            history: [],
            createdAt: new Date(),
        });
        try {
            yield (0, index_1.sendMessage)(user._id.toString(), chat._id.toString(), "Hola!");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.OwnershipError);
        }
    }));
    it("throws ValidationError if message is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "hashed",
            location: new mongoose_1.Types.ObjectId(),
        });
        const chat = yield chat_1.Chat.create({
            participants: [user._id],
            history: [],
            createdAt: new Date(),
        });
        try {
            yield (0, index_1.sendMessage)(user._id.toString(), chat._id.toString(), "");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("min length");
        }
    }));
    afterEach(() => Promise.all([
        data_1.User.deleteMany({}),
        chat_1.Chat.deleteMany({}),
        chatComment_1.ChatComment.deleteMany({}),
    ]));
    after(() => data_1.data.disconnect());
});
