"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultWorkoutExecutionImages = {
    //se usa any[] porque require() devuelve un objeto dinámico que no es un string directo. Por tanto si uso string[], dará error.
    chest: [
        require("@/assets/muscleGroups/chest/chest_1.png"),
        require("@/assets/muscleGroups/chest/chest_2.png"),
    ],
    back: [
        require("@/assets/muscleGroups/back/back_1.png"),
        require("@/assets/muscleGroups/back/back_2.png"),
    ],
    legs: [
        require("@/assets/muscleGroups/legs/leg_1.png"),
        require("@/assets/muscleGroups/legs/leg_2.png"),
    ],
    biceps: [
        require("@/assets/muscleGroups/biceps/biceps_1.png"),
        require("@/assets/muscleGroups/biceps/biceps_2.png"),
    ],
    triceps: [
        require("@/assets/muscleGroups/triceps/triceps_1.png"),
        require("@/assets/muscleGroups/triceps/triceps_2.png"),
    ],
    buttocks: [
        require("@/assets/muscleGroups/buttocks/buttocks_2.png"),
        require("@/assets/muscleGroups/buttocks/buttocks_2.png"),
    ],
    shoulders: [
        require("@/assets/muscleGroups/shoulders/shoulder_2.png"),
        require("@/assets/muscleGroups/shoulders/shoulder_2.png"),
    ]
};
exports.default = defaultWorkoutExecutionImages;
