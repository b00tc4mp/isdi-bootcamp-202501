import { Request } from "express";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
}

export type UserFromRequest = Omit<IUser, "id">;
