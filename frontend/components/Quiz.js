import React from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'


import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  const { 
    quiz, 
    fetchQuiz,
    postAnswer,
    selectAnswer
   } = props

  useEffect(() => {
    fetchQuiz()
    console.log(fetchQuiz)
  }, [])

  const handleSubmit = evt => {
    evt.preventDefault()
    postAnswer({
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selectedAnswer
    })
  }

  const onClick = (id) => {
    selectAnswer(id)
    console.log(id)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                {quiz.answers[0].text}
                <button onClick={() => onClick(quiz.answers[0].answer_id)}>
                  {props.selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className="answer">
                {quiz.answers[1].text}
                <button onClick={() => onClick(quiz.answers[1].answer_id)}>
                  {props.selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(state => state, actionCreators)(Quiz)