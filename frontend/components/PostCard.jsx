import PropTypes from "prop-types";
import styles from "./PostCard.module.scss";
import Button from "./Button";
import AnswerForm from './AnswerForm';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PostCard = ({ question, handleDeleteQuestion, handleAddAnswer }) => {
  const { user } = useContext(UserContext);

  const onDeleteClick = () => {
    if (user && question.createdBy === user.email) {
      handleDeleteQuestion(question._id);
    }
  };

  const handleAnswerSubmit = (answerContent) => {
    // Pass the answer content and question ID to the handler
    handleAddAnswer(question._id, answerContent);
  };

  return (
    <div className={styles.postCardWrapper}>
      <div className={styles.postCard}>
        <h2 className={styles.postTitle}>{question.title}</h2>
        <div className={styles.postFooter}>
          <p className={styles.postText}>{question.content}</p>
          {user && question.createdBy === user.email && (
            <Button onClick={onDeleteClick}>Delete</Button>
          )}
        </div>
        
        
        {question.answers && question.answers.length > 0 && (
          <div className={styles.answers}>
            <h3>Answers:</h3>
            {question.answers.map(answer => (
              <div key={answer._id}>
                <p>{answer.content}</p>
             
              </div>
            ))}
          </div>
        )}

        {user && (
          <div className={styles.answerForm}>
            <AnswerForm onSubmit={handleAnswerSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.object),
  }),
  handleDeleteQuestion: PropTypes.func.isRequired,
  handleAddAnswer: PropTypes.func.isRequired,
};

export default PostCard;


