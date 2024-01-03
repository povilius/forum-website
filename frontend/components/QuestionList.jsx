
import { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';
import LikeDislikeButtons from './LikeDislikeButtons';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    // Fetch questions (answered/unanswered) and update state
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/questions/answered'); // or /questions/unanswered
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSubmit = async values => {
    // Submit answer and update state
    try {
      const response = await axios.post(`/questions/${selectedQuestion._id}/answers`, values);
      // Assuming the response contains the updated list of answers
      setSelectedQuestion(prevQuestion => ({ ...prevQuestion, answers: response.data }));
    } catch (error) {
      console.error('Error submitting answer', error);
    }
  };

  const handleLike = async answerId => {
    // Send a request to like the answer
    try {
      await axios.post(`/answers/${answerId}/like`);
      // Assuming the response contains the updated list of likes
    } catch (error) {
      console.error('Error liking answer', error);
    }
  };

  const handleDislike = async answerId => {
    // Send a request to dislike the answer
    try {
      await axios.post(`/answers/${answerId}/dislike`);
      // Assuming the response contains the updated list of dislikes
    } catch (error) {
      console.error('Error disliking answer', error);
    }
  };

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map(question => (
          <li key={question._id}>
            <h3>{question.title}</h3>
            <p>{question.content}</p>
            {question.answers ? (
              <>
                <AnswerList answers={question.answers} />
                {question.answers.map(answer => (
                  <div key={answer._id}>
                    <LikeDislikeButtons
                      onLike={() => handleLike(answer._id)}
                      onDislike={() => handleDislike(answer._id)}
                    />
                  </div>
                ))}
              </>
            ) : (
              <AnswerForm onSubmit={handleAnswerSubmit} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
