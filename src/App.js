import "./App.css";
import Tic_tac_toe_board from "./pages/tic_tac_toe_board/Tic_tac_toe_board";
import Login_screen from "./pages/login_screen/Login_screen";
import {useState} from "react"
import {io} from "socket.io-client"
const socket = io("http://localhost:5000");


function App() {
  const [Login, setLogin] = useState(null)
  function user_login(e){
    socket.emit("update_players", e.target[0].value, e.target[1].value,e.target[2].value)
    setLogin(e.target.value[0])
  }
  return (
    <div className="App">
    {Login? <Tic_tac_toe_board socket={socket}/>:<Login_screen  socket={socket} user_login={user_login}/>}
      
    </div>
  );
}

export default App;
