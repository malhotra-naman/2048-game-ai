import React from "react";
import "../App.css";
import ScoreContainer from "./ScoreContainer";

function Heading() {
  return (
    <div>
      <div className="heading">
        <h1 className="title">2048 AI</h1>
        <ScoreContainer />
      </div>
      <div className="above-game">
        <p>Watch the AI join the numbers and get to the highest tile it can!</p>
      </div>
    </div>
  );
}

export default Heading;
