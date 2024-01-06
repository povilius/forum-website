import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Button from "./Button";
import { PATHS } from "../routes/consts";
import styles from "./Topbar.module.scss";
import { FaRegMoon } from "react-icons/fa"
import { GoSun } from "react-icons/go";
import { ThemeContext } from "../context/ThemeContext"

const Topbar = () => {
  const { user, isLoggedIn, handleLogout } = useContext(UserContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    navigate(PATHS.Login);
  };

  return (
    <header className={styles.topbar}>
      <nav style={{ backgroundColor: isDarkMode ? "#181818" : "#ececec" }}>
        <h2 style={{ color: isDarkMode ? "white" : "inherit" }}>LOGO</h2>
        <div>
          <Link style={{ color: isDarkMode ? "white" : "inherit" }} to={PATHS.Home}>Home</Link>
          {isLoggedIn && (
            <>
              <Link style={{ color: isDarkMode ? "white" : "inherit" }} to={PATHS.Settings}>Settings</Link>
            </>
          )}
        </div>
       
        <div className={styles.logout}>
        <Button style={{ color: isDarkMode ? "white" : "inherit", backgroundColor: 'transparent' }} onClick={toggleTheme}>
          {isDarkMode ? <GoSun /> : <FaRegMoon />}
        </Button>
          {user ? (
            <>
            
              <Button style={{ color: isDarkMode ? "white" : "inherit", backgroundColor: 'transparent' }} onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button style={{ color: isDarkMode ? "white" : "inherit", backgroundColor: 'transparent' }} onClick={handleRedirectToLogin}>Login</Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Topbar;
