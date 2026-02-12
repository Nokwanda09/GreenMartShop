import { getCustomer, getCustomerId } from "../service/customerService.js";

export const getCustomerController = async (req, res) => {
  const customer = await getCustomer(req.params.email);
  res.send(customer);
};

export const getCustomerIdController = async (req, res) => {
  const customerInfo = req.body;
  console.log(customerInfo);
  const customerId = await getCustomerId(customerInfo);
  console.log(customerId);
  res.send(customerId);
};
