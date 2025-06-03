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
const data_2 = require("../data");
const index_1 = require("./index");
const errors_1 = require("com/errors");
const { MONGO_URI, MONGO_DB_TEST } = process.env;
describe("getChats", () => {
    before(() => {
        return data_1.data.connect(MONGO_URI, MONGO_DB_TEST);
    });
    beforeEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            chat_1.Chat.deleteMany({}),
            data_2.ChatComment.deleteMany({}),
        ]);
    });
    it("returns all user chats with participants, history and own field", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const other = yield data_1.User.create({
            name: "Anna",
            lastName: "Amat",
            email: "anna@t.cat",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const comment1 = yield data_2.ChatComment.create({
            text: "Ei Marc!",
            author: other._id,
            createdAt: new Date("2024-01-01T10:00:00Z"),
        });
        const comment2 = yield data_2.ChatComment.create({
            text: "Hola Anna!",
            author: user._id,
            createdAt: new Date("2024-01-01T10:05:00Z"),
        });
        const chat = yield chat_1.Chat.create({
            participants: [user._id, other._id],
            history: [comment1._id, comment2._id],
            createdAt: new Date("2024-01-01T10:00:00Z"),
        });
        yield data_1.User.updateOne({ _id: user._id }, { $push: { chats: chat._id } });
        yield data_1.User.updateOne({ _id: other._id }, { $push: { chats: chat._id } });
        const result = yield (0, index_1.getChats)(user._id.toString());
        (0, chai_1.expect)(result).to.be.an("array").with.lengthOf(1);
        const returnedChat = result[0];
        (0, chai_1.expect)(returnedChat.id).to.equal(chat._id.toString());
        (0, chai_1.expect)(returnedChat.interlocutor.name).to.equal("Anna");
        (0, chai_1.expect)(returnedChat.participants).to.have.lengthOf(2);
        (0, chai_1.expect)(returnedChat.history).to.have.lengthOf(2);
        (0, chai_1.expect)(returnedChat.history[0].own).to.be.false;
        (0, chai_1.expect)(returnedChat.history[1].own).to.be.true;
    }));
    it("returns empty array if user has no chats", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "UserWithoutChats",
            lastName: "Solo",
            email: "solo@test.com",
            password: "123123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const result = yield (0, index_1.getChats)(user._id.toString());
        (0, chai_1.expect)(result).to.be.an("array").with.lengthOf(0);
    }));
    it("throws NotFoundError if user does not exist", () => {
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        return (0, index_1.getChats)(fakeUserId).catch((err) => {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        });
    });
    it("throws ValidationError if userId is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_1.getChats)("invalid-user-id");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("invalid");
        }
    }));
    afterEach(() => {
        return Promise.all([
            data_1.User.deleteMany({}),
            chat_1.Chat.deleteMany({}),
            data_2.ChatComment.deleteMany({}),
        ]);
    });
    after(() => {
        return data_1.data.disconnect();
    });
});
