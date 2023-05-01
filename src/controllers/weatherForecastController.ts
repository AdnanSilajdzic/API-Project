import { Request, Response } from "express";
import { config } from "dotenv";
config();

export default async function currentWeatherController(
  req: Request,
  res: Response
) {
  res.json({ message: "This is a weather forecast" });
}
