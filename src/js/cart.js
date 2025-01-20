import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  if (!cartItems.length) {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function getTotalPrice(localStorageKey){
  const cartItems = getLocalStorage(localStorageKey);
  let totalPrice = 0;
  cartItems.forEach(item => {
    totalPrice += item.FinalPrice;
  });

  return totalPrice;
}

function showTotalPrice(localStorageKey,parentElementId,elementId, classHide, classdisplay, price){
  const divElement = document.getElementById(parentElementId);
  const pElement = document.getElementById(elementId);
  const cartItems = getLocalStorage(localStorageKey);
  if (cartItems.length >= 1){
    divElement.classList.remove(classHide);
    divElement.classList.add(classdisplay);
    pElement.textContent = `Total $${price.toFixed(2)}`;
  }
}

renderCartContents();
showTotalPrice("so-cart", "total-price", "total-price-text", "cart-footer_hide", "cart-footer_display", getTotalPrice("so-cart"));


