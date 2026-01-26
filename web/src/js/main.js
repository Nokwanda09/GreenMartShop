//  Display items to the web page

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

async function randomlyPickItemsForMainPage() {
  const noOfItems = 6;
  const products = await fetchProducts();
  let mainPageItems = [];

  for (let i = 0; i < noOfItems; i++) {
    const randomItem = products[Math.floor(Math.random() * products.length)];

    for (let item of mainPageItems) {
      if (item in mainPageItems) continue;
    }

    mainPageItems.push(randomItem);
  }

  return mainPageItems;
}

function displayProducts(products) {
  const productsSection = document.querySelector(".products");
  console.log(productsSection);
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

    // productCard.innerHTML = `
    // <div class="product-image">
    //       <img src="${product.image}" alt="" />
    //     </div>
    //     <div class="product-category">${product.category}</div>
    //     <div class="product-name">${product.name}</div>
    //     <div class="row">
    //       <div class="product-price">R${product.price}</div>
    //       <div class="product-availability">In stock</div>
    //     </div>
    //     <button type="button" class="add-to-cart-btn" id="add-to-cart-btn">
    //       Add to Cart
    //     </button>
    // `;
  });
}

window.addEventListener("load", async () => {
  const products = await randomlyPickItemsForMainPage();
  console.log(products);
  displayProducts(products);
});
