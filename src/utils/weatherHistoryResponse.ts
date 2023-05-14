import { ResponseBody, ResponseBodyHistory } from "../interfaces/ResponseBody";
export default function historyResponseBody(data: any) {
  //date of each day in the data
  const dayOne = new Date(data.list[0].dt * 1000);
  const dayTwo = new Date(data.list[23].dt * 1000);
  const dayThree = new Date(data.list[47].dt * 1000);
  const dayFour = new Date(data.list[71].dt * 1000);
  const dayFive = new Date(data.list[95].dt * 1000);

  const weatherData: ResponseBodyHistory = {
    dayOne: {
      date: dayOne.toDateString(),
      temperature: data.list[0].main.temp + "°C",
      weather: data.list[0].weather[0].main,
    },
    dayTwo: {
      date: dayTwo.toDateString(),
      temperature: data.list[8].main.temp + "°C",
      weather: data.list[8].weather[0].main,
    },
    dayThree: {
      date: dayThree.toDateString(),
      temperature: data.list[16].main.temp + "°C",
      weather: data.list[16].weather[0].main,
    },
    dayFour: {
      date: dayFour.toDateString(),
      temperature: data.list[24].main.temp + "°C",
      weather: data.list[24].weather[0].main,
    },
    dayFive: {
      date: dayFive.toDateString(),
      temperature: data.list[32].main.temp + "°C",
      weather: data.list[32].weather[0].main,
    },
  };
  return weatherData;
}
