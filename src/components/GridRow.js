import React from "react";
import "../App.css";
import GridCell from "./GridCell";

function GridRow() {
  return (
    <div className="grid-row">
      <GridCell />
      <GridCell />
      <GridCell />
      <GridCell />
    </div>
  );
}

export default GridRow;
