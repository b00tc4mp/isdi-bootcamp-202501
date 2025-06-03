import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User } from "../data";
import { Chat } from "../data/models/chat";
import { ChatComment } from "../data";
import { getChats } from "./index";
import { NotFoundError, ValidationError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("getChats", () => {
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

  it("returns all user chats with participants, history and own field", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const other = await User.create({
      name: "Anna",
      lastName: "Amat",
      email: "anna@t.cat",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const comment1 = await ChatComment.create({
      text: "Ei Marc!",
      author: other._id,
      createdAt: new Date("2024-01-01T10:00:00Z"),
    });

    const comment2 = await ChatComment.create({
      text: "Hola Anna!",
      author: user._id,
      createdAt: new Date("2024-01-01T10:05:00Z"),
    });

    const chat = await Chat.create({
      participants: [user._id, other._id],
      history: [comment1._id, comment2._id],
      createdAt: new Date("2024-01-01T10:00:00Z"),
    });

    await User.updateOne({ _id: user._id }, { $push: { chats: chat._id } });
    await User.updateOne({ _id: other._id }, { $push: { chats: chat._id } });

    const result = await getChats(user._id.toString());

    expect(result).to.be.an("array").with.lengthOf(1);
    const returnedChat = result[0];

    expect(returnedChat.id).to.equal(chat._id.toString());
    expect(returnedChat.interlocutor.name).to.equal("Anna");
    expect(returnedChat.participants).to.have.lengthOf(2);
    expect(returnedChat.history).to.have.lengthOf(2);
    expect(returnedChat.history[0].own).to.be.false;
    expect(returnedChat.history[1].own).to.be.true;
  });

  it("returns empty array if user has no chats", async () => {
    const user = await User.create({
      name: "UserWithoutChats",
      lastName: "Solo",
      email: "solo@test.com",
      password: "123123123",
      location: new Types.ObjectId(),
    });

    const result = await getChats(user._id.toString());

    expect(result).to.be.an("array").with.lengthOf(0);
  });

  it("throws NotFoundError if user does not exist", () => {
    const fakeUserId = new Types.ObjectId().toString();

    return getChats(fakeUserId).catch((err) => {
      expect(err).to.be.instanceOf(NotFoundError);
      expect(err.message).to.equal("user not found");
    });
  });

  it("throws ValidationError if userId is invalid", async () => {
    try {
      await getChats("invalid-user-id");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("invalid");
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
