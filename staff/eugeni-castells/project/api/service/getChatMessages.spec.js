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
describe("getChatMessages", () => {
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
    it("returns chat messages sorted and with 'own' field", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const author = yield data_1.User.create({
            name: "Georgina",
            lastName: "Puig",
            email: "geo@test.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const comment1 = yield data_2.ChatComment.create({
            text: "Hola!",
            author: author._id,
            createdAt: new Date("2024-01-01T10:00:00.000Z"),
        });
        const comment2 = yield data_2.ChatComment.create({
            text: "Bon dia!",
            author: user._id,
            createdAt: new Date("2024-01-01T11:00:00.000Z"),
        });
        const chat = yield chat_1.Chat.create({
            participants: [user._id, author._id],
            history: [comment1._id, comment2._id],
        });
        const result = yield (0, index_1.getChatMessages)(user._id.toString(), chat._id.toString());
        (0, chai_1.expect)(result).to.be.an("array").with.lengthOf(2);
        (0, chai_1.expect)(result[0].text).to.equal("Hola!");
        (0, chai_1.expect)(result[0].own).to.equal(false);
        (0, chai_1.expect)(result[1].text).to.equal("Bon dia!");
        (0, chai_1.expect)(result[1].own).to.equal(true);
        (0, chai_1.expect)(result[0].author).to.have.property("name", "Georgina");
    }));
    it("throws NotFoundError if user does not exist", () => {
        const fakeUserId = new mongoose_1.Types.ObjectId().toString();
        const fakeChatId = new mongoose_1.Types.ObjectId().toString();
        return (0, index_1.getChatMessages)(fakeUserId, fakeChatId).catch((err) => {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        });
    });
    it("throws NotFoundError if chat does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Aaron",
            lastName: "Vanlord",
            email: "a@a.com",
            password: "123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        const fakeChatId = new mongoose_1.Types.ObjectId().toString();
        try {
            yield (0, index_1.getChatMessages)(user._id.toString(), fakeChatId);
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("chat not found");
        }
    }));
    it("throws ValidationError if userId is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, index_1.getChatMessages)("invalid-user-id", "validbutunusedchatid");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("invalid");
        }
    }));
    it("throws ValidationError if chatId is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Aaron",
            lastName: "Test",
            email: "test@u.com",
            password: "123123",
            location: new mongoose_1.Types.ObjectId(),
        });
        try {
            yield (0, index_1.getChatMessages)(user._id.toString(), "invalid-chat-id");
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.ValidationError);
            (0, chai_1.expect)(err.message).to.include("invalid");
        }
    }));
    it("throws SystemError if chat lookup fails due to DB error", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = chat_1.Chat.findById;
        chat_1.Chat.findById = () => ({
            populate: () => {
                throw new Error("Simulated DB failure");
            },
        });
        const user = yield data_1.User.create({
            name: "Marc",
            lastName: "Castellet",
            email: "marc@test.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const author = yield data_1.User.create({
            name: "Georgina",
            lastName: "Puig",
            email: "geo@test.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const comment1 = yield data_2.ChatComment.create({
            text: "Hola!",
            author: author._id,
            createdAt: new Date("2024-01-01T10:00:00.000Z"),
        });
        const comment2 = yield data_2.ChatComment.create({
            text: "Bon dia!",
            author: user._id,
            createdAt: new Date("2024-01-01T11:00:00.000Z"),
        });
        const chat = yield chat_1.Chat.create({
            participants: [user._id, author._id],
            history: [comment1._id, comment2._id],
        });
        try {
            yield (0, index_1.getChatMessages)(user._id.toString(), chat._id.toString());
            throw new Error("Expected to throw");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.SystemError);
            (0, chai_1.expect)(err.message).to.include("Simulated DB failure");
        }
        finally {
            chat_1.Chat.findById = original;
        }
    }));
    it("returns an empty array if chat history is empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield data_1.User.create({
            name: "Empty",
            lastName: "Chat",
            email: "empty@chat.com",
            password: "123456",
            location: new mongoose_1.Types.ObjectId(),
        });
        const chat = yield chat_1.Chat.create({
            participants: [user._id],
            history: [],
        });
        const result = yield (0, index_1.getChatMessages)(user._id.toString(), chat._id.toString());
        (0, chai_1.expect)(result).to.be.an("array").that.is.empty;
    }));
    it("throws NotFoundError if user is null after successful DB call", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = data_1.User.findById;
        data_1.User.findById = () => ({
            lean: () => Promise.resolve(null),
        });
        try {
            yield (0, index_1.getChatMessages)(new mongoose_1.Types.ObjectId().toString(), new mongoose_1.Types.ObjectId().toString());
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("user not found");
        }
        finally {
            data_1.User.findById = original;
        }
    }));
    it("throws NotFoundError if chat is null after successful DB call", () => __awaiter(void 0, void 0, void 0, function* () {
        const original = chat_1.Chat.findById;
        chat_1.Chat.findById = () => ({
            populate: () => ({
                sort: () => ({
                    lean: () => Promise.resolve(null),
                }),
            }),
        });
        const user = yield data_1.User.create({
            name: "Mock",
            lastName: "User",
            email: "mock@test.com",
            password: "123",
            location: new mongoose_1.Types.ObjectId(),
        });
        try {
            yield (0, index_1.getChatMessages)(user._id.toString(), new mongoose_1.Types.ObjectId().toString());
            throw new Error("Should have thrown");
        }
        catch (err) {
            (0, chai_1.expect)(err).to.be.instanceOf(errors_1.NotFoundError);
            (0, chai_1.expect)(err.message).to.equal("chat not found");
        }
        finally {
            chat_1.Chat.findById = original;
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
