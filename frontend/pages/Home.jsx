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
      const question = { ...values, createdBy: user.email };
      const response = await createQuestion(question);
      setQuestions((prevQuestions) => [...prevQuestions, response]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      {isLoggedIn && <PostForm handleSubmit={handleSubmit} />}
      <div className={styles.posts}>
        {questions.map((question) => (
          <PostCard
            key={question.id}
            post={question}
            handleDeleteQuestion={() =>  handleDeleteQuestion(question.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
