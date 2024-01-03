
import PropTypes from 'prop-types';
import { Button } from './Button';

const LikeDislikeButtons = ({ onLike, onDislike }) => {
  return (
    <div>
      <Button onClick={onLike}>Like</Button>
      <Button onClick={onDislike}>Dislike</Button>
    </div>
  );
};

LikeDislikeButtons.propTypes = {
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default LikeDislikeButtons;
