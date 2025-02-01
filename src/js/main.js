import {
  loadHeaderFooter,
  getLocalStorage,
} from "./utils.mjs";
const beenBefore = 'hasBeenBefore';
const dialog = document.querySelector("dialog");
const closeButton = document.getElementById("closebutton");
const dataLoad = ["cart", getLocalStorage, "so-cart", "cartNumberStyle"];

// Load reusable header and footer components
loadHeaderFooter();

if (localStorage.getItem(beenBefore) === null){
  dialog.showModal();
  localStorage.setItem(beenBefore, true)
}
closeButton.addEventListener("click", () => {
  dialog.close();
});