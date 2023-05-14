//export response body interface for weather forecast
export interface ResponseBodyForecast {
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
//export response body interface for weather history
export interface ResponseBodyHistory {
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
//export error response body interface
export interface ErrorResponse {
  error: string;
}

//export response body interface for current weather
export interface ResponseBody {
  temperature: string;
  humidity: string;
  wind_speed: string;
  weather: string;
}
