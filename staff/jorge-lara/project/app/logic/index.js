import { getUserUsername } from "./user/getUserUsername.js";
import { isUserLoggedIn } from "./user/isUserLoggedIn.js";
import { loginUser } from "./user/loginUser.js";
import { logoutUser } from "./user/logoutUser.js";
import { registerUser } from "./user/registerUser.js";
import { createExercise } from './exercises/createExercise.js';
import { getExercises } from './exercises/getExercises.js';
import { deleteExercise } from './exercises/deleteExercise.js';
import { updateExercise } from './exercises/updateExercise.js';
import { getRoutines } from './routines/getRoutines.js';
import { createRoutine } from "./routines/createRoutine.js";
import { deleteRoutine } from "./routines/deleteRoutine.js";
import { updateRoutine } from './routines/updateRoutine.js';
import { getCurrentRoutines } from "./routines/getCurrentRoutines.js";
import { getNextRoutine } from "./routines/getNextRoutine.js";
import { getPastRoutine } from "./routines/getPastRoutine.js";

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
    deleteRoutine,
    updateRoutine,
    getCurrentRoutines,
    getNextRoutine,
    getPastRoutine
}