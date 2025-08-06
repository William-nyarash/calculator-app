// Calculation functions
function addition(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function mult(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "syntax error";
  return a / b;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return addition(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return mult(a, b);
    case "/":
      return divide(a, b);
  }
}

// Calculator state
let currentInput = '';
let previousInput = '';
let currentOperator = '';

const display = document.querySelector('.window_d');

// Update display function to show full expression
function updateDisplay() {
  display.textContent = previousInput + (currentOperator ? ` ${currentOperator} ` : '') + currentInput;
}
// when the use wants to clear the current expression or operation from the screen and memory

document.getElementById("X").addEventListener('click', () => {
    previousInput = '';
    currentInput = '';
    currentOperator = '';
    display.textContent = "";
})


// allows to append digit to currentInput and update display
const digits = document.querySelectorAll('.digit_b');
digits.forEach(button => {
  button.addEventListener('click', () => {
    currentInput += button.id;
    updateDisplay();
  });
});

// save currentInput to previousInput, set operator, and clear currentInput
const operators = document.querySelectorAll('.ops');
operators.forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput === '') return; 
    previousInput = currentInput;
    currentInput = '';
    currentOperator = button.id;
    updateDisplay();
  });
});

// performs calculation, show full expression + result, reset state
document.getElementById('equals').addEventListener('click', () => {
  if (previousInput === '' || currentInput === '' || currentOperator === '') return;
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result = operate(a, b, currentOperator);
  if (result === "syntax error") {
    display.textContent = "Error: Division by zero";
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    return;
  }

  display.textContent = `${previousInput} ${currentOperator} ${currentInput} = ${result}`;

  currentInput = result.toString();
  previousInput = '';
  currentOperator = '';
});

