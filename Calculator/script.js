const display = document.getElementById('display');
const preview = document.getElementById('preview');
let currentInput = '0';

// Handle direct input
display.addEventListener('input', () => {
    const validPattern = /^[0-9+\-×÷().\s]*$/;
    if (validPattern.test(display.value)) {
        currentInput = display.value || '0';
        updatePreview();
    } else {
        display.value = currentInput;
        preview.textContent = 'Invalid Input';
    }
});

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
    updatePreview();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
    updatePreview();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
    updatePreview();
}

function calculate() {
    try {
        const expression = currentInput.replace('×', '*').replace('÷', '/');
        const result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            currentInput = 'Invalid Expression';
        } else {
            currentInput = result.toString();
        }
    } catch (e) {
        currentInput = 'Invalid Expression';
    }
    updateDisplay();
    updatePreview();
}

function updateDisplay() {
    display.value = currentInput;
}

function updatePreview() {
    try {
        const expression = currentInput.replace('×', '*').replace('÷', '/');
        const result = eval(expression);
        if (!isNaN(result) && isFinite(result)) {
            preview.textContent = '= ' + result.toFixed(2);
        } else {
            preview.textContent = '';
        }
    } catch (e) {
        preview.textContent = '';
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+') {
        appendToDisplay('+');
    } else if (key === '-') {
        appendToDisplay('-');
    } else if (key === '*') {
        appendToDisplay('×');
    } else if (key === '/') {
        appendToDisplay('÷');
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '(' || key === ')') {
        appendToDisplay(key);
    }
});

// Accessibility: Focus management
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

updateDisplay();