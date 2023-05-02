
# Software engineering API Project

This is a weather API utilizing OpenWeatherMap to get weather data across the globe. In order to run the API, you must do the following:


## How to use API

First you must clone this repository:

```
  git clone https://github.com/AdnanSilajdzic/API-Project.git
```
After cloning the repository make sure to install all dependencies, by typing "npm install" in the terminal:

```http
  npm install
```
Once all the dependencies are installed, you will require a .env file in order for the program to run correctly. Inside this .env file you will need an OpenWeather API key and an encrypted password, that was encrypted using bcrypt hash algorithm. A free tier OpenWeather API key will not suffice as it will not allow you to make requests for historic weather data. **ENV FILE HAS BEEN PROVIDED TO THE PROFESSOR ON TEAMS ASSIGNMENT**
```http
   API_KEY="[API KEY]"
   PASSWORD="[Encrypted password]"
```

If you have added the env file correctly, you can run the server by typing npm run dev in the terminal
```http
  npm run dev
```
If you see the following message, the server has started
```http
  App listening on port 4000
``` 

## Making API Requests
There are three API endpoints, but all three require the same parameters. They only differ in their responses. And all of them are called using **POST** requests, with the body being a JSON file with the following parameters:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city` | `string` | **Required**. The city for which you want weather information |
| `password` | `string` | **Required**. The non-encrypted version of the password in the .env file |

### Current weather

This API endpoint is used for accessing the current weather conditions of a city. The API endpoint is:
```http
  http://localhost:4000/api/weather/current
```
Sample response:
```http
{
    "weatherData": {
        "temperature": "13.84°C",
        "humidity": "93%",
        "wind_speed": "1.03m/s",
        "weather": "Clouds"
    },
    "message": "Data from API."
}
```
### Weather forecast

This API endpoint is used for accessing the weather forecast of a city. It will return the forecast for the next 5 days. The API endpoint is:
```http
  http://localhost:4000/api/weather/forecast
```
Sample response:
```http
{
    "responseData": {
        "dayOne": {
            "date": "Tue May 02 2023",
            "temperature": "13.84°C",
            "weather": "Clouds"
        },
        "dayTwo": {
            "date": "Wed May 03 2023",
            "temperature": "10.33°C",
            "weather": "Rain"
        },
        "dayThree": {
            "date": "Thu May 04 2023",
            "temperature": "10.65°C",
            "weather": "Rain"
        },
        "dayFour": {
            "date": "Fri May 05 2023",
            "temperature": "12.83°C",
            "weather": "Clouds"
        },
        "dayFive": {
            "date": "Sat May 06 2023",
            "temperature": "14.26°C",
            "weather": "Rain"
        }
    },
    "message": "Data from API."
}
```

### Weather history

This API endpoint is used for accessing the weather history of a city. It will return the history of the previous 5 days. The API endpoint is:
```http
  http://localhost:4000/api/weather/history
```
Sample response:
```http
{
    "responseData": {
        "dayOne": {
            "date": "Thu Apr 27 2023",
            "temperature": "13.69°C",
            "weather": "Clouds"
        },
        "dayTwo": {
            "date": "Fri Apr 28 2023",
            "temperature": "11.93°C",
            "weather": "Clouds"
        },
        "dayThree": {
            "date": "Sat Apr 29 2023",
            "temperature": "11.11°C",
            "weather": "Rain"
        },
        "dayFour": {
            "date": "Sun Apr 30 2023",
            "temperature": "13.63°C",
            "weather": "Rain"
        },
        "dayFive": {
            "date": "Mon May 01 2023",
            "temperature": "16.11°C",
            "weather": "Clouds"
        }
    },
    "message": "Data from API."
}
```
## What does "Data from API" mean?
There is a message at the bottom of each response that will say "Data from API". This message is not redundant, because if you do the same request twice in succession it will say "Data from cache" instead. This is to inform the user whether the data that they were trying to access was received from the cache or if it was necessary to fetch the data from the third party API.
