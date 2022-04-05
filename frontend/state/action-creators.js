// ❗ You don't need to add extra action creators to achieve MVP
import * as actionTypes from './action-types'
import axios from 'axios'

export function moveClockwise(value) {
  return { type: actionTypes.MOVE_CLOCKWISE, payload: value }
}

export function moveCounterClockwise(value) {
  return { type: actionTypes.MOVE_COUNTERCLOCKWISE, payload: value }
}

export function selectAnswer(answer_id) {
  return { type: actionTypes.SET_SELECTED_ANSWER, payload: answer_id }
}

export function setMessage(message) {
  return { type: actionTypes.SET_INFO_MESSAGE, payload: message }
}

export function setQuiz(question) {
  return { type: actionTypes.SET_QUIZ_INTO_STATE, payload: question }
}

export function inputChange(value) {
  return { type: actionTypes.INPUT_CHANGE, payload: value }
}

export function resetForm() {
  return { type: actionTypes.RESET_FORM }
}

const URL = `http://localhost:9000/api/quiz/`

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get(`http://localhost:9000/api/quiz/next`)
      .then(res => {
        console.log(res)
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.log({ err })
      })
  }
}

export function postAnswer({ quiz_id, answer_id }) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    console.log(answer_id)
    axios.post(`http://localhost:9000/api/quiz/answer`, { quiz_id, answer_id })
      .then(res => {
        // console.log(res)
        dispatch(fetchQuiz())
        dispatch(setMessage(res.data.message))
      })
      .catch(err => {
        console.log({err})
      })
  }
}
export function postQuiz({ question_text, true_answer_text, false_answer_text }) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post(`http://localhost:9000/api/quiz/new`, { question_text, true_answer_text, false_answer_text })
      .then(res => {
        console.log(res)
        dispatch(resetForm())
        dispatch(setMessage(`${res.data.question} is a dandy question`))
      })
      .catch(res => {
        dispatch(setMessage(res.data.message))
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
