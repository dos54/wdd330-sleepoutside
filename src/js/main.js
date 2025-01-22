import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const liElement = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, liElement);
// console.log(listing);
loadHeaderFooter();
listing.init();

