import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Initialize product data for the "tents" category
const dataSource = new ProductData("tents");

// Select the DOM element where the product list will render
const liElement = document.querySelector(".product-list");

// Create a ProductList instance and initialize it
const listing = new ProductList("Tents", dataSource, liElement);

// Load reusable header and footer components
loadHeaderFooter();

// Render the product list
listing.init();
