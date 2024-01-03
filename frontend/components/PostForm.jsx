import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";
import Button from "../components/Button";
import PropTypes from "prop-types";
import styles from "./PostForm.module.scss";

const postSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required")
});

const PostForm = ({ handleSubmit, id }) => {
  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      onSubmit={(values) => handleSubmit(values, id)}
      validationSchema={postSchema}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <FormField label="Title" name="title" placeholder="Enter title"  />
          </div>
          <div className={styles.field}>
            <FormField label="Question" name="content" placeholder="Enter question" />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Post
          </Button>
        </Form>
      )}
    </Formik>
  );
};

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default PostForm;
