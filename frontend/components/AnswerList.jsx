import PropTypes from 'prop-types'

const AnswerList = ({ answers }) => {
  return (
    <div>
      <h3>Answers:</h3>
      <ul>
        {answers.map(answer => (
          <li key={answer._id}>{answer.content}</li>
        ))}
      </ul>
    </div>
  )
}

AnswerList.propTypes = {
  answers: PropTypes.array.isRequired,
}

export default AnswerList