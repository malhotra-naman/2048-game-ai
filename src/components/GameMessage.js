import React from "react";
import "../App.css";

function GameMessage() {
  return (
    <div className="game-message">
      <p></p>
      <div className="lower">
        <button href="#" className="keep-playing-button">
          Keep going
        </button>
        <button className="retry-button">Try again</button>
      </div>
    </div>
  );
}

export default GameMessage;
