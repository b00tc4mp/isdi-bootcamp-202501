import { Workout, User } from "../../data"
import { validate, errors } from "com"
import { WorkoutType } from "../types"
import { ObjectId } from "mongoose"

const { SystemError, NotFoundError } = errors

const getWorkoutById = (
    workoutId: string,
    userId?: string //opcional, para marcar liked/saved si estás logueado (puedes entrar modo anonimo)
): Promise<WorkoutType> => {
    validate.id(workoutId)
    if (userId) validate.id(userId)

    return Promise.all([
        userId ? User.findById(userId).lean() : Promise.resolve(null),
        Workout.findById(workoutId)
            .select("-__v")
            .populate("author", "alias level")
            .lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, workout]) => {
            if (!workout) throw new NotFoundError("Workout not found!")

            const author = workout.author as unknown as { _id: ObjectId, alias: string, level?: string }

            const workoutDTO: WorkoutType = {
                id: workout._id.toString(),
                name: workout.name,
                muscleGroup: workout.muscleGroup,
                type: workout.type,
                difficulty: workout.difficulty,
                description: workout.description,
                images: workout.images,
                status: workout.status,
                createdAt: workout.createdAt,
                author: {
                    id: author._id.toString(),
                    alias: author.alias,
                    level: author.level
                },
                likesCount: workout.likes?.length || 0,
                savesCount: workout.saves?.length || 0,
                likedByMe: user ? workout.likes?.some((id: any) => id.toString() === userId) || false : false,
                savedByMe: user ? workout.saves?.some((id: any) => id.toString() === userId) || false : false
            }

            return workoutDTO
        })
}

export default getWorkoutById
