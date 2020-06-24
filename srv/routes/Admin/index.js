
import express from 'express';
import appRoot from 'app-root-path';
import { SessionManager } from '../../utils';

export const router = express.Router();

router.all(`/*`, async (req, res) => {
  try {
    await SessionManager.hasValidSession(req);

    res.sendFile(`${appRoot}/dist/index.html`);
  } catch (err) {
    await SessionManager.destroySession(req);

    res.redirect(`/login`);
  }
});

export const path = `/admin`;
