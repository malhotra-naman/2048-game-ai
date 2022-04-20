import React from "react";
import "../App.css";
import GridRow from "./GridRow";

function GridContainer() {
  return (
    <div className="grid-container">
      <GridRow />
      <GridRow />
      <GridRow />
      <GridRow />
    </div>
  );
}

export default GridContainer;
