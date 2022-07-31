import React from "react";
import Board from "../../components/Board";
import "./board_styles.css";

function Tic_tac_toe_board({ socket, player, competitor, name}) {
  return (
    <div className="board_segment">
      <Board socket={socket} player={player} competitor={competitor} name={name}/>
    </div>
  );
}

export default Tic_tac_toe_board;
