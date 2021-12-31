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

	firstTerm = Number(displayResult.textContent);
};

//if I pressed + x / -, store the first term
//if I pressed + x / -, store it in the operator variable
let firstTerm = "";
let secondTerm = "";
let operator = "";
let secondOperator = "";

const storeFirst = function storeFirstAndSecondAndOperator() {
	enableEqual();
	//this condition is triggered when there are 2 operators detected inside the hiddenDisplayInput
	if (hiddenDisplayInput.match(/[+,*,÷,-]/g).length === 2) {
		if (!secondOperator) {
			let operatorIndex = hiddenDisplayInput.indexOf(operator);
			firstTerm = Number(hiddenDisplayInput.slice(0, operatorIndex));
			secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1, -1));
			secondOperator = hiddenDisplayInput.slice(-1);
			operate(firstTerm, secondTerm, operator);
			hiddenDisplayInput = `${displayResult.textContent}${secondOperator}`;
			displayInputs.textContent = `${hiddenDisplayInput}`;
		} else {
			operator = secondOperator;
			let operatorIndex = hiddenDisplayInput.indexOf(operator);
			secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1, -1));
			secondOperator = hiddenDisplayInput.slice(-1);
			operate(firstTerm, secondTerm, operator);
			hiddenDisplayInput = `${displayResult.textContent}${operator}`;
			displayInputs.textContent = `${hiddenDisplayInput}`;
		}
	}
	// if (hiddenDisplayInput.match(/[+,*,÷,-]/g).length === 1)
	else {
		//this condition is triggered when = is pressed and then add the operator to the result
		// operator = hiddenDisplayInput.slice(-1);
		// displayInputs.textContent = `${displayResult.textContent}${operator}`;
		// this works only for first time an operator is pressed
		firstTerm = Number(hiddenDisplayInput.slice(0, -1));
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
	disableEqual();
};

const equal = document.querySelector("#equal");
equal.addEventListener("click", storeSecond);

const disableEqual = function disableEqualBtn() {
	equal.disabled = true;
};

const enableEqual = function enableEqualBtn() {
	equal.disabled = false;
};

//8 + 3
//result is 11
//11 - 6
// result is 5
//next I pressed - but what was shown is the operator (operator) variable which is + (secondOperator)
