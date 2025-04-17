import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthHandlerRequest } from "./types";

const { JWT_SECRET } = process.env;

const authHandler = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    const token = authorization!.slice(7);

    const payload = jwt.verify(token, JWT_SECRET!) as unknown as {
      sub: string;
      role: string;
    };
    (req as AuthHandlerRequest).userId = payload.sub as string;

    next();
  } catch (error) {
    next(error);
  }
};

export default authHandler;
