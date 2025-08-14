// import { useState } from "react";
import "../App.css";

import { useState } from "react";

const WeatherCard = ({ weatherResult, aqi }) => {
  // if (!weatherResult) {
  //   return <p>Loading weather</p>;
  // }
  console.log(weatherResult.name, "test for city");
  const recentSearchCity = JSON.parse(localStorage.getItem("city"));
  const sunrise = weatherResult?.sys?.sunrise;
  const sunset = weatherResult?.sys?.sunset;
  const windSpeedKM = (weatherResult?.wind?.speed * 3.6).toFixed(2);

  const sunriseDate = sunrise
    ? new Date(sunrise * 1000).toLocaleTimeString()
    : "N/A";

  const sunsetDate = sunset
    ? new Date(sunset * 1000).toLocaleTimeString()
    : "N/A";

  let aqiVal = "";
  const aQI = aqi?.list?.[0]?.main?.aqi;
  if (aQI === 1) {
    aqiVal = "Good";
  } else if (aQI === 2) {
    aqiVal = "Fair";
  } else if (aQI === 3) {
    aqiVal = "Moderate";
  } else if (aQI === 4) {
    aqiVal = "Unhealthy for Sensitive Groups";
  } else if (aQI === 5) {
    aqiVal = "Unhealthy";
  } else {
    aqiVal = "N/A";
  }

  const [isCelsius, setIsCelsius] = useState(true);
  const cel = Math.floor(weatherResult?.main?.temp);

  const changeTempreture = () => {
    setIsCelsius((prev) => !prev);
  };
  const displayTempData = isCelsius ? `${cel}°C` : `${cel * (9 / 5) + 32}°F`;

  return (
    <>
      <div className="weatherCard">
        <div className="weatherCardHeader">Weather Details</div>
        <div className="weatherCard-left">
          <div className="mainWeatherInfo">
            <p>
              Tempreture : {displayTempData}
              <button className="BTN" onClick={changeTempreture}>
                toggle
              </button>
            </p>
            <p>
              Weather condition : {weatherResult?.weather?.[0]?.description}
            </p>
            <p> Humidity : {weatherResult?.main?.humidity}%</p>
            <p> Wind speed : {windSpeedKM}km/h</p>
            <p> AQI : {aqiVal}</p>
          </div>
          <div className="bigData">
            <p style={{
                fontSize: "66px",
                margin: "10px 0",}}>{displayTempData}</p>{weatherResult.name}</div>
        </div>
        <div className="recentSearchCity">
          <p style={{
                fontSize: "19px",
                fontWeight:"bold",}}> Last 5 searched Cities</p>
          <p>{recentSearchCity}</p>

          <p style={{
                fontSize: "19px",
                fontWeight:"bold",}}>Sun Times in {weatherResult.name}</p>
          <p> Sunrise : {sunriseDate}</p>
            <p> Sunset : {sunsetDate}</p>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
