import React from "react";
import Square from "./Square";
import "./component_style.css";
import { useState, useEffect } from "react";

function Board({ socket, player }) {
  const [curr_player, setcurr_player] = useState();
  const [Markedarray, setMarkedarray] = useState(new Array(9).fill(null));
  const [winner, setwinner] = useState(null);
  const [Ready, setReady] = useState(false);
  function onclick(id) {
    if (!winner && Ready) {
      socket.emit("board_state_update", id);
      setMarkedarray((Markedarray) =>
        Markedarray.map((value, index) => (index === id ? player : value))
      );
    }
  }
  //useEffect(() => {}, [Markedarray]);
  socket.on("sync_board_state", (board_state, winner) => {
    console.log(board_state);
    if (board_state !== "wait for players") {
      setMarkedarray(board_state);
      setwinner(winner);
    }
  });
  socket.on("Ready", (value) => {
    setReady(value);
  });

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
