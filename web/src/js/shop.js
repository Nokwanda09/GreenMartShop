import { displayProductsInShopping } from "./main.js";

// Filter functionality
const filterItems = document.querySelectorAll(".filter-item");

filterItems.forEach((filterItem) => {
  filterItem.addEventListener("click", async () => {
    filterItems.forEach((filterItem) => filterItem.classList.remove("active"));

    filterItem.classList.add("active");
    let selectedItem = filterItem.innerText;

    const products = await getCategoryProducts(selectedItem);
    console.log(products);
    displayProductsInShopping(products);
  });
});

async function getCategoryProducts(category) {
  category = category.toLowerCase();
  let response;

  try {
    if (category === "all") {
      response = await fetch(`http://localhost:3000/products`);
    } else {
      response = await fetch(`http://localhost:3000/category/${category}`);
    }

    if (!response.ok) {
      console.log(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
