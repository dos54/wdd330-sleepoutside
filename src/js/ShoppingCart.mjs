import { getLocalStorage, setLocalStorage, getDiscount } from "./utils.mjs";

/**
 * ShoppingCart class to manage a shopping cart's functionality.
 * Handles rendering cart items, calculating totals, applying discounts, and managing item removal.
 */
export default class ShoppingCart {
  /**
   * Creates a new ShoppingCart instance.
   * @param {string} localStorageKey - The key used to store and retrieve the cart items in localStorage.
   */
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey; // Key for localStorage access.
    this.items = getLocalStorage(localStorageKey); // Retrieve cart items from localStorage.
  }

  /**
   * Initializes the shopping cart by rendering its contents.
   */
  init() {
    this.renderShoppingCart();
  }

  /**
   * Generates the HTML template for a cart item.
   *
   * @param {Object} item - The cart item object.
   * @param {string} item.Image - The image URL of the item.
   * @param {string} item.Name - The name of the item.
   * @param {Array} item.Colors - The array of available colors for the item.
   * @param {number} item.FinalPrice - The final price of the item.
   * @returns {string} - The HTML template string for the cart item.
   */
  cartItemTemplate(item) {
    const newItem = `
        <a href="#" class="cart-card__image">
            <img
            src="${item.Images.PrimaryMedium}"
            alt="${item.Name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        <button>Remove Item</button>
        `;

    return newItem;
  }

  /**
   * Builds a cart item element as an HTML list item (`li`) for rendering in the DOM.
   *
   * @param {Object} item - The shopping item object.
   * @returns {HTMLElement} - A `<li>` element with the cart item's details.
   */
  buildCartItem(item) {
    const liElement = document.createElement("li");
    liElement.id = item.cartItemId; // Assign unique cart item ID.
    liElement.classList = "cart-card divider"; // Add appropriate styling classes.
    liElement.innerHTML = this.cartItemTemplate(item); // Set inner HTML using the template.

    // Add event listener to remove the item when the "Remove Item" button is clicked.
    const removeButton = liElement.querySelector("button");
    removeButton.addEventListener("click", () => {
      this.removeItem(item.cartItemId); // Remove from cart data.
      liElement.remove(); // Remove from DOM.
    });

    return liElement;
  }

  /**
   * Removes an item from the shopping cart based on its unique ID.
   * Updates the cart data in localStorage and refreshes the cart summary.
   *
   * @param {string} cartItemId - The unique ID of the cart item to be removed.
   */
  removeItem(cartItemId) {
    this.items = this.items.filter((item) => item.cartItemId !== cartItemId); // Filter out the removed item.
    setLocalStorage(this.localStorageKey, this.items); // Update localStorage with the new cart data.
    this.updateCartSummary(); // Update the cart summary display.
  }

  /**
   * Calculates the total price of all items in the cart.
   *
   * @returns {number} - The total price of all items in the cart.
   */
  calculateTotalPrice() {
    const cartItems = getLocalStorage(this.localStorageKey); // Retrieve cart items.
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.FinalPrice; // Sum up item prices.
    });
    return totalPrice;
  }

  /**
   * Calculates the total discount applied to the cart.
   *
   * @returns {number} - The total discount for all items in the cart.
   */
  calculateTotalDiscount() {
    let totalDiscount = 0;
    const cartItems = this.items; // Get cart items.
    cartItems.forEach((item) => {
      totalDiscount += getDiscount(item); // Calculate discount for each item.
    });
    return totalDiscount;
  }

  /**
   * Updates the cart summary, including subtotal, discount, and grand total.
   * Hides the summary if the cart is empty.
   */
  updateCartSummary() {
    const cartSummary = document.getElementById("cart-summary"); // Summary container element.
    console.log(this.items.length);
    if (this.items.length < 1) {
      cartSummary.hidden = true; // Hide if cart is empty.
    } else {
      cartSummary.hidden = false; // Show otherwise.
    }

    const discount = this.calculateTotalDiscount(); // Calculate total discount.

    // Calculate subtotal as total price + discount.
    const subtotal = this.calculateTotalPrice() + discount;

    // Update the cart summary HTML.
    cartSummary.innerHTML = `
        <p id="subtotal-price" class="cart-subtotal">Subtotal: $${subtotal.toFixed(2)}</p>
        <p id="discount" class="cart-discount">Discount: -$${this.calculateTotalDiscount().toFixed(2)} </p>
        <p id="grand-total-price" class="cart-total">Total: $${this.calculateTotalPrice().toFixed(2)}</p>
    `;

    // Hide discount line if no discount is applied.
    const discountElement = cartSummary.querySelector("#discount");
    if (discount <= 0) discountElement.hidden = true;
  }

  /**
   * Renders the shopping cart contents into the DOM.
   * Creates list items for all cart items and displays the cart summary.
   */
  renderShoppingCart() {
    const productList = document.querySelector(".product-list"); // List container for cart items.
    if (!this.items.length) {
      productList.innerHTML = "<p>Your shopping cart is empty.</p>";
      return;
    }

    const fragment = document.createDocumentFragment(); // Use document fragment for efficient DOM updates.
    this.items.forEach((item) => {
      fragment.appendChild(this.buildCartItem(item)); // Build and append each cart item.
    });
    productList.appendChild(fragment); // Add all items to the DOM at once.
    this.updateCartSummary(); // Update the cart summary.
  }
}
