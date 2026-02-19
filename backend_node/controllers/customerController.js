import {
  getCustomer,
  createAccount,
  passwordMatches,
  generateAccessToken,
} from "../service/customerService.js";

export const getCustomerController = async (req, res) => {
  const customerEmail = req.params.email;

  if (!customerEmail) {
    res.status(400).json({ error: "Customer email is missing" });
  }

  const customer = await getCustomer(customerEmail);
  console.log(customer);
  if (customer) {
    res.status(200).json({ customer: customer[0] });
  } else {
    res.status(404).json({ error: "User not Found" });
  }
};

export const getCustomerIdController = async (req, res) => {
  const customerInfo = req.body;

  // if (!customerInfo) {
  //   res.status(400).json({ error: "Customer info is missing" });
  // }
  // const customerId = await getCustomerId(customerInfo);
  // if (customerId) {
  //   res.status(201).json({ customerId: customerId });
  // } else {
  //   res.status(404).json({ error: "User not found" });
  // }

  res.send(customerInfo);
};

export const registerCustomerController = async (req, res) => {
  const customerDetails = req.body;

  const existingCustomer = await getCustomer(customerDetails.emailAddress);

  if (existingCustomer.length > 0) {
    res.status(409).send({
      error: `Account for ${customerDetails.emailAddress} already exists`,
    });
  } else {
    const newCustomer = await createAccount(customerDetails);
    console.log(newCustomer);
    res
      .status(201)
      .send({ id: newCustomer.id, status: "Account created successfully" });
  }
};

export const loginCustomerController = async (req, res) => {
  const credentials = req.body;
  const customer = await getCustomer(credentials.emailAddress);

  if (customer.length > 0) {
    const passwordMatch = await passwordMatches(
      credentials.password,
      customer[0].password,
    );
    if (passwordMatch) {
      const token = generateAccessToken({
        id: customer[0].id,
        fullName: customer[0].full_name,
      });
      res.status(200).send(token);
    } else {
      res.status(403).send({ error: "Wrong Password" });
    }
  } else {
    res.status(404).send({ error: "Account not found" });
  }
};
