import jwt from 'jsonwebtoken';
import config from 'config';

export class TokenService {
  static decode(token) {
    return new Promise(resolve => {
      const signKey = config.get(`token.signingKey`);
      const decodedToken = jwt.verify(token, signKey);
      resolve(decodedToken.user);
    });
  }

  static generate(payload, expiresIn = config.get(`token.expiration`)) {
    const signKey = config.get(`token.signingKey`);
    return jwt.sign(payload, signKey, { expiresIn });
  }
}
