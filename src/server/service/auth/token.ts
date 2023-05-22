import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

export const getUserIdFromToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!!, (err, decoded: any) => {
      if (err) return reject(err);
      return resolve(decoded?.data as string);
    });
  });
};

export const createToken = (userId: string): string => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      data: userId,
    },
    process.env.JWT_SECRET
  );
};

export const createAnonymousToken = (): string => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      data: uuid(),
    },
    process.env.JWT_SECRET
  );
};
