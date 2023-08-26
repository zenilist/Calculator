const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.onclick = (e) => {
        takeInput(button.innerText);
    }
})
const input = document.getElementById("input");
const display = document.getElementById("display");
let num1;
let num2;
let op;
let divide_by_zero = false;
let track_last_input = []
let text = "";
function updateInput(button) {
    console.log(button);
    if (button === "=" || button === "C" || button === "del") return;
    text += button;
    input.innerText = text;
}
function takeInput(button) {
    if (button === "C") reset();
    if (button === "del") del();
    else if (isDigit(button)) handleDigit(button);
    else {
        if (op != undefined) operate();
        switch (button) {
            case "+":
                op = "+";
                break;
            case "/":
                op = "/";
                break;
            case "-":
                op = "-";
                break;
            case "X":
                op = "X";
                break;
            case "%":
                op = "%";
                break;
        }
        track_last_input.push("op")
    }
    if (button === "=") {
        if (divide_by_zero) {
            displayResult(true);
        }
        else {
            displayResult(false);
        }
    }
    updateInput(button);

}
function reset() {
    display.innerText = 0;
    num1 = undefined;
    num2 = undefined;
    op = undefined;
    text = "";
    updateInput("");

}
function handleDigit(button) {
    if (num1 == undefined) {
        num1 = parseInt(button)
        track_last_input.push("num1")
    }
    else if (op == undefined) {
        num1 *= 10;
        num1 += parseInt(button);
        track_last_input.push("num1")
    }
    else if (num2 == undefined) {
        num2 = parseInt(button);
        track_last_input.push("num2")
    }
    else {
        num2 *= 10;
        num2 += parseInt(button);
        track_last_input.push("num2")
    }
}

function displayResult(div_zero) {
    if (div_zero) {
        display.innerText = "Divide by zero!";
        divide_by_zero = false;
    }
    else {
        display.innerText = num1;
        text = num1;
        updateInput("");
    }
}

function operate() {
    switch (op) {
        case "+":
            add();
            break;
        case "-":
            subtract();
            break;
        case "X":
            multiply();
            break;
        case "/":
            divide();
            break;
        case "%":
            mod();
            break;
    }
    op = undefined;
    num2 = undefined;
}
function mod() {
    num1 %= num2;
}
function add() {
    num1 = num1 + num2;
}
function subtract() {
    num1 = num1 - num2;
}
function multiply() {
    num1 *= num2;
}
function divide() {
    if (num2 === 0) divide_by_zero = true;
    else
        num1 = Math.round(num1 / num2 * 100) / 100;
}
function isDigit(symbol) {
    return /^-?\d+$/.test(symbol)
}

function del() {
    last_in = track_last_input.pop();
    switch (last_in) {
        case "num1":
            num1 = Math.floor(num1 / 10);
        case "num2":
            num2 = Math.floor(num2 / 10);
        case "op":
            op = undefined;
    }

    text = text.slice(0, -1);
    updateInput("")
}