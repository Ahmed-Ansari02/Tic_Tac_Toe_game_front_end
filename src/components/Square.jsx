import React from 'react'
import "./component_style.css"

function Square({label}) {
  return (
    <div className='square'>{label}</div>
  )
}

export default Square