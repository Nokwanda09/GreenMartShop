import { getCustomer, getCustomerId } from "../service/customerService.js";

export const getCustomerController = async (req, res) => {
  const customerEmail = req.params.email;

  if (!customerEmail) {
    res.status(400).json({ error: "Customer email is missing" });
  }

  const customer = await getCustomer(customerEmail);
  res.status(201).json({ customer: customer[0] });
};

export const getCustomerIdController = async (req, res) => {
  const customerInfo = req.body;

  if (!customerInfo) {
    res.status(400).json({ error: "Customer info is missing" });
  }
  const customerId = await getCustomerId(customerInfo);
  res.status(201).json({ customerId: customerId });
};
