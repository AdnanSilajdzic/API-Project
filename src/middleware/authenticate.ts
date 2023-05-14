import { Request, Response, NextFunction, RequestHandler } from "express";
import { config } from "dotenv";
import bcrypt from "bcrypt";
config();

export default function Authenticate(
  req: any,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const TruePassword = process.env.PASSWORD;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [bearer, password] = authHeader.split(" ");

  if (bearer !== "Bearer" || !password) {
    return res.status(401).json({ message: "Invalid Authorization header" });
  }

  if (bcrypt.compareSync(password, TruePassword!)) {
    next(); // call the next middleware function
  } else {
    return res.status(401).json({ message: "Invalid password" });
  }
}
