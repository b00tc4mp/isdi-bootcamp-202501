import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getUserExchanges } from "../service";

export const getUserExchangesHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { id } = req.params;

    return getUserExchanges(id).then((exchanges) => {
      res.status(200).json(exchanges);
    });
  }
);
