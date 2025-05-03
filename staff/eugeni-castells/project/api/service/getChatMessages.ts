import { validate } from "com";
import { ReturnedChatMessages } from "./types";
import { User } from "../data";
import { NotFoundError, SystemError } from "com/errors";
import { Chat } from "../data/models/chat";
import { Types } from "mongoose";

export const getChatMessages = (
  userId: string,
  chatId: string
): Promise<ReturnedChatMessages | []> => {
  validate.id(userId, "user id");
  validate.id(chatId, "chat id");

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
      chat = await Chat.findById(chatId)
        .populate<{
          history: [
            {
              _id: Types.ObjectId;
              id: string;
              text: string;
              author: {
                _id: string;
                id: string;
                name: string;
                lastName: string;
              };
              createdAt: Date;
            }
          ];
        }>({
          path: "history",
          select: "text author createdAt",
          //Here we make the sort in the populate because we want to sort the history inside each chat, no the chats
          options: { sort: { createdAt: 1 } },
          populate: {
            path: "author",
            select: "name lastName",
          },
        })
        .sort()
        .lean();

      const populatedChatHistoryWithOwn =
        chat?.history.map((comment) => {
          //First we remove the _id of the item
          const { _id, author, ...rest } = comment;
          //Secondly, we remove the _id of the author. We use an alias to differentiate it from the previous _id
          const { _id: authorId, ...sanitizedAuthor } = author;
          //We use the sanitized author to set the returnedAuthor
          const sanitizedComment = { ...rest, author: sanitizedAuthor };
          return {
            ...sanitizedComment,
            own: userId === comment.author._id.toString(),
            createdAt: comment.createdAt.toISOString(),
          };
        }) ?? [];

      return populatedChatHistoryWithOwn;
    } catch (error) {
      throw new NotFoundError("chat not found");
    }
  })();
};
