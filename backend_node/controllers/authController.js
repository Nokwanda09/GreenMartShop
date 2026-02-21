import {
  getCustomer,
  passwordMatches,
  generateAccessToken,
} from "../service/customerService.js";

import jwt from "jsonwebtoken";

export const loginCustomerController = async (req, res) => {
  const credentials = req.body;
  const customer = await getCustomer(credentials.emailAddress);

  if (customer.length > 0) {
    const passwordMatch = await passwordMatches(
      credentials.password,
      customer[0].password,
    );
    if (passwordMatch) {
      const user = {
        id: customer[0].id,
        fullName: customer[0].full_name,
      };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      // Add the refresh token to the db - must be hashed
      res
        .status(200)
        .send({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(403).send({ error: "Wrong Password" });
    }
  } else {
    res.status(404).send({ error: "Account not found" });
  }
};

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).send({ error: "User not authorized" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        res.status(403).send({ error: "Token Expired / broken" });
      }
      req.user = user;
      next();
    });
  }
};

export const refreshTokenController = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(401).send({ error: "No Refresh Token" });
  }

  // Check if the refresh token exist in our database

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) {
      res.status(403).send({ error: "Invalid Refresh Token" });
    }
    const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.json({ accessToken: newAccessToken });
  });
};
