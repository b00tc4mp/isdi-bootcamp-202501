import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getUserName } from "../service";
import { AuthHandlerRequest } from "../middlewares/types";
import { ReturnedFullName } from "../service/types";

export const getUserNameHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;

    return getUserName(userId).then((fullName: ReturnedFullName) => {
      res.json(fullName);
    });
  }
);
