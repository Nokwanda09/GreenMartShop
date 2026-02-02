// List of cart items
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

let products = [];

async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/products");

    if (!response.ok) {
      console.log(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function randomlyPickItemsForMainPage(products) {
  const noOfItems = 6;
  let mainPageItems = new Set();

  while (mainPageItems.size < noOfItems) {
    const randomItem = products[Math.floor(Math.random() * products.length)];
    mainPageItems.add(randomItem);
  }

  return mainPageItems;
}

// Display store products in the index.html page
function displayProductsInMainPage(products) {
  const featuredProductsSection = document.querySelector(".products");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    featuredProductsSection.appendChild(productCard);

    const imageSection = document.createElement("div");
    imageSection.classList.add("product-image");
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    imageSection.appendChild(image);

    // Contains info abbout the product
    const secondSection = document.createElement("div");
    secondSection.classList.add("second-section");

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productCategory = document.createElement("div");
    productCategory.classList.add("product-category");
    productCategory.textContent = product.category;

    const productName = document.createElement("div");
    productName.classList.add("product-name");
    productName.textContent = product.name;

    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.textContent = `R${product.price}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.type = "button";
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.textContent = "Add To Cart";

    productInfo.appendChild(productName);
    productInfo.appendChild(productCategory);
    productInfo.appendChild(productPrice);

    secondSection.appendChild(productInfo);
    secondSection.appendChild(addToCartBtn);

    productCard.appendChild(imageSection);
    productCard.appendChild(secondSection);
  });
}

// Display store products in the shop.html page
export function displayProductsInShopping(products) {
  const productsSection = document.querySelector(".products");

  productsSection.innerHTML = "";

  if (products.length === 0) {
    const notification = document.createElement("h1");
    notification.textContent = "No items to display";
    productsSection.appendChild(notification);
  } else {
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");

      productsSection.appendChild(productCard);

      const imageSection = document.createElement("div");
      imageSection.classList.add("product-image");
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      imageSection.appendChild(image);

      const productCategory = document.createElement("div");
      productCategory.classList.add("product-category");
      productCategory.textContent = product.category;

      const productName = document.createElement("div");
      productName.classList.add("product-name");
      productName.textContent = product.name;

      const rowForExtraInfo = document.createElement("div");
      rowForExtraInfo.classList.add("row");

      const productPrice = document.createElement("div");
      productPrice.classList.add("product-price");
      productPrice.textContent = `R${product.price}`;

      const productAvailability = document.createElement("div");
      productAvailability.classList.add("product-availability");
      productAvailability.textContent = "In Stock";

      rowForExtraInfo.appendChild(productPrice);
      rowForExtraInfo.appendChild(productAvailability);

      const AddToCartBtn = document.createElement("button");
      AddToCartBtn.type = "button";
      AddToCartBtn.classList.add("add-to-cart-btn");
      AddToCartBtn.textContent = "Add To Cart";

      productCard.appendChild(imageSection);
      productCard.appendChild(productCategory);
      productCard.appendChild(productName);
      productCard.appendChild(rowForExtraInfo);
      productCard.appendChild(AddToCartBtn);
    });
  }
}

// Add to cart functionality
function addItemToCart() {
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

  addToCartBtns.forEach((addToCartBtn) => {
    addToCartBtn.addEventListener("click", () => {
      // Change the appearance of the card
      addToCartBtn.textContent = "Added!";

      setTimeout(() => {
        addToCartBtn.textContent = "Add To Cart";
      }, 3000);

      // Add selected item to the card
      const productSelected = addToCartBtn.closest(".product");

      addItem(productSelected);
    });
  });
}

export function addItem(selectedItem) {
  const productName = selectedItem.querySelector(".product-name").textContent;
  const productPrice = selectedItem
    .querySelector(".product-price")
    .textContent.replace("R", "");
  const productCategory =
    selectedItem.querySelector(".product-category").textContent;

  const itemAlreadyInCart = cartItems.find((item) => item.name === productName);

  if (itemAlreadyInCart) {
    itemAlreadyInCart.quantity++;
  } else {
    cartItems.push({
      name: productName,
      price: productPrice,
      category: productCategory,
      quantity: 1,
    });
  }
  // console.log(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // console.log(localStorage.getItem("cartItems"));
}

export function getCartItems() {
  return cartItems;
}

window.addEventListener("DOMContentLoaded", async () => {
  products = await fetchProducts();
  const path = window.location.pathname;

  if (path.includes("/index.html")) {
    const itemsForMainPage = randomlyPickItemsForMainPage(products);
    displayProductsInMainPage(itemsForMainPage);
  } else if (path.includes("/shop.html")) {
    displayProductsInShopping(products);
  }

  addItemToCart();
});

console.log(localStorage.getItem("cartItems"));
