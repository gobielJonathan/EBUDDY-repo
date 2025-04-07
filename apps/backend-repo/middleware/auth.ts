import { NextFunction, Request, Response } from "express";
import { auth, authAdmin } from "../config/firebase";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];
  if (!token) {
    res.json({ error: "Unauthorized" }).status(401);
    return;
  }

  // Verify token logic here (e.g., using Firebase Admin SDK)
  authAdmin
    .verifyIdToken(token)
    .then(() => {
      next()
    })
    .catch((error) => {
      if (error.code === "auth/id-token-expired") {
        res.status(401).json({ error: "expired token" });
        return;
      }
      res.status(401).json({ error: "Unauthorized" });
    });
}
