const display = document.getElementById("display");
let isResultDisplayed = false;

function appendToDisplay(input) {
    if (isResultDisplayed) {
        display.value = "";  // Clear previous result before new input
        isResultDisplayed = false;
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    isResultDisplayed = false;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
        isResultDisplayed = true;  // Set flag to clear on next input
    } catch (error) {
        display.value = "Error";
        isResultDisplayed = true;
    }
}
