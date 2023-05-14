import { Request, Response } from "express";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });
import { RequestBody } from "../interfaces/RequestBody";
import { ResponseBody } from "../interfaces/ResponseBody";
import fetchData from "../utils/fetchData";
import currentWeatherResponse from "../utils/currentWeatherResponse";

export default async function currentWeatherController(
  req: Request<RequestBody>,
  res: Response<ResponseBody | any>
) {
  try {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

    const cachedData: ResponseBody | undefined = cache.get(city);
    if (cachedData) {
      return res.json({ cachedData, message: "Data from cache." });
    }

    let data = await fetchData(url);
    const weatherData = currentWeatherResponse(data);

    cache.set(city, weatherData);
    res.json({ weatherData, message: "Data from API." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
