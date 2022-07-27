import "./App.css";
import Board from "./components/Board";

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
async function get_data() {
  let res = await fetch("http://localhost:5000");
  let json = await res.json();
  console.log(json);
}
get_data();


function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
