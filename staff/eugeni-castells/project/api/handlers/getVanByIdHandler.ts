import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getVanById } from "../service/getVanById";

export const getVanByIdHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { id } = req.params;

    return getVanById(id).then((van) => {
      res.status(200).json(van);
    });
  }
);
