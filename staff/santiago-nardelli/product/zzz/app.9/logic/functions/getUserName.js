import { NotFoundError } from '../../errors/errors.js';
import { data } from "../../data/data.js";

export const getUserName=()=> {
    const users = data.users.getAll();

    const { userId } = data;

    const found = data.users.getById(userId);

    if (!found) throw new NotFoundError("user not found");

    return found.name;
  }