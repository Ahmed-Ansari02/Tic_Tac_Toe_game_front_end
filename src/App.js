import "./App.css";
import Tic_tac_toe_board from "./pages/tic_tac_toe_board/Tic_tac_toe_board";
import Login_screen from "./pages/login_screen/Login_box";
import Navbar from "../src/components/nav_bar/Nav_bar";
import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("https://tictac-toe-server.herokuapp.com");

function App() {
  const [Login, setLogin] = useState(null);
  const [player, setplayer] = useState();
  const [competitor, setCompetitor] = useState();
  socket.on("competitor_name", (value) => {
    setCompetitor(value);
  });
  function user_login(e) {
    //Set the player name, competitor name and current player name using React useState hooks.
    setLogin(e.target[0].value);
    setplayer(e.target[2].value);
    setCompetitor(e.target[1].value);
  }
  return (
    <div className="App">
      <Navbar /> 
      {Login ? ( //Initially renders the login screen so player can be logged in.
        <Tic_tac_toe_board
          socket={socket}
          player={player}
          competitor={competitor}
          name={Login}
        />
      ) : (
        <Login_screen socket={socket} user_login={user_login} />
      )}
    </div>
  );
}

export default App;
