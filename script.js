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
	secondOperator = "";
	enableEqual();
	enableDecimal();
};

const acBtn = document.querySelector("#clear").addEventListener("click", clear);

//backspace button
const back = function backSpace() {
	hiddenDisplayInput = hiddenDisplayInput.slice(0, -1);
	displayInputs.textContent = displayInputs.textContent.slice(0, -1);
};

const backBtn = document.querySelector("#back").addEventListener("click", back);

//enable or disable decimal button
const disableDecimal = function disableDecimalPoint() {
	decimal.disabled = true;
};

const enableDecimal = function enableDecimalPoint() {
	decimal.disabled = false;
};

const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", disableDecimal);

// operations
const round = function roundOff(num) {
	return +(Math.round(num + "e+6") + "e-6");
};

const add = function sum(firstTerm, secondTerm) {
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
		displayResult.textContent = round(add(firstNum, secondNum));
	} else if (operator === "-") {
		displayResult.textContent = round(subtract(firstNum, secondNum));
	} else if (operator === "*") {
		displayResult.textContent = round(multiply(firstNum, secondNum));
	} else if (operator === "÷") {
		displayResult.textContent = round(divide(firstNum, secondNum));
	}
	hiddenDisplayInput = displayResult.textContent;

	firstTerm = Number(displayResult.textContent);
};

//if I pressed + x / -, store the first term
//if I pressed + x / -, store it in the operator variable
let firstTerm = "";
let secondTerm = "";
let operator = "";
let secondOperator = "";
let operatorIndex = "";

const storeFirst = function storeFirstAndSecondAndOperator(e) {
	enableEqual();
	enableDecimal();
	//this condition is triggered when there are 2 operators detected inside the hiddenDisplayInput
	if (hiddenDisplayInput.match(/[+,*,÷,-]/g).length === 2) {
		if (!secondOperator) {
			//first instance
			operatorIndex = hiddenDisplayInput.indexOf(operator);
			secondOperator = e.target.textContent;
			secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1, -1));
			operate(firstTerm, secondTerm, operator);
			hiddenDisplayInput = `${displayResult.textContent}${secondOperator}`;
		} else {
			operator = secondOperator;
			secondOperator = e.target.textContent;
			operatorIndex = hiddenDisplayInput.indexOf(operator);
			secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1, -1));
			operate(firstTerm, secondTerm, operator);
			hiddenDisplayInput = `${displayResult.textContent}${secondOperator}`;
		}
	} else {
		operator = e.target.textContent;
		operatorIndex = hiddenDisplayInput.indexOf(operator);
		firstTerm = Number(hiddenDisplayInput.slice(0, operatorIndex));
		secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1, -1));
		hiddenDisplayInput = `${displayInputs.textContent}`;
	}
	displayInputs.textContent = `${hiddenDisplayInput}`;
};

const operationClass = document.querySelectorAll(".operation");
operationClass.forEach((button) =>
	button.addEventListener("click", storeFirst)
);

//if I pressed =, store second term and do operation
const storeSecond = function storeSecondTermAndSolve() {
	if (secondOperator) {
		operator = secondOperator;
	}
	operatorIndex = hiddenDisplayInput.indexOf(operator);
	secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1));
	operate(firstTerm, secondTerm, operator);
	disableEqual();
};

//enable or disable equal button
const equal = document.querySelector("#equal");
equal.addEventListener("click", storeSecond);

const disableEqual = function disableEqualBtn() {
	equal.disabled = true;
};

const enableEqual = function enableEqualBtn() {
	equal.disabled = false;
};
