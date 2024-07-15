import React, { useState } from 'react';
import './App.css';
import { evaluate, format } from 'mathjs';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [lastInput, setLastInput] = useState('');

  const handleClear = () => {
    setDisplayValue('0');
    setExpression('');
    setLastInput('');
  };

  const handleNumberClick = (number) => {
    if (lastInput === '=' || displayValue === 'Error') {
      setDisplayValue(String(number));
      setExpression(String(number));
    } else {
      if (displayValue === '0' && number === 0) {
        return; // Prevent multiple leading zeros
      } else if (displayValue === '0' && number !== '.') {
        setDisplayValue(String(number));
        setExpression(String(number));
      } else {
        setDisplayValue((prevValue) => prevValue + number);
        setExpression((prevValue) => prevValue + number);
      }
    }
    setLastInput(String(number));
  };

  const handleOperatorClick = (operator) => {
    if (operator === '-' && lastInput === '-') {
      return; // Prevent multiple consecutive negatives
    }

    if (lastInput === '=' || displayValue === 'Error') {
      setExpression(displayValue + operator);
    } else if ('+-*/'.includes(lastInput) && operator !== '-') {
      setExpression((prevValue) => prevValue.slice(0, -1) + operator);
    } else {
      setExpression((prevValue) => prevValue + operator);
    }

    setDisplayValue(operator);
    setLastInput(operator);
  };

  const handleEqualsClick = () => {
    try {
      const result = evaluate(expression);
      const formattedResult = format(result, { precision: 14 });
      setDisplayValue(String(formattedResult));
      setExpression(String(formattedResult));
      setLastInput('=');
    } catch (error) {
      setDisplayValue('Error');
      setExpression('');
      setLastInput('');
    }
  };

  const handleDecimalClick = () => {
    if (lastInput === '=' || displayValue === 'Error') {
      setDisplayValue('0.');
      setExpression('0.');
    } else if (!displayValue.includes('.')) {
      setDisplayValue((prevValue) => prevValue + '.');
      setExpression((prevValue) => prevValue + '.');
    } else {
      const lastNumber = expression.split(/[-+*/]/).pop();
      if (!lastNumber.includes('.')) {
        setDisplayValue((prevValue) => prevValue + '.');
        setExpression((prevValue) => prevValue + '.');
      }
    }
    setLastInput('.');
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display">{displayValue}</div>
        <button id="clear" onClick={handleClear}>C</button>
        <button id="divide" onClick={() => handleOperatorClick('/')}>/</button>
        <button id="multiply" onClick={() => handleOperatorClick('*')}>*</button>
        <button id="seven" onClick={() => handleNumberClick(7)}>7</button>
        <button id="eight" onClick={() => handleNumberClick(8)}>8</button>
        <button id="nine" onClick={() => handleNumberClick(9)}>9</button>
        <button id="subtract" onClick={() => handleOperatorClick('-')}>-</button>
        <button id="four" onClick={() => handleNumberClick(4)}>4</button>
        <button id="five" onClick={() => handleNumberClick(5)}>5</button>
        <button id="six" onClick={() => handleNumberClick(6)}>6</button>
        <button id="add" onClick={() => handleOperatorClick('+')}>+</button>
        <button id="one" onClick={() => handleNumberClick(1)}>1</button>
        <button id="two" onClick={() => handleNumberClick(2)}>2</button>
        <button id="three" onClick={() => handleNumberClick(3)}>3</button>
        <button id="equals" onClick={handleEqualsClick}>=</button>
        <button id="zero" onClick={() => handleNumberClick(0)}>0</button>
        <button id="decimal" onClick={handleDecimalClick}>.</button>
      </div>
    </div>
  );
}

export default App;
