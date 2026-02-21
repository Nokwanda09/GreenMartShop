import jwt from "jsonwebtoken";

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

  console.log(refreshToken);

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
