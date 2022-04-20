import React from "react";
import "../App.css";
import ControlPanel from "./ControlPanel";
import GameMessage from "./GameMessage";
import GridContainer from "./GridContainer";
import TileContainer from "./TileContainer";

function GameContainer() {
  return (
    <div className="game-container">
      <GameMessage />
      <GridContainer />
      <TileContainer />
      <ControlPanel />
    </div>
  );
}

export default GameContainer;
