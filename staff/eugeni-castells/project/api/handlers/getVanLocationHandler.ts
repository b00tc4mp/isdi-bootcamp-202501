import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getVanLocation } from "../service/getVanLocation";

export const getVanLocationHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req.body;

    const { vanId } = req.params;

    return getVanLocation(userId, vanId).then((van) => {
      res.status(200).json({ van });
    });
  }
);
