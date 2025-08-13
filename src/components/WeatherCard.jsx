const WeatherCard=({weatherResult})=>{
    if(!weatherResult){
        return <p>Loading weather...</p>;
    }
    return(
        <>
        <ul>
            <li>Tempreture : {weatherResult?.main?.temp}</li>
            <li>Weather condition : {weatherResult?.weather[0]?.description}</li>
            <li>Humidity : {weatherResult?.main?.humidity}</li>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
        </ul>
        
        
        </>
    )
}
export default WeatherCard;