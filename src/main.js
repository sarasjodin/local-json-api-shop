'use strict';

let allProducts = []; // Global variabel för att lagra produktdatan

// Ladda produkterna från JSON
fetch('src/data/products.json')
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    showNavigation(); // Generera kategorinavigation
    showProductCards(allProducts); // Visa alla produkter initialt
  })
  .catch((error) => console.error('Error loading products:', error));

// Visa kategorier i navigeringen
function showNavigation() {
  const categories = [...new Set(allProducts.map((p) => p.category))]; // Hämta unika kategorier
  const navEl = document.querySelector('#categories ul');
  navEl.innerHTML = ''; // Rensa eventuell tidigare HTML

  // Skapa "Alla" som standardval
  const allCategoryItem = document.createElement('li');
  allCategoryItem.classList.add('shop-button', 'selected');
  allCategoryItem.setAttribute('tabindex', '0'); // Gör den tabb-bar
  allCategoryItem.setAttribute('role', 'button'); // Gör den till knapp för skärmläsare
  allCategoryItem.setAttribute('aria-current', 'true'); // Indikerar aktiv kategori
  allCategoryItem.textContent = 'Alla';
  allCategoryItem.addEventListener('click', () =>
    filterByCategory(allCategoryItem, 'Alla')
  );
  allCategoryItem.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      filterByCategory(allCategoryItem, 'Alla');
    }
  });

  navEl.appendChild(allCategoryItem);

  // Skapa övriga kategorier
  categories.forEach((category) => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('shop-button');
    categoryItem.setAttribute('tabindex', '0'); // Gör den tabb-bar
    categoryItem.setAttribute('role', 'button'); // Gör den till knapp för skärmläsare
    categoryItem.textContent = category;

    // Lägg till eventlyssnare för klick och tangentbordsinteraktion
    categoryItem.addEventListener('click', () =>
      filterByCategory(categoryItem, category)
    );
    categoryItem.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        filterByCategory(categoryItem, category);
      }
    });

    navEl.appendChild(categoryItem);
  });
}

// Filtrera produkter efter kategori
function filterByCategory(element, category) {
  // Ta bort "selected" och aria-current från alla kategorier
  document.querySelectorAll('#categories .shop-button').forEach((button) => {
    button.classList.remove('selected');
    button.removeAttribute('aria-current');
  });

  // Markera den valda kategorin
  element.classList.add('selected');
  element.setAttribute('aria-current', 'true');

  // Filtrera produkterna
  const filteredProducts =
    category === 'Alla'
      ? allProducts
      : allProducts.filter((product) => product.category === category);

  showProductCards(filteredProducts);
}

// Visa produktkort
function showProductCards(products) {
  const container = document.querySelector('.product-images');
  container.innerHTML = ''; // Rensa container

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
        <a href="${product.link}" aria-label="${product['aria-label']}">
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
    console.error('Produkten kunde inte hittas.');
  }
}
