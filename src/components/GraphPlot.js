import React from "react";
import Plot from "react-plotly.js";

const GraphPlot = ({ data }) => {
  return (
    <Plot
      data={data}
      layout={{
        title: "Graphing Calculator",
        xaxis: { title: "X-Axis" },
        yaxis: { title: "Y-Axis" },
        responsive: true,
      }}
      style={{ width: "100%", height: "30px" }}
      useResizeHandler
    />
  );
};

export default GraphPlot;
