import { readdirSync, statSync } from 'fs';
import path from 'path';
import appRoot from 'app-root-path';
import Shield from './Shield';

const DEFAULT_ROUTES_DIR = `${appRoot}/srv/routes`;

const getDirectories = (srcpath) =>
  readdirSync(srcpath).filter((file) => statSync(path.join(srcpath, file)).isDirectory());

export default (app, routeDirectoryPath = DEFAULT_ROUTES_DIR) => new Promise((resolve, reject) => {
  if (!app) {
    return reject(`No app provided`);
  }

  if (!routeDirectoryPath) {
    return reject(`No path provided`);
  }

  const routeDirectories = getDirectories(routeDirectoryPath);

  routeDirectories.forEach(route => {
    const routerPath = path.resolve(path.join(routeDirectoryPath, route));
    const router = require(routerPath);
    const params = [ router.path ];

    if (router.needsShield) {
      params.push(Shield);
    }

    params.push(router.router);
    app.use.apply(app, params);
  });

  resolve();
});
