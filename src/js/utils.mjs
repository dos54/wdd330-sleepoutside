// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  if (localStorage.getItem(key) == null) {
    let dataArray = [data];
    localStorage.setItem(key, JSON.stringify(dataArray));
    //dataArray.push( JSON.parse(localStorage.getItem(key)));
  }
  else {
    let dataArray = JSON.parse(localStorage.getItem(key));
    dataArray.unshift(data);
    localStorage.setItem(key, JSON.stringify(dataArray));
  }
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
