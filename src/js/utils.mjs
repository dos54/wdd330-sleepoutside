// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  if (localStorage.getItem(key) == null) {
    let dataArray = [data];
    localStorage.setItem(key, JSON.stringify(dataArray));
    //dataArray.push( JSON.parse(localStorage.getItem(key)));
  }
  else {
    let dataArray = JSON.parse(localStorage.getItem(key));//
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

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("product");
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  const htmlStrings = list.map(templateFn);
  if (clear){
    parentElement.innerHTML(position, htmlStrings.join(""));
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
export function renderWithTemplate(template, parentElement, callback, data){
  parentElement.insertAdjacentHTML("afterbegin", template);
  if(callback){
    callback(data);
  }
}
function converToText(response){
  return response.text();
}
export async function loadPartial(path) {
  const partalHTML = await fetch(path).then(converToText);
  const partial = document.createElement('template');
  partial.innerHTML = partalHTML;
  return partial;
}

export async function loadHeaderFooter() {
    const headerPath = '/partials/header.html';  
    const footerPath = '/partials/footer.html';  

    const headerElement = document.getElementById('header');  

    const headerTemplate = await loadPartial(headerPath);  
    renderWithTemplate(headerTemplate.innerHTML, headerElement);    

    const footerElement = document.getElementById('footer');  
    const footerTemplate = await loadPartial(footerPath);  
    renderWithTemplate(footerTemplate.innerHTML, footerElement);
  } 