import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const { JWT_SECRET } = process.env;

interface JwtPayloadWithSub extends jwt.JwtPayload {
  sub: string;
}

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authHandler = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or malformed");
    }

    const token = authorization.slice(7);

    const decoded = jwt.verify(
      token,
      JWT_SECRET as string
    ) as JwtPayloadWithSub;

    req.userId = decoded.sub;

    next();
  } catch (error) {
    next(error);
  }
};

export default authHandler;
