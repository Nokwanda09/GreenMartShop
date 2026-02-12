import {
  addOrderService,
  addOrderItemsService,
} from "../service/orderService.js";

export const addOrderController = async (req, res) => {
  const orderItems = req.body;
  console.log(orderItems);
  const order = await addOrderService(orderItems);
  addOrderItemsService(orderItems);
  res.send(order);
};
