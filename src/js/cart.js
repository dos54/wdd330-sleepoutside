import ShoppingCart from "./ShoppingCart.mjs";
import {
  loadHeaderFooter,
  getLocalStorage,
} from "./utils.mjs";

const shoppingCart = new ShoppingCart("so-cart");
const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];

loadHeaderFooter();
shoppingCart.init();
