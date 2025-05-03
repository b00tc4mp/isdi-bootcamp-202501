import { validate } from "com";
import { NotFoundError, SystemError } from "com/errors";
import { User } from "../data";
import { Types } from "mongoose";
import { ReturnedChat } from "./types";

export const getChats = (userId: string): Promise<ReturnedChat[]> => {
  validate.id(userId, "user id");

  return (async () => {
    let user;
    try {
      user = await User.findById(userId)
        .populate<{
          chats: {
            _id: Types.ObjectId;
            createdAt: Date;
            modifiedAt: Date | null;
            participants: {
              _id: Types.ObjectId;
              name: string;
              lastName: string;
              isUser: boolean;
            }[];
            history: {
              _id: Types.ObjectId;
              text: string;
              createdAt: Date;
              author: {
                _id: Types.ObjectId;
                name: string;
                lastName: string;
              };
              own?: boolean;
            }[];
          }[];
        }>({
          path: "chats",
          populate: [
            {
              path: "participants createdAt modifiedAt",
              select: "name lastName",
            },
            {
              path: "history",
              options: { sort: { createdAt: 1 } },
              populate: {
                path: "author",
                select: "name lastName",
              },
            },
          ],
        })
        .lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) {
      throw new NotFoundError("user not found");
    }

    user.chats.forEach((chat) => {
      chat.history.forEach((comment) => {
        comment.own = comment.author._id.toString() === userId;
      });
    });

    const returnedChats: ReturnedChat[] = user.chats.map((chat) => {
      const interlocutor = chat.participants.find(
        (p) => p._id.toString() !== userId
      );

      return {
        id: chat._id.toString(),
        participants: chat.participants.map((p) => ({
          id: p._id.toString(),
          name: p.name,
          lastName: p.lastName,
        })),
        interlocutor: {
          id: interlocutor!._id.toString(),
          name: interlocutor!.name,
          lastName: interlocutor!.lastName,
        },
        createdAt: chat.createdAt.toISOString(),
        modifiedAt:
          chat.modifiedAt === null ? null : chat.modifiedAt.toISOString(),
        history: chat.history.map((comment) => ({
          id: comment._id.toString(),
          text: comment.text,
          createdAt: comment.createdAt.toISOString(),
          author: {
            id: comment.author._id.toString(),
            name: comment.author.name,
            lastName: comment.author.lastName,
          },
          own: comment.author._id.toString() === userId,
        })),
      };
    });

    return returnedChats;
  })();
};
