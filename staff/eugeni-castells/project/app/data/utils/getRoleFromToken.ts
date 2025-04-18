import { jwtDecode } from "jwt-decode";
import { data } from "..";
import { SystemError } from "@/com/errors";

type RoleFromToken = "regular" | "anonym" | "admin";

type JwtPayload = {
  sub: string;
  role: RoleFromToken;
  iat: number;
};

export const getRoleFromToken = async () => {
  try {
    const token = await data.getToken();

    const decoded = jwtDecode<JwtPayload>(token!);

    return decoded;
  } catch (error) {
    const err = error as Error;

    throw new SystemError(err.message);
  }
};
