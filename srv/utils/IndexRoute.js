import appRoot from 'app-root-path';

export default (req, res, next) => {
  try {
    res.sendFile(`${appRoot}/dist/index.html`);
  } catch (err) {
    next(err);
  }
};
