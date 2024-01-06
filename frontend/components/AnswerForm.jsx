import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Button from './Button';
import AnswerField from './AnswerField';
import styles from "./AnswerForm.module.scss";
import { ThemeContext } from "../context/ThemeContext"
import { useContext } from "react";

const AnswerForm = ({ onSubmit }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const initialValues = {
    content: '',
  };

  const handleFormSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      <Form className={styles.answerform}>
        <div style={{ color: isDarkMode ? "white" : "inherit" }} className={styles.answertitle}>
          <label className={styles.answerlabel} htmlFor="content">Your Answer:</label>
          <AnswerField name="content" />
        </div>
        <div>
          <Button type="submit">Submit Answer</Button>
        </div>
      </Form>
    </Formik>
  );
};

AnswerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AnswerForm; 




