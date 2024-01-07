import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormField from "./FormField"
import Button from "../components/Button"
import PropTypes from "prop-types"
import styles from "./PostForm.module.scss"
import { ThemeContext } from "../context/ThemeContext"
import { useContext } from "react"

const postSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required")
})

const PostForm = ({handleSubmit, _id, createdBy})=>{

  const { isDarkMode } = useContext(ThemeContext)

  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      onSubmit={(values) => handleSubmit(values, _id, createdBy)}
      validationSchema={postSchema}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div style={{ color: isDarkMode ? "white" : "inherit" }} className={styles.field}>
            <FormField label="Title" name="title" placeholder="Enter title"  />
          </div>
          <div style={{ color: isDarkMode ? "white" : "inherit" }} className={styles.field}>
            <FormField label="Question" name="content" placeholder="Enter question" />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Post
          </Button>
        </Form>
      )}
    </Formik>
  )
}

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  _id: PropTypes.string,
  title: PropTypes.string,
  createdBy: PropTypes.string
}

export default PostForm