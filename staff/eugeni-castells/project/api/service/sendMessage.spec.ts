import "dotenv/config";
import { expect } from "chai";
import { Types } from "mongoose";
import { data, User } from "../data";
import { Chat } from "../data/models/chat";
import { ChatComment } from "../data/models/chatComment";
import { sendMessage } from "./index";
import { NotFoundError, OwnershipError, ValidationError } from "com/errors";

const { MONGO_URI, MONGO_DB_TEST } = process.env;

describe("sendMessage", () => {
  before(() => data.connect(MONGO_URI!, MONGO_DB_TEST!));

  beforeEach(() =>
    Promise.all([
      User.deleteMany({}),
      Chat.deleteMany({}),
      ChatComment.deleteMany({}),
    ])
  );

  it("sends a message successfully if user is a participant", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: new Types.ObjectId(),
    });

    const chat = await Chat.create({
      participants: [user._id],
      history: [],
      createdAt: new Date(),
    });

    await sendMessage(user._id.toString(), chat._id.toString(), "Hola!");

    const updatedChat = await Chat.findById(chat._id).populate("history");

    expect(updatedChat!.history).to.have.lengthOf(1);
    expect((updatedChat!.history[0] as any).text).to.equal("Hola!");
  });

  it("throws NotFoundError if user does not exist", async () => {
    const chat = await Chat.create({
      participants: [new Types.ObjectId()],
      history: [],
      createdAt: new Date(),
    });

    const fakeUserId = new Types.ObjectId().toString();

    try {
      await sendMessage(fakeUserId, chat._id.toString(), "Hola!");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("user not found");
    }
  });

  it("throws NotFoundError if chat does not exist", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: new Types.ObjectId(),
    });

    const fakeChatId = new Types.ObjectId().toString();

    try {
      await sendMessage(user._id.toString(), fakeChatId, "Hola!");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(NotFoundError);
      expect((err as Error).message).to.equal("chat not found");
    }
  });

  it("throws OwnershipError if user is not a participant of the chat", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: new Types.ObjectId(),
    });

    const otherUser = new Types.ObjectId();

    const chat = await Chat.create({
      participants: [otherUser],
      history: [],
      createdAt: new Date(),
    });

    try {
      await sendMessage(user._id.toString(), chat._id.toString(), "Hola!");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(OwnershipError);
    }
  });

  it("throws ValidationError if message is empty", async () => {
    const user = await User.create({
      name: "Marc",
      lastName: "Castellet",
      email: "marc@test.com",
      password: "hashed",
      location: new Types.ObjectId(),
    });

    const chat = await Chat.create({
      participants: [user._id],
      history: [],
      createdAt: new Date(),
    });

    try {
      await sendMessage(user._id.toString(), chat._id.toString(), "");
      throw new Error("Expected to throw");
    } catch (err) {
      expect(err).to.be.instanceOf(ValidationError);
      expect((err as Error).message).to.include("min length");
    }
  });

  afterEach(() =>
    Promise.all([
      User.deleteMany({}),
      Chat.deleteMany({}),
      ChatComment.deleteMany({}),
    ])
  );

  after(() => data.disconnect());
});
