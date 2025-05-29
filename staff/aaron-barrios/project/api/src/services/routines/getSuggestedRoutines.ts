import { User, Routine } from "../../data"
import { errors, validate } from "com"
import { RoutineType } from "com/types"

const { NotFoundError, SystemError } = errors

const getSuggestedRoutines = (
    userId: string
): Promise<RoutineType[]> => {
    validate.id(userId)

    return Promise.all([
        User.findById(userId).lean(),
        Routine.find({ status: "accepted" })
            .select("-__v")
            .populate("author", "alias")
            .populate("workouts.workout")
            .lean()
    ])
        .catch((error) => { throw new SystemError(error.message) })
        .then(([user, routines]) => {
            if (!user) throw new NotFoundError("User not found!")

            let filteredRoutines: typeof routines = []

            //if interests
            if (user.interests?.length) {
                filteredRoutines = routines.filter(r =>
                    user.interests!.some(interest =>
                        r.goal && r.goal === interest
                    )
                )
            }

            //if no interests
            if (!filteredRoutines || filteredRoutines.length === 0) {
                filteredRoutines = [...routines]
                filteredRoutines.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
                filteredRoutines = filteredRoutines.slice(0, 10)
            }


            return filteredRoutines.map<RoutineType>((routine) => {
                let authorId = ""
                let authorAlias = "default"

                if (routine.author && typeof routine.author === "object" && "_id" in routine.author && "alias" in routine.author) {
                    const author = routine.author as { _id: any; alias: string }
                    authorId = author._id.toString()
                    authorAlias = author.alias
                }


                return {
                    id: routine._id.toString(),
                    name: routine.name,
                    muscleGroup: routine.muscleGroup as RoutineType["muscleGroup"],
                    feedImage: routine.feedImage,
                    difficulty: routine.difficulty,
                    description: routine.description,
                    duration: routine.duration,
                    status: routine.status,
                    createdAt: routine.createdAt,
                    modifiedAt: routine.modifiedAt || undefined,
                    author: {
                        id: authorId,
                        alias: authorAlias,
                    },
                    likesCount: routine.likes?.length || 0,
                    savesCount: routine.saves?.length || 0,
                    likedByMe: routine.likes?.some(id => id.toString() === userId) || false,
                    savedByMe: routine.saves?.some(id => id.toString() === userId) || false,
                    workouts: (routine.workouts || []).map(workoutItem => {
                        const w = workoutItem.workout as any

                        return {
                            workout: {
                                id: w._id.toString(),
                                name: w.name,
                                muscleGroup: w.muscleGroup,
                                feedImage: w.feedImage,
                                description: w.description,
                                difficulty: w.difficulty,
                                type: w.type,
                                createdAt: w.createdAt,
                                status: w.status,
                                author: {
                                    id: w.author?._id?.toString() || "",
                                    alias: w.author?.alias || "",
                                    level: w.author?.level,
                                    role: w.author?.role
                                },
                                likesCount: w.likes?.length || 0,
                                savesCount: w.saves?.length || 0
                            },
                            order: workoutItem.order ?? 0,
                            sets: workoutItem.sets ?? 0,
                            reps: workoutItem.reps ?? 0,
                            weight: workoutItem.weight ?? 0,
                            restTime: workoutItem.restTime ?? 0,
                            time: workoutItem.time || 0
                        }
                    })
                }
            })
        })
}

export default getSuggestedRoutines