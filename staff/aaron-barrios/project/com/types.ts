// --- TYPES DE LOS DATOS DE NEGOCIO (SERVICIO)
export type UserType = {
    id: string
    name?: string
    lastName?: string
    email: string
    alias: string
    level?: string
    interests?: string[]
    createdAt: Date
}

export type AuthUserType = {
    id: string
    role: string
}

export type TokenPayload = {
    sub: {
        id: string
        role: string
    }
}

export type WorkoutType = {
    id: string            // => añado los ids para interacciones clave o navegaciones
    name: string
    muscleGroup: "chest" | "legs" | "biceps" | "triceps" | "back" | "shoulders" | "buttocks"
    feedImage: string
    type?: "cardio" | "strength" | "mobility" | "endurance"
    difficulty?: string
    description: string
    executionImages?: string[]
    status: "pending" | "accepted" | "declined"
    createdAt: Date
    modifiedAt?: Date

    author: {
        id: string
        alias: string
        level?: string
        role?: "anonym" | "regular" | "mod" | "default"
    }

    // interacciones para mostrar en frontend
    likesCount: number
    savesCount: number
    likedByMe?: boolean   // => si el usuario actual ha dado like
    savedByMe?: boolean   // => si el usuario actual lo ha guardado
    ownedByMe?: boolean   // => si el usuario actual lo ha creado
}

export type RoutineWorkoutType = {
    workout: WorkoutType
    order: number
    sets: number
    reps: number
    time?: number
    weight: number
    restTime: number
}

export type RoutineType = {
    id: string            // => añado los ids para interacciones clave o navegaciones
    name: string
    muscleGroup: "chest" | "legs" | "biceps" | "triceps" | "back" | "shoulders" | "buttocks"
    feedImage: string
    goal?: string
    difficulty?: string
    description: string
    duration: Number
    status: "pending" | "accepted" | "declined"
    createdAt: Date
    modifiedAt?: Date

    author: {
        id: string
        alias: string
        role?: "anonym" | "regular" | "mod" | "default"
    }

    workouts: RoutineWorkoutType[],

    // interacciones para mostrar en frontend
    likesCount: number
    savesCount: number
    likedByMe?: boolean   // => si el usuario actual ha dado like
    savedByMe?: boolean   // => si el usuario actual lo ha guardado
    ownedByMe?: boolean   // => si el usuario actual lo ha creado
}

export type EditWorkoutType = { //RORO pattern (used when there are variable parameters)
    name?: string
    muscleGroup?: "chest" | "back" | "biceps" | "triceps" | "shoulders" | "legs" | "buttocks"
    feedImage?: string
    type?: "strength" | "cardio" | "mobility" | "endurance"
    difficulty?: string
    description?: string
    executionImages?: string[]
}

export type EditRoutineType = { //RORO pattern (used when there are variable parameters)
    name?: string
    muscleGroup?: "chest" | "back" | "biceps" | "triceps" | "shoulders" | "legs" | "buttocks"
    feedImage?: string
    difficulty?: string
    description?: string
    duration?: number
    workouts?: {
        workoutId: string
        order: number
        sets: number
        reps: number
        weight: number
        restTime: number
        time?: number
    }[]
}

export type CustomRoutineWorkoutType = {
    workout: WorkoutType
    workoutId: string
    order: number
    sets: number
    reps: number
    weight: number
    restTime: number
    time?: number
}

export type CustomRoutineType = {
    id: string
    originalRoutineId: string
    name: string
    muscleGroup: "chest" | "legs" | "biceps" | "triceps" | "back" | "shoulders" | "buttocks"
    feedImage: string
    description: string
    duration: number
    createdAt: Date
    modifiedAt?: Date
    author: {
        id: string
        alias: string
    }
    workouts: CustomRoutineWorkoutType[]
}

export type UpdateCustomRoutineType = {
    workouts: Array<{
        workoutId: string
        sets: number
        reps: number
        weight: number
        restTime: number
        order: number
        time?: number
    }>
}