import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getUserName } from "../service";
import { AuthHandlerRequest } from "../middlewares/types";
import { ReturnedAllUserInfo, ReturnedFullName } from "../service/types";
import { getAllUserInfo } from "../service/getAllUserInfo";

export const getAllUserInfoHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;

    return getAllUserInfo(userId).then((userInfo: ReturnedAllUserInfo) => {
      res.status(200).json(userInfo);
    });
  }
);
