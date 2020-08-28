import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";
const rowsNum = 25;
const colsNum = 25;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const clearGrid = () => {
  const allRows = [];
  for (let i = 0; i < rowsNum; i++) {
    //set all blocks to dead
    allRows.push(Array.from(Array(colsNum), () => 0));
  }

  return allRows;
};

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    return clearGrid();
  });

  const [counter, setCounter] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runAutomaton = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < rowsNum; i++) {
          for (let k = 0; k < colsNum; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < rowsNum && newK >= 0 && newK < colsNum) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setTimeout(runAutomaton, speed);
  }, [speed]);

  const slowerAutomaton = () => {
    setSpeed(speed + 250);
  };

  const fasterAutomaton = () => {
    setSpeed(speed - 250);
  };

  useEffect(() => {
    if (running) {
      const id = window.setInterval(() => {
        setCounter((counter) => counter + 1);
      }, speed);
      return () => window.clearInterval(id);
    }
  }, [running, speed]);

  function anvil() {
    //4 rows 7 columns
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[0][1] = 1;
      gridCopy[0][2] = 1;
      gridCopy[0][3] = 1;
      gridCopy[0][4] = 1;
      gridCopy[1][0] = 1;
      gridCopy[1][6] = 1;

      gridCopy[2][1] = 1;
      gridCopy[2][2] = 1;
      gridCopy[2][3] = 1;
      gridCopy[2][5] = 1;

      gridCopy[3][3] = 1;
      gridCopy[3][5] = 1;
      gridCopy[3][6] = 1;
    });
    setGrid(newGrid);
  }

  function pinwheel() {
    gridCopy[0][7] = 1;
    gridCopy[0][8] = 1;

    gridCopy[1][7] = 1;
    gridCopy[1][9] = 1;

    gridCopy[2][7] = 1;
    gridCopy[2][10] = 1;

    gridCopy[3][2] = 1;
    gridCopy[3][7] = 1;
    gridCopy[3][10] = 1;
    gridCopy[3][11] = 1;

    gridCopy[3][3] = 1;
    gridCopy[3][5] = 1;
    gridCopy[3][6] = 1;
  }

  return (
    <div className="game">
      <div className="gameBox">
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              className="cells"
              key={`${i}-${k}`}
              onClick={
                running
                  ? null
                  : () => {
                      const newGrid = produce(grid, (gridCopy) => {
                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                      });
                      setGrid(newGrid);
                    }
              }
              style={{
                backgroundColor: grid[i][k] ? "black" : "white",
              }}
            />
          ))
        )}
        <h4>Generations:{counter}</h4>
      </div>
      <div className="presets">
        <div
          className="preset"
          onClick={() => {
            console.log("randomize");
            const rows = [];
            for (let i = 0; i < rowsNum; i++) {
              rows.push(
                Array.from(Array(colsNum), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          <span style={{ fontWeight: "bold" }}>Randomized Run</span>
          <br />
          Randomly Fills out blocks
        </div>
        <div className="preset">
          <span style={{ fontWeight: "bold" }}>Glider</span>
          <br />A classic simulation
        </div>
        <div className="preset">
          <span style={{ fontWeight: "bold" }}>
            Rotating Pinwheel(Achims's p16)
          </span>
          <br />A fun pinwheel
        </div>
        <div
          className="preset"
          onClick={(e) => {
            e.preventDefault();
            console.log("anvil");
            setGrid(clearGrid());
            anvil();
          }}
        >
          <span style={{ fontWeight: "bold" }}>Anvil</span>
          <br />
          Simple anvil start turns into chaos
        </div>
      </div>
      <div className="buttons">
        <button
          className="gameButton"
          onClick={(e) => {
            e.preventDefault();
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runAutomaton();
            }
          }}
        >
          Play/Pause
        </button>
        <button
          className="gameButton"
          onClick={(e) => {
            e.preventDefault();
            setGrid(clearGrid());
            setCounter(0);
          }}
        >
          Clear Game
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            fasterAutomaton();
          }}
        >
          Speed up Game
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            slowerAutomaton();
          }}
        >
          Slow down Game
        </button>
      </div>
    </div>
  );
};

export default Grid;
