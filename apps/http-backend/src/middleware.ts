import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  const decodedToken: any = jwt.verify(token ?? "", jwtSecret);

  if (decodedToken.userId) {
    req.userId = decodedToken.userId;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
}
