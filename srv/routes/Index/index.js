
import express from 'express';
import { IndexRoute, SessionManager } from '../../utils';

export const router = express.Router();

router.get(`/`, IndexRoute);

router.get(`/logout`, (req, res) => {
  SessionManager
    .destroySession(req)
    .then(() => {
      res.redirect(`/`);
    });
});

export const path = `/`;
