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
const decimalButton = document.querySelector(".decimal");

decimalButton.addEventListener("click", () => {
    if (justCalculated) {
        currentNumber = "";
        justCalculated = false;
    }

    if (!currentNumber.includes(".")) {
        if (currentNumber === "") {
            currentNumber = "0";
        }

        currentNumber += ".";
        display.textContent = currentNumber;
    }
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
const backspaceButton = document.querySelector(".backspace");

backspaceButton.addEventListener("click", () => {
    if (justCalculated) {
        return;
    }

    currentNumber = currentNumber.slice(0, -1);

    if (currentNumber === "") {
        display.textContent = "0";
    } else {
        display.textContent = currentNumber;
    }
});
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        document.querySelectorAll(".number").forEach((button) => {
            if (button.textContent === key) {
                button.click();
            }
        });
    }

    if (["+", "-", "*", "/"].includes(key)) {
        document.querySelectorAll(".operator").forEach((button) => {
            if (button.textContent === key) {
                button.click();
            }
        });
    }

    if (key === "Enter" || key === "=") {
        equalsButton.click();
    }

    if (key === ".") {
        decimalButton.click();
    }

    if (key === "Backspace") {
        backspaceButton.click();
    }

    if (key === "Escape") {
        clearButton.click();
    }
});