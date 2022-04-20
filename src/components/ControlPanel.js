import React from "react";

function ControlPanel() {
  return (
    <div className="ai-panel">
      <button href="#" className="pause-button">
        Pause
      </button>
      <div className="ai-panel-header">AI Mode:</div>
      <label title="Fancy intelligentness">
        <input
          type="radio"
          name="ai-mode"
          className="smart-ai-button"
          checked
        />
        Smart
      </label>
      <br />
      <label title="Up, Left, Up, Left, etc.">
        <input type="radio" name="ai-mode" className="algorithm-ai-button" />
        Algorithm-based
      </label>
      <br />
      <label title="Up > Left > Right > Down">
        <input type="radio" name="ai-mode" className="priority-ai-button" />
        Priority-based
      </label>
      <br />
      <label title="Random number generator!">
        <input type="radio" name="ai-mode" className="rng-ai-button" />
        Random
      </label>
      <br />
      <div className="ai-panel-header">Speed:</div>
      <label>
        <input type="radio" name="ai-speed" className="full-speed-button" />
        Full
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="ai-speed"
          className="fast-speed-button"
          checked
        />
        Fast
      </label>
      <br />
      <label>
        <input type="radio" name="ai-speed" className="slow-speed-button" />
        Slow
      </label>
      <br />
      <div className="ai-panel-header">Tile generator:</div>
      <label>
        <input
          type="radio"
          name="ai-tilegen"
          className="random-tile-button"
          checked
        />
        Random
      </label>
      <br />
      <label>
        <input type="radio" name="ai-tilegen" className="evil-tile-button" />
        Evil
      </label>
      <br />
      <div className="ai-panel-header">Highest numbers:</div>
      <div className="stats-container"></div>
      <div className="state-panel">
        <button className="copy-button">Copy last 10</button>
        <input type="text" className="state-input" />
        <button className="load-button">Load state</button>
      </div>
    </div>
  );
}

export default ControlPanel;
