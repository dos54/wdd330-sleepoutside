import CheckoutProcess from "./CheckoutProcess.mjs";
import {
  loadHeaderFooter,
  numberOfItemsFn,
  getLocalStorage,
} from "./utils.mjs";

const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];
loadHeaderFooter(dataLoad, numberOfItemsFn);

const checkoutProcess = new CheckoutProcess("so-cart", "#order-summary");
checkoutProcess.init();

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrderTotal.bind(checkoutProcess),
  );
document
  .querySelector("form button.submit")
  .addEventListener("click", (event) => {
    event.preventDefault();

    checkoutProcess.checkout();
  });
