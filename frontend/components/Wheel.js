import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Wheel(props) {
  const {
    moveClockwise,
    moveCounterClockwise,
    wheel
  } = props

  const handleClock = (e) => {
     const { value } = e.target
     moveClockwise(value)
     console.log(props)
  }

  const handleCounterClock = (e) => {
    const { value } = e.target
    moveCounterClockwise(value)
     console.log(props)
 }
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`${wheel === 0 ? 'cog active' : 'cog'}`} style={{ '--i': 0 }}>{wheel === 0 ? 'B' : ''}</div>
        <div className={`${wheel === 1 ? 'cog active' : 'cog'}`} style={{ '--i': 1 }}>{wheel === 1 ? 'B' : ''}</div>
        <div className={`${wheel === 2 ? 'cog active' : 'cog'}`} style={{ '--i': 2 }}>{wheel === 2 ? 'B' : ''}</div>
        <div className={`${wheel === 3 ? 'cog active' : 'cog'}`} style={{ '--i': 3 }}>{wheel === 3 ? 'B' : ''}</div>
        <div className={`${wheel === 4 ? 'cog active' : 'cog'}`} style={{ '--i': 4 }}>{wheel === 4 ? 'B' : ''}</div>
        <div className={`${wheel === 5 ? 'cog active' : 'cog'}`} style={{ '--i': 5 }}>{wheel === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClock}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClock}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(state => state, actionCreators)(Wheel)