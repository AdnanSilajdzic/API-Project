import { Request, Response } from "express";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });
import { ResponseBody, ResponseBodyForecast } from "../interfaces/ResponseBody";
import { RequestBody } from "../interfaces/RequestBody";
import weatherForecastResponse from "../utils/weatherForecastResponse";
import fetchData from "../utils/fetchData";

export default async function weatherForecastController(
  req: Request<RequestBody>,
  res: Response<ResponseBody | any>
) {
  try {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`;

    const cachedData: ResponseBody | undefined = cache.get(city);
    if (cachedData) {
      return res.json({ cachedData, message: "Data from cache." });
    }

    let data = await fetchData(url);
    const responseData: ResponseBodyForecast = weatherForecastResponse(data);

    cache.set(city, responseData);
    res.json({ responseData, message: "Data from API." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
