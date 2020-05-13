import appRoot from 'app-root-path';
// import { TokenService } from '../services';
import { SessionManager } from '.';

export default async (req, res) => {
  try {
  // const token = await SessionManager.hasValidSession(req);
  // const user = await TokenService.decode(token);

    res.sendFile(`${appRoot}/dist/index.html`);
  } catch (err) {
    await SessionManager.destroySession(req);

    res.redirect(`/login`);
  }
};
