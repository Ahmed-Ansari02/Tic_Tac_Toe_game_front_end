import React from "react";
import { useState } from "react";

function Login_box({ socket, user_login }) {
  const [Players_list, setPlayers_list] = useState([]);
  const [Available_symbol, setAvailable_symbol] = useState();
  socket.on("available_players", (available_players) => {
    console.log(available_players);
    setPlayers_list(available_players);
  });
  let options = Players_list.map((item) => {
    return (
      <option key={item.id} name={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <div>
      <form
        className="form_box"
        onSubmit={(e) => {
          e.preventDefault();
          user_login(e);
        }}>
        <input type="text" placeholder="Enter user name" name="username" />

        <select name="players" onChange={(e)=>{
          console.log(e.target.value)
        }}>
          <option name="" disabled selected>
            Select player
          </option>
          {options}
        </select>
        <select name="symbol">
          <option name="" disabled selected>
            {" "}
            Choose your symbol
          </option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login_box;
