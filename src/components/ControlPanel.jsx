import React from "react";

const ControlPanel = () => {
  return (
    <div className="ai-panel">
      <a className="pause-button">Pause</a>
      <div className="ai-panel-header">Modes:</div>
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
    </div>
  );
};

export default ControlPanel;
