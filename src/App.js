import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import GameContainer from "./components/GameContainer";
import Heading from "./components/Header/Heading";
import useScript from "./use-script";

function App() {
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/tile.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/application.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/game_manager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/local_storage_manager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/grid.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/html_actuator.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/ai_input_manager.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/smart_ai.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/basic_ai.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/animframe_polyfill.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/classlist_polyfill.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/bind_polyfill.js"
  );
  useScript(
    "https://cdn.jsdelivr.net/gh/malhotra-naman/2048-automation@main/js/jquery-1.10.2.min.js"
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
