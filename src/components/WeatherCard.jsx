// import { useState } from "react";
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
  console.log(weatherResult.name, "test for city");
  // const recentSearchCity = JSON.parse(localStorage.getItem("city"));
  const items = Object.keys(localStorage).map((key) => {
    let data = JSON.parse(localStorage.getItem(key));
    return { key, time: data.time, lat: data.lat, lon: data.lon };
  });

  items.sort((a, b) => b.time - a.time);
  items.slice(5).forEach((item) => localStorage.removeItem(item.key));

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
    // setSearchQry("");
  };

  // for get time and date
  const now = new Date();
  const options = {
    weekday: "long", // Friday
    year: "numeric", // 2025
    month: "short", // Aug
    day: "2-digit", // 12
    hour: "2-digit", // 05
    minute: "2-digit",
    hour12: true,
  };
  const formatted = new Intl.DateTimeFormat("en-US", options).format(now);
  // Example output: "Friday, Aug 12, 2025, 05:23"
  console.log(formatted);

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
            <p>
              Weather Condition : {weatherResult?.weather?.[0]?.description}{" "}
              <img className="weatherConditionImg"
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
              <div className="dateAndTime">{formatted}</div>
            </div>
            <div className="weatherImage"><img className="weatherConditionImgBig"
                src={`https://openweathermap.org/img/wn/${weatherResult?.weather?.[0].icon}@2x.png`}
                alt="Weather icon"
              /></div>
          </div>
        </div>
        <div className="recentSearchCity">
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "3px",
            }}
          >
            Last 5 Searched Cities
          </p>
          {/* <p>{recentSearchCity}</p> */}
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
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            SunTimes in {weatherResult.name}
          </p>
          <p>
            {" "}
            Sunrise :
            <img
              src={sunRiseImg}
              alt="sunRiseImg"
              className="sunRiseImg"
            />{" "}
            {sunriseDate}{" "}
          </p>
          <p>
            {" "}
            Sunset :
            <img src={sunSetImg} alt="sunSetImg" className="sunSetImg" />{" "}
            {sunsetDate}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
