export type UserType = {
    id: string;
    name?: string;
    lastName?: string;
    email: string;
    alias: string;
    level?: string;
    interests?: string[];
    createdAt: Date;
};
export type AuthUserType = {
    id: string;
    role: string;
};
export type TokenPayload = {
    sub: {
        id: string;
        role: string;
    };
};
export type WorkoutType = {
    id: string;
    name: string;
    muscleGroup: "chest" | "legs" | "biceps" | "triceps" | "back" | "shoulders" | "buttocks";
    feedImage: string;
    type?: "cardio" | "strength" | "mobility" | "endurance";
    difficulty?: string;
    description: string;
    executionImages?: string[];
    status: "pending" | "accepted" | "declined";
    createdAt: Date;
    modifiedAt?: Date;
    author: {
        id: string;
        alias: string;
        level?: string;
        role?: "anonym" | "regular" | "mod" | "default";
    };
    likesCount: number;
    savesCount: number;
    likedByMe?: boolean;
    savedByMe?: boolean;
    ownedByMe?: boolean;
};
export type RoutineWorkoutType = {
    workout: WorkoutType;
    order: number;
    sets: number;
    reps: number;
    time?: number;
    weight: number;
    restTime: number;
};
export type RoutineType = {
    id: string;
    name: string;
    muscleGroup: "chest" | "legs" | "biceps" | "triceps" | "back" | "shoulders" | "buttocks";
    feedImage: string;
    type?: string;
    difficulty?: string;
    description: string;
    duration: Number;
    status: "pending" | "accepted" | "declined";
    createdAt: Date;
    modifiedAt?: Date;
    author: {
        id: string;
        alias: string;
        role?: "anonym" | "regular" | "mod" | "default";
    };
    workouts: RoutineWorkoutType[];
    likesCount: number;
    savesCount: number;
    likedByMe?: boolean;
    savedByMe?: boolean;
    ownedByMe?: boolean;
};
export type EditWorkoutType = {
    name?: string;
    muscleGroup?: "chest" | "back" | "biceps" | "triceps" | "shoulders" | "legs" | "buttocks";
    feedImage?: string;
    type?: "strength" | "cardio" | "mobility" | "endurance";
    difficulty?: string;
    description?: string;
    executionImages?: string[];
};
export type EditRoutineType = {
    name?: string;
    muscleGroup?: "chest" | "back" | "biceps" | "triceps" | "shoulders" | "legs" | "buttocks";
    feedImage?: string;
    difficulty?: string;
    description?: string;
    duration?: number;
    workouts?: {
        workoutId: string;
        order: number;
        sets: number;
        reps: number;
        weight: number;
        restTime: number;
        time?: number;
    }[];
};
export type CustomRoutineWorkoutType = {
    workout: WorkoutType;
    workoutId: string;
    order: number;
    sets: number;
    reps: number;
    weight: number;
    restTime: number;
    time?: number;
};
export type CustomRoutineType = {
    id: string;
    name: string;
    muscleGroup: "chest" | "legs" | "biceps" | "triceps" | "back" | "shoulders" | "buttocks";
    feedImage: string;
    description: string;
    duration: number;
    createdAt: Date;
    modifiedAt?: Date;
    author: {
        id: string;
        alias: string;
    };
    workouts: CustomRoutineWorkoutType[];
};
