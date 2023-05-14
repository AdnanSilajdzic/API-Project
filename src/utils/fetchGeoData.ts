import fetchData from "./fetchData";

export default async function fetchGeoData(city: string) {
  //url for fetching city coordinates from openweathermap
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;
  let geoData;

  //fetch data from openweathermap
  geoData = await fetchData(geoUrl);
  //latitude and longitude of the city
  const lat = geoData[0].lat;
  const lon = geoData[0].lon;
  return { lat, lon };
}
