import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import GameContainer from "./components/GameContainer";
import Heading from "./components/Header/Heading";
import useScript from "./use-script";

function App() {
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/tile.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/application.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/game_manager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/local_storage_manager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/grid.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/html_actuator.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/ai_input_manager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/smart_ai.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/basic_ai.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/bind_polyfill.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/animframe_polyfill.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-game-ai@main/src/services/classlist_polyfill.js"
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
