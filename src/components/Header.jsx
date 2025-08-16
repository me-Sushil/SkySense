import logo from "../assets/logo.png";
import dark from "../assets/MoonDarkMood.png";
import light from "../assets/SunLightMood.png";
import "@fontsource/jacquard-24"; // Defaults to weight 400
const Header = () => {
  return (
    <>
      <div className="header">
        <div className="left-section">
          <img src={logo} alt="App logo" className="logo" />
          <h1 className="projectName">SkySense</h1>
        </div>
        <div className="mood">
          <img src={dark} alt="dark" className="darkmood" />
          <img src={light} alt="light" className="lightmood" />
        </div>
      </div>
    </>
  );
};
export default Header;
