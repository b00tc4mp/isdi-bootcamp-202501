import { Request, Response } from "express"

import { createFunctionalHandler } from "../../../middlewares"
import { AuthHandlerRequest } from "../../../middlewares/types"
import { getMyWorkouts } from "../../../services/user/regular"

const getMyWorkoutsHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId

        return getMyWorkouts(userId)
            .then(workouts => { res.status(200).json(workouts) })
    }
)

export default getMyWorkoutsHandler