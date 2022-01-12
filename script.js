let firstTerm;
let secondTerm;
let operator;
let secondOperator;
let operatorIndex;

const displayInputs = document.querySelector("#inputs");
let hiddenDisplayInput = "";
displayInputs.textContent = "0";

const displayResult = document.querySelector("#result");

const equalBtn = document.querySelector("#equal");
equalBtn.addEventListener("click", storeSecondTermAndSolve);

const inputBtn = document.querySelectorAll(".input-btn");
for (const button of inputBtn) {
	button.addEventListener("click", populateDisplay);
}

const backBtn = document.querySelector("#back");
backBtn.addEventListener("click", backSpace);

const decimalBtn = document.querySelector("#decimal");
decimalBtn.addEventListener("click", disableDecimalPoint);

const operationClass = document.querySelectorAll(".operation");
for (const button of operationClass) {
	button.addEventListener("click", storeFirstAndSecondAndOperator);
}

const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", initializeVariables);

const percentBtn = document.querySelector("#percent");
percentBtn.addEventListener("click", moveDecimalPlacetoLeftByTwo);

function toggleButtonEffect(e) {
	if (e.target.textContent === "=") {
		e.target.classList.toggle("equalpressed");
		setTimeout(() => e.target.classList.toggle("equalpressed"), 100);
	} else {
		e.target.classList.toggle("pressed");
		setTimeout(() => e.target.classList.toggle("pressed"), 100);
	}
}

function populateDisplay(e) {
	toggleButtonEffect(e);
	let press = `${e.target.textContent}`;
	if (hiddenDisplayInput === displayResult.textContent) {
		displayInputs.textContent = `${displayResult.textContent}`;
	}

	hiddenDisplayInput = `${hiddenDisplayInput}${press}`;
	displayInputs.textContent = hiddenDisplayInput;

	if (
		hiddenDisplayInput.slice(-1) === "+" ||
		hiddenDisplayInput.slice(-1) === "-" ||
		hiddenDisplayInput.slice(-1) === "*" ||
		hiddenDisplayInput.slice(-1) === "÷"
	) {
		disableOperatorBtns();
	}
}

function backSpace(e) {
	toggleButtonEffect(e);
	hiddenDisplayInput = hiddenDisplayInput.slice(0, -1);
	displayInputs.textContent = hiddenDisplayInput;
	if (!hiddenDisplayInput.includes(".")) {
		enableDecimalPoint();
	}

	if (
		!hiddenDisplayInput.includes("+") ||
		!hiddenDisplayInput.includes("-") ||
		!hiddenDisplayInput.includes("*") ||
		!hiddenDisplayInput.includes("÷")
	) {
		enableOperatorBtns();
	}
}

function disableDecimalPoint() {
	decimalBtn.disabled = true;
}

function enableDecimalPoint() {
	decimalBtn.disabled = false;
}

function roundOff(num) {
	return +(Math.round(num + "e+6") + "e-6");
}

function add(firstTerm, secondTerm) {
	return firstTerm + secondTerm;
}

function subtract(firstTerm, secondTerm) {
	return firstTerm - secondTerm;
}

function multiply(firstTerm, secondTerm) {
	return firstTerm * secondTerm;
}

function divide(firstTerm, secondTerm) {
	return firstTerm / secondTerm;
}

function operate(firstNum, secondNum, operator) {
	if (operator === "+") {
		displayResult.textContent = roundOff(add(firstNum, secondNum));
	} else if (operator === "-") {
		displayResult.textContent = roundOff(subtract(firstNum, secondNum));
	} else if (operator === "*") {
		displayResult.textContent = roundOff(multiply(firstNum, secondNum));
	} else if (operator === "÷") {
		displayResult.textContent = roundOff(divide(firstNum, secondNum));
	}
	enableOperatorBtns();
	checkIfNanOrNumber();
}

function storeFirstAndSecondAndOperator(e) {
	enableEqualBtn();
	enableDecimalPoint();

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
}

//fires when = is pressed
function storeSecondTermAndSolve(e) {
	toggleButtonEffect(e);
	if (hiddenDisplayInput.charAt(hiddenDisplayInput.length - 1) === operator) {
		return;
	}
	if (secondOperator) {
		operator = secondOperator;
	}
	operatorIndex = hiddenDisplayInput.indexOf(operator);
	secondTerm = Number(hiddenDisplayInput.slice(operatorIndex + 1));
	operate(firstTerm, secondTerm, operator);
	disableEqualBtn();
}

function moveDecimalPlacetoLeftByTwo(e) {
	toggleButtonEffect(e);
	displayResult.textContent = Number(displayResult.textContent) / 100;
	hiddenDisplayInput = displayResult.textContent;
	firstTerm = Number(displayResult.textContent);
}

function disableAllBtnExceptClear() {
	inputBtn.forEach((button) => (button.disabled = true));
	backBtn.disabled = true;
	percentBtn.disabled = true;
}

function enableAllBtn() {
	inputBtn.forEach((button) => (button.disabled = false));
	backBtn.disabled = false;
	percentBtn.disabled = false;
	clearBtn.disabled = false;
}

function disableEqualBtn() {
	equalBtn.disabled = true;
}

function enableEqualBtn() {
	equalBtn.disabled = false;
}

function disableOperatorBtns() {
	for (const button of operationClass) {
		button.disabled = true;
	}
}

function enableOperatorBtns() {
	for (const button of operationClass) {
		button.disabled = false;
	}
}

function initializeVariables(e) {
	toggleButtonEffect(e);
	displayInputs.textContent = "0";
	displayResult.textContent = "";
	firstTerm = "";
	secondTerm = "";
	operator = "";
	hiddenDisplayInput = "";
	secondOperator = "";
	enableAllBtn();
	disableEqualBtn();
}

function checkIfNanOrNumber() {
	if (displayResult.textContent === "NaN") {
		displayResult.textContent = "undefined";
		disableAllBtnExceptClear();
	} else {
		displayResult.textContent = `= ${displayResult.textContent}`;
		hiddenDisplayInput = displayResult.textContent.slice(2);
		firstTerm = Number(displayResult.textContent.slice(2));
	}
}

function convertPressKeyToClick(e) {
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
}

document.addEventListener("keydown", convertPressKeyToClick);
