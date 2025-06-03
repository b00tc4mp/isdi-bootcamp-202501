import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import { updateVan } from "../service/updateVan";

export const updateVanHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;
    const { id } = req.params;
    const { vanInfo } = req.body;

    //the multerHandler will have added the multer files to the request
    const files = req.files as Express.Multer.File[];

    const parsedVanInfo = JSON.parse(vanInfo);

    return updateVan(userId, id, parsedVanInfo, files).then(() => {
      res.status(201).send();
    });
  }
);
