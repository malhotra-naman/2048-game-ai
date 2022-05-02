import React from "react";
import ScoreContainer from "./ScoreContainer";

const Heading = () => {
  return (
    <div>
      <div className="heading">
        <h1 className="title">
          2<span style={{ color: "#c83405", whiteSpace: "nowrap" }}>0</span>48
          Automation
        </h1>
        <ScoreContainer />
      </div>

      <div className="above-game">
        <p>Watch the tiles merging into each other to the highest tile!</p>
      </div>
    </div>
  );
};

export default Heading;
