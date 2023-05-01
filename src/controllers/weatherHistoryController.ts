import { Request, Response } from "express";
import { config } from "dotenv";
config();

export default async function weatherHistoryController(
  req: Request,
  res: Response
) {
  res.json({ message: "Hello from weatherHistoryController" });
}
