import React from 'react'
import Square from './Square'
import "./component_style.css"
import {useState, useEffect} from "react"

function Board() {
const [Squares, setSquares] = useState([])
useEffect(()=>{
    for (let i=0; i<9; i++){
        setSquares(Squares=>[...Squares,<Square label={i+1} key={i}/>])
    }
}, [])
  return (
    <div className='board'>
        {Squares}
    </div>
  )
}

export default Board