import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import PopKeyboard from './PopKeyboard'; // Import PopKeyboard
import EquationInput from './components/EquationInput'; // Import the correct path to EquationInput
import { evaluate, range } from 'mathjs';  // Import mathjs functions
import './App.css';
import GeoGebraInterface from './components/GeoGebraInterface';


function App() {
  const [expression, setExpression] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleInputChange = (e) => {
    setExpression(e.target.value);
  };

  const handleSubmit = () => {
    plotGraph();
  };
  const App = () => {
    return <GeoGebraInterface />;
  };

  const plotGraph = () => {
    try {
      const xValues = range(-10, 10, 0.5).toArray();  // Correct usage of range
      const yValues = xValues.map((x) => evaluate(expression, { x }));  // Correct usage of evaluate
      const newTableData = xValues.map((x, i) => ({ x, fx: yValues[i] }));

      setGraphData([
        {
          x: xValues,
          y: yValues,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: '#007bff' },
          name: expression,
        },
      ]);

      setTableData(newTableData);
      setShowKeyboard(false); // Hide keyboard after plotting
    } catch (error) {
      alert('Invalid Expression. Please check syntax!');
    }
  };

  return (
    <div className="app">
      <h1 className="title">Graphing Calculator</h1>

      <div className="input-section">
        <EquationInput
          value={expression}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          setExpression={setExpression}
          setShowKeyboard={setShowKeyboard}
        />
        <button onClick={() => setShowKeyboard(true)}></button>
      </div>

      <div className="graph-section">
        <Plot
          data={graphData}
          layout={{
            title: 'Graph',
            xaxis: { title: 'X-Axis', showgrid: true, zeroline: true },
            yaxis: { title: 'Y-Axis', showgrid: true, zeroline: true },
            plot_bgcolor: '#f9f9f9',
          }}
          style={{ width: '100%', height: '60vh' }}
        />
      </div>

      <div className="table-section">
        <h3>Values Table</h3>
        <table>
          <thead>
            <tr>
              <th>X</th>
              <th>f(X)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.x}</td>
                <td>{row.fx.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showKeyboard && (
        <PopKeyboard onInputChange={setExpression} onClose={() => setShowKeyboard(false)} />
      )}
    </div>
  );
}


export default App;
