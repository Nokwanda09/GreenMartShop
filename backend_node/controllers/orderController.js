import {
  addOrderService,
  addOrderItemsService,
} from "../service/orderService.js";

export const addOrderController = async (req, res) => {
  const orderItems = req.body;

  if (!orderItems) {
    res.status(400).json({ error: "Order items are missing" });
  }
  const order = await addOrderService(orderItems);
  addOrderItemsService(orderItems);
  res.status(201).json({ status: "Order placed successfully" });
};
