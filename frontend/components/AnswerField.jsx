
import { useField } from 'formik';
import PropTypes from 'prop-types';
import styles from './AnswerField.module.scss';

const AnswerField = ({ name }) => {
  const [field, meta] = useField(name);

  return (
    <div className={styles.answerField}>
      <input {...field} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

AnswerField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AnswerField;


