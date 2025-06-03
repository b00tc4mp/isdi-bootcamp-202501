import { validate, errors } from "com";
import { User } from "../data";
import bcrypt from "bcryptjs";
import { AuthUserType } from "./types";
const { SystemError, NotFoundError, CredentialsError } = errors;

export const authenticateUser = (
  email: string,
  password: string
): Promise<AuthUserType> => {
  validate.email(email, "authenticate email");
  validate.password(password, "authenticate password");

  let user;
  let isUserMatched;

  return (async () => {
    try {
      user = await User.findOne({ email }).lean();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!user) throw new NotFoundError("user not found");

    try {
      isUserMatched = await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (!isUserMatched) throw new CredentialsError("wrong credentials");

    return { id: user._id.toString(), role: user.role };
  })();
};
