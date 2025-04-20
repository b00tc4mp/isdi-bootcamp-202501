import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { registerUser } from "../service";
import { NewUserInfo } from "../service/types";

type CustomRegisterUserRequest<T> = {
  body: T;
};

export const registerUserHandler = createFunctionalHandler(
  (req: CustomRegisterUserRequest<NewUserInfo>, res: Response) => {
    const {
      name,
      lastName,
      email,
      password,
      city,
      address,
      country,
      coordinates,
    } = req.body;

    return registerUser({
      name,
      lastName,
      email,
      password,
      city,
      country,
      coordinates,
      address,
    }).then(() => {
      res.status(201).send();
    });
  }
);
