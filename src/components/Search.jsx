
// import searchlogo from "../assets/Search.png";
import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import axios from "axios";
const Search = () => {
  const [searchQry, setSearchQry] = useState("Kathmandu");
  const [weatherResult, setWeatherResult] = useState([]);
  const [city, setCity] = useState([]);
  const [aqiData, setAQIData] = useState([]);
  const apiKey = "2e2c4ac74b20deb70c35de523b8e2367";
 
  useEffect(() => {
    if (!searchQry) {
      setCity([]);
      return;
    }

    const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchQry}&limit=22&appid=${apiKey}`;

    const delaySearchQry = setTimeout(() => {
      axios
        .get(geourl)
        .then((response) => {
             
          setCity(response.data);
          console.log(response.data, "response data");
        })
        .catch((error) => console.log("error on response", error));
    }, 1000);
    return () => clearTimeout(delaySearchQry);
  }, [searchQry]);

  const handleCityClick = (lat, lon) => {
    setCity([]);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherResult(response.data);
        console.log(response.data);
      });

    // // if (city.country === "NP") {
    //   axios
    //     .get(
    //        `https://api.waqi.info/feed/${searchQry}/?token=c6b3f4fa907564603e0e27b8bee35f9051fdc35f`// waqi AQI api provider but there is no data of nepal
    //       //`https://api.waqi.info/feed/@H9468/?token=c6b3f4fa907564603e0e27b8bee35f9051fdc35f`// American ambessy AQI in nepal ambessy area only
    //     )
    //     .then((response) => {
    //       setAQIData(response.data);
    //       console.log("AQI data api without nepali data",response.data);
    //     });
    // // } else {

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
      .then((response) => {
        setAQIData(response.data);
        console.log("world data AQI api including nepal", response.data);
      });
  };



  return (
    <>
      <div>
        {/* <img src={searchlogo} alt="searchlogo"/> */}
        <input
          type="text"
          placeholder="search city here"
          value={searchQry}
          onChange={(event) => {
            setSearchQry(event.target.value);
          }}
        ></input>
      </div>
      <div>
        {city.length > 0 ? (
          <ul>
            {city.map((city, index) => (
              <li
                key={index}
                onClick={() => handleCityClick(city.lat, city.lon)}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        ) : (
          <p>{searchQry} No results found</p>
        )}
      </div>
      <WeatherCard aqi={aqiData} weatherResult={weatherResult} />
    </>
  );
};
export default Search;
