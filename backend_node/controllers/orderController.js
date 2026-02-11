import {
  addOrderService,
  addOrderItemsService,
} from "../service/orderService.js";

export const addOrderController = async (req, res) => {
  const orderItems = req.body;
  const order = await addOrderService(orderItems);
  addOrderItemsService(orderItems);
  res.send(order);
};
