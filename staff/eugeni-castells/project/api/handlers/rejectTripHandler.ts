import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import { rejectTripRequest } from "../service/rejectTripRequest";

export const rejectTripHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { tripId } = req.params;
    const { userId } = req as AuthHandlerRequest;

    return rejectTripRequest(userId, tripId).then(() => {
      res.status(200).send();
    });
  }
);
