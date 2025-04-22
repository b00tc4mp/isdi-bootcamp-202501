import { object, z } from "zod"

//DEFAULT LAYER (WORKS IN TIME COMPILATION) THAT
//PREVENTS US TO MAKE AN API CALL IF THROWS AN ERROR
export const createWorkoutSchema = object({
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
        .max(300, 'Workout feed image must be at last 20 characters'),
    description: z
        .string()
        .min(5, 'Workout description must be at least 5 characters')
        .max(500, 'Workout description must be at last 500 characters')
})

export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>