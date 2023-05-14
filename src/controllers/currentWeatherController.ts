import { Request, Response } from "express";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });
import { RequestBody } from "../interfaces/RequestBody";
import { ResponseBody } from "../interfaces/ResponseBody";
config();

export default async function currentWeatherController(
  req: Request<RequestBody>,
  res: Response<ResponseBody | any>
) {
  //check if city is provided
  if (!req.body.city) {
    return res.status(400).json({ error: "Please provide a city name." });
  }

  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;
  let data;

  //check if data is cached and return it
  const cachedData: ResponseBody | undefined = cache.get(city);
  if (cachedData) {
    return res.json({ cachedData, message: "Data from cache." });
  }

  //fetch data from openweathermap
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong." });
  }

  //catch error if city not found
  if (data.cod != "200") {
    return res.status(data.cod).json({ error: data.message });
  }

  const weatherData: ResponseBody = {
    temperature: data.main.temp + "°C",
    humidity: data.main.humidity + "%",
    wind_speed: data.wind.speed + "m/s",
    weather: data.weather[0].main,
  };

  //cache data
  cache.set(city, weatherData);
  //return data
  res.json({ weatherData, message: "Data from API." });
}
