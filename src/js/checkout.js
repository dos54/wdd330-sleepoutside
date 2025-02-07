import CheckoutProcess from "./CheckoutProcess.mjs";
import { alertMessage, loadHeaderFooter, removeAllAlerts } from "./utils.mjs";

// const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];
loadHeaderFooter();

const checkoutProcess = new CheckoutProcess("so-cart", "#order-summary");
checkoutProcess.init();

const form = document.forms.checkout;

form.zip.addEventListener(
  "blur",
  checkoutProcess.calculateOrderTotal.bind(checkoutProcess),
);

form.expiration.addEventListener("blur", (event) => {
  // console.log(form.expiration.value);

  const currentDate = new Date();
  const expireDate = new Date(
    parseInt(form.expiration.value.split("/")[1]) + 2000,
    parseInt(form.expiration.value.split("/")[0]) - 1,
  );

  if (event.target.validity.patternMismatch) {
    event.target.setCustomValidity(
      "Please enter a valid expiration date.\nFormat: MM/YY",
    );
    // console.log("patternMismatch");
  } else if (currentDate > expireDate) {
    event.target.setCustomValidity(
      "Date has expired.\nPlease enter a valid expiration date.",
    );
    // console.log("expired");
  } else {
    event.target.setCustomValidity("");
    // console.log("valid");
  }
});

const button = form.querySelector("button");

button.addEventListener("click", (event) => {
  event.preventDefault();

  if (form.checkValidity()) {
    checkoutProcess.checkout();
  } else {
    removeAllAlerts();
    let isEmpty = false;
    form.querySelectorAll("input:invalid").forEach((invalidInput) => {
      if (invalidInput.validity.valueMissing && !isEmpty) {
        isEmpty = true;
        alertMessage("Please fill out all fields.");
      } else if (!invalidInput.validity.valueMissing)
        alertMessage(invalidInput.validationMessage);
    });
    form.reportValidity();
  }
});
