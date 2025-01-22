import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

/**
 * Renders the cart contents on the page.
 * Retrieves items from localStorage, creates HTML for each item, and updates the total price.
 */
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  if (!cartItems.length || !cartItems.length) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    return;
  }

  const fragment = document.createDocumentFragment();
  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList = "cart-card divider";
    li.id = item.cartItemId;
    li.innerHTML = cartItemTemplate(item);
    fragment.appendChild(li);
  });
  productList.appendChild(fragment);

  showTotalPrice(
    "so-cart",
    "total-price",
    "total-price-text",
    "cart-footer_hide",
    "cart-footer_display",
    getTotalPrice("so-cart"),
  );
}

/**
 * Removes a specific item from the cart using its unique identifier.
 *
 * @param {string} uniqueItemId - The unique ID of the cart item to remove.
 * @returns {Array} The updated cart array with the item removed.
 */
function parseAndRemoveByUniqueId(uniqueItemId) {
  const cartItems = getLocalStorage("so-cart");
  const updatedCart = cartItems.filter(
    (item) => item.cartItemId !== uniqueItemId,
  );
  return updatedCart;
}

/**
 * Removes an item from localStorage and updates the cart.
 *
 * @param {string} uniqueItemId - The unique ID of the cart item to remove.
 */
function removeItemsFromCart(uniqueItemId) {
  let newCart = parseAndRemoveByUniqueId(uniqueItemId);
  localStorage.setItem("so-cart", JSON.stringify(newCart));
}

/**
 * Adds event listeners to all "Remove Item" buttons.
 * Each button removes the corresponding item from the DOM and updates the cart in localStorage.
 */
function buildCartControls() {
  const cartItems = document.querySelectorAll("ul.product-list li button");
  cartItems.forEach((button) =>
    button.addEventListener("click", () => {
      const liElement = button.parentElement;
      const uniqueItemId = liElement.id;

      removeItemsFromCart(uniqueItemId);
      liElement.remove();
    }),
  );
}

/**
 * Generates the HTML template for a cart item.
 *
 * @param {Object} item - The cart item object.
 * @param {string} item.Image - The image URL of the item.
 * @param {string} item.Name - The name of the item.
 * @param {Array} item.Colors - The array of available colors for the item.
 * @param {number} item.FinalPrice - The final price of the item.
 * @returns {string} The HTML template string for the cart item.
 */
function cartItemTemplate(item) {
  const newItem = `
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
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
 * Calculates the total price of all items in the cart.
 *
 * @param {string} localStorageKey - The key used to retrieve cart items from localStorage.
 * @returns {number} The total price of the cart.
 */
function getTotalPrice(localStorageKey) {
  const cartItems = getLocalStorage(localStorageKey);
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.FinalPrice;
  });

  return totalPrice;
}

/**
 * Updates the total price displayed on the page.
 * Also toggles visibility of the cart footer based on whether the cart is empty.
 *
 * @param {string} localStorageKey - The key used to retrieve cart items from localStorage.
 * @param {string} parentElementId - The ID of the parent element that contains the total price.
 * @param {string} elementId - The ID of the element where the total price is displayed.
 * @param {string} classHide - The CSS class to hide the cart footer.
 * @param {string} classdisplay - The CSS class to display the cart footer.
 * @param {number} price - The total price of the cart.
 */
function showTotalPrice(
  localStorageKey,
  parentElementId,
  elementId,
  classHide,
  classdisplay,
  price,
) {
  const divElement = document.getElementById(parentElementId);
  const pElement = document.getElementById(elementId);
  const cartItems = getLocalStorage(localStorageKey);
  if (cartItems.length >= 1 && cartItems !== undefined) {
    divElement.classList.remove(classHide);
    divElement.classList.add(classdisplay);
    pElement.textContent = `Total $${price.toFixed(2)}`;
  } else {
    divElement.classList.remove(classdisplay);
    divElement.classList.add(classHide);
  }
}

loadHeaderFooter();
renderCartContents();
buildCartControls();
