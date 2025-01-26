import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, numberOfItemsFn} from "./utils.mjs";

import { getLocalStorage } from "./utils.mjs";

// Initialize product data for the "tents" category
const dataSource = new ProductData("tents");

// Select the DOM element where the product list will render
const liElement = document.querySelector(".product-list");

// Create a ProductList instance and initialize it
const listing = new ProductList("Tents", dataSource, liElement);
const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];

// Load reusable header and footer components
loadHeaderFooter(dataLoad, numberOfItemsFn);

// Render the product list
listing.init();



