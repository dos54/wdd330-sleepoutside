import { getParam, loadHeaderFooter, numberOfItemsFn, getLocalStorage} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];
const productId = getParam("product");

const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);


loadHeaderFooter(dataLoad, numberOfItemsFn);
product.init();