// import searchlogo from "../assets/Search.png";
import { useEffect, useState } from "react";
import axios from "axios";
const Search = () => {
  const [searchQry, setSearchQry] = useState("");
  const [weatherResult, setWeatherResult] = useState([]);
  const [city, setCity] = useState([]);
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
      .then((response) =>{
        setWeatherResult(response.data);
       console.log(response.data);
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
            <li key={index} onClick={() => handleCityClick(city.lat, city.lon)}>
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      ) : (
        <p>{searchQry} No results found</p>
      )}
      </div>
      <WeatherCard weatherResult={weatherResult} />
    </>
  );
};
export default Search;
