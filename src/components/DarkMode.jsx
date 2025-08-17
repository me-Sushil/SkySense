import dark from "../assets/MoonDarkMood.png";
import light from "../assets/SunLightMood.png";
import "../App.css";
import { useState, useEffect } from "react";
const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = JSON.parse(localStorage.getItem("theme"));
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const handleButtonClick = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", JSON.stringify("light"));
    }
  };

  return (
    <>
      <div>
        <button className="mood" onClick={handleButtonClick}>
          <img
            src={dark}
            className="darkmood"
            alt="Dark mode"
            style={{ opacity: isDarkMode ? 1 : 0.5 }}
          />
          <img
            src={light}
            className="lightmood"
            alt="Light mode"
            style={{ opacity: isDarkMode ? 0.5 : 1 }}
          />
        </button>
      </div>
    </>
  );
};

export default DarkMode;
