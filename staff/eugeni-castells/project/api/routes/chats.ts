import { Router } from "express";
import authHandler from "../middlewares/authHandler";
import { jsonBodyParser } from "../middlewares/jsonBodyParser";
import { sendMessageHandler } from "../handlers/sendMessageHandler";
import { getChatsHandler } from "../handlers/getChatsHandler";
import { getChatMessagesHandler } from "../handlers/getChatMessagesHandler";
export const chatRouter = Router();

chatRouter.post("/:chatId", jsonBodyParser, authHandler, sendMessageHandler);

chatRouter.get("/", authHandler, getChatsHandler);

chatRouter.get("/:chatId", authHandler, getChatMessagesHandler);
