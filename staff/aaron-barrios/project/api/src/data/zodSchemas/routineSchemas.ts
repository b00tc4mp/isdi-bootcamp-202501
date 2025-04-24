import { object, z } from "zod"

//DEFAULT LAYER (WORKS IN TIME COMPILATION) THAT
//PREVENTS US TO MAKE AN API CALL IF THROWS AN ERROR
export const createRoutineSchema = object({
    //no pongo author porque el backend no lo necesita, lo calcula desde el token
    name: z
        .string()
        .min(3, 'Workout name must be at least 3 characters')
        .max(30, 'Workout name must be at last 30 characters'),
    muscleGroup: z.enum([
        "chest",
        "legs",
        "biceps",
        "triceps",
        "back",
        "shoulders",
        "buttocks"
    ]),
    feedImage: z
        .string()
        .min(30, 'Workout feed image must be at least 3 characters')
        .max(300, 'Workout feed image must be at most 20 characters'),
    description: z
        .string()
        .min(5, 'Workout description must be at least 5 characters')
        .max(500, 'Workout description must be at most 500 characters'),
    duration: z
        .number()
        .min(1, 'Workout duration must be at least 1 character')
        .max(4, 'Workout duration must be at most 4 characters'),
    workouts: z.array(
        z.object({
            name: z.string()
                .min(3, 'Workout name must be at least 3 characters')
                .max(30, 'Workout name must be at most 30 characters'),
            sets: z.number()
                .min(1, 'Sets must be at least 1 character')
                .max(3, 'Sets must be at most 3 character'),
            reps: z.number()
                .min(1, 'Reps must be at least 1 character')
                .max(3, 'Reps must be at most 3 character'),
            weight: z.number()
                .min(1, 'Weight must be at least 1 character')
                .max(3, 'Weight must be at most 3 character'),
            restTime: z.number()
                .min(1, 'Rest time must be at least 1 character')
                .max(3, 'Rest time must be at most 3 character'),
        })
    )
})

export type CreateRoutineInput = z.infer<typeof createRoutineSchema>