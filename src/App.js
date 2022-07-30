import "./App.css";
import Tic_tac_toe_board from "./pages/tic_tac_toe_board/Tic_tac_toe_board";
import Login_screen from "./pages/login_screen/Login_screen";
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
let player;

function App() {
  const [Login, setLogin] = useState(null);
  const [player, setplayer] = useState()
  function user_login(e) {
    setLogin(e.target[0].value);
    setplayer(e.target[2].value);
  }
  return (
    <div className="App">
      {Login ? (
        <Tic_tac_toe_board socket={socket} player={player} />
      ) : (
        <Login_screen socket={socket} user_login={user_login} />
      )}
    </div>
  );
}

export default App;
