import { addItem } from "./main.js";

let cartItems = JSON.parse(localStorage.getItem("cartItems"));
// console.log(cartItems);

function displayCartItems() {
  const cartItemsSection = document.querySelector(".cart-items");

  if (cartItems.length > 0) {
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
      }
      calculateCartTotal();
    });
  });
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
      calculateCartTotal();
    });
  });
}

function changeItemQuantity() {
  addNoOfItems();
  decrementQuantity();
}

function deleteItemsFromCart() {
  const deleteBtns = document.querySelectorAll(".delete-icon");

  deleteBtns.forEach((deleteBtn) => {
    const itemCard = deleteBtn.closest(".item-card");
    const productName = itemCard.querySelector(".product-name").textContent;

    deleteBtn.addEventListener("click", () => {
      itemCard.style.display = "none";

      cartItems = cartItems.filter((item) => item.name !== productName);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      calculateCartTotal();
    });
  });
}

function calculateSubtotal() {
  const subtotalField = document.querySelector(".subtotal");

  console.log(cartItems);
  const cartSubtotal = cartItems.reduce((subtotal, item) => {
    return subtotal + Number(item.price) * item.quantity;
  }, 0);

  subtotalField.textContent = "R" + cartSubtotal.toFixed(2);

  return cartSubtotal;
}

function calculateCartTotal() {
  const subTotal = calculateSubtotal();
  const deliveryFee = 20.99;
  const orderTotal = subTotal + deliveryFee;

  const total = document.querySelector(".total-amount");

  total.textContent = orderTotal.toFixed(2);
}

// This function listens to the and reacts when the submit button is clicked and renders customer info
function listenToForm(form, onSubmit) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerInfo = Object.fromEntries(new FormData(event.target));
    onSubmit(customerInfo);
  });
}

function orderDetails() {
  const customerDetailsForm = document.querySelector(".clientDetailsForm");

  listenToForm(customerDetailsForm, (customerInfo) => {
    console.log(customerInfo);
    sendOrderToServer(customerInfo);
  });

  // console.log(Object.fromEntries(new FormData(event.target)));

  // const fullName = customerInfo.get("full-name");
  // const email = customerInfo.get("email");
  // const phoneNumber = customerInfo.get("phone-number");
  // const address = customerInfo.get("address");
}

async function getCustomerId(customerInfo) {
  try {
    const response = await fetch(`http://localhost:3000/customer/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerInfo),
    });

    const data = await response.json();
    return data.customerId;
  } catch (error) {
    console.log("Encountered a problem trying to fetch customer id");
    console.log(error);
  }
}

async function formatOrderItems(customerInfo) {
  const customerId = await getCustomerId(customerInfo);
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const orderItems = cartItems.map((item) => ({
    name: item.name,
    quantity: item.quantity,
  }));

  console.log({ customerId: customerId, orderItems: orderItems });

  return { customerId: customerId, cartItems: orderItems };
}

async function sendOrderToServer(customerInfo) {
  try {
    const response = await fetch(`http://localhost:3000/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(await formatOrderItems(customerInfo)),
    });

    if (!response.ok) {
      console.log(response);
    } else {
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.log("Can't send order to the server");
    console.log(error);
  }
}

displayCartItems();
changeItemQuantity();
deleteItemsFromCart();
calculateCartTotal();
// console.log(getCustomerInfo());
orderDetails();
