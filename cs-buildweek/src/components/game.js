import React from "react";

function GameOfLife() {
  return (
    <div className="game">
      <h3>Generation: "#"</h3>
      <div className="gameBox"></div>
      <div className="presets">
        <div className="preset">
          <div className="presetDescription"></div>
        </div>
        <div className="preset">
          <div className="presetDescription"></div>
        </div>
        <div className="preset">
          <div className="presetDescription"></div>
        </div>
        <div className="preset">
          <div className="presetDescription"></div>
        </div>
      </div>
      <div className="buttons">
        <button className="gameButton">Play</button>
        <button className="gameButton">Pause</button>
        <button className="gameButton">Stop</button>
      </div>
    </div>
  );
}

export default GameOfLife;
