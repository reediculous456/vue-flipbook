
import express from 'express';
import { UserService } from '../../services';
import { ResponseHandler, SessionManager } from '../../utils';

export const router = express.Router();

router.post(`/`, async (req, res, next) => {
  try {
    const token = await UserService.authenticate(req.body.username, req.body.password);
    delete req.body.username;
    delete req.body.password;
    await SessionManager.setSession(req, token);

    ResponseHandler(res, `login successful`);
  } catch (err) {
    next(err);
  }
});

export const path = `/api/login`;
