import React, { useState } from 'react';

const PopKeyboard = ({ onInputChange, onClose }) => {
  const keyboardButtons = [
    ['7', '8', '9', '/', 'sin('],
    ['4', '5', '6', '*', 'cos('],
    ['1', '2', '3', '-', 'tan('],
    ['0', '.', '^', '+', 'sqrt('],
    ['x', ')', 'pi', 'e', 'log('],
    ['Clear', 'Plot'],
  ];

  const handleButtonClick = (symbol) => {
    if (symbol === 'Clear') {
      onInputChange('');
    } else if (symbol === 'Plot') {
      onClose();
    } else {
      onInputChange((prev) => prev + symbol);
    }
  };

  return (
    <div className="popup-keyboard">
      <div className="keyboard">
        {keyboardButtons.map((row, rowIndex) => (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((button, buttonIndex) => (
              <button
                key={buttonIndex}
                className={`key ${button === 'Clear' || button === 'Plot' ? 'key-special' : ''}`}
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopKeyboard;
