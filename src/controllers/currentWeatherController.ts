import { Request, Response } from "express";

export default async function currentWeatherController(
  req: Request,
  res: Response
) {
  res.json({ temperature: "hot" });
}
