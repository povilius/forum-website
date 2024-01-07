import PropTypes from "prop-types"
import styles from "./FormField.module.scss"

const Input = ({ label, ...props }) => {
  return (
    <div className={styles.formField}>
      {label && <label htmlFor={props.title}>{label}</label>}
      <input {...props} />
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

export default Input