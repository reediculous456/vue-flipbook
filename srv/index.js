import ConnectRedis from 'connect-redis';
import Redis from 'redis';
import bodyParser from 'body-parser';
import boolParser from 'express-query-boolean';
import compression from 'compression';
import config from 'config';
import express from 'express';
import session from 'express-session';
import appRoot from 'app-root-path';
import { ErrorHandler, IndexRoute, logger, Morgan, RouteLoader } from './utils';

export default (app, _http) => {
  const RedisStore = ConnectRedis(session);
  const sesh = session({
    resave: true,
    saveUninitialized: true,
    secret: config.get(`cache.sessionKey`),
    store: new RedisStore({
      client: Redis.createClient({
        host: config.cache.host,
        pass: config.cache.pass,
        port: config.cache.port,
      }),
    }),
    ttl: config.cache.ttl || 86400,
  });

  app.use(sesh);
  app.use(compression());

  app.use(bodyParser.json({ limit: `10mb` }));
  app.use(bodyParser.urlencoded({
    extended: false,
  }));
  app.use(boolParser());
  app.use(express.static(`${appRoot}/dist`));

  if (process.env.NODE_ENV !== `dev`) {
    app.use(Morgan.before);
    app.use(Morgan.after);
  }

  RouteLoader(app)
    .then(() => {
      app.all(`/*`, IndexRoute);
      app.use(ErrorHandler);
      logger.info(`Application started`);
    })
    .catch((err) => {
      logger.error(`Failed to start application`, err.stack);
      process.exit(1);
    });
};
