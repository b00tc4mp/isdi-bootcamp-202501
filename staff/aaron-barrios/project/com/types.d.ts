export type UserType = {
    id: string;
    name: string;
    lastName: string;
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
    type?: string;
    difficulty?: string;
    description: string;
    executionImages?: string[];
    status: "pending" | "accepted" | "declined";
    createdAt: Date;
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
export type EditWorkoutType = {
    name?: string;
    muscleGroup?: string;
    type?: string;
    difficulty?: string;
    description?: string;
    images?: string[];
};
