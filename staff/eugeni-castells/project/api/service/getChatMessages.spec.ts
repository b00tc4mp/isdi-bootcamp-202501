import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User } from "../data";
import { Chat } from "../data/models/chat";
import { ChatComment } from "../data";
import { getChatMessages } from "./index";
import { NotFoundError, SystemError, ValidationError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("getChatMessages", () => {
  before(() => {
    return data.connect(MONGO_URI!, MONGO_DB_TEST!);
  });

  beforeEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Chat.deleteMany({}),
      ChatComment.deleteMany({}),
    ]);
  });

  it("returns chat messages sorted and with 'own' field", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const author = await User.create({
      name: "Georgina",
      lastName: "Puig",
      email: "geo@test.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const comment1 = await ChatComment.create({
      text: "Hola!",
      author: author._id,
      createdAt: new Date("2024-01-01T10:00:00.000Z"),
    });

    const comment2 = await ChatComment.create({
      text: "Bon dia!",
      author: user._id,
      createdAt: new Date("2024-01-01T11:00:00.000Z"),
    });

    const chat = await Chat.create({
      participants: [user._id, author._id],
      history: [comment1._id, comment2._id],
    });

    const result = await getChatMessages(
      user._id.toString(),
      chat._id.toString()
    );

    expect(result).to.be.an("array").with.lengthOf(2);
    expect(result[0].text).to.equal("Hola!");
    expect(result[0].own).to.equal(false);
    expect(result[1].text).to.equal("Bon dia!");
    expect(result[1].own).to.equal(true);
    expect(result[0].author).to.have.property("name", "Georgina");
  });

  it("throws NotFoundError if user does not exist", () => {
    const fakeUserId = new Types.ObjectId().toString();
    const fakeChatId = new Types.ObjectId().toString();

    return getChatMessages(fakeUserId, fakeChatId).catch((err) => {
      expect(err).to.be.instanceOf(NotFoundError);
      expect(err.message).to.equal("user not found");
    });
  });

  it("throws NotFoundError if chat does not exist", async () => {
    const user = await User.create({
      name: "Aaron",
      lastName: "Vanlord",
      email: "a@a.com",
      password: "123123",
      location: new Types.ObjectId(),
    });

    const fakeChatId = new Types.ObjectId().toString();

    try {
      await getChatMessages(user._id.toString(), fakeChatId);
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("chat not found");
    }
  });

  it("throws ValidationError if userId is invalid", async () => {
    try {
      await getChatMessages("invalid-user-id", "validbutunusedchatid");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err as Error).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("invalid");
    }
  });

  it("throws ValidationError if chatId is invalid", async () => {
    const user = await User.create({
      name: "Aaron",
      lastName: "Test",
      email: "test@u.com",
      password: "123123",
      location: new Types.ObjectId(),
    });

    try {
      await getChatMessages(user._id.toString(), "invalid-chat-id");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("invalid");
    }
  });

  it("throws SystemError if chat lookup fails due to DB error", async () => {
    const original = Chat.findById;
    (Chat.findById as any) = () => ({
      populate: () => {
        throw new Error("Simulated DB failure");
      },
    });
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const author = await User.create({
      name: "Georgina",
      lastName: "Puig",
      email: "geo@test.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const comment1 = await ChatComment.create({
      text: "Hola!",
      author: author._id,
      createdAt: new Date("2024-01-01T10:00:00.000Z"),
    });

    const comment2 = await ChatComment.create({
      text: "Bon dia!",
      author: user._id,
      createdAt: new Date("2024-01-01T11:00:00.000Z"),
    });

    const chat = await Chat.create({
      participants: [user._id, author._id],
      history: [comment1._id, comment2._id],
    });
    try {
      await getChatMessages(user._id.toString(), chat._id.toString());
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(SystemError);
      expect((err as Error).message).to.include("Simulated DB failure");
    } finally {
      Chat.findById = original;
    }
  });

  it("returns an empty array if chat history is empty", async () => {
    const user = await User.create({
      name: "Empty",
      lastName: "Chat",
      email: "empty@chat.com",
      password: "123456",
      location: new Types.ObjectId(),
    });

    const chat = await Chat.create({
      participants: [user._id],
      history: [],
    });

    const result = await getChatMessages(
      user._id.toString(),
      chat._id.toString()
    );
    expect(result).to.be.an("array").that.is.empty;
  });

  it("throws NotFoundError if user is null after successful DB call", async () => {
    const original = User.findById;
    (User.findById as any) = () => ({
      lean: () => Promise.resolve(null),
    });

    try {
      await getChatMessages(
        new Types.ObjectId().toString(),
        new Types.ObjectId().toString()
      );
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("user not found");
    } finally {
      User.findById = original;
    }
  });

  it("throws NotFoundError if chat is null after successful DB call", async () => {
    const original = Chat.findById;
    (Chat.findById as any) = () => ({
      populate: () => ({
        sort: () => ({
          lean: () => Promise.resolve(null),
        }),
      }),
    });

    const user = await User.create({
      name: "Mock",
      lastName: "User",
      email: "mock@test.com",
      password: "123",
      location: new Types.ObjectId(),
    });

    try {
      await getChatMessages(
        user._id.toString(),
        new Types.ObjectId().toString()
      );
      throw new Error("Should have thrown");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("chat not found");
    } finally {
      Chat.findById = original;
    }
  });

  afterEach(() => {
    return Promise.all([
      User.deleteMany({}),
      Chat.deleteMany({}),
      ChatComment.deleteMany({}),
    ]);
  });

  after(() => {
    return data.disconnect();
  });
});
