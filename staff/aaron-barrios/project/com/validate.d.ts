export declare const validate: {
    string(string: string, explain?: string): void;
    number(number: number, explain?: string): void;
    text(text: string, explain?: string): void;
    name(name: string, explain?: string): void;
    email(email: string, explain?: string): void;
    maxLength(value: string, maxLength: number, explain: string): void;
    minLength(value: string, minLength: number, explain: string): void;
    alias(alias: string, explain?: string): void;
    password(password: string, explain?: string): void;
    url(url: string, explain?: string): void;
    id(id: string, explain?: string): void;
    token(token: string, explain?: string): void;
    routineWorkouts(value: any[], minLength: number, explain?: string): void;
};
