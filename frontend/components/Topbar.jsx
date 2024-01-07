import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import Button from "./Button"
import { PATHS } from "../routes/consts"
import styles from "./Topbar.module.scss"
import { FaRegMoon } from "react-icons/fa"
import { GoSun } from "react-icons/go"
import { ThemeContext } from "../context/ThemeContext"
import Logo from "./Logo"

const Topbar = () => {
  const { user, isLoggedIn, handleLogout } = useContext(UserContext)
  const { isDarkMode, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const handleRedirectToLogin = () => {
    navigate(PATHS.Login)
  }

  return (
    <header className={styles.topbar}>
      <nav style={{ backgroundColor: isDarkMode ? "#181818" : "#ececec" }}>
        <div className={styles.topbarItems}>
          <div className={styles.topbarlogo}>
            <Logo size="small" />
          </div>

          <div>
            <Link style={{ color: isDarkMode ? "white" : "inherit" }} to={PATHS.Home}>Home</Link>
            <Link style={{ color: isDarkMode ? "white" : "inherit" }} to={PATHS.Forum}>Forum</Link>
            {isLoggedIn && (
                <Link style={{ color: isDarkMode ? "white" : "inherit" }} to={PATHS.Settings}>Settings</Link>
            )}
          </div>

          <div>
            <Button style={{ color: isDarkMode ? "white" : "inherit", backgroundColor: 'transparent' }} onClick={toggleTheme}>
              {isDarkMode ? <GoSun /> : <FaRegMoon />}
            </Button>
            {user ? (
                <Button style={{ color: isDarkMode ? "white" : "inherit", backgroundColor: 'transparent' }} onClick={handleLogout}>Logout</Button>
            ) : (
              <Button style={{ color: isDarkMode ? "white" : "inherit", backgroundColor: 'transparent' }} onClick={handleRedirectToLogin}>Login</Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Topbar