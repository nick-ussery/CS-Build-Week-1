import React from "react";
import "./App.css";
import Header from "./components/header";
import GameOfLife from "./components/game";

function App() {
  return (
    <div className="App">
      <Header />
      <GameOfLife />
      <div>
        <h3>About this Algorithm:</h3>
        <p>
          Conway's Game of Life is a simulation experiement based on 2 primary
          rules. The rules of how to live and stay alive. The simulation was
          first widely known in 1970 when it was published in a science journal.
          Since then it has become a popular Computer Science experiement with
          thousands of available designs on the web to use!
        </p>
        <p>
          Rule 1: If the cell is alive and has 2 or 3 neighbors, then it remains
          alive. Else it dies. <br />
          Rule 2: If the cell is dead and has exactly 3 neighbors, then it comes
          to life. Else if remains dead.
        </p>
      </div>
    </div>
  );
}

export default App;
