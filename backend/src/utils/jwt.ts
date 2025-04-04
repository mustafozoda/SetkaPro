import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN, // can be string like '7d'
  } as jwt.SignOptions);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};
