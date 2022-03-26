import React from 'react'
import { connect } from 'react-redux'
import { useEffect } from 'react'


import * as actionCreators from '../state/action-creators'

function Quiz(props) {
  const { quiz, fetchQuiz } = props

  useEffect(() => {
      fetchQuiz()
      console.log(fetchQuiz)
    }, [])
    
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>YoYO</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                {quiz.answer}
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
                An elephant
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(state => state, actionCreators)(Quiz)