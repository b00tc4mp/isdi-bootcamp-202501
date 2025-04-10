import { ObjectId } from "mongoose"


// --- TYPES DE LOS DATOS DE NEGOCIO (SERVICIO)
export interface UserType {
    id: string
    name: string
    lastName: string
    email: string
    alias: string
    level?: string
    interests?: string[]
    createdAt: Date
}

export interface WorkoutType {
    id: string            // => añado los ids para interacciones clave o navegaciones
    name: string
    muscleGroup: string
    type: string
    difficulty: string
    description: string
    images: string[]
    status: 'pending' | 'accepted' | 'declined'
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

export interface editWorkoutType {
    name?: string
    muscleGroup?: string
    type?: string
    difficulty?: string
    description?: string
    images?: string[]
}
