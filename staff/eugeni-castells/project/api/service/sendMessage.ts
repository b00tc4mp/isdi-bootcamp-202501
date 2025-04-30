import { validate } from "com";
import { User } from "../data";
import { NotFoundError, OwnershipError, SystemError } from "com/errors";
import { Chat } from "../data/models/chat";
import { ChatComment } from "../data/models/chatComment";

export const sendMessage = (
  userId: string,
  chatId: string,
  message: string
): Promise<void> => {
  validate.id(userId, "user id");
  validate.id(chatId, "chat id");
  validate.string(message, "message");
  validate.minLength(message, 1, "message min length");

  return (async () => {
    let user;
    try {
      user = await User.findById(userId).lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    let chat;
    try {
      chat = await Chat.findById(chatId);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!chat) {
      throw new NotFoundError("chat not found");
    }

    const formattedIds = chat.participants.map((participant) => {
      return participant.toString();
    });

    if (!formattedIds.includes(userId)) {
      throw new OwnershipError("user is not in this chat");
    }

    let comment;
    try {
      comment = await ChatComment.create({
        text: message,
        author: userId,
        createdAt: new Date(Date.now()),
      });
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    try {
      const result = await Chat.updateOne(
        //we make sure the chat with the id has the user as a participant
        { _id: chatId, participants: userId },
        {
          $push: { history: comment._id },
          $set: { modifiedAt: new Date() },
        }
      );

      if (result.matchedCount === 0) {
        throw new NotFoundError("chat not found");
      }

      if (result.modifiedCount === 0) {
        throw new SystemError("chat was not updated");
      }
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
