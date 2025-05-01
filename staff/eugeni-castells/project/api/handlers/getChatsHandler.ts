import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getChats } from "../service/getChats";
import { AuthHandlerRequest } from "../middlewares/types";

export const getChatsHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;

    return getChats(userId).then((chats) => {
      res.status(200).json(chats);
    });
  }
);
