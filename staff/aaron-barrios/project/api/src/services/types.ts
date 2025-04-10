import { ObjectId } from "mongoose"


// --- TYPES DE LOS DATOS DE NEGOCIO (SERVICIO)
export interface UserType {
    id: ObjectId
    name: string
    lastName: string
    email: string
    alias: string
    level?: string
    interests?: string[]
    createdAt: Date,
    modifiedAt: Date
}