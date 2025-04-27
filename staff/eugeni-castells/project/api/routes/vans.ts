import { Router } from "express";
import authHandler from "../middlewares/authHandler";
import { getVansHandler } from "../handlers/getVansHandler";
import { getVanByIdHandler } from "../handlers/getVanByIdHandler";

export const vanRouter = Router();

vanRouter.get("/", authHandler, getVansHandler);

vanRouter.get("/:id", authHandler, getVanByIdHandler);
