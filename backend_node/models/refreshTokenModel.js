import { pool } from "../config/database.js";

export async function addRefreshTokenToDb(
  userId,
  refreshToken,
  expirationDate,
) {
  const token = pool.query(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?,?)",
    [userId, refreshToken, expirationDate],
  );

  return token;
}

export async function getRefreshToken(userId, token) {
  const refreshToken = pool.query(
    "SELECT * FROM refresh_tokens WHERE user_id = ? AND token = ?",
    [userId, token],
  );

  return refreshToken;
}
