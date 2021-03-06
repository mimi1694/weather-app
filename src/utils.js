const API_KEY = process.env.REACT_APP_WEATHER_KEY;

export const fetchWeather = (cityName, units) => {
  const lookup = cityName.toLowerCase();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${lookup}&appid=${API_KEY}&units=${units}`;

  // Because the 7 day forecase API call requires a latitude and longitude, rather than just the name of a city,
  // for ease call the current weather call first which returns the lat and long
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.cod !== 200 ) {
        throw new Error();
      }
      const lat = res.coord.lat;
      const long = res.coord.lon;
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${units}`;
      return fetch(url);
    })
    .then(res => res.json())
    .then(res => {
      if (!res.current) throw new Error();
      return res;
    });
};
