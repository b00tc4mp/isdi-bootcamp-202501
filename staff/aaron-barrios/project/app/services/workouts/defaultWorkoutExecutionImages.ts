const defaultWorkoutExecutionImages: Record<string, any[]> = {
    //se usa any[] porque require() devuelve un objeto dinámico que no es un string directo. Por tanto si uso string[], dará error.
    chest: [
        require("@/assets/muscleGroups/chest/chest_1.jpg"),
        require("@/assets/muscleGroups/chest/chest_2.png"),
    ],
    // back: [
    //     require("@/assets/muscleGroups/back/chest_2.png"),
    //     require("@/assets/muscleGroups/back/chest_2.png"),
    // ],
    // legs: [
    //     require("@/assets/muscleGroups/legs/chest_2.png"),
    //     require("@/assets/muscleGroups/legs/chest_2.png"),
    // ],
    // arms: [
    //     require("@/assets/muscleGroups/arms/chest_2.png"),
    //     require("@/assets/muscleGroups/arms/chest_2.png"),
    // ],
    // buttocks: [
    //     require("@/assets/muscleGroups/buttocks/chest_2.png"),
    //     require("@/assets/muscleGroups/buttocks/chest_2.png"),
    // ],
}

export default defaultWorkoutExecutionImages