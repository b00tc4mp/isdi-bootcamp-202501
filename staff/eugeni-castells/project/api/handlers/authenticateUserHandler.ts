import "dotenv/config";
import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createHandler";
import jwt from "jsonwebtoken";
import { authenticateUser } from "../service";

const { JWT_SECRET } = process.env;

export const authenticateUserHandler = createFunctionalHandler(
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    return authenticateUser(email, password).then((user) => {
      const payload = { sub: user.id, role: user.role };
      const token = jwt.sign(payload, JWT_SECRET!);

      res.json({ token });
    });
  }
);
