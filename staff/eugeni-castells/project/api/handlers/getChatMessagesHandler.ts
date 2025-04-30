import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import { getChatMessages } from "../service/getChatMessages";

export const getChatMessagesHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;
    const { chatId } = req.params;

    return getChatMessages(userId, chatId).then((chats) => {
      res.status(200).json(chats);
    });
  }
);
