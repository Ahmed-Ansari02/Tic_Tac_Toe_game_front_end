import React from "react";
import Board from "../../components/Board";
import "./board_styles.css";

function Tic_tac_toe_board({ socket, player, competitor }) {
  return (
    <div className="board_page">
      <nav className="nav">
        <h1>Tic Tac Toe </h1>
      </nav>
      <div className="board_segment">
        <Board socket={socket} player={player} competitor={competitor} />
      </div>
    </div>
  );
}

export default Tic_tac_toe_board;
