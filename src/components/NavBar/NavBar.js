import "./NavBar.css";
import { SearchBar } from "../SearchBar/SearchBar";
import Switch from "react-js-switch";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const ThemeContext = createContext(null);

function NavBar() {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  return (
    <div className="navbar" id={theme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div
          className="main-logo"
          onClick={() => {
            navigate("/MovieLand");
          }}
        >
          MOVIE LAND
        </div>
        <SearchBar />
        <div className="switch">
          <Switch
            onChange={toggleTheme}
            duration={800}
            size={50}
            backgroundColor={{ on: "#525252", off: "#efefef" }}
            borderColor={{ on: "#525252", off: "#e6e6e6" }}
          />
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default NavBar;
