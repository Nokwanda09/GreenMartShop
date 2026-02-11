import {
  addOrderToDb,
  fetchLastOrderId,
  getItemPriceFromDb,
  addOrderItem,
  getProductFromDb,
  updateStockAmount,
} from "../database/database.js";

async function calculateTotal(orderItems) {
  const itemTotals = await Promise.all(
    orderItems.map(async (item) => {
      const itemName = item.name.trim();
      const itemPrice = await getItemPriceFromDb(itemName);
      return itemPrice * item.quantity;
    }),
  );

  const total = itemTotals.reduce((sum, value) => sum + value, 0);

  return total;
}

export async function addOrderService(orderItems) {
  const customerId = orderItems.customerId;
  const total = await calculateTotal(orderItems.cartItems);
  const order = addOrderToDb(customerId, total);
  return order;
}

export async function addOrderItemsService(order) {
  const customerId = order.customerId;
  const orderId = await fetchLastOrderId(customerId);
  const orderItems = order.cartItems;

  orderItems.map(async (item) => {
    const quantity = item.quantity;
    const product = await getProductFromDb(item.name.trim());
    const price = Number(product.price);
    const productId = product.product_id;
    const updatedStockAmount = product.stock - quantity;

    addOrderItem(orderId, productId, quantity, price);
    updateStockAmount(updatedStockAmount, product.name);
  });
}

const ordert = {
  customerId: 8,
  cartItems: [
    { name: " banana", quantity: 2 },
    { name: " pears", quantity: 1 },
  ],
};

// const i = await addOrderItemsService(ordert);
// console.log(i);
