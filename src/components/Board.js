import React from "react";
import Square from "./Square";
import "./component_style.css";
import { useState, useEffect } from "react";

function Board() {
  const [Markedarray, setMarkedarray] = useState(new Array(9).fill(null));
  const [player, setplayer] = useState("X");
  function onclick(id) {
    setMarkedarray((Markedarray) =>
      Markedarray.map((value, index) => (index === id ? player : value))
    );
    setplayer((p) => (p === "X" ? "O" : "X"));
  }
  useEffect(() => {
    console.log(Markedarray);
  }, [Markedarray]);

 
  return (
    <>
      <h1>{`Turn of ${player}`}</h1>
      <div className="board">
        {Markedarray.map((value, index) => {
          return value ? (
            <Square id={index} key={index} marked={value} onclick={onclick} />
          ) : (
            <Square id={index} key={index} onclick={onclick} />
          );
        })}
      </div>
    </>
  );
}

export default Board;
