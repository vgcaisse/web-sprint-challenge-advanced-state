import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const {
    inputChange,
    postQuiz,
    form
  } = props

  const onChange = evt => {
    const { value, id } = evt.target
    const newQuestion = { ...form, [id]: value }
    inputChange(newQuestion)
    console.log(newQuestion)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz({
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer
    })
    console.log(props.form)
  }

  const isDisabled = () => {
    if (
      form.newQuestion.trim().length > 0 &&
      form.newTrueAnswer.trim().length > 0 &&
      form.newFalseAnswer.trim().length > 0
    ) {
      return false
    } else {
      return true
    }
  }
  
  // const isDisabled = () => {
  //   // ✨ implement
  //   // Trimmed username must be >= 3, and
  //   // trimmed password must be >= 8 for
  //   // the button to become enabled
  //   if(values.username.trim().length >= 3 && values.password.trim().length >= 8) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value={form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={form.newFalseAnswer} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={isDisabled()}>Submit new quiz</button>
    </form>
  )
}

export default connect(state => state, actionCreators)(Form)
