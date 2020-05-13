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
  getUserSession: request => Promise.resolve(request.session.user),
  hasValidSession: req => {
    if (!req.session || !req.session.token) {
      return Promise.reject(`Invalid or no session`);
    }

    return Promise.resolve(req.session.token);
  },
  setSession: (req, token) => {
    req.session.token = token;

    return Promise.resolve();
  },
};
