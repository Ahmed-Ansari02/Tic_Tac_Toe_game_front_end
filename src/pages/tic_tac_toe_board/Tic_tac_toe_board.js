import React from "react";
import Board from "../../components/Board";

function Tic_tac_toe_board({socket, player}) {
  return (
    <div>
      <Board socket={socket} player={player}/>
    </div>
  );
}

export default Tic_tac_toe_board;
