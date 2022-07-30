import React from "react";
import Square from "./Square";
import "./component_style.css";
import { useState, useEffect } from "react";

function Board({ socket, player }) {
  const [curr_player, setcurr_player] = useState("X");
  const [Markedarray, setMarkedarray] = useState(new Array(9).fill(null));
  const [winner, setwinner] = useState(null);
  const [Ready, setReady] = useState(false);
  function onclick(id) {
    if (Markedarray.find((element) => element !== null)) {
      socket.emit("board_state_update", Markedarray);
    }
    if (!winner && Ready) {
      setMarkedarray((Markedarray) =>
        Markedarray.map((value, index) => (index === id ? player : value))
      );
    }
  }
  //useEffect(() => {}, [Markedarray]);
  socket.on("sync_board_state", (board_state, player) => {
    console.log(board_state);
    if (board_state !== "wait for players") {
      setMarkedarray(board_state);
      setcurr_player(player);
    }
  });
  socket.on("Ready", (value, id) => {
    setReady(value);
  });
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
        {winner ? `winner is ${winner} !` : `Turn of ${curr_player}`}
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
