import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { UserContext } from "../context/UserContext";
import { fetchQuestions, createQuestion, deleteQuestion } from "../api/questions";
import styles from "./Home.module.scss";

const Home = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchQuestions();
        console.log("Fetched questions:", response);
        setQuestions(response);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
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
      const updatedQuestions = await fetchQuestions();
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error(`Error deleting question: ${error.message}`);
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
