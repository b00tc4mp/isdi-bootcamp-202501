import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import { registerUser } from "../service";

export const registerUserHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { name, username, email, password, city, address, country, point } =
      req.body;

    return registerUser({
      name,
      username,
      email,
      password,
      city,
      country,
      point,
      address,
    }).then(() => {
      res.status(201).send();
    });
  }
);
