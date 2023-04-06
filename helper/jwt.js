import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.sendStatus(401);
  }
  const secret = process.env.SERCRET;
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  console.log(token)
  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      return next(err);
    }
    req.payload = payload;
  });
  next();
};
