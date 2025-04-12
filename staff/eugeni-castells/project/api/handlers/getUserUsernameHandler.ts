import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getUserUsername } from "../service";

export const getUserUsernameHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req.body;

    return getUserUsername(userId).then((username) => {
      res.json({ username });
    });
  }
);
