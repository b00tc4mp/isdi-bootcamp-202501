import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "./types";

const createFunctionalHandler = (callback: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (callback !== undefined) {
      return callback(req, res).catch(next);
    }
  };
};

export default createFunctionalHandler;
