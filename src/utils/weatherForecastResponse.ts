import { ResponseBodyForecast } from "../interfaces/ResponseBody";

export default function weatherForecastResponse(data: any) {
  if (data.cod != "200") {
    throw new Error("City not found.");
  }

  //date of each day incremented by 8 because data is provided for every 3 hours and 3*8=24
  const dayOne = new Date(data.list[0].dt * 1000);
  const dayTwo = new Date(data.list[7].dt * 1000);
  const dayThree = new Date(data.list[15].dt * 1000);
  const dayFour = new Date(data.list[23].dt * 1000);
  const dayFive = new Date(data.list[31].dt * 1000);

  const weatherData: ResponseBodyForecast = {
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
  };
  return weatherData;
}
