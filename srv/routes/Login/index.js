
import appRoot from 'app-root-path';
import express from 'express';
import { SessionManager } from '../../utils';

export const router = express.Router();

router.get(`/`, (req, res, next) => {
  try {
    SessionManager.hasValidSession(req)
      .then(() => {
        res.redirect(`/admin`);
      })
      .catch(() => {
        res.sendFile(`${appRoot}/dist/login.html`);
      });
  } catch (err) {
    next(err);
  }
});

export const path = `/login`;
