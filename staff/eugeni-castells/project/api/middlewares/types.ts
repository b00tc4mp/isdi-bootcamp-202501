import { Response } from "express";
import { CustomRequestBody } from "../types";

export type AsyncHandler<T> = (
  req: CustomRequestBody<T>,
  res: Response
) => Promise<void>;
