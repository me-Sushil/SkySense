import dark from "../assets/MoonDarkMood.png";
import light from "../assets/SunLightMood.png";
import "../App.css";
// import useState from "react";
const DarkMode = () => {
    // const [isDarkMode, setIsDarkMode] = useState(false);

    
  return (
    <>
      <div data-theme="dark" >
        <button className="mood">
          <img src={dark} className="darkmood" />
          <img src={light} className="lightmood"/>
        </button>
      </div>
    </>
  );
};

export default DarkMode;
