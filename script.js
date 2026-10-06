let firstNumber = null;
let operator = null;
let secondNumber = null;
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
console.log(operate("+", 5, 3));
console.log(operate("-", 10, 4));
console.log(operate("*", 6, 2));
console.log(operate("/", 20, 4));
