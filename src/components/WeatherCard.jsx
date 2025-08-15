// import { useState } from "react";
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
    return { key, time: data.time, lat:data.lat, lon:data.lon };
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
  const displayTempData = isCelsius ? `${cel}°C` : `${cel * (9 / 5) + 32}°F`;


  const apiKey = import.meta.env.VITE_API_KEY;

  const handleClick=(lat, lon)=>{ 
    axios.get(
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
              Weather Condition : {weatherResult?.weather?.[0]?.description}
            </p>
            <p> Humidity : {weatherResult?.main?.humidity}%</p>
            <p> Wind speed : {windSpeedKM}km/h</p>
            <p> AQI : {aqiVal}</p>
          </div>
          <div className="bigData">
            <p
              style={{
                fontSize: "66px",
                margin: "10px 0",
              }}
            >
              {displayTempData}
            </p>
            {weatherResult.name}
          </div>
        </div>
        <div className="recentSearchCity">
          <p
            style={{
              fontSize: "19px",
              fontWeight: "bold",
              marginTop:"3px"
            }}
          >
            Last 5 searched Cities
          </p>
          {/* <p>{recentSearchCity}</p> */}
          {items.map((val) => {
            return  <p key={val.key}  style={{cursor:"pointer"}} onClick={()=>handleClick(val.lat, val.lon)} >{val.key}</p>;
          })}
          <p
            style={{
              fontSize: "19px",
              fontWeight: "bold",
            }}
          >
            Sun Times in {weatherResult.name}
          </p>
          <p> Sunrise : {sunriseDate}</p>
          <p> Sunset : {sunsetDate}</p>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
