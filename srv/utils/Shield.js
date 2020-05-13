import config from 'config';
import { TokenService } from '../services';
import SessionManager from './SessionManager';

export default async (req, res, next) => {
  try {
    await SessionManager.hasValidSession(req)
      .then(token => {
        req.token = token || req.headers.token;
        TokenService.decode(token)
          .then(user => {
            req.user = user;
          });
      });
    next();
  } catch (err) {
    res.redirect(config.loginEntryPoint);
  }
};
