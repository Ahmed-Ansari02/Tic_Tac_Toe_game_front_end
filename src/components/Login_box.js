import React from "react";
import { useState } from "react";
let default_symbol = [
  <option name="X" key="1">
    X
  </option>,
  <option name="O" key="2">
    O
  </option>,
];

function Login_box({ socket, user_login }) {
  const [Players_list, setPlayers_list] = useState([]);
  const [Available_symbol, setAvailable_symbol] = useState([]);
  socket.on("available_players", (available_players) => {
    setPlayers_list(available_players);
  });
  let player_options = Players_list.map((item) => {
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

          if (
            Players_list.filter((value) => value.name === e.target[0].value)
              .length === 0 &&
            e.target[0].value !== ""
          ) {
            let room_id = Players_list.length
              ? Players_list.filter((value) => value.name === e.target[1].value)[0].room_id
              : socket.id;
            console.log(room_id);
            socket.emit(
              "update_players",
              e.target[0].value,
              room_id,
              e.target[2].value
            );
            user_login(e);
            return;
          } else if (e.target[0].value === "") {
            alert("Please input a name");
            return
          }

          alert(`Player name ${e.target[0].value} already taken`);
        }}>
        <input type="text" placeholder="Enter user name" name="username" />
        <div>
          <p>Select a player</p>
          <select
            name="players"
            onChange={(e) => {
              console.log();
              if (Players_list.length !== 0) {
                let symbol = Players_list.filter(
                  (value) => value.name === e.target.value
                )[0].symbol;

                setAvailable_symbol(
                  <option key="symbol_aval" name={symbol === "X" ? "O" : "X"}>
                    {symbol === "X" ? "O" : "X"}
                  </option>
                );
              }
            }}>
            <option value="" disabled selected hidden>
              select a player
            </option>
            {player_options}
          </select>
        </div>

        <div>
          <p>Select your preferred symbol</p>
          <select name="symbol">
            {Players_list.length ? Available_symbol : default_symbol}
          </select>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Login_box;
