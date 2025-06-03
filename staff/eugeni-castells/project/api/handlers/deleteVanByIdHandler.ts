import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import { deleteVanById } from "../service/deleteVanById";

export const deleteVanByIdHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req as AuthHandlerRequest;

    return deleteVanById(userId, id).then(() => {
      res.status(200).send();
    });
  }
);
