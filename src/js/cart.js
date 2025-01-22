import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  if (!cartItems.length) {
    document.querySelector(".product-list").innerHTML =
    "<p>Your cart is empty.</p>";
    return;
  }
  showTotalPrice(
    "so-cart",
    "total-price",
    "total-price-text",
    "cart-footer_hide",
    "cart-footer_display",
    getTotalPrice("so-cart"),
  );
}
//calls items from cart then compares them to the deleted item, first matching ID is removed then cart is overwritten
function parseAndRemoveByID(itemID) {
  const cartItems = getLocalStorage("so-cart");
  let itemRemoved = false;
  const updatedCart = [];
  cartItems.forEach((item) => {
    if (item.Id === itemID && itemRemoved === false) {
      itemRemoved = true;
    } else {
      updatedCart.push(item);
    }
  });
  return updatedCart;
}
//calls remove function and updates cart
function removeItemsFromCart(itemID) {
  // console.log("removing " + itemID);
  let newCart = parseAndRemoveByID(itemID);
  localStorage.setItem("so-cart", JSON.stringify(newCart));
  // console.log("removed");
  renderCartContents();
  buildCartControls();
}

function buildCartControls() {
  const cartItems = document.querySelectorAll("ul.product-list li button");
  cartItems.forEach((item, i) =>
    item.addEventListener("click", () => {
      removeItemsFromCart(getLocalStorage("so-cart")[i].Id);
    }),
  );
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
  <button>Remove Item</button>
</li>`;

  return newItem;
}

function getTotalPrice(localStorageKey){
  const cartItems = getLocalStorage(localStorageKey);
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.FinalPrice;
  });

  return totalPrice;
}

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
