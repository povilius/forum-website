
import { useEffect, useState } from 'react'
import api from '../services/api'

const Home = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/questions')
        setQuestions(response.data)
      } catch (error) {
        console.error('Error fetching questions:', error.response.data.error)
      }
    }

    fetchQuestions()
  }, [])

  return (
    <div>
      <h2>Home</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <p>{question.title}</p>
            <p>{question.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home
