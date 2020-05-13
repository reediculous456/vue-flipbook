import jwt from 'jsonwebtoken';
import config from 'config';

export const TokenService = {
  decode: (token) => new Promise(resolve => {
    const signKey = config.get(`token.signingKey`);
    const decodedToken = jwt.verify(token, signKey);
    resolve(decodedToken.user);
  }),

  generate: (payload, expiresIn = config.get(`token.expiration`)) => {
    const signKey = config.get(`token.signingKey`);
    return jwt.sign(payload, signKey, { expiresIn });
  },
};
