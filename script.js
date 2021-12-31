//display
const displayInputs = document.querySelector("#inputs");
let hiddenDisplayInput = "";

//result
const displayResult = document.querySelector("#result");

//buttons
const insert = function populateDisplay(e) {
	let press = `${e.target.textContent}`;
	if (hiddenDisplayInput === displayResult.textContent) {
		displayInputs.textContent = `${displayResult.textContent}`;
	}
	hiddenDisplayInput = `${hiddenDisplayInput}${press}`;
	displayInputs.textContent = `${displayInputs.textContent}${press}`;
};

const inputBtn = document.querySelectorAll(".input-btn");
inputBtn.forEach((button) => button.addEventListener("click", insert));

//clear button
const clear = function clearDisplay() {
	displayInputs.textContent = "";
	displayResult.textContent = "";
	firstTerm = "";
	secondTerm = "";
	operator = "";
	hiddenDisplayInput = "";
};

const acBtn = document.querySelector("#clear").addEventListener("click", clear);

//backspace button
const back = function backSpace() {
	hiddenDisplayInput = hiddenDisplayInput.slice(0, -1);
	displayInputs.textContent = displayInputs.textContent.slice(0, -1);
};

const backBtn = document.querySelector("#back").addEventListener("click", back);

// operations
const add = function (firstTerm, secondTerm) {
	return firstTerm + secondTerm;
};

const subtract = function difference(firstTerm, secondTerm) {
	return firstTerm - secondTerm;
};

const multiply = function product(firstTerm, secondTerm) {
	return firstTerm * secondTerm;
};

const divide = function quotient(firstTerm, secondTerm) {
	return firstTerm / secondTerm;
};

const operate = function result(firstNum, secondNum, operator) {
	if (operator === "+") {
		displayResult.textContent = add(firstNum, secondNum);
	} else if (operator === "-") {
		displayResult.textContent = subtract(firstNum, secondNum);
	} else if (operator === "*") {
		displayResult.textContent = multiply(firstNum, secondNum);
	} else if (operator === "÷") {
		displayResult.textContent = divide(firstNum, secondNum);
	}
	hiddenDisplayInput = displayResult.textContent;
	displayInputs.textContent = "";
	firstTerm = Number(displayResult.textContent);
};

//if I pressed + x / -, store the first term
//if I pressed + x / -, store it in the operator variable
let firstTerm = "";
let secondTerm = "";
let operator = "";

const storeFirst = function storeFirstAndSecondAndOperator() {
	//this condition is triggered when there are 2 operators detected inside the hiddenDisplayInput
	if ((hiddenDisplayInput.match(/[+,*,÷,-]/g).length = 2)) {
	}
	//this condition is triggered when = is pressed the first time
	if (firstTerm === Number(displayResult.textContent)) {
		operator = hiddenDisplayInput.slice(-1);
		displayInputs.textContent = `${displayResult.textContent}${operator}`;
	} else {
		// this works only for first time
		let operatorIndex = hiddenDisplayInput.indexOf(operator);
		firstTerm = Number(hiddenDisplayInput.slice(0, operatorIndex - 1));
		operator = hiddenDisplayInput.slice(-1);
	}
};

const operationClass = document.querySelectorAll(".operation");
operationClass.forEach((button) =>
	button.addEventListener("click", storeFirst)
);

//if I pressed =, store second term and do operation
const storeSecond = function storeSecondTermAndSolve() {
	let operatorIndex = hiddenDisplayInput.indexOf(operator);
	secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1));
	operate(firstTerm, secondTerm, operator);
};

const equal = document
	.querySelector("#equal")
	.addEventListener("click", storeSecond);

//if + / - * is pressed, display it in displayResult
//input another number and press another + / - *, display it in displayResult,
//store the answer in the firstTerm variable

//if str.length of str.match is 2, do the displayResult and the operation
// let result = text.match (/[+,*,÷,-]/g);

//if there are 2 in the array text.match, operate and clear the hiddenDisplayInput,
//replace textResult with the answer obtained
// so if display is 88+3+ --> it becomes 91 + after the + is pressed
