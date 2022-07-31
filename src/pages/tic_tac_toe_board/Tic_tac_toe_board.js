import React from "react";
import Board from "../../components/Board";
import "./board_styles.css"

function Tic_tac_toe_board({socket, player, competitor}) {
  return (
    <div className="board_page">
      <Board socket={socket} player={player} competitor={competitor}/>
    </div>
  );
}

export default Tic_tac_toe_board;
