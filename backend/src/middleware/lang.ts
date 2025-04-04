import { Request, Response, NextFunction } from "express";

export const detectLanguage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lang = req.headers["accept-language"];
  req.lang = lang?.startsWith("ru") ? "ru" : "en";
  next();
};
