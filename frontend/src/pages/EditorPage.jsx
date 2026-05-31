import { useState } from "react";


function createGrid(rows, cols, defaultValue) {
  return Array(rows * cols).fill(defaultValue);
}

function EditorPage() {

  const canvasPresets = [
    { label: "Square", rows: 16, cols: 16 },
    { label: "Landscape", rows: 16, cols: 24 },
    { label: "Portrait", rows: 24, cols: 16 },
  ];

  const [rows, setRows] = useState(16);
  const [cols, setCols] = useState(16);
  const [visibleGrid, setVisibleGrid] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState("Square");


  const defaultValue = null;

  const canvasStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 25px)`,
  };

  const canvasWrapperStyle = {
    display: "flex",
    justifyContent: "center",
  }

  const pixelStyle = {
    width: "25px",
    height: "25px",
    padding: 0,
    border: `1px solid ${visibleGrid ? "#ddd" : "transparent"}`,
    backgroundColor: "#ffffff",
  };

  const [grid, setGrid] = useState(
    () => createGrid(rows, cols, defaultValue)
  );

  const [selectedColor, setSelectedColor] = useState("#000000");
  const [tool, setTool] = useState("paint");
  const [isDrawing, setIsDrawing] = useState(false);

  function paintPixel(index) {
    setGrid((currentGrid) => {
      const updatedGrid = [...currentGrid];
      updatedGrid[index] = tool === "erase" ? null : selectedColor;
      return updatedGrid;

    })
  }

  function clearCanvas() {
    setGrid(createGrid(rows, cols, defaultValue));
  }

  function changeCanvasSize(newRows, newCols) {
    setRows(newRows);
    setCols(newCols);
    setGrid(createGrid(newRows, newCols, defaultValue));
  }

  function handleCanvasSizeChnage(e) {
    const selectedPreset = canvasPresets.find(
      (preset) => preset.label === e.target.value
    );

    changeCanvasSize(selectedPreset.rows, selectedPreset.cols);
    setSelectedPreset(selectedPreset.label)
  }

  function changeGridVisbility(e) {
    setVisibleGrid(e.target.checked);
  }

  function getToolButtonStyle(toolName) {
    return {
      border: `2px solid ${tool === toolName ? "#cc1111" : "transparent"}`,
    };
  }


  return (
    <main>
      <h1>Editor Page</h1>

      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />

      {" "}

      <button type="button" style={getToolButtonStyle("paint")}  onClick={() => setTool("paint")}>
        Paint
      </button>

      {" "}

      <button type="button" style={getToolButtonStyle("erase")} onClick={() => setTool("erase")}>
        Erase
      </button>

      {" "}

      <button type="button" style={getToolButtonStyle("clear")} onClick={clearCanvas}>
        Clear
      </button>

      <label htmlFor="canvas-size">Canvas size</label>

      <select
        id="canvas-size"
        value={selectedPreset}
        onChange={handleCanvasSizeChnage}
      >

        {canvasPresets.map((preset) => (
          <option
            key={preset.label}
            value={preset.label}
          >
            {preset.label} ({preset.cols} x {preset.rows})
          </option>
        ))}

      </select>

      <label htmlFor="visible-grid">Visible Grid</label>
      <input
        type="checkbox"
        id="visible-grid"
        name="visible-grid"
        checked={visibleGrid}
        onChange={changeGridVisbility}
      />
      <div style={canvasWrapperStyle}>
        <div
          className="canvas"
          style={canvasStyle}
          onPointerLeave={() => setIsDrawing(false)}>
          {grid.map((pixel, index) => (
            <button
              className="pixel"
              key={index}
              type="button"
              style={{
                ...pixelStyle,
                backgroundColor: pixel || "#ffffff",
                touchAction: "none",
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                setIsDrawing(true);
                paintPixel(index);
              }}
              onPointerEnter={() => {
                if (isDrawing) {
                  paintPixel(index);
                }
              }}
              onPointerUp={() => {
                setIsDrawing(false);
              }}
            />
          ))}
        </div>
      </div>


    </main>
  );


}

export default EditorPage;