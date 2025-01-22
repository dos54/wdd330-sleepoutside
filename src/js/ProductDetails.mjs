import { addToLocalStorage, getDiscount, isDiscounted } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `
    <section class="product-detail">
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />

        <p class="product-card__price">$${product.SuggestedRetailPrice.toFixed(2)}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">
            Add to Cart
          </button>
        </div>
      </section>
      `;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails("main");

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItem = {
      ...this.product,
      cartItemId: Date.now() + Math.random().toString(36).substring(2, 9), // Solve the issue of items having the same ID by assigning the product a unique id when added to the cart
    };

    addToLocalStorage("so-cart", cartItem);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product),
    );

    const listPrice = element.querySelector(".product-card__price");
    if (isDiscounted(this.product)) {
      listPrice.classList.add("discounted");
      listPrice.insertAdjacentHTML("afterend", `
        <p class="discounted-price">$${this.product.FinalPrice}</p>
        `);
    }
  }
}
