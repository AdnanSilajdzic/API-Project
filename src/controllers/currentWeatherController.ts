import { Request, Response } from "express";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });
import { RequestBody } from "../models/RequestBody";
import { ResponseBody } from "../models/ResponseBody";
config();

export default async function currentWeatherController(
  req: Request<{}, {}, RequestBody>,
  res: Response<ResponseBody | any>
) {
  //check if password is provided
  if (!req.body.password) {
    return res.status(400).json({ error: "Please provide a password." });
  }
  //check if password is correct with bcrypt
  const password = req.body.password;
  const hashedPassword = process.env.PASSWORD;
  const passwordCorrect = await bcrypt.compare(password, hashedPassword!);
  if (!passwordCorrect) {
    return res.status(401).json({ error: "Incorrect password." });
  }
  //check if city is provided
  if (!req.body.city) {
    return res.status(400).json({ error: "Please provide a city name." });
  }

  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;
  let data;

  const cachedData: ResponseBody | undefined = cache.get(city);

  //check if data is cached and return it
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
