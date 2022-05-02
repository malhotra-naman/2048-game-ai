import React from "react";
import ScoreDisplay from "./ScoreDisplay";

const ScoreContainer = () => {
  return (
    <div className="scores-container">
      <ScoreDisplay type="best" />
      <ScoreDisplay type="score" />
    </div>
  );
};

export default ScoreContainer;
