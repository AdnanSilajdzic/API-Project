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

export default async function weatherHistoryController(
  req: Request<RequestBody>,
  res: Response<ResponseBody | ErrorResponse>
) {
  //check if city is provided
  if (!req.body.city) {
    return res.status(400).json({ error: "Please provide a city name." });
  }

  const city = req.body.city;
  const now = new Date(); // Get the current date and time
  const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000); // Subtract 5 days in milliseconds

  const nowUnixTime = Math.floor(now.getTime() / 1000); // Convert current date and time to Unix timestamp
  const fiveDaysAgoUnixTime = Math.floor(fiveDaysAgo.getTime() / 1000); // Convert 5 days ago date and time to Unix timestamp

  //url for fetching city coordinates from openweathermap
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;
  let geoData;
  //fetch data from openweathermap
  try {
    const response = await fetch(geoUrl);
    geoData = await response.json();
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong." });
  }
  if (geoData.length == 0) {
    return res.status(400).json({ error: "City not found." });
  }
  //latitude and longitude of the city
  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  //url for fetching 5 day history data from openweathermap
  const url = `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&start=${fiveDaysAgoUnixTime}&end=${nowUnixTime}&units=metric`;
  let data;
  console.log(url);
  //fetch data from openweathermap
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong." });
  }

  //catch error if city not found
  if (data.code != "200" && !data.cod) {
    return res.status(400).json({ error: data.message });
  }

  //date of each day in the data
  const dayOne = new Date(data.list[0].dt * 1000);
  const dayTwo = new Date(data.list[23].dt * 1000);
  const dayThree = new Date(data.list[47].dt * 1000);
  const dayFour = new Date(data.list[71].dt * 1000);
  const dayFive = new Date(data.list[95].dt * 1000);
  //each increment in array is 1 hour so 24 hours is 24 increments
  res.json({
    dayOne: {
      date: dayOne.toDateString(),
      temperature: data.list[0].main.temp + "°C",
      weather: data.list[0].weather[0].main,
    },
    dayTwo: {
      date: dayTwo.toDateString(),
      temperature: data.list[23].main.temp + "°C",
      weather: data.list[23].weather[0].main,
    },
    dayThree: {
      date: dayThree.toDateString(),
      temperature: data.list[47].main.temp + "°C",
      weather: data.list[47].weather[0].main,
    },
    dayFour: {
      date: dayFour.toDateString(),
      temperature: data.list[71].main.temp + "°C",
      weather: data.list[71].weather[0].main,
    },
    dayFive: {
      date: dayFive.toDateString(),
      temperature: data.list[95].main.temp + "°C",
      weather: data.list[95].weather[0].main,
    },
  });
}
