import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter, numberOfItemsFn} from "./utils.mjs";

import { getLocalStorage } from "./utils.mjs";


const shoppingCart = new ShoppingCart("so-cart");
const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];

loadHeaderFooter(dataLoad, numberOfItemsFn);


shoppingCart.init();



