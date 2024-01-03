import PropTypes from "prop-types";
import styles from "./PostCard.module.scss";
import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PostCard = ({ question, handleDeleteQuestion }) => {
  const { user } = useContext(UserContext);

  const onDeleteClick = () => {
    if (user && question) {
      console.log('User:', user);
      console.log('Question:', question);
  
      if (question._id === undefined || question._id === null) {
        console.error('Invalid question ID:', question._id);
      } else {
        handleDeleteQuestion(question._id);
      }
    }
  };
  
  

  return (
    <div className={styles.postCardWrapper}>
      <div className={styles.postCard}>
        <h2 className={styles.postTitle}>{question ? question.title : "Loading..."}</h2>
        <div className={styles.postFooter}>
          <p className={styles.postText}>{question ? question.content : "Loading..."}</p>
          {user && question && question.createdBy === user.email && (
            <Button onClick={onDeleteClick}>Delete</Button>
          )}
        </div>
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
  }),
  handleDeleteQuestion: PropTypes.func.isRequired,
};

export default PostCard;

