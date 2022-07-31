import React from "react";
import Square from "./Square";
import "./component_style.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Board({ socket, player, competitor }) {
  const [curr_player, setcurr_player] = useState("X");
  const [Markedarray, setMarkedarray] = useState(new Array(9).fill(null));
  const [winner, setwinner] = useState(null);
  const [Ready, setReady] = useState(false);
  const [Reset, setReset] = useState(false);
  useEffect(() => {
    if (competitor) {
      toast.clearWaitingQueue();
      toast.success(`${competitor} joined your match`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [competitor]);

  function onclick(id) {
    if (!Ready) {
      toast.clearWaitingQueue();
      toast.error("Please wait for other players to join", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (!winner) {
      if (player !== curr_player) {
        toast.clearWaitingQueue();
        toast.error(`It is ${competitor}'s turn. Please await your turn`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (Ready && player === curr_player) {
        socket.emit("board_state_update", id);
        setMarkedarray((Markedarray) =>
          Markedarray.map((value, index) => (index === id ? player : value))
        );
      }
    }
  }
  if (Reset) {
    alert(
      "Oh no! your competitor has quit, you are being redirected to the login page to start a new game"
    );
    window.location.reload();
  }
  socket.on("Reset", (value) => {
    setReset(value);
  });

  socket.on("sync_board_state", (board_state, winner, player) => {
    if (board_state !== "wait for players") {
      setMarkedarray(board_state);
      setwinner(winner);
      setcurr_player(player === "X" ? "O" : "X");
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

      {winner || Markedarray.filter((value) => value !== null).length === 9 ? (
        <button
          className="rematch_btn"
          onClick={() => {
            socket.emit("rematch_req");
          }}>
          Press for rematch{" "}
        </button>
      ) : (
        <h1 className="heading">You are playing as {player}</h1>
      )}
      {competitor ? (
        <p className="heading">You are playing against {competitor}</p>
      ) : <p className="heading">Please wait for players to join</p>}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        theme="dark"
      />
    </>
  );
}

export default Board;
