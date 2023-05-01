import { Request, Response } from "express";
import { config } from "dotenv";
config();

//interface for incoming request
interface RequestBody {
  city: string;
}

//interface for response
interface ResponseBody {
  dayOneTemperature: string;
  dayTwoTemperature: string;
  dayThreeTemperature: string;
  dayFourTemperature: string;
  dayFiveTemperature: string;
}

//inerface for error response
interface ErrorResponse {
  error: string;
}

export default async function currentWeatherController(
  req: Request<RequestBody>,
  res: Response<ResponseBody | ErrorResponse>
) {
  //check if city is provided
  if (!req.body.city) {
    return res.status(400).json({ error: "Please provide a city name." });
  }

  const city = req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric&cnt=5`;
  let data;
  //fetch data from openweathermap
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    return res.status(500).json({ error: url });
  }

  //catch error if city not found
  if (data.cod != "200") {
    return res.status(data.cod).json({ error: data.message });
  }

  //return temperature for next 5 days
  res.json({
    dayOneTemperature: data.list[0].main.temp + "°C",
    dayTwoTemperature: data.list[1].main.temp + "°C",
    dayThreeTemperature: data.list[2].main.temp + "°C",
    dayFourTemperature: data.list[3].main.temp + "°C",
    dayFiveTemperature: data.list[4].main.temp + "°C",
  });
}
