let cartItems = [];

document.addEventListener("click", (event) => {
  if (!event.target.matches(".add-to-cart-btn")) return;

  const product = event.target.closest(".product");

  const productName = product.dataset.name;
  const productPrice = Number(product.dataset.price);
});
