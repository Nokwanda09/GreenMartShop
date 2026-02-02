import { addItem } from "./main.js";

let cartItems = JSON.parse(localStorage.getItem("cartItems"));
// console.log(cartItems);

function displayCartItems() {
  console.log("Displaying cart items");
  const cartItemsSection = document.querySelector(".cart-items");

  if (cartItems.length > 0) {
    console.log("There are items in the cart");
    console.log(cartItems);
    cartItems.forEach((cartItem) => {
      const itemCard = document.createElement("div");
      itemCard.classList.add("item-card");

      cartItemsSection.appendChild(itemCard);

      // Left group for styling purposes
      const firstLeftGroup = document.createElement("div");
      firstLeftGroup.classList.add("left-group");

      const itemImage = document.createElement("div");
      itemImage.classList.add("item-image");

      const image = document.createElement("img");
      image.src = "";
      image.alt = "Product Image";
      itemImage.appendChild(image);

      const itemInfo = document.createElement("div");
      itemInfo.classList.add("item-info");

      const productName = document.createElement("div");
      productName.classList.add("product-name");
      productName.textContent = cartItem.name;

      const productCategory = document.createElement("div");
      productCategory.classList.add("product-category");
      productCategory.textContent = cartItem.category;

      const productPrice = document.createElement("div");
      productPrice.classList.add("product-price");
      productPrice.textContent = cartItem.price;

      itemInfo.appendChild(productName);
      itemInfo.appendChild(productCategory);
      itemInfo.appendChild(productPrice);

      firstLeftGroup.appendChild(itemImage);
      firstLeftGroup.appendChild(itemInfo);

      const secondLeftGroup = document.createElement("div");
      itemCard.classList.add("left-group");

      const btns = document.createElement("div");
      btns.classList.add("buttons");

      const minusBtn = document.createElement("button");
      minusBtn.classList.add("minus-btn");
      minusBtn.textContent = "-";

      const addBtn = document.createElement("button");
      addBtn.classList.add("add-btn");
      addBtn.textContent = "+";

      const quantity = document.createElement("div");
      quantity.classList.add("no-of-items");
      quantity.textContent = cartItem.quantity;

      const deleteBtn = document.createElement("div");
      deleteBtn.classList.add("delete-icon");

      const deleteIcon = document.createElement("img");
      deleteIcon.src = "assets/icons/delete.svg";
      deleteBtn.appendChild(deleteIcon);

      btns.appendChild(minusBtn);
      btns.appendChild(quantity);
      btns.appendChild(addBtn);
      btns.appendChild(deleteBtn);
      secondLeftGroup.appendChild(btns);

      itemCard.appendChild(firstLeftGroup);
      itemCard.appendChild(secondLeftGroup);
    });
  } else {
    console.log("There are no items in the cart");
    emptyCart();
  }
}

function emptyCart() {
  const emptyCartContent = document.querySelector(".empty-cart");
  emptyCartContent.style.display = "block";

  const cartContent = document.querySelector(".cart");
  cartContent.style.display = "none";
}

function decrementQuantity() {
  const minusBtns = document.querySelectorAll(".minus-btn");
  // console.log(minusBtns);

  minusBtns.forEach((minusBtn) => {
    minusBtn.addEventListener("click", () => {
      const itemCard = minusBtn.closest(".item-card");

      const productName = itemCard.querySelector(".product-name").textContent;
      const noOfItems = itemCard.querySelector(".no-of-items");

      const clickedItem = cartItems.find((item) => item.name === productName);
      console.log(clickedItem);
      if (clickedItem.quantity > 1) {
        clickedItem.quantity -= 1;
        console.log(cartItems);
        noOfItems.textContent = "";
        noOfItems.textContent = clickedItem.quantity;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        itemCard.style.display = "none";
        cartItems = cartItems.filter((item) => item.name !== clickedItem.name);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        if (cartItems.length === 0) {
          emptyCart();
        }
        console.log(cartItems);
      }
    });
  });
}

function removeItemfromCart(itemCard) {
  itemCard.style.display = "none";
}

function addNoOfItems() {
  const addBtns = document.querySelectorAll(".add-btn");

  addBtns.forEach((addBtn) => {
    addBtn.addEventListener("click", () => {
      const itemCard = addBtn.closest(".item-card");
      const productName = itemCard.querySelector(".product-name").textContent;
      addItem(itemCard);

      const noOfItems = itemCard.querySelector(".no-of-items");

      const item = cartItems.find((item) => item.name === productName);
      noOfItems.textContent = "";
      noOfItems.textContent = ++item.quantity;
      console.log(item.quantity);
    });
  });
}

function changeItemQuantity() {
  addNoOfItems();
  decrementQuantity();
}

displayCartItems();
changeItemQuantity();
