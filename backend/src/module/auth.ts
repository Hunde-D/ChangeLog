import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { CreateUser } from "./types";

// Hash Password
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
};
// Compare Password
export const comparePassword = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Create JWT (Json Web Token)
export const createJWT = (user: CreateUser) => {
  const token = JWT.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

// Protect Middleware to check if the user is authenticated
export const protect = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): void => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Not Authorized :(" });
    return;
  }

  const token = bearer.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No Token Found :(" });
    return;
  }
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    return;
  } catch (error) {
    res.status(401).json({ message: "Not Valid Token  :(" });
    return;
  }
};
