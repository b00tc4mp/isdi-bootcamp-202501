import { Workout } from "../../data"
import { errors } from "com"
import { WorkoutDocType } from "../../data/types"

const { NotFoundError } = errors

const getWorkoutById = (workoutId: string) => {
    // const workout: WorkoutDocType | null = Workout.getById(workoutId)

    // if (!workout) throw new NotFoundError('Workout not Found!')

    // console.log(workout)

    // return workout
}

export default getWorkoutById