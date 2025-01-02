import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import "../../node_modules/jsxgraph/distrib/jsxgraph.css";
import JXG from "jsxgraph";

const GeoGebraInterface = () => {
  const boardRef = useRef(null); // Reference for the JSXGraph board
  const [tool, setTool] = useState(""); // State to track the selected tool

  useEffect(() => {
    // Initialize the JSXGraph board
    if (!boardRef.current) {
      const board = JXG.JSXGraph.initBoard("jxgbox", {
        boundingbox: [-10, 10, 10, -10], // [xMin, yMax, xMax, yMin]
        axis: true,
        grid: true,
        showCopyright: false,
      });

      // Add sample objects (can be removed if unnecessary)
      board.create("point", [1, 1], { name: "A", color: "blue" });
      board.create("line", [[-5, -5], [5, 5]], { strokeColor: "green" });

      boardRef.current = board;
    }
  }, []);

  const handleToolClick = (selectedTool) => {
    setTool(selectedTool); // Update the selected tool
    if (boardRef.current) {
      const board = boardRef.current;

      // Perform actions based on the selected tool
      if (selectedTool === "Point") {
        board.create("point", [Math.random() * 10 - 5, Math.random() * 10 - 5], {
          name: `P${Math.random().toFixed(2)}`,
          color: "blue",
        });
      } else if (selectedTool === "Line") {
        board.create("line", [
          [Math.random() * -5, Math.random() * 5],
          [Math.random() * 5, Math.random() * -5],
        ]);
      } else if (selectedTool === "Circle") {
        board.create("circle", [
          [Math.random() * 5 - 2.5, Math.random() * 5 - 2.5],
          Math.random() * 3 + 1,
        ]);
      }
    }
  };

  const resetBoard = () => {
    if (boardRef.current) {
      boardRef.current.clearAll();
      boardRef.current.fullUpdate();
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Toolbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GeoGebra-Like Interface
          </Typography>
          <Button color="inherit" onClick={resetBoard}>
            Reset
          </Button>
        </Toolbar>
      </AppBar>

      {/* Toolbar for Math Tools */}
      <Box
        sx={{
          padding: "8px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          gap: "8px",
        }}
      >
        <Button
          variant={tool === "Point" ? "contained" : "outlined"}
          onClick={() => handleToolClick("Point")}
        >
          Point
        </Button>
        <Button
          variant={tool === "Line" ? "contained" : "outlined"}
          onClick={() => handleToolClick("Line")}
        >
          Line
        </Button>
        <Button
          variant={tool === "Circle" ? "contained" : "outlined"}
          onClick={() => handleToolClick("Circle")}
        >
          Circle
        </Button>
        <Button variant="outlined" onClick={resetBoard}>
          Reset
        </Button>
      </Box>

      {/* Graphing Canvas */}
      <Box
        id="jxgbox"
        sx={{
          flexGrow: 1,
          border: "1px solid #ccc",
          margin: "16px",
          position: "relative",
        }}
      />
    </Box>
  );
};

export default GeoGebraInterface;
