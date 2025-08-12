// import searchlogo from "../assets/Search.png";
import { useEffect, useState } from "react";
import getService from "../services/data";
const Search=()=>{
    const [search, setSearch] = useState("");
     useEffect(()=>{
    getService.getAll().then(response=>response);
   setSearch("");
})

const searchItem =()=>{
    //experiment not done yet  
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