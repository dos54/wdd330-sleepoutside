import ShoppingCart from "./ShoppingCart.mjs";
import {
  loadHeaderFooter,
  getLocalStorage,
} from "./utils.mjs";

const shoppingCart = new ShoppingCart("so-cart");

loadHeaderFooter();
shoppingCart.init();
