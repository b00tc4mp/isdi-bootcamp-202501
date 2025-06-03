import { Routine, User } from "../../data"
import { validate, errors } from "com"
import { EditRoutineType } from "com/types"

const { NotFoundError, OwnershipError, StatusError, SystemError, ValidationError } = errors

const editRoutine = (
    userId: string,
    routineId: string,
    updates: EditRoutineType
): Promise<void> => {
    validate.id(userId)
    validate.id(routineId)

    if (updates.name) validate.name(updates.name)
    if (updates.muscleGroup) validate.text(updates.muscleGroup)
    if (updates.feedImage) validate.url(updates.feedImage)
    if (updates.difficulty) validate.text(updates.difficulty)
    if (updates.description) validate.text(updates.description)
    if (updates.duration) validate.number(updates.duration)

    return Promise.all([
        User.findById(userId),
        Routine.findById(routineId),
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, routine]) => {
            if (!user) throw new NotFoundError("User not found!")
            if (!routine) throw new NotFoundError("Routine not found!")

            if (routine.author.toString() !== userId)
                throw new OwnershipError("You are not the owner of this routine.")

            if (routine.status !== "pending")
                throw new StatusError("Only pending routines can be edited.")

            Object.assign(routine, updates)


            //asigno las propiedades correctamente al documento Routine 
            //para luego al guardarlo (save) que persistan los cambios
            routine.modifiedAt = new Date()

            return routine.save()
                .catch(error => {
                    // Si es error de mongoose por schema
                    if (error.name === "ValidationError") {
                        throw new ValidationError(error.message)
                    }

                    throw new SystemError(error.message)
                })
        })
        .then(() => { })
}

export default editRoutine