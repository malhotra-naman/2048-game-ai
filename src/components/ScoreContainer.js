import React from "react";
import "../App.css";
import ScoreDisplay from "./ScoreDisplay";

function ScoreContainer() {
  return (
    <div className="scores-container">
      <ScoreDisplay type="best" />
      <ScoreDisplay type="score" />
    </div>
  );
}

export default ScoreContainer;
