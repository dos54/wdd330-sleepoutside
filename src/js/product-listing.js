import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { capitalizeString, getParam, loadHeaderFooter } from "./utils.mjs";

// Initialize product data
const dataSource = new ProductData();

// Select the DOM element where the product list will render
const liElement = document.querySelector(".product-list");

// Get the category of products from the URL
const category = getParam("category");

// Create a ProductList instance and initialize it
const listing = new ProductList(category, dataSource, liElement);

// Load reusable header and footer components
loadHeaderFooter();

const title = document.querySelector("title");
title.textContent = `Sleep Outside | Top ${category.split("-").map(capitalizeString).join(" ")}`;
document.querySelector("h2").innerText =
  `Top ${category.split("-").map(capitalizeString).join(" ")}`;

// Render the product
listing.init();
