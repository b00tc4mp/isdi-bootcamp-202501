import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import { sendMessage } from "../service/sendMessage";

export const sendMessageHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { userId } = req as AuthHandlerRequest;
    const { message } = req.body;

    return sendMessage(userId, chatId, message).then(() => {
      res.status(201).send();
    });
  }
);
