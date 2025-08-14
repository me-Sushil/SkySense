// import { useState } from "react";
import "../App.css";


import { useState } from "react";

const WeatherCard = ({ weatherResult, aqi }) => {
  // if (!weatherResult) {
  //   return <p>Loading weather</p>;
  // }
  const sunrise = weatherResult?.sys?.sunrise;
  const sunset = weatherResult?.sys?.sunset;
  const windSpeedKM = ((weatherResult?.wind?.speed)*3.6).toFixed(2);
  
  const sunriseDate = sunrise
    ? new Date(sunrise * 1000).toLocaleTimeString()
    : "N/A";

  const sunsetDate = sunset
    ? new Date(sunset * 1000).toLocaleTimeString()
    : "N/A";

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

  const [isCelsius, setIsCelsius] = useState(true);
    const cel = weatherResult?.main?.temp;
  
  const changeTempreture=()=>{
    setIsCelsius((prev)=>!prev);
  }
  const displayTempData = isCelsius ? `${cel}°C`: `${(cel*(9/5))+32}°F`;

  return (
    <>
      <ul>
        <li>Tempreture : {displayTempData} <button className="BTN" onClick={changeTempreture}>toggle</button></li>
        <li>Weather condition : {weatherResult?.weather?.[0]?.description}</li>
        <li>Humidity : {weatherResult?.main?.humidity}%</li>
        <li>Wind speed : {windSpeedKM}km/h</li>
        <li>Sunrise : {sunriseDate}</li>
        <li>Sunset : {sunsetDate}</li>
        <li>AQI : {aqiVal}</li>
      </ul>
      <div>
        <ul>
        <li>Tempreture : {displayTempData} <button className="BTN" onClick={changeTempreture}>toggle</button></li>
        <li>Weather condition : {weatherResult?.weather?.[0]?.description}</li>
        <li>Humidity : {weatherResult?.main?.humidity}%</li>
        <li>Wind speed : {windSpeedKM}km/h</li>
        <li>Sunrise : {sunriseDate}</li>
        <li>Sunset : {sunsetDate}</li>
        <li>AQI : {aqiVal}</li>
      </ul>
      </div>
    </>
  );
};

export default WeatherCard;
