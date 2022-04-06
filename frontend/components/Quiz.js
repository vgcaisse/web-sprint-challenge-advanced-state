import React from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'


import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  const {  
    fetchQuiz,
    postAnswer,
    selectAnswer,
    quiz,
   } = props

  useEffect(() => {
    fetchQuiz()
    console.log(props.selectedAnswer)
  }, [])

  const handleSubmit = evt => {
    evt.preventDefault()
    postAnswer({
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selectedAnswer
    })
  }

  const handleClick = (id) => {
    selectAnswer(id)
    // console.log(props)
  }

  const isDisabled = () => {
    if ( props.selectedAnswer === null ) {
      return true
    } else {
      return false
    }
  }

  // console.log(props.selectedAnswer)

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">

              <div className={`${props.selectedAnswer === quiz.answers[0].answer_id ? "answer selected" : "answer"}`}>
                {quiz.answers[0].text}
                <button onClick={() => handleClick(quiz.answers[0].answer_id)}>
                  {props.selectedAnswer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div className={`${props.selectedAnswer === quiz.answers[1].answer_id ? "answer selected" : "answer"}`}>
                {quiz.answers[1].text}
                <button onClick={() => handleClick(quiz.answers[1].answer_id)}>
                  {props.selectedAnswer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit} disabled={isDisabled()}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(state => state, actionCreators)(Quiz)