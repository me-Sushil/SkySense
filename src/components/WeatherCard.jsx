const WeatherCard = ({ weatherResult }) => {
  if (!weatherResult) {
    return <p>Loading weather</p>;
  }
  const sunrise = weatherResult?.sys?.sunrise;
  const sunset = weatherResult?.sys?.sunset;
  const sunriseDate = sunrise ? new Date(sunrise * 1000).toLocaleTimeString(): "N/A";
  const sunsetDate = sunset ? new Date(sunset * 1000).toLocaleTimeString(): "N/A";

  return (
    <>
      <ul>
        <li>Tempreture : {weatherResult?.main?.temp}</li>
        <li>Weather condition : {weatherResult?.weather?.[0]?.description}</li>
        <li>Humidity : {weatherResult?.main?.humidity}%</li>
        <li>Wind speed : {weatherResult?.wind?.speed}m/s</li>
        <li>Sunrise : {sunriseDate}</li>
        <li>Sunset : {sunsetDate}</li>
      </ul>
    </>
  );
};

export default WeatherCard;
