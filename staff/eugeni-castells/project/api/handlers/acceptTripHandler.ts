import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import { acceptTripRequest } from "../service/acceptTripRequest";

export const acceptTripHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { tripId } = req.params;
    const { userId } = req as AuthHandlerRequest;

    return acceptTripRequest(userId, tripId).then(() => {
      res.status(200).send();
    });
  }
);
