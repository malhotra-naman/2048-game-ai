import React, { useState } from "react";

const ControlPanel = () => {
  const [mode, setMode] = useState({
    s1: true,
    s2: false,
    s3: false,
    s4: false,
  });
  const [speed, setSpeed] = useState({ s1: false, s2: true, s3: false });
  const [isEvil, setIsEvil] = useState(false);
  return (
    <div className="ai-panel">
      <a className="pause-button">Pause</a>
      <div className="ai-panel-header">Modes:</div>
      <label title="Fancy intelligentness">
        <input
          type="radio"
          name="ai-mode"
          className="smart-ai-button"
          onClick={() => setMode({ s1: true, s2: false, s3: false, s4: false })}
          checked={mode.s1}
        />
        Smart
      </label>
      <br />
      <label title="Up, Left, Up, Left, etc.">
        <input
          type="radio"
          name="ai-mode"
          className="algorithm-ai-button"
          onClick={() => setMode({ s1: false, s2: true, s3: false, s4: false })}
          checked={mode.s2}
        />
        Algorithm-based
      </label>
      <br />
      <label title="Up > Left > Right > Down">
        <input
          type="radio"
          name="ai-mode"
          className="priority-ai-button"
          onClick={() => setMode({ s1: false, s2: false, s3: true, s4: false })}
          checked={mode.s3}
        />
        Priority-based
      </label>
      <br />
      <label title="Random number generator!">
        <input
          type="radio"
          name="ai-mode"
          className="rng-ai-button"
          onClick={() => setMode({ s1: false, s2: false, s3: false, s4: true })}
          checked={mode.s4}
        />
        Random
      </label>
      <br />
      <div className="ai-panel-header">Speed:</div>
      <label>
        <input
          type="radio"
          name="ai-speed"
          className="full-speed-button"
          checked={speed.s1}
          onClick={() => {
            setSpeed({ s1: true, s2: false, s3: false });
          }}
        />
        Full
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="ai-speed"
          className="fast-speed-button"
          checked={speed.s2}
          onClick={() => {
            setSpeed({ s1: false, s2: true, s3: false });
          }}
        />
        Fast
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="ai-speed"
          className="slow-speed-button"
          checked={speed.s3}
          onClick={() => {
            setSpeed({ s1: false, s2: false, s3: true });
          }}
        />
        Slow
      </label>
      <br />
      <div className="ai-panel-header">Tile generator:</div>
      <label>
        <input
          type="radio"
          name="ai-tilegen"
          className="random-tile-button"
          checked={!isEvil}
          onClick={() => {
            setIsEvil(false);
          }}
        />
        Random
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="ai-tilegen"
          className="evil-tile-button"
          checked={isEvil}
          onClick={() => {
            setIsEvil(true);
          }}
        />
        Evil
      </label>
      <br />
    </div>
  );
};

export default ControlPanel;
