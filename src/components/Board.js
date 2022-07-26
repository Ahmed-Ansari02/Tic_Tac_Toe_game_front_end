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

  function calculate_winner(arr) {
    let temp_array = [];
    for (let i = 0; i < 3; i++) {
      for (let j = i * 3; j < (i * 3 + 3); j++) {
        if (!arr[j]){
          temp_array.push("NA")
        }
        temp_array.push(arr[j]);
      }
      if (temp_array[0] === temp_array[1] && temp_array[0] === temp_array[2]) {
        console.log("winner is " + temp_array[0]);
        break;
      }
      temp_array = [];
    }
  }
  calculate_winner(Markedarray);
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
