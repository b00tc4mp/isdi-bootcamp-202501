import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import { getVans } from "../service/index";

export const getVansHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;

    return getVans(userId).then((vans) => {
      res.json(vans);
    });
  }
);
