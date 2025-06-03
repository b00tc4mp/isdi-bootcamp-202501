import { Request, Response } from "express"

import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import { filterRoutines } from "../../services/routines"
import { WorkoutType } from "com/types"

const filterRoutinesHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { filter, muscleGroup } = req.query

        if (!["popular", "saved", "recent"].includes(filter as string)) {
            res.status(400).json({ error: "BadRequestError", message: "Invalid filter option" })
            return Promise.resolve();
        }

        return filterRoutines(
            userId,
            filter as "popular" | "saved" | "recent",
            muscleGroup as WorkoutType["muscleGroup"]
        )
            .then(routines => { res.status(200).json({ routines }) })
    }
)

export default filterRoutinesHandler