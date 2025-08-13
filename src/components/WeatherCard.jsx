// import { useState } from "react";

const WeatherCard = ({ weatherResult, aqi }) => {
  if (!weatherResult) {
    return <p>Loading weather</p>;
  }
  const sunrise = weatherResult?.sys?.sunrise;
  const sunset = weatherResult?.sys?.sunset;
  const sunriseDate = sunrise
    ? new Date(sunrise * 1000).toLocaleTimeString()
    : "N/A";
  const sunsetDate = sunset
    ? new Date(sunset * 1000).toLocaleTimeString()
    : "N/A";
  //const [aqiVal, setAQIVal] = useState("");
  let aqiVal = "";
  const aQI = aqi?.list?.[0]?.main?.aqi;
  if (aQI === 1) {
    aqiVal ="Good";
  } else if (aQI === 2) {
    aqiVal ="Fair";
  } else if (aQI === 3) {
    aqiVal ="Moderate";
  } else if (aQI === 4) {
    aqiVal ="Unhealthy for Sensitive Groups";
  } else if (aQI === 5){
    aqiVal ="Unhealthy";
  }else{
    aqiVal = "N/A";
  }

  return (
    <>
      <ul>
        <li>Tempreture : {weatherResult?.main?.temp}</li>
        <li>Weather condition : {weatherResult?.weather?.[0]?.description}</li>
        <li>Humidity : {weatherResult?.main?.humidity}%</li>
        <li>Wind speed : {weatherResult?.wind?.speed}m/s</li>
        <li>Sunrise : {sunriseDate}</li>
        <li>Sunset : {sunsetDate}</li>
        <li>AQI : {aqiVal}</li>
      </ul>
    </>
  );
};

export default WeatherCard;
