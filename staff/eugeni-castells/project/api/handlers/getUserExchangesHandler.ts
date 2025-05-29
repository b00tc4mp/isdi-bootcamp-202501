import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getUserExchanges } from "../service";
import { AuthHandlerRequest } from "../middlewares/types";

export const getUserExchangesHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;

    return getUserExchanges(userId).then((exchanges) => {
      res.status(200).json(exchanges);
    });
  }
);
