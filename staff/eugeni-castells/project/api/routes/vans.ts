import { Router } from "express";
import authHandler from "../middlewares/authHandler";
import { getVansHandler } from "../handlers/getVansHandler";
import { getVanByIdHandler } from "../handlers/getVanByIdHandler";
import { jsonBodyParser } from "../middlewares/jsonBodyParser";
import { generateTripRequestHandler } from "../handlers/generateTripRequestHandler";
export const vanRouter = Router();

vanRouter.get("/", authHandler, getVansHandler);

vanRouter.get("/:id", authHandler, getVanByIdHandler);

vanRouter.post(
  "/:id/trip-request",
  jsonBodyParser,
  authHandler,
  generateTripRequestHandler
);
