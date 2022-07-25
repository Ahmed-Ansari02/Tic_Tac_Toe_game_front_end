import React from "react";
import Square from "./Square";
import "./component_style.css";

import { useState, useEffect } from "react";
let Squares = [];
function Board() {
  let player;
  const [marked, setmarked] = useState([]);
  function setMarked(id) {
    player = player === "X" ? "O" : "X";
    setmarked((marked) => [...marked, { id, player: player }]);
  }
  useEffect(() => console.log(marked, player), [marked]);

  if (Squares.length === 0) {
    for (let i = 0; i < 9; i++) {
      Squares = [...Squares, <Square id={i} key={i} onclick={setMarked} />];
    }
  }
  return <div className="board">{Squares}</div>;
}

export default Board;
