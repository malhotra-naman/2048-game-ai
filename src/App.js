import React from "react";
import "./App.css";
import GameContainer from "./components/GameContainer";
import Heading from "./components/Heading";

function App() {
  return (
    <div className="container">
      <Heading />
      <GameContainer />
    </div>
  );
}

export default App;
