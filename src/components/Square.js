import React from 'react'
import "./component_style.css"

function Square({id, onclick}) {
  return (
    <div className='square' onClick={()=>onclick(id)}>{id+1}</div>
  )
}

export default Square