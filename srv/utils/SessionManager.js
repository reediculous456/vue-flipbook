import { TokenService } from '../services';

export default {
  destroySession: req => new Promise((resolve, reject) => {
    delete req.session.token;

    req.session.destroy(err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  }),
  getUserSession: req => req.session.user,
  hasValidSession: async req => {
    if (!req.session || !req.session.token) {
      throw new Error(`Invalid or no session`);
    }

    await TokenService.decode(req.session.token);

    return req.session.token;
  },
  setSession: (req, token) => {
    req.session.token = token;
  },
};
