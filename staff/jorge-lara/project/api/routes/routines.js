import { Router } from 'express';
import { authHandler, jsonBodyParser, withErrorHandling } from '../handler/index.js';
import { logic } from '../logic/index.js';

export const routines = Router();

routines.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req;

    const { title, description, duration, difficulty, category, type, exercises, startDate, endDate } = req.body;

    return logic.createRoutine(userId, title, description, duration, difficulty, category, type, exercises, startDate, endDate)
        .then(() => res.status(201).send())
}))

routines.get('/', authHandler, withErrorHandling((req, res) => {
    const { userId } = req;

    return logic.getRoutines(userId)
        .then(routines => res.json(routines))
}))

routines.patch('/:routinesId/edit', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req;

    const { routinesId } = req.params;

    const { updateFields } = req.body;

    return logic.updateRoutine(userId, routinesId, updateFields)
        .then(() => res.status(204).send())
}))

routines.delete('/:routineId', authHandler, withErrorHandling((req, res) => {
    const { userId } = req;

    const { routineId } = req.params;

    return logic.deleteRoutine(userId, routineId)
        .then(() => res.status(204).send())
}))