import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { registerVan } from "../service/index";

export const registerVanHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId, vanInfo } = req.body;

    return registerVan(userId, vanInfo)?.then(() => {
      res.status(200).send();
    });
  }
);
