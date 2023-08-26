const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.onclick = (e) => {
        takeInput(button.innerText);
    }
})
const display = document.getElementById("display");
let num1;
let num2;
let op;
let divide_by_zero = false;
let lastInput = {
    num1: false,
    num2: false,
    op: false
};
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
        setLastInput(false,false,true);
    }
    if (button === "="){
        if (divide_by_zero){
            displayResult(true);
        }
        else{
            displayResult(false);
        }
    }

}
function reset() {
    display.innerText = 0;
    num1 = undefined;
    num2 = undefined;
    op = undefined;
}
function handleDigit(button) {
    if (num1 == undefined) {
        console.log("no digit")
        num1 = parseInt(button)
        console.log(num1);
        setLastInput(true,false,false);
    }
    else if (op == undefined) {
        num1 *= 10;
        num1 += parseInt(button);
        console.log(num1);
        setLastInput(true,false,false);
    }
    else if (num2 == undefined) {
        console.log("no num2 yet");
        num2 = parseInt(button);
        console.log(num2);
        setLastInput(false,true,false);
    }
    else {
        num2 *= 10;
        num2 += parseInt(button);
        console.log(num2);
        setLastInput(false,true,false);
    }
}

function displayResult(div_zero) {
    if (div_zero){display.innerText = "Divide by zero!";
    divide_by_zero = false;
}
    else
        display.innerText = num1;
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
        num1 = Math.round(num1/num2*100)/100;
}
function isDigit(symbol) {
    return /^-?\d+$/.test(symbol)
}
function setLastInput(bool_1,bool_2,bool_op){
    lastInput.num1 = bool_1;
    lastInput.num2 = bool_2;
    lastInput.op = bool_op;
}
function del(){
    if (lastInput.num1 == true){
        num1 = Math.floor(num1/10);
    }
    else if (lastInput.num2 == true){
        num2 = Math.floor(num2/10);
    }
    else{
        op = undefined;
    }
}