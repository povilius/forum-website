import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
// import AnswerForm from "../components/AnswerForm";
import { createAnswer, fetchAnswers } from "../api/answers";
import { UserContext } from "../context/UserContext";
import { fetchQuestions, createQuestion, deleteQuestion } from "../api/questions";
import styles from "./Home.module.scss";

const Home = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions()
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (values) => {
    try {
      console.log("Submitting question:", values);
      const question = { ...values, createdBy: user.username };
      const response = await createQuestion(question);
      console.log("Server response:", response);
      setQuestions((prevQuestions) => [...prevQuestions, response]);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      console.log('Deleting question with ID:', id);
  
      if (id === undefined || id === null) {
        throw new Error('Invalid question ID');
      }
  
      await deleteQuestion(id);
      setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    } catch (error) {
      console.error(`Error deleting question: ${error.message}`);
    }
  };

  const handleAddAnswer = async (questionId, answerContent) => {
    try {
      console.log("Adding answer:", answerContent);

      // Call your API function to post the answer
      const response = await createAnswer(questionId, {
        content: answerContent,
        userId: user.userId, // Change this based on your user data structure
      });

      // If you have a real API function, handle the response accordingly
      if (response.message === "Answer created successfully") {
        // Fetch the updated list of answers for the current question
        const updatedAnswers = await fetchAnswers(questionId);
        // Find the question in the state and update its answers
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question._id === questionId ? { ...question, answers: updatedAnswers } : question
          )
        );
        console.log("Answer added successfully");
      } else {
        console.error("Failed to add answer:", response.error);
      }
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

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
  );
};

export default Home;


