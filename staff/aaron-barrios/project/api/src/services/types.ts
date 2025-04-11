import { ObjectId } from "mongoose"


// --- TYPES DE LOS DATOS DE NEGOCIO (SERVICIO)
export type UserType = {
    id: string
    name: string
    lastName: string
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

export type WorkoutType = {
    id: string            // => añado los ids para interacciones clave o navegaciones
    name: string
    muscleGroup: string
    type: string
    difficulty: string
    description: string
    images: string[]
    status: "pending" | "accepted" | "declined"
    createdAt: Date

    author: {
        id: string
        alias: string
        level?: string
    }

    // interacciones para mostrar en frontend
    likesCount: number
    savesCount: number
    likedByMe?: boolean   // => si el usuario actual ha dado like
    savedByMe?: boolean   // => si el usuario actual lo ha guardado
}

export type EditWorkoutType = { //RORO pattern (used when there are variable parameters)
    name?: string
    muscleGroup?: string
    type?: string
    difficulty?: string
    description?: string
    images?: string[]
}

