import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { JwtPayload } from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAuthenticated = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ errors: "token is missing!" });
  }

  const token = authorization.replace("Bearer", "").trim();

  verifyToken(token)
    .then((data) => {
      req.user = data;
      next();
    })
    .catch(() => {
      return res.status(401).json({ errors: "invalid token!" });
    });
};
