import { renderListWithTemplate, getDiscount, isDiscounted } from "./utils.mjs";

function productCardTemplate(product) {
  let discount = "";
  if (isDiscounted(product)) {
    discount = "DISCOUNT";
  }
  return `<li class="product-card" data-id="${product.Id}">
          <a href="/product_pages/index.html?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${(product.FinalPrice)} ${discount}</p>
          </a>
        </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    this.dataList = await this.dataSource.getData(this.category);
    this.renderList();

    // console.log(this.dataList);
  }
  renderList() {
    renderListWithTemplate(productCardTemplate, this.listElement, this.dataList);
  }

  /**
   * Sorts the list of products based on the argument passed through and updates the DOM accordingly.
   * 
   * @param {string} sortBy - The criteria to sort the list by. 
   *                          Possible values are "productName", "brandName", "priceAscending", and "priceDescending".
   */
  sortList(sortBy) {
    const listElements = Array.from(this.listElement.children);

    this.dataList.sort((a, b) => {
      switch (sortBy) {
        case "productName":
          return a.NameWithoutBrand.localeCompare(b.NameWithoutBrand);
        case "brandName":
          return a.Name.localeCompare(b.Name);
        case "priceAscending":
          return a.FinalPrice - b.FinalPrice;
        case "priceDescending":
          return b.FinalPrice - a.FinalPrice;
        default:
          return 0;
      }
    });

    this.dataList.forEach(product => {
      const element = listElements.find(element => element.dataset.id == product.Id);

      this.listElement.appendChild(element);
    })
  }
}
