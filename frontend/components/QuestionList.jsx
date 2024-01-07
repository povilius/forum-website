import { useState, useEffect } from 'react'
import axios from 'axios'
import AnswerForm from './AnswerForm'
import AnswerList from './AnswerList'
import LikeDislikeButtons from './LikeDislikeButtons'

const QuestionList = () => {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/questions/answered')
        setQuestions(response.data)
      } catch (error) {
        console.error('Error fetching questions', error)
      }
    }

    fetchQuestions()
  }, [])

  const handleAnswerSubmit = async values => {
    try {
      const response = await axios.post(`/questions/${selectedQuestion._id}/answers`, values)
      setSelectedQuestion(prevQuestion => ({ ...prevQuestion, answers: response.data }))
    } catch (error) {
      console.error('Error submitting answer', error)
    }
  }

  const handleLike = async answerId => {
    try {
      await axios.post(`/answers/${answerId}/like`)
    } catch (error) {
      console.error('Error liking answer', error)
    }
  }

  const handleDislike = async answerId => {
    try {
      await axios.post(`/answers/${answerId}/dislike`)
    } catch (error) {
      console.error('Error disliking answer', error)
    }
  }

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
  )
}

export default QuestionList