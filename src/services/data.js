import axios from "axios";

const lat = 27.7172; // Kathmandu latitude
const lon = 85.3240; // Kathmandu longitude
const apiKey = "2e2c4ac74b20deb70c35de523b8e2367";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;


const getAll = () => {
  return axios.get(url).then((response)=>response.data).catch((error)=>console.log("error on response", error));
};
export default { getAll };
