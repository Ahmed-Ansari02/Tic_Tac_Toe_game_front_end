import React from "react";
import Square from "./Square";
import "./component_style.css";
import { useState, useEffect } from "react";

function Board({socket}) {
  const [Markedarray, setMarkedarray] = useState(new Array(9).fill(null));
  const [player, setplayer] = useState("X");
  const [winner, setwinner] = useState(null);
  function onclick(id) {
    if (!winner) {
      setMarkedarray((Markedarray) =>
        Markedarray.map((value, index) => (index === id ? player : value))
      );
      setplayer((p) => (p === "X" ? "O" : "X"));
    }
  }
  useEffect(() => {
    socket.volatile.emit("board_state_update", Markedarray)
    console.log(Markedarray)
  },[Markedarray]);
  socket.on("sync_board_state", board_state=>{
    console.log(board_state)
    //setMarkedarray(board_state)
  })

  function calculate_winner(arr) {
    if (!winner) {
      for (let i = 0; i < 3; i++) {
        let index = 3 * i;
        if (!arr[index]) {
          continue;
        }
        if (arr[index] === arr[index + 1] && arr[index] === arr[index + 2]) {
          console.log("winner is (horizontally)" + arr[index]);
          setwinner(arr[index]);
          break;
        }
      }
      for (let i = 0; i < 3; i++) {
        let index = i;
        if (!arr[index]) {
          continue;
        }
        if (arr[index] === arr[index + 3] && arr[index] === arr[index + 6]) {
          console.log("winner is (vertically)" + arr[index]);
          setwinner(arr[index]);
          break;
        }
      }
      if (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== null) {
        console.log("winner (diagonally)" + arr[0]);
        setwinner(arr[0]);
      }

      if (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== null) {
        console.log("winner (diagonally)" + arr[2]);
        setwinner(arr[2]);
      }
    }
  }
  calculate_winner(Markedarray);

  return (
    <>
      <h1 className="heading">
        {winner ? `winner is ${winner} !` : `Turn of ${player}`}
      </h1>
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
