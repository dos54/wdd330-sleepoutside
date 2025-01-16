import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const liElement = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, liElement);
console.log(listing);
listing.init();