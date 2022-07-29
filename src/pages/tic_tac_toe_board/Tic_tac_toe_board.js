import React from "react";
import Board from "../../components/Board";

function Tic_tac_toe_board({socket}) {
  return (
    <div>
      <Board socket={socket}/>
    </div>
  );
}

export default Tic_tac_toe_board;
