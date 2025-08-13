const WeatherCard=({weatherResult})=>{
    if(!weatherResult){
        return <p>Loading weather...</p>;
    }
    return(
        <>
        <ul>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
            <li>{weatherResult?.main?.temp}</li>
        </ul>
        
        
        </>
    )
}
export default WeatherCard;