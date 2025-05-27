import { Router } from "express";
import { authHandler, jsonBodyParser, withErrorHandling } from "../handler/index.js";
import { logic } from "../logic/index.js";

export const exercises = Router();

exercises.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req;

    const { name, muscleCategory, sets, reps, restTime } = req.body;

    return logic.createExercise(userId, name, muscleCategory, sets, reps, restTime)
        .then(() => res.status(201).send())
}))

exercises.get('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req;

    return logic.getExercises(userId)
        .then(exercise => res.json(exercise))
}))

exercises.patch('/:exerciseId/edit', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req;

    const { exerciseId } = req.params;

    const { updateFields } = req.body;

    return logic.updateExercise(userId, exerciseId, updateFields)
        .then(() => res.status(204).send())
}))

exercises.delete('/:exerciseId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req;

    const { exerciseId } = req.params;

    return logic.deleteExercise(userId, exerciseId)
        .then(() => res.status(204).send())
}))