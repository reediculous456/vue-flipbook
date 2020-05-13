import { logger } from './Logger';

export default (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // Have to put an empty string as the first argument or it logs error: undefined
  logger.error(``, err);
  res.status(err.statusCode || 500).json({ err, status: err.statusCode });
};
