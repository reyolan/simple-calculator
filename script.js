let firstTerm;
let secondTerm;
let operator;
let secondOperator;
let operatorIndex;

//display
const displayInputs = document.querySelector("#inputs");
let hiddenDisplayInput = "";

//result
const displayResult = document.querySelector("#result");

//add and remove button effect
const addRemoveBtnEffect = function addAndRemoveButtonEffect(e) {
	if (e.target.textContent === "=") {
		e.target.classList.toggle("equalpressed");
		setTimeout(() => e.target.classList.toggle("equalpressed"), 100);
	} else {
		e.target.classList.toggle("pressed");
		setTimeout(() => e.target.classList.toggle("pressed"), 100);
	}
};

//buttons
const insert = function populateDisplay(e) {
	addRemoveBtnEffect(e);
	let press = `${e.target.textContent}`;
	if (hiddenDisplayInput === displayResult.textContent) {
		displayInputs.textContent = `${displayResult.textContent}`;
	}
	hiddenDisplayInput = `${hiddenDisplayInput}${press}`;
	displayInputs.textContent = hiddenDisplayInput;
};

const inputBtn = document.querySelectorAll(".input-btn");
for (const button of inputBtn) {
	button.addEventListener("click", insert);
}

//backspace button
const back = function backSpace(e) {
	addRemoveBtnEffect(e);
	hiddenDisplayInput = hiddenDisplayInput.slice(0, -1);
	displayInputs.textContent = hiddenDisplayInput;
	if (!hiddenDisplayInput.includes(".")) {
		enableDecimal();
	}
};

const backBtn = document.querySelector("#back");
backBtn.addEventListener("click", back);

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
	showResult(displayResult.textContent);
};

const storeFirst = function storeFirstAndSecondAndOperator(e) {
	enableEqual();
	enableDecimal();
	//condition triggers when 2 operators are detected inside the hiddenDisplayInput
	if (hiddenDisplayInput.match(/[+,*,÷,-]/g).length === 2) {
		if (secondOperator) {
			operator = secondOperator;
		}
		secondOperator = e.target.textContent; //saves the 2nd operator
		operatorIndex = hiddenDisplayInput.indexOf(operator);
		secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1, -1));
		operate(firstTerm, secondTerm, operator);
		hiddenDisplayInput = `${displayResult.textContent.slice(
			2
		)}${secondOperator}`;
	} else {
		//condition triggers when solving via pressing =
		operator = e.target.textContent;
		operatorIndex = hiddenDisplayInput.indexOf(operator);
		firstTerm = Number(hiddenDisplayInput.slice(0, operatorIndex));
	}
	displayInputs.textContent = `${hiddenDisplayInput}`;
};

const operationClass = document.querySelectorAll(".operation");
for (const button of operationClass) {
	button.addEventListener("click", storeFirst);
}

//fires when = is pressed
const storeSecond = function storeSecondTermAndSolve(e) {
	addRemoveBtnEffect(e);
	if (hiddenDisplayInput.charAt(hiddenDisplayInput.length - 1) === operator) {
		return;
	}
	if (secondOperator) {
		operator = secondOperator;
	}
	operatorIndex = hiddenDisplayInput.indexOf(operator);
	secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1));
	operate(firstTerm, secondTerm, operator);
	disableEqual();
};

//equal button
const equalBtn = document.querySelector("#equal");
equalBtn.addEventListener("click", storeSecond);

//enable or disable equal button
const disableEqual = function disableEqualBtn() {
	equalBtn.disabled = true;
};

const enableEqual = function enableEqualBtn() {
	equalBtn.disabled = false;
};

//% button
const percentResult = function moveDecimalPlacetoLeftByTwo(e) {
	addRemoveBtnEffect(e);
	displayResult.textContent = Number(displayResult.textContent) / 100;
	hiddenDisplayInput = displayResult.textContent;
	firstTerm = Number(displayResult.textContent);
};

const percentBtn = document.querySelector("#percent");
percentBtn.addEventListener("click", percentResult);

//disable all buttons except AC
const disableBtns = function disableAllBtnExceptClear() {
	inputBtn.forEach((button) => (button.disabled = true));
	backBtn.disabled = true;
	percentBtn.disabled = true;
};

const enableBtns = function enableAllBtnExceptClear() {
	inputBtn.forEach((button) => (button.disabled = false));
	backBtn.disabled = false;
	percentBtn.disabled = false;
};

//initialize Variables
const initialize = function initializeVariables(e) {
	addRemoveBtnEffect(e);
	displayInputs.textContent = "";
	displayResult.textContent = "";
	firstTerm = "";
	secondTerm = "";
	operator = "";
	hiddenDisplayInput = "";
	secondOperator = "";
	enableBtns();
	disableEqual();
};

//clear button
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", initialize);

//NaN result
const showResult = function checkIfNanOrNumber(result) {
	if (displayResult.textContent === "NaN") {
		displayResult.textContent = "Can't divide by 0";
		disableBtns();
	} else {
		displayResult.textContent = `= ${displayResult.textContent}`;
		hiddenDisplayInput = displayResult.textContent.slice(2);
		firstTerm = Number(displayResult.textContent.slice(2));
	}
};

//key event
const eventKey = function pressKey(e) {
	for (let i = 0; i < 15; i++) {
		if (inputBtn[i].textContent === e.key) {
			inputBtn[i].click();
		}
	}
	if (e.key === "=" || e.key === "Enter") {
		equalBtn.click();
	} else if (e.key === "Backspace") {
		backBtn.click();
	} else if (e.key === "Escape") {
		clearBtn.click();
	} else if (e.key === "%") {
		percentBtn.click();
	} else if (e.key === "/") {
		inputBtn[0].click();
	}
};

document.addEventListener("keydown", eventKey);
