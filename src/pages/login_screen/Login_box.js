import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login_screen_style.css";
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
  const [Available_symbol, setAvailable_symbol] = useState([]); //stores list of all available players to select from.
  socket.on("available_players", (available_players) => {
    //whenever a new player enters the game, list of available players updates to include them.
    setPlayers_list(available_players);
  });
  let player_options = Players_list.map((item) => {
    //Displays all options for players to choose from in the form of a drop down list.
    return (
      <option key={item.id} name={item.id}>
        {item.name}
      </option>
    );
  });
  return (
    <div className="login_screen">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();

          if (
            //login the new player if the name is not blank space and name has not been taken by another player.
            Players_list.filter((value) => value.name === e.target[0].value)
              .length === 0 &&
            e.target[0].value !== ""
          ) {
            let room_id = Players_list.length
              ? Players_list.filter(
                  (value) => value.name === e.target[1].value
                )[0].room_id
              : socket.id;

            socket.emit(
              "update_players",
              e.target[0].value,
              room_id,
              e.target[2].value
            );
            
            
            user_login(e);
            return;
          } 
          else if (e.target[0].value === "") { //prevents users adding no name
            toast.error(`Please input a name`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }
          toast.error(`Player name ${e.target[0].value} already taken`, { //alerts users that name is already taken.
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }}>
        <input
          type="text"
          placeholder="Enter user name"
          name="username"
          className="input_box"
        />
        <div hidden={!Players_list.length}> 
          <p>Select a player</p> 
          <select
            className="input_box"
            name="players"
            onChange={(e) => {
              if (Players_list.length !== 0) {
                let symbol = Players_list.filter(
                  (value) => value.name === e.target.value
                )[0].symbol;

                setAvailable_symbol(   //Player symbol is auto selected based on the player that they choose.
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
          {!Players_list.length ? (
            <p>Select your preferred symbol</p>  //let player choose symbol if no one is in list of available player list.
          ) : (
            <p>Your symbol will be</p>
          )}
          <select name="symbol" className="input_box black_font">
            {Players_list.length ? Available_symbol : default_symbol}  
          </select>
        </div>

        <button className="btn_basic">Enter</button> 
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        theme="dark"
      />
    </div>
  );
}

export default Login_box;
