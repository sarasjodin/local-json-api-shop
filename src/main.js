"use strict";

let allProducts = []; // Global variabel för att lagra produktdatan

// Ladda produkterna från JSON
fetch("src/data/products.json")
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    showNavigation(); // Generera kategorinavigation
    showProductCards(allProducts); // Visa alla produkter initialt
  })
  .catch((error) => console.error("Error loading products:", error));

// Visa kategorier i navigeringen
function showNavigation() {
  const categories = [...new Set(allProducts.map((p) => p.category))]; // Hämta unika kategorier
  const navEl = document.querySelector("#categories ul"); // Förutsätter en <ul> i #categories
  navEl.innerHTML = `
    <li class="category-button selected" onclick="filterByCategory(this, 'Alla')">Alla</li>
  `; // Lägg till "Alla" som standard vald
  categories.forEach((category) => {
    navEl.innerHTML += `
      <li class="category-button" onclick="filterByCategory(this, '${category}')">${category}</li>
    `;
  });
}

// Filtrera produkter efter kategori
function filterByCategory(element, category) {
  // Ta bort "selected"-klassen från alla kategoriknappar
  const allCategoryButtons = document.querySelectorAll(
    "#categories .category-button"
  );
  allCategoryButtons.forEach((button) => button.classList.remove("selected"));

  // Lägg till "selected" till den valda kategoriknappen
  element.classList.add("selected");

  // Filtrera produkterna
  const filteredProducts =
    category === "Alla"
      ? allProducts
      : allProducts.filter((product) => product.category === category);

  // Visa de filtrerade produkterna
  showProductCards(filteredProducts);
}

// Visa produktkort
function showProductCards(products) {
  const container = document.querySelector(".product-images");
  container.innerHTML = ""; // Rensa container

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
        <a href="${product.link}" aria-label="${product["aria-label"]}">
          <img 
            src="${product.images.webp}" 
            alt="${product.alttext}" 
            class="product-image" 
            loading="lazy" />
        </a>
        <h2 class="product-name">${product.name}</h2>
        <p class="product-price">${product.price} SEK</p>
        <p class="product-description">${product.description}</p>
        <button class="shop-button" onclick="addToBasket(this,'${product.articleid}','${product.name}','${product.price}','${product.images.thumbnail}',true)">Köp</button>
      `;

    container.appendChild(productCard);
  });
}

// Funktion för att lägga till produkter i varukorgen
function addToBasket(articleid) {
  const product = allProducts.find((p) => p.articleid === articleid);
  if (product) {
    console.log(`Produkten "${product.name}" har lagts till i varukorgen.`);
    // Lägg till logik för att uppdatera varukorgen här
  } else {
    console.error("Produkten kunde inte hittas.");
  }
}
