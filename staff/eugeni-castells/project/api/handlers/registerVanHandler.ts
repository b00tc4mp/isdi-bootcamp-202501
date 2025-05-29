import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { registerVan } from "../service/index";
import { AuthHandlerRequest } from "../middlewares/types";

export const registerVanHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;

    const { vanInfo } = req.body;

    //the multerHandler will have added the multer files to the request
    const files = req.files as Express.Multer.File[];

    const parsedVanInfo = JSON.parse(vanInfo);

    return registerVan(userId, parsedVanInfo, files).then(() => {
      res.status(201).send();
    });
  }
);
