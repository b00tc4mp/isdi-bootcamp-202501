import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { generateTripRequest } from "../service";
import { AuthHandlerRequest } from "../middlewares/types";

export const generateTripRequestHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { id } = req.params;
    const { tripInfo } = req.body;
    const { userId } = req as AuthHandlerRequest;

    tripInfo.selectedDates.startDate = new Date(
      tripInfo.selectedDates.startDate
    );
    tripInfo.selectedDates.endDate = new Date(tripInfo.selectedDates.endDate);

    return generateTripRequest(userId, id, tripInfo).then(() => {
      res.status(200).send();
    });
  }
);
