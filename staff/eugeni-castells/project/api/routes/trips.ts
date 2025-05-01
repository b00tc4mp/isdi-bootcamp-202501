import { Router } from "express";
import authHandler from "../middlewares/authHandler";
import { acceptTripHandler } from "../handlers/acceptTripHandler";

export const tripRouter = Router();

tripRouter.patch("/:tripId/accept", authHandler, acceptTripHandler);
