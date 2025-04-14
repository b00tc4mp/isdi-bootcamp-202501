import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validationHandler = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
};
