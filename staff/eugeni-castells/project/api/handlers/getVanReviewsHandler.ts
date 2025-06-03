import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { getVanReviews } from "../service/getVanReviews";
import { AuthHandlerRequest } from "../middlewares/types";

export const getVanReviewsHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { id } = req.params;

    const { userId } = req as AuthHandlerRequest;

    return getVanReviews(userId, id).then((van) => {
      res.status(200).json(van);
    });
  }
);
