import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import GameContainer from "./components/GameContainer";
import Heading from "./components/Header/Heading";
import useScript from "./use-script";

function App() {
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/Tile.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/Application.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/GameManager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/LocalStorageManager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/Grid.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/HTMLActuator.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/ai_input_manager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/SmartAI.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/BasicAI.js"
  );
  useScript(
    "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"
  );
  return (
    <div className="container">
      <Heading />
      <GameContainer />
      <Footer />
    </div>
  );
}

export default App;
