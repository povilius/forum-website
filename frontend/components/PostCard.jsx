import PropTypes from "prop-types";
import styles from "./PostCard.module.scss";
import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PostCard = ({ question, handleDeleteQuestion }) => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.postCard}>
      <h2 className={styles.postTitle}>{question.title}</h2>
      <div className={styles.postFooter}>
        <p className={styles.postText}>{question.text}</p>
        {user && question.createdBy === user.email && (
          <Button onClick={handleDeleteQuestion}>Delete</Button>
        )}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
  }).isRequired,
  handleDeleteQuestion: PropTypes.func.isRequired,
};

export default PostCard;
