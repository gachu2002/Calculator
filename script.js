// Initialize calculate functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    return b !== 0 ? Math.floor(a/b) : "ERROR";
};

// Declare operation variables
let firstNumber = '';
let secondNumber = '';
let operator = null;

// Initialize operate function
const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
};

// Initialize display variables
let display = '';
let operation = '';


// Declare screen elements
const operationLine = document.querySelector('.operation-line');
const displayLine = document.querySelector('.display-line');

// Initialize display functions
const updateDisplay = (x) => {
    display = '';
    operation = x;
    displayLine.textContent = display;
    operationLine.textContent = operation;
}

// Add event listeners to buttons
// Add event listeners to number buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        display === '' ? display = button.textContent : display += button.textContent;
        displayLine.textContent = display;
    })
});

// Add event listeners to operator buttons
const operatorButtons = document.querySelectorAll('.calculator-operators');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(display === '' && firstNumber === '') return;
        if(operator === null){
            firstNumber = display || firstNumber;
            operator = button.textContent;
            updateDisplay(`${firstNumber} ${operator}`);
        } else {
            secondNumber = display;
            const result = operate(operator, parseInt(firstNumber), parseInt(secondNumber));
            firstNumber = result.toString();
            secondNumber = '';
            operator = button.textContent;
            updateDisplay(`${firstNumber} ${operator}`);
        }
    })
});

// Add event listeners to equals button
const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', () => {
    if(operator !== null && display !== ''){
        secondNumber = display;
        const result = operate(operator, parseInt(firstNumber), parseInt(secondNumber));
        firstNumber = result;
        secondNumber = '';
        operator = null;
        updateDisplay(`${result}`);
    }
});

// Add event listeners to clear button
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operator = null;
    updateDisplay('');
});
