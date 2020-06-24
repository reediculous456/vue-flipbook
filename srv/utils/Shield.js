import config from 'config';
import { TokenService } from '../services';
import SessionManager from './SessionManager';

export default async (req, res, next) => {
  try {
    const token = await SessionManager.hasValidSession(req);
    req.token = token || req.headers.token;
    const user = await TokenService.decode(token);
    req.user = user;
    next();
  } catch (err) {
    res.redirect(config.loginEntryPoint);
  }
};
