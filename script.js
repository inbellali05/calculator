let firstNumber = null;
let operator = null;
let secondNumber = null;


// OPERATIONS

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Bien essayé Fréro";
    }

    return a / b;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    }
}
function roundResult(result) {
    if (typeof result === "number") {
        return Math.round(result * 100000000) / 100000000;
    }

    return result;
}


// DISPLAY AND NUMBER BUTTONS

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");

let currentNumber = "";
let justCalculated = false;

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (justCalculated) {
            currentNumber = "";
            justCalculated = false;
        }

        currentNumber += button.textContent;
        display.textContent = currentNumber;
    });
});


// OPERATOR BUTTONS

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {

        if (currentNumber === "") {
            if (firstNumber !== null) {
                operator = button.textContent;
            }
            return;
        }

        if (firstNumber === null) {
            firstNumber = Number(currentNumber);
        } else if (operator !== null) {
            secondNumber = Number(currentNumber);

            const result = roundResult(
    operate(operator, firstNumber, secondNumber)
);

            if (typeof result !== "number") {
                display.textContent = result;
                firstNumber = null;
                secondNumber = null;
                operator = null;
                currentNumber = "";
                return;
            }

            display.textContent = result;
            firstNumber = result;
        }

        operator = button.textContent;
        currentNumber = "";
        justCalculated = false;
    });
});


// EQUALS BUTTON

const equalsButton = document.querySelector(".equals");

equalsButton.addEventListener("click", () => {

    if (
        firstNumber === null ||
        operator === null ||
        currentNumber === ""
    ) {
        return;
    }

    secondNumber = Number(currentNumber);

    const result = roundResult(
    operate(operator, firstNumber, secondNumber)
);

    display.textContent = result;
    currentNumber = result.toString();
    justCalculated = true;

    firstNumber = null;
    secondNumber = null;
    operator = null;
});


// CLEAR BUTTON

const clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", () => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    currentNumber = "";
    justCalculated = false;

    display.textContent = "0";
});