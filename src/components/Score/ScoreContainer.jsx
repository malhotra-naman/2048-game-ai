import React from "react";
import ScoreDisplay from "./ScoreDisplay";

const ScoreContainer = () => {
  return (
    <div className="scores-container">
      <ScoreDisplay type="best" />
      <div style={{ width: "10px" }} />
      <ScoreDisplay type="score" />
    </div>
  );
};

export default ScoreContainer;
