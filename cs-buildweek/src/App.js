import React from "react";
import "./App.css";
import Header from "./components/header";
import GameOfLife from "./components/game";

function App() {
  return (
    <div className="App">
      <Header />
      <GameOfLife />
    </div>
  );
}

export default App;
