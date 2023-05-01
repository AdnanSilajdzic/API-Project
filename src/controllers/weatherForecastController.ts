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
  dayOneWeather: string;
  dayTwoTemperature: string;
  dayTwoWeather: string;
  dayThreeTemperature: string;
  dayThreeWeather: string;
  dayFourTemperature: string;
  dayFourWeather: string;
  dayFiveTemperature: string;
  dayFiveWeather: string;
}

//inerface for error response
interface ErrorResponse {
  error: string;
}

export default async function weatherForecastController(
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

  //return temperature and weather for next 5 days
  res.json({
    dayOneTemperature: data.list[0].main.temp + "°C",
    dayOneWeather: data.list[0].weather[0].main,
    dayTwoTemperature: data.list[1].main.temp + "°C",
    dayTwoWeather: data.list[1].weather[0].main,
    dayThreeTemperature: data.list[2].main.temp + "°C",
    dayThreeWeather: data.list[2].weather[0].main,
    dayFourTemperature: data.list[3].main.temp + "°C",
    dayFourWeather: data.list[3].weather[0].main,
    dayFiveTemperature: data.list[4].main.temp + "°C",
    dayFiveWeather: data.list[4].weather[0].main,
  });
}
