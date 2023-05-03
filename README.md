
# Software engineering API Project

This is a weather API utilizing OpenWeatherMap to get weather data across the globe. In order to run the API, you must do the following:


## How to use API

First you must clone this repository:

```
  git clone https://github.com/AdnanSilajdzic/API-Project.git
```
After cloning the repository make sure to install all dependencies, by typing "npm install" in the terminal:

```
  npm install
```
Once all the dependencies are installed, you will require a .env file in order for the program to run correctly. Inside this .env file you will need an OpenWeather API key and an encrypted password, that was encrypted using bcrypt hash algorithm. A free tier OpenWeather API key will not suffice as it will not allow you to make requests for historic weather data. **ENV FILE HAS BEEN PROVIDED TO THE PROFESSOR ON TEAMS ASSIGNMENT**
```
   API_KEY="[API KEY]"
   PASSWORD="[Encrypted password]"
```

If you have added the env file correctly, you can run the server by typing npm run dev in the terminal
```
  npm run dev
```
If you see the following message, the server has started
```
  App listening on port 4000
``` 

## Making API Requests
There are three API endpoints, but all three require the same parameters. They only differ in their responses. And all of them are called using **POST** requests, with the body being a JSON file with the following parameters:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city` | `string` | **Required**. The city for which you want weather information |
| `password` | `string` | **Required**. The non-encrypted version of the password in the .env file |

## Swagger documentation
Swagger documentation can be accessed by going to the browser while the server is running and going to 
```
  http://localhost:4000/api/weather/api-docs
```

## Postman collection
The postman collection is located inside of the repository in a file named Weather API.postman_collection.json

## Logging
This API logs requests and logs can be found in the logs.log file

## What does "Data from API" mean?
There is a message at the bottom of each response that will say "Data from API". This message is not redundant, because if you do the same request twice in succession it will say "Data from cache" instead. This is to inform the user whether the data that they were trying to access was received from the cache or if it was necessary to fetch the data from the third party API.
