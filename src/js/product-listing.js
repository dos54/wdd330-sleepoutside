import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.mjs";
import { capitalizeString, getParam, loadHeaderFooter } from "./utils.mjs";

// Initialize product data
const dataSource = new ExternalServices();

// Select the DOM element where the product list will render
const liElement = document.querySelector(".product-list");

// Get the category of products from the URL
const category = getParam("category");

// Create a ProductList instance and initialize it
const listing = new ProductList(category, dataSource, liElement);

// Load reusable header and footer components
loadHeaderFooter();

// Changes title and h2 to match the category of products to be renderd
const title = document.querySelector("title");
const h2 = document.querySelector("h2");
const formatedCategoryString = category
  .split("-")
  .map(capitalizeString)
  .join(" ");
title.textContent = `Sleep Outside | Top ${formatedCategoryString}`;
h2.innerText = `Top ${formatedCategoryString}`;

// Render the products
listing.init();

const alert = new Alert();
alert.init();
