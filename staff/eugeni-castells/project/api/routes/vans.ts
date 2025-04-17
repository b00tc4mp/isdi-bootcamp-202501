import { Router } from "express";
import authHandler from "../middlewares/authHandler";
import { getVansHandler } from "../handlers/getVansHandler";

export const vanRouter = Router();

vanRouter.get("/", authHandler, getVansHandler);
