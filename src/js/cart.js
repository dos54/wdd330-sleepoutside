import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}
//calls items from cart then compares them to the deleted item, first matching ID is removed then cart is overwritten
function parseAndRemoveByID(itemID){
  const cartItems = getLocalStorage("so-cart");
  let itemRemoved = false;
  const updatedCart = [];
  cartItems.forEach(item => {
    if (item.Id === itemID && itemRemoved === false ){
      itemRemoved = true;
    }
    else{
      updatedCart.push(item)
    }
  });
  return updatedCart;
};
//calls remove function and updates cart
function removeItemsFromCart(itemID){
  console.log('removing ' + itemID);
  let newCart = parseAndRemoveByID(itemID);
  localStorage.setItem('so-cart', JSON.stringify(newCart));
  console.log('removed');
};

function buildCartControls(){
  const cartItems = getLocalStorage("so-cart");
  cartItems.map((item) => document.getElementById(`removeItem${item.Id}`)
  .addEventListener('click', ()=> {removeItemsFromCart(item.Id)} ));

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
  <button id="removeItem${item.Id}" >Remove Item</button>
</li>`;

  return newItem;
}

renderCartContents();
buildCartControls();