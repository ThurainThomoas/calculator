const display = document.getElementById("display");
const historyList = document.getElementById('history-list');
let isResultDisplayed = false;

// Load history from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
        makeHistoryItemsEditable(); // Make history items editable
    }
});

// Save history to localStorage before page unload
window.addEventListener('beforeunload', () => {
    localStorage.setItem('calculatorHistory', historyList.innerHTML);
});

function appendToDisplay(input) {
    if (isResultDisplayed) {
        display.value = "";
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
        const result = eval(display.value);
        const expression = display.value;
        display.value = result;
        isResultDisplayed = true;

        if (/[+\-*/]/.test(expression)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${expression} = ${result}`;
            historyList.appendChild(listItem);
            makeHistoryItemsEditable();

            display.value = `${expression} = ${result}`;
        }

    } catch (error) {
        display.value = "Error";
        isResultDisplayed = true;
    }
}


function makeHistoryItemsEditable() {
    const listItems = historyList.querySelectorAll('li');
    listItems.forEach(item => {
        item.contentEditable = true;
        item.addEventListener('blur', () => {
            localStorage.setItem('calculatorHistory', historyList.innerHTML);
        });
    });
}

// Function to clear the history
function clearHistory() {
    historyList.innerHTML = ''; // Clear the history list on the page
    localStorage.removeItem('calculatorHistory'); // Remove from localStorage
}


// Add an event listener to the clear history button (make sure you have a button with the id "clearHistory")
const clearHistoryButton = document.getElementById('clearHistory'); // Replace 'clearHistory' with the actual ID of your button
if (clearHistoryButton) {  // Check if the button exists before adding listener
    clearHistoryButton.addEventListener('click', clearHistory);
}