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

function createAccount() {
  const createAccountForm = document.querySelector(".create-account-form");

  listenToForm(createAccountForm, (accountDetails) => {
    console.log(accountDetails);
  });
}

createAccount();
realTimeInputValidation();
