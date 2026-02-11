import {
  addOrderToDb,
  //   addOrderItemsToDb,
  getItemPriceFromDb,
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

export async function addOrder(orderItems) {
  const customerId = orderItems.customerId;
  const total = await calculateTotal(orderItems.cartItems);
  const order = addOrderToDb(customerId, total);
  return order;
}

const ordert = {
  customerId: 8,
  cartItems: [
    { name: " banana", quantity: 2 },
    { name: " pears", quantity: 1 },
  ],
};

const i = await addOrder(ordert);

// const i = await calculateTotal(ordert.cartItems);
// const i = await getItemPriceFromDb("banana");
console.log(i);
