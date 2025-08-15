// import searchlogo from "../assets/Search.png";
import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import axios from "axios";
const Search = () => {
  const [searchQry, setSearchQry] = useState("");
  const [weatherResult, setWeatherResult] = useState([]);
  const [city, setCity] = useState([]);
  const [aqiData, setAQIData] = useState([]);
  const [lat, setLat] = useState(27.7083);
  const [lon, setLon] = useState(85.3206);
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log(apiKey, "this is api key");

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
          setLat(response.data.lat);
          setLon(response.data.lon);
          setCity(response.data);
          console.log(response.data, "response data");
        })
        .catch((error) => console.log("error on response", error));
    }, 1000);
    return () => clearTimeout(delaySearchQry);
  }, [searchQry]);

  useEffect(() => {
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
  }, []);

  const handleCityClick = (city, lat, lon) => {
    localStorage.setItem(
      `${city}`,
      JSON.stringify({
        name: `${city}`,
        time: Date.now(),
        lat:lat,
        lon:lon,
      })
    );
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
    setSearchQry("");
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
        <div className="findCity">
          {city.length > 0 ? (
            <ul>
              {city.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleCityClick(city.name, city.lat, city.lon)}
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          ) : (
            console.log("no result found")
            // <p>{searchQry} No results found</p>
          )}
        </div>
      </div>

      <div>
        {" "}
        {/*className="weatherCard" */}
        <WeatherCard aqi={aqiData} setAQIData={setAQIData} setWeatherResult={setWeatherResult} weatherResult={weatherResult} />
      </div>
    </>
  );
};
export default Search;
