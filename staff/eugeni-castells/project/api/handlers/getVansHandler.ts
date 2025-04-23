import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { AuthHandlerRequest } from "../middlewares/types";
import { getVans } from "../service/index";

export const getVansHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { userId } = req as AuthHandlerRequest;

    const { longitude, latitude, startDate, endDate, travellers } = req.query;

    let parsedLongitude = null;

    if (longitude) {
      parsedLongitude = JSON.parse(longitude as string);
    }

    let parsedLatitude = null;

    if (latitude) {
      parsedLatitude = JSON.parse(latitude as string);
    }

    const parsedLocation =
      longitude !== null && latitude !== null
        ? ([parsedLongitude, parsedLatitude] as [number, number])
        : null;

    let parsedStartDate: Date | null = null;

    if (startDate) {
      parsedStartDate = new Date(startDate as string);
    }

    let parsedEndDate: Date | null = null;

    if (startDate) {
      parsedEndDate = new Date(endDate as string);
    }
    const parsedDateRange = {
      start: parsedStartDate,
      end: parsedEndDate,
    };

    let parsedTravellers = null;

    if (travellers) {
      parsedTravellers = JSON.parse(travellers as string);
    }

    return getVans(
      userId,
      parsedLocation,
      parsedDateRange,
      parsedTravellers
    ).then((vans) => {
      res.json(vans);
    });
  }
);
