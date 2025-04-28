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
    duration: z.number()
        .min(1, 'Workout duration must be at least 1 minute')
        .max(999, 'Workout duration must be at most 999 minutes'),
    workouts: z.array(
        z.object({
            workout: z.string()
                .min(1, 'Workout ID is required'),
            sets: z.number()
                .min(1, 'Sets must be at least 1')
                .max(100, 'Sets must be at most 100'),
            reps: z.number()
                .min(1, 'Reps must be at least 1')
                .max(1000, 'Reps must be at most 1000'),
            weight: z.number()
                .min(0, 'Weight must be at least 0'), // puedes levantar 0kg si es solo movilidad
            restTime: z.number()
                .min(1, 'Rest time must be at least 1 second')
                .max(600, 'Rest time must be at most 600 seconds'),
            order: z.number()
                .min(1, 'Order must be at least 1')
                .max(100, 'Order must be at most 100')
        })
    )
})

export type CreateRoutineInput = z.infer<typeof createRoutineSchema>