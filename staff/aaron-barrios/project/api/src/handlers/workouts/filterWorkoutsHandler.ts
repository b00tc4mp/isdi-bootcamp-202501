import { Request, Response } from "express"
import { createFunctionalHandler } from "../../middlewares"
import { AuthHandlerRequest } from "../../middlewares/types"
import filterWorkouts from "../../services/workout/filterWorkouts"
import { WorkoutType } from "com/types"

const filterWorkoutsHandler = createFunctionalHandler(
    (req: Request, res: Response) => {
        const userId = (req as AuthHandlerRequest).userId
        const { filter, muscleGroup } = req.query

        if (!["popular", "saved", "recent"].includes(filter as string)) {
            res.status(400).json({ error: "BadRequestError", message: "Invalid filter option" })
            return Promise.resolve();
        }

        return filterWorkouts(
            userId,
            filter as "popular" | "saved" | "recent",
            muscleGroup as WorkoutType["muscleGroup"]
        )
            .then(workouts => { res.status(200).json({ workouts }) })
    }
)

export default filterWorkoutsHandler