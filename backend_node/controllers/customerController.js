import { getCustomer } from "../service/service.js";

export const getCustomerController = async (req, res) => {
  const customer = await getCustomer(req.params.email);
  res.send(customer);
};
