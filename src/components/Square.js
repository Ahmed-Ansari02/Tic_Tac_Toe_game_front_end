import React from "react";
import "./component_style.css";

function Square({ id, marked, onclick }) {
  return (
    <div
      className="square"
      onClick={() => {
        if (!marked) {
          onclick(id);
        }
      }}>
      {marked ? marked:""}
    </div>
  );
}

export default Square;
