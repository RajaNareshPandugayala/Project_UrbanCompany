

// // Function to update the URL
// function updateURL(state, title, url) {
//     window.history.pushState(state, title, url);
// }

/******************************************************************** */

// Declare a variable to keep track of the countdown interval
var countdownInterval;

var generatedOTP = null; // Variable to store the generated OTP

/******************************************************************** */


// Function to start the timer
function startTimer() {
    clearInterval(countdownInterval); // Clear previous timer (if any)



    var popupContent = document.querySelector('.popup-content2');
    var message = document.createElement('p');
    message.classList.add('otp_massage');
    popupContent.appendChild(message);

    setTimeout(function () {
        message.style.display = 'none'; // Hide the message after 1 second
    }, 10500); // 1000 milliseconds = 1 second



    // Generate a random 4-digit OTP
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    message.textContent = `Generated OTP: ${generatedOTP}`;

    var timerElement = document.getElementById("timer");
    var resendLink = document.getElementById("resend-link");
    resendLink.style.display = "none"; // Hide the "Resend code" link when timer starts again
    var seconds = 10;
    timerElement.textContent = seconds;

    countdownInterval = setInterval(function () {
        seconds--;
        timerElement.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            resendLink.style.display = "inline";
        }
    }, 1000);
    // updateURL({ function: 'startTimer' }, 'Page Title', '/startTimer');
}

/******************************************************************** */

// Function to open the Login popup
function loginPopup() {
    var popup = document.getElementById("loginPopup");
    var verificationCodeSection = document.querySelector(".verification-code");
    var popupContent = document.querySelector(".popup-content");
    var proceedButton = document.querySelector(".proceed_button");

    proceedButton.disabled = true; // Disable the button
    proceedButton.style.backgroundColor = "gray";



    // Check if the verification code section is currently visible
    if (verificationCodeSection.style.display === "block") {
        // Hide the verification code section
        verificationCodeSection.style.display = "none";
        // Show the initial phone number input form
        popupContent.style.display = "block";

    } else {
        // If not, simply show the popup
        popup.style.display = "block";
    }
}

// Function to close the popup
function closePopup() {
    var popup = document.getElementById("loginPopup");
    popup.style.display = "none";
    // updateURL({ function: 'closePopup' }, 'Page Title', '/closePopup');
}


/******************************************************************** */


// Attach a click event to the Login button
document.querySelector(".login_button button").addEventListener("click", function (e) {
    e.preventDefault();
    var LogoutMessage = document.querySelector(".logout-message");
    LogoutMessage.style.display = "none";
    var input = document.querySelector(".number");
    input.value = ''; // Set the input field's value to an empty string
    loginPopup();
});

/******************************************************************** */

// Function to open the edit-number popup
function editNoPopup() {
    var popup = document.getElementById("loginPopup");
    var verificationCodeSection = document.querySelector(".verification-code");
    var popupContent = document.querySelector(".popup-content");

    // Check if the verification code section is currently visible
    if (verificationCodeSection.style.display === "block") {
        // Hide the verification code section
        verificationCodeSection.style.display = "none";
        // Show the initial phone number input form
        popupContent.style.display = "block";
    } else {
        // If not, simply show the popup
        popup.style.display = "block";
    }
    // updateURL({ function: 'editNoPopup' }, 'Page Title', '/editNoPopup');


}
document.querySelector(".edit-number").addEventListener("click", editNoPopup);



/******************************************************************** */


// Function to move the placeholder text up when the input field is focused
function placeholderUp() {
    var input = document.querySelector(".number");
    input.classList.add("focused");

    // updateURL({ function: 'placeholderUp' }, 'Page Title', '/placeholderUp');

}

// Function to move the placeholder text back down when the input field loses focus
function placeholderDown() {
    var input = document.querySelector(".number");
    if (!input.value) {
        input.classList.remove("focused");
    }
    // updateURL({ function: 'placeholderDown' }, 'Page Title', '/placeholderDown');

}


/******************************************************************** */


// Attach focus and blur events to the input field
document.querySelector(".number").addEventListener("focus", placeholderUp);
document.querySelector(".number").addEventListener("blur", placeholderDown);


/******************************************************************** */

// Function to toggle background color of Proceed button based on input length
function toggleProceedButtonBackground() {
    var input = document.querySelector(".number");
    var proceedButton = document.querySelector(".proceed_button");


    if (input.value.length === 10 && /^[0-9]{10}$/.test(input.value) === (input.value.length === 10)) { // \d+ or [0-9]{10}
        proceedButton.style.backgroundColor = "rgb(35, 35, 243)";
        proceedButton.disabled = false; // Enable the button
    } else {
        proceedButton.style.backgroundColor = "gray";
        proceedButton.disabled = true; // Disable the button
    }


    // updateURL({ function: 'toggleProceedButtonBackground' }, 'Page Title', '/toggleProceedButtonBackground');
}


/******************************************************************** */


document.querySelector(".number").addEventListener("input", toggleProceedButtonBackground);


/******************************************************************** */


// Function to move focus to the next input box
function shiftFocus(input, nextInput) {
    if (input.value.length === 1) {
        nextInput.focus();
    }
    // updateURL({ function: 'shiftFocus' }, 'Page Title', '/shift Focus');
}

// Function to handle the Backspace key press
function handleBackspace(event, currentInput, previousInput) {
    if (event.key === "Backspace" && currentInput.value === "") {
        // event.preventDefault();
        previousInput.focus();
    }
}


// Get references to each input box
var codeInput1 = document.getElementById("code-input-1");
var codeInput2 = document.getElementById("code-input-2");
var codeInput3 = document.getElementById("code-input-3");
var codeInput4 = document.getElementById("code-input-4");

// Add event listeners to each input box
codeInput1.addEventListener("input", function () {
    shiftFocus(codeInput1, codeInput2);
});
codeInput2.addEventListener("input", function () {
    shiftFocus(codeInput2, codeInput3);
});
codeInput3.addEventListener("input", function () {
    shiftFocus(codeInput3, codeInput4);
});


// Add event listeners for Backspace key press
codeInput2.addEventListener("keydown", function (event) {
    handleBackspace(event, codeInput2, codeInput1);
});
codeInput3.addEventListener("keydown", function (event) {
    handleBackspace(event, codeInput3, codeInput2);
});
codeInput4.addEventListener("keydown", function (event) {
    handleBackspace(event, codeInput4, codeInput3);
});


/******************************************************************** */


// Function to enable the Login button when all input fields are filled with numbers
function enableLoginButton() {

    var loginButton = document.querySelector(".login-button");
    var timerElement = document.getElementById("timer");
    var seconds = parseInt(timerElement.textContent);

    loginButton.style.backgroundColor = "blue";
    loginButton.style.cursor = "pointer";
    loginButton.disabled = false;
}

// Attach an input event listener to each code-input field
var codeInputs = document.querySelectorAll(".code-input input");
codeInputs.forEach(function (input) {
    input.addEventListener("input", enableLoginButton);
});


/******************************************************************** */


// Function to show the verification code section
function showVerificationCode() {
    var popupContent = document.querySelector(".popup-content");
    var verificationCodeSection = document.querySelector(".verification-code");

    // Clear the input values in the code-input boxes
    var codeInputs = document.querySelectorAll(".code-input input");
    codeInputs.forEach(function (input) {
        input.value = "";
    });

    popupContent.style.display = "none";
    verificationCodeSection.style.display = "block";


    // Enable the login button when showing the verification code section
    enableLoginButton();
};


/******************************************************************** */


// Attach a click event to the Proceed button
document.querySelector(".proceed_button").addEventListener("click", function (e) {
    e.preventDefault();

    var enteredNumberInput = document.querySelector(".number");
    var enteredNumberElement = document.getElementById("entered-number");
    enteredNumberElement.textContent = enteredNumberInput.value;


    // Get references to the select element and the element where the selected country code will be displayed
    var countryCodeSelect = document.querySelector("select");
    var selectedCountryCodeElement = document.getElementById("selected-country-code");

    // Add an event listener to the select element to detect changes
    countryCodeSelect.addEventListener("change", function () {
        // Update the selected country code element with the selected value from the dropdown
        selectedCountryCodeElement.textContent = countryCodeSelect.value;
    });

    // Initial update to set the selected country code to the default value
    selectedCountryCodeElement.textContent = countryCodeSelect.value + " ";

    showVerificationCode();
    startTimer();
    enableLoginButton();

});


/******************************************************************** */


// Function to handle the "Resend code" link click
function resendCode() {
    startTimer(); // Start the timer when the link is clicked

    var resendLink = document.getElementById("resend-link");
    resendLink.style.display = "none"; // Hide the "Resend code" link when timer starts again

    // You can add additional logic here, such as sending a new verification code.
    var codeInputs = document.querySelectorAll(".code-input input");
    codeInputs.forEach(function (input) {
        input.value = "";
    });

    // updateURL({ function: 'resendCode' }, 'Page Title', '/resendCode');
}


/******************************************************************** */


// Attach a click event to the "Resend code" link
document.getElementById("resend-link").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default link behavior
    resendCode(); // Call the resendCode function
});


/******************************************************************** */


// Function to show the success message
function showSuccessMessage() {
    var logout = document.querySelector(".dashboard");
    logout.style.display = "block";

    var login = document.querySelector(".login_button");
    login.style.display = "none";

    var Success_Message = document.querySelector(".success_message");
    Success_Message.style.display = "block";

    // // Update the URL
    // var stateObj = { function: 'showSuccessMessage' };
    // var pageTitle = 'Page Title';
    // var url = '/Successful_Login';
    // window.history.pushState(stateObj, pageTitle, url);

    // updateURL({ function: 'showSuccessMessage' }, 'Page Title', '/showSuccessMessage');
}


/******************************************************************** */


// Function to hide the dashboard
function hideDashboard() {
    var logout = document.querySelector(".dashboard");
    logout.style.display = "none";

    var login = document.querySelector(".login_button");
    login.style.display = "block";

    var Success_Message = document.querySelector(".success_message");
    Success_Message.style.display = "none";

    var LogoutMessage = document.querySelector(".logout-message");
    LogoutMessage.style.display = "block";

    // updateURL({ function: 'hideDashboard' }, 'Page Title', '/Logout');

}


/******************************************************************** */


document.querySelector(".login-button").addEventListener("click", function (e) {
    e.preventDefault();


    var popupContent = document.querySelector('.popup-content2');
    var timerElement = document.getElementById("timer");
    var seconds = parseInt(timerElement.textContent);
    var message = document.createElement('p');
    message.classList.add('otp_massage');
    popupContent.appendChild(message);

    if (seconds === 0) {
        // Handle timeout scenario
        // You can show a timeout message or take other actions here.
        message.textContent = "Timeout: Unable to log in. Please try again.";
    } else {
        var codeInputs = document.querySelectorAll(".code-input input");
        var enteredOTP = codeInput1.value + codeInput2.value + codeInput3.value + codeInput4.value;

        if (parseInt(enteredOTP) === generatedOTP) {
            // Handle successful login
            closePopup();
            showSuccessMessage();
        } else {
            // Handle invalid OTP scenario
            // You can show an error message or take other actions here.
            message.textContent = "Invalid OTP. Please enter a valid OTP.";
        }
    }
    setTimeout(function () {
        message.style.display = 'none'; // Hide the message after 1 second
    }, 1000); // 1000 milliseconds = 1 second
});


/******************************************************************** */


// Attach a click event to the "Logout" button
document.querySelector(".logout-button").addEventListener("click", function (e) {
    e.preventDefault();
    hideDashboard();
});
