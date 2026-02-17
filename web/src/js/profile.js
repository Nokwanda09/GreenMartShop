function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const regex = /^0\d{9}$/;
  return regex.test(phoneNumber);
}

function passwordMatches(password, confirmPassword) {
  return password === confirmPassword;
}

function realTimeInputValidation() {
  const emailInput = document.querySelector(".email-input");
  const phoneNumberInput = document.querySelector(".phone-number-input");
  const passwordInput = document.querySelector(".password");
  const confirmPasswordInput = document.querySelector(".confirm-password");

  emailInput.addEventListener("blur", () => {
    if (!validateEmail(emailInput.value)) {
      insertWarning(emailInput, "email");
    } else {
      removeWarning(emailInput);
    }
  });

  phoneNumberInput.addEventListener("input", () => {
    if (!validatePhoneNumber(phoneNumberInput.value)) {
      insertWarning(phoneNumberInput, "phone number");
    } else {
      removeWarning(phoneNumberInput);
    }
  });

  confirmPasswordInput.addEventListener("input", () => {
    if (!passwordMatches(passwordInput.value, confirmPasswordInput.value)) {
      insertWarning(confirmPasswordInput, "password");
    } else {
      removeWarning(confirmPasswordInput);
    }
  });
}

function insertWarning(inputBox, valueName) {
  const warningElement = inputBox.nextElementSibling;

  const warning = document.createElement("p");
  warning.classList.add("warning");

  if (valueName !== "password") {
    warning.textContent = `Please insert valid ${valueName}`;
  } else {
    warning.textContent = `Passwords do not match`;
  }

  if (!(warningElement && warningElement.classList.contains("warning"))) {
    inputBox.insertAdjacentElement("afterEnd", warning);
  }
}

function removeWarning(inputBox) {
  const warningElement = inputBox.nextElementSibling;
  if (warningElement && warningElement.classList.contains("warning")) {
    warningElement.remove();
  }
}

function listenToForm(form, onSubmit) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const accountDetails = Object.fromEntries(new FormData(event.target));
    onSubmit(accountDetails);
  });
}

async function sendCreateAccountRequest(accountDetails) {
  const response = await fetch("http://localhost:3000/register", {
    headers: {
      method: "POST",
      "Content-Type": "application/json",
    },
    body: {
      fullName: accountDetails.fullName,
      emailAdress: accountDetails.email,
      phoneNumber: accountDetails.phoneNumber,
      deliveryAdress: accountDetails.deliveryAdress,
      password: accountDetails.confirmPassword,
    },
  });

  if (response.ok) {
    const data = response.json();
    console.log(data);
  } else {
    // Tell the user that an error occurred, she must try again
  }
}

function createAccount() {
  const createAccountForm = document.querySelector(".create-account-form");

  listenToForm(createAccountForm, (accountDetails) => {
    console.log(accountDetails);
    if (
      validateEmail(accountDetails.email) &&
      validatePhoneNumber(accountDetails.phoneNumber) &&
      passwordMatches(accountDetails.password, accountDetails.confirmPassword)
    ) {
      sendCreateAccountRequest(accountDetails);
    } else {
      // Insert a paragraph to tell user to ensure that all info is valid
    }
  });
}

async function sendLoginRequest(accountDetails) {
  const response = await fetch("http://localhost:3000/login", {
    headers: {
      method: "POST",
      "Content-Type": "application/json",
    },
    body: {
      email: accountDetails.email,
      password: accountDetails.password,
    },
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    // Tell the user that access denied, she must try again or create account if the doesn't have any
  }

  return response;
}

function signUserIn() {
  const loginForm = document.querySelector(".querySelector");

  listenToForm(loginForm, (accountDetails) => {
    sendLoginRequest(accountDetails);
  });
}

createAccount();
realTimeInputValidation();
