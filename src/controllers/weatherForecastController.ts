import { Request, Response } from "express";
import { config } from "dotenv";
config();

//interface for incoming request
interface RequestBody {
  city: string;
}

//interface for response
interface ResponseBody {
  dayOne: {
    date: string;
    temperature: string;
    weather: string;
  };
  dayTwo: {
    date: string;
    temperature: string;
    weather: string;
  };
  dayThree: {
    date: string;
    temperature: string;
    weather: string;
  };
  dayFour: {
    date: string;
    temperature: string;
    weather: string;
  };
  dayFive: {
    date: string;
    temperature: string;
    weather: string;
  };
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
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`;
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

  //date of each day incremented by 8 because data is provided for every 3 hours and 3*8=24
  const dayOne = new Date(data.list[0].dt * 1000);
  const dayTwo = new Date(data.list[7].dt * 1000);
  const dayThree = new Date(data.list[15].dt * 1000);
  const dayFour = new Date(data.list[23].dt * 1000);
  const dayFive = new Date(data.list[31].dt * 1000);

  //return temperature and weather for next 5 days
  res.json({
    dayOne: {
      date: dayOne.toDateString(),
      temperature: data.list[0].main.temp + "°C",
      weather: data.list[0].weather[0].main,
    },
    dayTwo: {
      date: dayTwo.toDateString(),
      temperature: data.list[7].main.temp + "°C",
      weather: data.list[7].weather[0].main,
    },
    dayThree: {
      date: dayThree.toDateString(),
      temperature: data.list[15].main.temp + "°C",
      weather: data.list[15].weather[0].main,
    },
    dayFour: {
      date: dayFour.toDateString(),
      temperature: data.list[23].main.temp + "°C",
      weather: data.list[23].weather[0].main,
    },
    dayFive: {
      date: dayFive.toDateString(),
      temperature: data.list[31].main.temp + "°C",
      weather: data.list[31].weather[0].main,
    },
  });
}
