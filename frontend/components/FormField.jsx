import { useField } from "formik";
import PropTypes from "prop-types";
import styles from "./FormField.module.scss";

const FormField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.formField}>
      <label htmlFor={props.title}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormField;
