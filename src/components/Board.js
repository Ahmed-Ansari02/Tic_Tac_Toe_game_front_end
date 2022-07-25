import React from "react";
import Square from "./Square";
import "./component_style.css";
import { useState } from "react";
let Squares = [];
function Board({setMarked, marked}) {
  function onclick(id) {
    setMarked(id);
  }
  if (Squares.length===0) {
    for (let i = 0; i < 9; i++) {
      Squares = [...Squares, <Square id={i} key={i} onclick={onclick} />];
    }
  }
  return <div className="board">{Squares}</div>;
}

export default Board;
