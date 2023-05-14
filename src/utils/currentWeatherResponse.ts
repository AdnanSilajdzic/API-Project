import { ResponseBody, ResponseBodyForecast } from "../interfaces/ResponseBody";

export default function currentWeatherResponse(data: any) {
  if (data.cod != "200") {
    throw new Error("City not found.");
  }

  const weatherData: ResponseBody = {
    temperature: data.main.temp + "°C",
    humidity: data.main.humidity + "%",
    wind_speed: data.wind.speed + "m/s",
    weather: data.weather[0].main,
  };
  return weatherData;
}
