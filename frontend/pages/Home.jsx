import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import AnswerForm from "../components/AnswerForm";
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
      const question = { ...values, createdBy: user.email };
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
      // For example:
      // const response = await postAnswer(questionId, answerContent);
  
      // If you have a real API function, handle the response accordingly
      // For now, let's assume it was successful
      const fakeResponse = { status: 201, data: { answerId: "fakeId" } };
  
      if (fakeResponse.status === 201) {
        // Fetch the updated list of questions
        fetchQuestions()
          .then((response) => {
            setQuestions(response);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error("Failed to add answer:", fakeResponse.data.error);
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error adding answer:", error);
      // Handle the error as needed
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
            {user && (
              <div className={styles.answerForm}>
                <AnswerForm onSubmit={(content) => handleAddAnswer(question._id, content)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


