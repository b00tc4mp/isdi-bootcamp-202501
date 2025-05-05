import { Router } from "express";
import authHandler from "../middlewares/authHandler";
import { getVansHandler } from "../handlers/getVansHandler";
import { getVanByIdHandler } from "../handlers/getVanByIdHandler";
import { jsonBodyParser } from "../middlewares/jsonBodyParser";
import { generateTripRequestHandler } from "../handlers/generateTripRequestHandler";
import { getVanReviewsHandler } from "../handlers/getVanReviewsHandler";
export const vanRouter = Router();

vanRouter.get("/", authHandler, getVansHandler);

vanRouter.get("/:id", authHandler, getVanByIdHandler);

vanRouter.get("/:id/reviews", authHandler, getVanReviewsHandler);

vanRouter.post(
  "/:id/trip-request",
  jsonBodyParser,
  authHandler,
  generateTripRequestHandler
);
