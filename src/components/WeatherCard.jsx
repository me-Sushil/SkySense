import tempretureLogo from "../assets/high-temperature.png";
import humidityLogo from "../assets/humidity.png";
import windSpeedLogo from "../assets/storm.png";
import aQIIndex from "../assets/air-quality.png";
import sunRiseImg from "../assets/sunrise.png";
import sunSetImg from "../assets/sunset.png";
import "../App.css";
import axios from "axios";
import { useState } from "react";

const WeatherCard = ({ weatherResult, aqi, setAQIData, setWeatherResult }) => {
  // if (!weatherResult) {
  //   return <p>Loading weather</p>;
  // }
  const items = Object.keys(localStorage)
    .filter((key) => key !== "theme")
    .map((key) => {
      let data = JSON.parse(localStorage.getItem(key));
      return { key, time: data.time, lat: data.lat, lon: data.lon };
    });

  items.sort((a, b) => b.time - a.time);
  items.slice(5).forEach((item) => localStorage.removeItem(item.key));

  const sunrise = weatherResult?.sys?.sunrise;
  const sunset = weatherResult?.sys?.sunset;
  const windSpeedKM = (weatherResult?.wind?.speed * 3.6).toFixed(2);

  const offsetSeconds = weatherResult?.timezone || 0; // Offset in seconds from UTC

  const sunriseDate = sunrise
    ? new Date((sunrise + offsetSeconds) * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      })
    : "N/A";

  const sunsetDate = sunset
    ? new Date((sunset + offsetSeconds) * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      })
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
  const displayTempData = isCelsius
    ? `${cel}°C`
    : `${Math.floor(cel * (9 / 5) + 32)}°F`;

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleClick = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherResult(response.data);
        console.log(response.data);
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
      .then((response) => {
        setAQIData(response.data);
        console.log("world data AQI api including nepal", response.data);
      });
  };

  function formatTime(date) {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  }

  // Get current UTC time
  const nowUTC = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
  // Apply the offset
  const targetTime = new Date(nowUTC.getTime() + offsetSeconds * 1000);

  return (
    <>
      <div className="weatherCard">
        <div className="weatherCardHeader">Weather Details</div>
        <div className="weatherCard-left">
          <div className="mainWeatherInfo">
            <p>
              Tempreture : {displayTempData}
              <img
                src={tempretureLogo}
                alt="temprerurelogo"
                className="tempLogo"
              />{" "}
              <button className="BTN" onClick={changeTempreture}>
                toggle
              </button>
            </p>
            <p  className="weatherCondition">
              Weather Condition : {weatherResult?.weather?.[0]?.description}{" "}
              <img
                className="weatherConditionImg"
                src={`https://openweathermap.org/img/wn/${weatherResult?.weather?.[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </p>
            <p>
              {" "}
              Humidity : {weatherResult?.main?.humidity}%{" "}
              <img
                src={humidityLogo}
                alt="humidityLogo"
                className="humidityLogo"
              />
            </p>
            <p>
              {" "}
              Wind speed : {windSpeedKM}km/h{" "}
              <img
                src={windSpeedLogo}
                alt="windSpeedLogo"
                className="windSpeedLogo"
              />
            </p>
            <p>
              {" "}
              AQI : {aqiVal}{" "}
              <img src={aQIIndex} alt="aQIIndex" className="aQIIndex" />
            </p>
          </div>

          <div className="bigData">
            <div
              className="temp"
              style={{
                fontSize: "66px",
                margin: "10px 0",
              }}
            >
              {displayTempData}
            </div>
            <div className="middleInfo">
              <div className="cityName">{weatherResult.name}</div>
              <div className="dateAndTime">{formatTime(targetTime)}</div>
            </div>
            <div className="weatherImage">
              <img
                style={{
                  height: "120px",
                  width: "95px",
                }}
                className="weatherConditionImgBig"
                src={`https://openweathermap.org/img/wn/${weatherResult?.weather?.[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </div>
          </div>
        </div>
        <div className="recentSearchCity">
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "3px",
               paddingBottom: "3px",
              borderBottom: "2px solid black",
              display: "inline-block",
              marginBottom:"-9px",
            }}
          >
            Last 5 Searched Cities
          </p>
          {items.map((val) => {
            return (
              <p
                key={val.key}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(val.lat, val.lon)}
              >
                {val.key}
              </p>
            );
          })}
          <p
            style={{
              paddingBottom: "3px",
              borderBottom: "2px solid black",
              display: "inline-block",
              marginBottom:"-9px",
              marginTop:"-9px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            SunTimes in {weatherResult.name}
          </p>
          <p>
            Sunrise :
            <img src={sunRiseImg} alt="sunRiseImg" className="sunRiseImg" />
            {sunriseDate}
          </p>
          <p>
            Sunset :
            <img src={sunSetImg} alt="sunSetImg" className="sunSetImg" />{" "}
            {sunsetDate}
          </p>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
