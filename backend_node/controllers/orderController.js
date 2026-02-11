// import { orderService } from "../service/orderService.js";

export const addOrderController = async (req, res) => {
  const orderItems = req.body;
  res.send(orderItems);
};
