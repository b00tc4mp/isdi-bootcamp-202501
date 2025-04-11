import { Request, Response } from "express";
import createFunctionalHandler from "../middlewares/createFunctionalHandler";
import services from "../services";

const registerUserHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const { name, lastName, alias, email, level, password } = req.body;

        return services.registerUser(name, lastName, alias, email, level, password).then(() => {
            res.status(201).send();
        });
    }
);

export default registerUserHandler
