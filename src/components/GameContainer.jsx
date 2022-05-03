import React from "react";
import ControlPanel from "./ControlPanel";
import GameMessage from "./GameMessage";
import GridContainer from "./Grid/GridContainer";
import TileContainer from "./TileContainer";

const GameContainer = () => {
  return (
    <div className="game-container">
      <GameMessage />
      <GridContainer />
      <TileContainer />
      <ControlPanel />
    </div>
  );
};

export default GameContainer;
