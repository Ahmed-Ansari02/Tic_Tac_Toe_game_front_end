import React from "react";
import Square from "./Square";
import "./component_style.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Board({ socket, player, competitor, name }) {
  const [curr_player, setcurr_player] = useState("X");
  const [Markedarray, setMarkedarray] = useState(new Array(9).fill(null));
  const [winner, setwinner] = useState(null);
  const [Ready, setReady] = useState(false);
  const [Reset, setReset] = useState(false);
  const [Winnings, setWinnings] = useState();
  useEffect(() => {
    if (competitor) {    //if a player joins an awaiting players room , a toast message is displayed.
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

  function onclick(id) {  //handles what happens when the Tic Toe board is interacted with
  
    if (!Ready) {     //if  no other player has joined the room, then ask player to wait for players to join.
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
      if (player !== curr_player) {    //if it isnt the players the turn then display a toast asking player to await their turn.
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
      if (Ready && player === curr_player) { //if room has two players and its is the players turn then allow the array storing the board state to be updated.
        socket.emit("board_state_update", id);
        setMarkedarray((Markedarray) =>
          Markedarray.map((value, index) => (index === id ? player : value))
        );
      }
    }
  }
  if (Reset) { //if one player quits then display message saying that the competitor has quit and game window will reload.
    alert(
      "Oh no! your competitor has quit, you are being redirected to the login page to start a new game"
    );
    window.location.reload();
  }
  socket.on("Reset", (value) => {
    setReset(value);
  });

  socket.on("sync_board_state", (board_state, winner, player) => { //Update the local board state to mirror the shared board state in the server whenever the competitor chooses a box to mark.
    if (board_state !== "wait for players") {
      setMarkedarray(board_state);
      setwinner(winner);
      setcurr_player(player === "X" ? "O" : "X");
    }
  });
  socket.on("Ready", (value) => {
    setReady(value);
  });
  socket.on("score_count", (score_obj) => {
    setWinnings(
      <p className="heading">
        Score: {name}: {score_obj[player]} & {competitor}:{" "}
        {score_obj[player === "X" ? "O" : "X"]}
      </p>
    );
  });

  return ( //handles rending of the UI
    <>   
      {Winnings}
      <h1 className="heading">
        {winner ? `winner is ${winner} !` : `Turn of ${curr_player}`}
      </h1>
      <div className="board">  
        {Markedarray.map((value, index) => {
          return value ? ( //conditionally renders the squares on the board grid based on if they are unmarked or marked with an X or O.
            <Square id={index} key={index} marked={value} onclick={onclick} />
          ) : (
            <Square id={index} key={index} onclick={onclick} />
          );
        })}
      </div>

      {winner || Markedarray.filter((value) => value !== null).length === 9 ? (  //if all squares on board are filled or a winner has been determined then render rematch button.
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
      ) : (
        <p className="heading">Please wait for players to join</p>
      )}
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
