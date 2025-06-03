import { Router } from "express";
import authHandler from "../middlewares/authHandler";
import { acceptTripHandler } from "../handlers/acceptTripHandler";
import { rejectTripHandler } from "../handlers/rejectTripHandler";

export const tripRouter = Router();

tripRouter.patch("/:tripId/accept", authHandler, acceptTripHandler);

tripRouter.patch("/:tripId/reject", authHandler, rejectTripHandler);
