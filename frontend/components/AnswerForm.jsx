import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import Button from './Button';
import AnswerField from './AnswerField';

const AnswerForm = ({ onSubmit }) => {
  const initialValues = {
    content: '',
  };

  const handleFormSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      <Form>
        <div>
          <label htmlFor="content">Your Answer:</label>
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




