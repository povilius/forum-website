import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"
import styles from "./Home.module.scss";
import Logo from "../components/Logo";

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <div style={{ color: isDarkMode ? "white" : "inherit" }} className={styles.titleWrapper}>
      <Logo size="large" />
      <h2 className={styles.titleh2}>Welcome to AxelForums</h2>
    </div>
  )
}

export default Home