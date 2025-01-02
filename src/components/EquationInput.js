import React from 'react';

const EquationInput = ({ value, onChange, onSubmit, setExpression, setShowKeyboard }) => {
  return (
    <div className="equation-input">
      <input
        type="text"
        placeholder="Enter equation (e.g., x^2)"
        value={value}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Plot</button>
      <button onClick={() => setShowKeyboard(true)}>Show Keyboard</button>
    </div>
  );
};

export default EquationInput;
