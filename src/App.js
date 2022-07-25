import "./App.css";
import Board from "./components/Board";
import { useState, useEffect } from "react";

function App() {
  let player;
  const [marked, setmarked] = useState([]);
  function setMarked(id) {
    player = player === "X" ? "O" : "X";
    setmarked((marked) => [...marked, { id, player: player }]);
  }
  useEffect(() => console.log(marked, player), [marked]);
  return (
    <div className="App">
      <Board setMarked={setMarked} marked={marked}/>
    </div>
  );
}

export default App;
