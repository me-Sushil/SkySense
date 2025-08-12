// import searchlogo from "../assets/Search.png";
import { useState } from "react";
import getService from "../services/data";
const Search=()=>{
const [search, setSearch] = useState("");
  const searchItem =()=>{
    //experiment not done yet
    getService.getAll().then(response=>response);
    setSearch("");
  }
    return(
        <>
        <div>
            {/* <img src={searchlogo} alt="searchlogo"/> */}
            <input placeholder="search city here" value={search} onChange={searchItem}></input>
        </div>
        </>
    )
}
export default Search;