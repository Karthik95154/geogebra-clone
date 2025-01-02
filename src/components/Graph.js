import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = ({ expression }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Setup graph dimensions
    const width = 500;
    const height = 500; // Made square like GeoGebra
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the main container group with transform
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Setup scales
    const x = d3.scaleLinear()
      .domain([-10, 10])
      .range([0, innerWidth]);
    
    const y = d3.scaleLinear()
      .domain([-10, 10])
      .range([innerHeight, 0]);

    // Add grid lines
    const gridLines = g => {
      g.selectAll('line')
        .data(y.ticks())
        .join('line')
        .attr('class', 'grid-line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', d => y(d))
        .attr('y2', d => y(d))
        .attr('stroke', '#e0e0e0')
        .attr('stroke-width', 0.5);

      g.selectAll('line')
        .data(x.ticks())
        .join('line')
        .attr('class', 'grid-line')
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('x1', d => x(d))
        .attr('x2', d => x(d))
        .attr('stroke', '#e0e0e0')
        .attr('stroke-width', 0.5);
    };

    // Add grid
    g.append('g').call(gridLines);

    // Add axes
    const xAxis = d3.axisBottom(x)
      .ticks(10)
      .tickSize(6)
      .tickPadding(8);
    
    const yAxis = d3.axisLeft(y)
      .ticks(10)
      .tickSize(6)
      .tickPadding(8);

    // Add x-axis
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${y(0)})`)
      .call(xAxis)
      .select('.domain')
      .attr('stroke', '#666')
      .attr('stroke-width', 1.5);

    // Add y-axis
    g.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${x(0)},0)`)
      .call(yAxis)
      .select('.domain')
      .attr('stroke', '#666')
      .attr('stroke-width', 1.5);

    // Style axis lines and ticks
    svg.selectAll('.tick line')
      .attr('stroke', '#666')
      .attr('stroke-width', 1);

    svg.selectAll('.tick text')
      .attr('font-size', '12px')
      .attr('font-family', 'Arial');

    // Plot function
    if (expression) {
      const line = d3
        .line()
        .x(d => x(d.x))
        .y(d => y(d.y))
        .curve(d3.curveMonotoneX); // Smoother curve like GeoGebra

      const data = [];
      for (let i = -10; i <= 10; i += 0.1) {
        const xValue = i;
        try {
          const yValue = eval(expression.replace(/x/g, `(${xValue})`));
          if (!isNaN(yValue) && isFinite(yValue)) {
            data.push({ x: xValue, y: yValue });
          }
        } catch (error) {
          console.error('Error evaluating expression:', error);
        }
      }

      g.append('path')
        .datum(data)
        .attr('class', 'function-line')
        .attr('fill', 'none')
        .attr('stroke', '#2196F3')
        .attr('stroke-width', 2)
        .attr('d', line);
    }
  }, [expression]);

  return (
    <div className="geogebra-container">
      <svg 
        ref={svgRef} 
        width="500" 
        height="500" 
        style={{
          backgroundColor: '#FFF',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      />
      <style jsx>{`
        .geogebra-container {
          padding: 20px;
          background: #f5f5f5;
          border-radius: 10px;
          font-family: Arial, sans-serif;
        }
        
        :global(.function-line) {
          transition: stroke-width 0.2s;
        }
        
        :global(.function-line:hover) {
          stroke-width: 3;
        }
        
        :global(.grid-line) {
          opacity: 0.5;
        }
        
        :global(.x-axis path),
        :global(.y-axis path) {
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        :global(.tick text) {
          fill: #666;
        }
        
        :global(.tick line) {
          opacity: 0.7;
        }
        
        @media (max-width: 600px) {
          .geogebra-container {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Graph;