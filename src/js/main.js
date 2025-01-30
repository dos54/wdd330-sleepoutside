import {
  loadHeaderFooter,
  getLocalStorage,
} from "./utils.mjs";

const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];

// Load reusable header and footer components
loadHeaderFooter();
