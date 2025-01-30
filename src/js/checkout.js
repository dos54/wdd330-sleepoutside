import CheckoutProcess from "./CheckoutProcess.mjs";
import {
  loadHeaderFooter,
  getLocalStorage,
} from "./utils.mjs";

const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];
loadHeaderFooter();

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
