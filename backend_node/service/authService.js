import {
  getRefreshToken,
  addRefreshTokenToDb,
} from "../models/refreshTokenModel.js";

import crypto from "crypto";

const calculateExpirationDate = (days) => {
  const date = new Date();
  date.setDate(date.getUTCDate() + days);
  return date;
};

const hashedToken = (refreshToken) => {
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  return hashedRefreshToken;
};

export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

export async function addResfreshToken(userId, token) {
  const refreshToken = addRefreshTokenToDb(
    userId,
    hashedToken(token),
    calculateExpirationDate(7),
  );
}

export async function refreshTokenExists(userId, token) {
  // const hashedToken = hashedToken(token);
  const refreshToken = await getRefreshToken(userId, hashedToken(token));

  if (refreshToken) {
    return true;
  }

  return false;
}
