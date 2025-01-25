/**
 * Selects and returns the first element that matches the given CSS selector within the specified parent element.
 *
 * @param {string} selector - The CSS selector to query.
 * @param {Document|Element} [parent=document] - The parent element to search within. Defaults to the document.
 * @returns {Element|null} The first matching element, or null if no match is found.
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Retrieves data from localStorage and parses it into a JavaScript object or array.
 *
 * @param {string} key - The key used to retrieve the data.
 * @returns {Array|Object} The parsed data from localStorage, or an empty array if no data exists.
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

/**
 * Saves data to localStorage under the specified key. If the key already exists, the new data is added
 * to the beginning of the stored array. If the key does not exist, it initializes a new array with the data.
 *
 * @param {string} key - The key under which the data will be stored.
 * @param {*} data - The data to store, which will be serialized to JSON.
 */
export function addToLocalStorage(key, data) {
  if (localStorage.getItem(key) == null) {
    let dataArray = [data];
    localStorage.setItem(key, JSON.stringify(dataArray));
    //dataArray.push( JSON.parse(localStorage.getItem(key)));
  } else {
    let dataArray = JSON.parse(localStorage.getItem(key)); //
    dataArray.unshift(data);
    localStorage.setItem(key, JSON.stringify(dataArray));
  }
}

/**
 * Saves data to localStorage. !!!WILL OVERWRITE EXISTING DATA!!!
 * @param {string} key - The key under which the data will be stored
 * @param {*} data - The data to store, as JSON
 */
export function setLocalStorage(key, data) {
  let dataArray = data
  localStorage.setItem(key, JSON.stringify(dataArray))
}

/**
 * Sets event listeners for both "touchend" and "click" events on a specific element.
 * The specified callback function will be executed when either event occurs.
 *
 * @param {string} selector - The CSS selector for the element to attach listeners to.
 * @param {Function} callback - The callback function to execute on event.
 */
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * Get the product id from the URL.
 * @param {*} param
 * @returns {string} The product id
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("product");
  return product;
}

/**
 * Renders a list of items into the DOM using a provided template function
 *
 * @param {Function} templateFn - A function that takes a single item from the list and returns an
 *                                HTML string template for it
 * @param {Element} parentElement - The parent DOM element to which the rendered templates are appended.
 * @param {Object[]} list - An array of data items to be rendered using the template function.
 * @param {string} position [position="afterbegin"] - The position relative to the parent element where the
 *                                           rendered templates should be inserted.
 *                                           Must be one of: "beforebegin", "afterbegin", "beforeend", "afterend"
 * @param {boolean} clear [clear=false] - Whether to clear the existing content of the parent element before rendering.
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML(position, htmlStrings.join(""));
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

/**
 * Renders a list of items into the DOM using a provided template function
 *
 * @param {Element} template - The template HTML to be rendered
 * @param {Element} parent - The parent DOM element to which the rendered templates are appended.
 * @param {Object} data - An array of data items to be rendered using the template function.
 * @param {Function} position [position="afterbegin"] - The position relative to the parent element where the
 *                                           rendered templates should be inserted.
 *                                           Must be one of: "beforebegin", "afterbegin", "beforeend", "afterend"
 */
export function renderWithTemplate(template, parent, data, callback) {
  
  parent.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

function convertToText(response) {
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.text();
}

/**
 * Load a template from a file
 * @param {string} path Path to the template
 * @returns an HTML template
 */
export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

/**
 * Load the headers and footers
 */
export async function loadHeaderFooter(dataLoad, numberOfItemsFunction) {
  const headerPath = "/partials/header.html";
  const footerPath = "/partials/footer.html";
 
  const headerElement = document.getElementById("main-header");
  
  const headerTemplate = await loadTemplate(headerPath);
  
  
  renderWithTemplate(headerTemplate.innerHTML, headerElement);

  const footerElement = document.getElementById("main-footer");
  const footerTemplate = await loadTemplate(footerPath);
  renderWithTemplate(footerTemplate.innerHTML, footerElement);
  numberOfItemsFunction(dataLoad);
  
}

/**
 * Checks if a given item is discounted based on its SuggestedRetailPrice and FinalPrice.
 *
 * @param {Object} item - The item to check.
 * @param {number} item.SuggestedRetailPrice - The suggested retail price of the item.
 * @param {number} item.FinalPrice - The final price of the item.
 * @returns {boolean} - Returns true if the item is discounted, false otherwise.
 */
export function isDiscounted(item) {
  return (
    typeof item.SuggestedRetailPrice === "number" &&
    typeof item.FinalPrice === "number" &&
    item.FinalPrice < item.SuggestedRetailPrice
  );
}

/**
 * Calculates the discount amount for a given item.
 *
 * @param {Object} item - The item to calculate the discount for.
 * @param {number} item.SuggestedRetailPrice - The suggested retail price of the item.
 * @param {number} item.FinalPrice - The final price of the item.
 * @returns {number} - The discount amount. Returns 0 if the item is not discounted.
 */
export function getDiscount(item) {
  if (isDiscounted(item)) {
    return item.SuggestedRetailPrice - item.FinalPrice;
  } else {
    return 0;
  }
}
// Adding a superscript number of items to the cart logo.

export function numberOfItemsFn(dataLoad){
  const cartLogoContainerElementId = dataLoad[0]
  const getLocalStorageFn = dataLoad[1];
  const localStorageKey = dataLoad[2];
  
  const classNumber = dataLoad[3];
  const cartContainer = document.getElementById(cartLogoContainerElementId);
  
  
  const number =  document.createElement("p");
  number.setAttribute("class", classNumber);
  number.setAttribute("id", "number");
  const lStorage = getLocalStorageFn(localStorageKey);
  
  const numberOfItems = lStorage.length;
  
  number.textContent = `${numberOfItems}`;

  cartContainer.appendChild(number);
}

//Update the number of items.
export function updateNumberofItems(dataLoad, qsFn){
  
  const getLocalStorageFn = dataLoad[1];
  const localStorageKey = dataLoad[2];
  const number = qsFn("#number");
  
  
  
  
  const lStorage = getLocalStorageFn(localStorageKey);
  
  const numberOfItems = lStorage.length;
  
  
  number.textContent = numberOfItems;

}