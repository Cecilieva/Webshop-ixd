import { getExcerpt, getStockStatus, getAllProducts } from "./helpers.js";

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  console.log("App initialized 🚀");
  const products = await getAllProducts();
  displayAllProducts(products);
}

const displayAllProducts = (products) => {
  const grid = document.querySelector("#productGrid");
  grid.innerHTML = products.map(displayProduct).join("");
};

function displayProduct(product) {
  const stock = getStockStatus(product.inStock);

  const hasDiscount = product.price < 50;

  return /*html*/ `
    <article class="product-card">
      <a href="product.html?id=${product.id}">
        <img src="${product.image}" class="product-image" alt="${product.title}" />
      </a>

      <div class="product-info">

      ${product.price < 50 ? '<span class="discount-badge">-20%</span>' : ""}

        <h2 class="product-title">
          <a href="product.html?id=${product.id}">${product.title}</a>
        </h2>

        <p class="product-description">${getExcerpt(product.description)}</p>

        <p class="product-price">${(product.price * 7)} kr</p>

       <p class="product-price">

        <span class="product-stock ${stock.class}">
          ${stock.text}
        </span>
      </div>
    </article>
  `;
}

