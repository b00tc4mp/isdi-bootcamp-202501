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
    type?: string
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
    type?: string
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
    muscleGroup?: string
    feedImage?: string
    type?: string
    difficulty?: string
    description?: string
    executionImages?: string[]
}