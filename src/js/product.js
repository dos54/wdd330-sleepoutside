import {
  getParam,
  loadHeaderFooter,
  numberOfItemsFn,
  getLocalStorage,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];
const productId = getParam("product");

const dataSource = new ExternalServices("tents");

const product = new ProductDetails(productId, dataSource);

loadHeaderFooter(dataLoad, numberOfItemsFn);
product.init();
