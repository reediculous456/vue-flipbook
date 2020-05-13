import ActiveDirectory from 'activedirectory2';
import config from 'config';

const ad = new ActiveDirectory(config.get(`ActiveDirectory`));
const DOMAIN = config.get(`ActiveDirectory.domain`);

export const ActiveDirectoryService = {
  authenticate(username, password) {
    return new Promise((resolve, reject) => {
      ad.authenticate(
        `${username}@${DOMAIN}`,
        password,
        (err, auth) => {
          if (err) {
            return reject(err);
          }

          if (!auth) {
            return reject(`Authentication failed`);
          }
          resolve(`Authenticated`);
        },
      );
    });
  },

  find({ lastName, firstName = `*`, username }) {
    return new Promise((resolve, reject) => {
      ad.findUsers(`(|(&(sn=${lastName})(givenName=${firstName}))(cn=${username}))`, (err, users = []) => {
        if (err) {
          return reject(err);
        }

        resolve(users.map(u => ActiveDirectoryService.getUserInfo(u)));
      });
    });
  },

  getUserInfo(adUser) {
    return {
      email: adUser.mail ? `${adUser.mail}` : ``,
      name: `${adUser.givenName} ${adUser.sn}` || ``,
      phone: adUser.telephoneNumber ? `${adUser.telephoneNumber}` : ``,
      username: adUser.sAMAccountName ? `${adUser.sAMAccountName}` : ``,
    };
  },
};
