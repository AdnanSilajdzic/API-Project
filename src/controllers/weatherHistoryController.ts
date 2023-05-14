import { Request, Response } from "express";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });
import { RequestBody } from "../interfaces/RequestBody";
import { ResponseBody, ResponseBodyHistory } from "../interfaces/ResponseBody";
import currentUnixTime from "../utils/currentUnixTime";
import daysAgoUnixTime from "../utils/daysAgoUnixTime";
import weatherHistoryResponse from "../utils/weatherHistoryResponse";
import fetchData from "../utils/fetchData";
import fetchGeoData from "../utils/fetchGeoData";

export default async function weatherHistoryController(
  req: Request<RequestBody>,
  res: Response<ResponseBody | any>
) {
  try {
    const city = req.body.city;
    //check if data is cached and return it
    const cachedData: ResponseBody | undefined = cache.get(city);
    if (cachedData) {
      return res.json({ cachedData, message: "Data from cache." });
    }

    const geoData = await fetchGeoData(city);
    const currentTime = currentUnixTime();
    const daysAgo = daysAgoUnixTime(5);
    //url for fetching 5 day history data from openweathermap
    const url = `https://history.openweathermap.org/data/2.5/history/city?lat=${geoData.lat}&lon=${geoData.lon}&appid=${process.env.API_KEY}&start=${daysAgo}&end=${currentTime}&units=metric`;

    let data = await fetchData(url);
    let responseData: ResponseBodyHistory = weatherHistoryResponse(data);
    //cache data
    cache.set(city, responseData);
    //each increment in array is 1 hour so 24 hours is 24 increments
    res.json({ responseData, message: "Data from API." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
