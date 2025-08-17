import logo from "../assets/logo.png";
import "@fontsource/jacquard-24"; // Defaults to weight 400
import "../App.css";
import DarkMode from "./DarkMode";
const Header = () => {

  

  return (
    <>
      <div className="header">
        <div className="left-section">
          <img src={logo} alt="App logo" className="logo" />
          <h1 className="projectName">SkySense</h1>
        </div>
        <DarkMode />
        
      </div>
    </>
  );
};
export default Header;
