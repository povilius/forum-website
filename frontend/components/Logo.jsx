import { useContext } from "react";
import { ThemeContext } from '../context/ThemeContext';
import styles from "./Logo.module.scss";
import PropTypes from "prop-types";

const Logo = ({ size }) => {
  const { isDarkMode } = useContext(ThemeContext);


  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { height: "50px",  };
      case "large":
        return { height: "150px", marginTop: "100px", justifyContent: "center" };
      default:
        return {};
    }
  };

  return (
    <div className={styles.logoWrapper} style={getSizeStyles()}>
      {isDarkMode ? (
        <img  src="../public/Logo 1.png" alt="Dark Mode Logo" />
      ) : (
        <img  src="../public/Logo 2.png" alt="Light Mode Logo" />
      )}
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
};

export default Logo;
