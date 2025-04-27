import { Routine, User } from "../../data"
import { validate, errors } from "com"
import { RoutineType } from "com/types"

import { ObjectId } from "mongoose"

const { SystemError, NotFoundError } = errors

const getRoutineById = (
    workoutId: string,
    userId?: string //opcional, para marcar liked/saved si estás logueado (puedes entrar modo anonimo)
): Promise<RoutineType> => {
    validate.id(workoutId)
    if (userId) validate.id(userId)

    return Promise.all([
        userId ? User.findById(userId).lean() : Promise.resolve(null),
        Routine.findById(workoutId)
            .select("-__v")
            .populate("author", "alias level")
            .populate("workouts.workout")
            .lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!routine) throw new NotFoundError("routine not found!")

            const author = routine.author as unknown as { _id: ObjectId, alias: string }

            const routineDTO: RoutineType = {
                id: routine._id.toString(),
                name: routine.name,
                muscleGroup: routine.muscleGroup as RoutineType["muscleGroup"],
                feedImage: routine.feedImage,
                difficulty: routine.difficulty,
                description: routine.description,
                duration: routine.duration,
                status: routine.status,
                createdAt: routine.createdAt,
                author: {
                    id: author._id.toString(),
                    alias: author.alias,
                },
                likesCount: routine.likes?.length || 0,
                savesCount: routine.saves?.length || 0,
                likedByMe: user ? routine.likes?.some((id: any) => id.toString() === userId) || false : false,
                savedByMe: user ? routine.saves?.some((id: any) => id.toString() === userId) || false : false,
                workouts: (routine.workouts || []).map(routineWorkout => {
                    const workout = routineWorkout.workout as any

                    return {
                        workout: {
                            id: workout?._id?.toString() || "",
                            name: workout?.name || "name",
                            muscleGroup: workout?.muscleGroup || "chest",
                            feedImage: workout?.feedImage || "",
                            description: workout?.description || "",
                            type: workout?.type || "strength",
                            difficulty: workout?.difficulty || "easy",
                            status: workout?.status || "accepted",
                            createdAt: workout?.createdAt || new Date(),
                            author: {
                                id: workout?.author?._id?.toString() || "",
                                alias: workout?.author?.alias || ""
                            },
                            likesCount: Array.isArray(workout?.likes) ? workout.likes.length : 0,
                            savesCount: Array.isArray(workout?.saves) ? workout.saves.length : 0
                        },
                        order: routineWorkout.order || 0,
                        sets: routineWorkout.sets || 0,
                        reps: routineWorkout.reps || 0,
                        weight: routineWorkout.weight || 0,
                        restTime: routineWorkout.restTime || 0,
                        time: routineWorkout.time || 0
                    }
                })
            }

            return routineDTO
        })
}

export default getRoutineById