import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import GameContainer from "./components/GameContainer";
import Heading from "./components/Heading";

function App() {
  return (
    <div className="container">
      <Heading />
      <GameContainer />
      <Footer />
    </div>
  );
}

export default App;
