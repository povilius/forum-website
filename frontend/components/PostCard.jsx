import PropTypes from "prop-types";
import styles from "./PostCard.module.scss";
import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PostCard = ({ question, handleDeleteQuestion, }) => {
  const { user } = useContext(UserContext);


  const onDeleteClick = () => {
    if (user && question.createdBy === user.email) {
      handleDeleteQuestion(question._id);
    }
  };

  return (
    <div className={styles.postCardWrapper}>
      <div className={styles.postCard}>
        <h2 className={styles.postTitle}>{question.title}</h2>
        {question.userDetails && <p>{question.userDetails.username}</p>}
        <div className={styles.postFooter}>
          <p className={styles.postText}>{question.content}</p>
          {user && question.createdBy === user.email && (
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
    userId: PropTypes.string.isRequired,
    userDetails: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }),
  handleDeleteQuestion: PropTypes.func.isRequired,
};

export default PostCard;
