import { data } from "../data/index.js";
import { errors } from 'com';

export const createExercise = (name, muscleCategory, sets, reps, restTime) => {
    const { token } = data;

    return fetch(`${import.meta.env.VITE_API_URL}/exercises`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, muscleCategory, sets, reps, restTime })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) {
                return;
            }

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                })
        })
}