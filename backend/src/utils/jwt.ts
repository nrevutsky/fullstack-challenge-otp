import { TOKEN_TYPE } from '../types/jwt';

const jwt = require('jsonwebtoken');

export const createToken = (email: string) => {
  return jwt.sign(
    { type: TOKEN_TYPE.ACCESS_TOKEN, email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const createRefreshToken = (email: string) => {
  return jwt.sign(
    { type: TOKEN_TYPE.REFRESH_TOKEN, email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
