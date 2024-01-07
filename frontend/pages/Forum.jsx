import { useContext, useEffect, useState } from "react"
import PostCard from "../components/PostCard"
import PostForm from "../components/PostForm"
import { createAnswer, fetchAnswers } from "../api/answers"
import { UserContext } from "../context/UserContext"
import { fetchQuestions, createQuestion, deleteQuestion } from "../api/questions"
import styles from "./Forum.module.scss"

const Forum = () => {
  const { user, isLoggedIn } = useContext(UserContext)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetchQuestions()
      .then((response) => {
        setQuestions(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleSubmit = async (values) => {
    try {
      console.log("Submitting question:", values)
      const question = { ...values, createdBy: user.userId }

      const response = await createQuestion(question)
      console.log("Server response:", response)
      setQuestions((prevQuestions) => [...prevQuestions, response])
    } catch (error) {
      console.error("Error submitting question:", error)
    }
  }

  const handleDeleteQuestion = async (id) => {
    try {
      console.log('Deleting question with ID:', id)
      await deleteQuestion(id)
      setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id))
    } catch (error) {
      console.error(`Error deleting question: ${error.message}`)
    }
  }

  const handleAddAnswer = async (questionId, answerContent) => {
    try {
      console.log("Adding answer:", answerContent)
      const response = await createAnswer(questionId, {
        content: answerContent,
        userId: user.userId,
      })

      if (response.message === "Answer created successfully") {
        const updatedAnswers = await fetchAnswers(questionId)
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question._id === questionId ? { ...question, answers: updatedAnswers } : question
          )
        )
        console.log("Answer added successfully")
      } else {
        console.error("Failed to add answer:", response.error)
      }
    } catch (error) {
      console.error("Error adding answer:", error)
    }
  };
  console.log(user)
 

  return (
    <div className={styles.container}>
      {isLoggedIn && <PostForm handleSubmit={handleSubmit} id={""} />}
      <div className={styles.posts}>
        {questions.map((question) => (
          <div key={question._id}>
            <PostCard
              question={question}
              handleDeleteQuestion={handleDeleteQuestion}
              handleAddAnswer={handleAddAnswer}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forum