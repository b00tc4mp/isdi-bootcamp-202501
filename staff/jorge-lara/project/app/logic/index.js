import { getUserUsername } from "./getUserUsername";
import { isUserLoggedIn } from "./isUserLoggedIn";
import { loginUser } from "./loginUser";
import { logoutUser } from "./logoutUser";
import { registerUser } from "./registerUser";
import { createExercise } from './createExercise.js';
import { getExercises } from './getExercises.js';
import { deleteExercise } from './deleteExercise.js';
import { updateExercise } from './updateExercise.js';
import { getRoutines } from './getRoutines.js';
import { createRoutine } from "./createRoutine.js";
import { deleteRoutine } from "./deleteRoutine.js";

export const logic = {
    registerUser,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    getUserUsername,

    createExercise,
    getExercises,
    deleteExercise,
    updateExercise,

    getRoutines,
    createRoutine,
    deleteRoutine
}