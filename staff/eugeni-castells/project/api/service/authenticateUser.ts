import { validate, errors } from "com";
import { User } from "../data";
import { CredentialsError, NotFoundError } from "com/errors";
import bcrypt from "bcryptjs";
import { AuthUserType } from "./types";
const { SystemError } = errors;

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

      if (!user) throw new NotFoundError("user not found");

      isUserMatched = await bcrypt.compare(password, user.password);

      if (!isUserMatched) throw new CredentialsError("wrong credentials");
    } catch (error) {
      console.error(error);

      throw new SystemError((error as Error).message);
    }

    return { id: user._id.toString(), role: user.role };
  })();
};
