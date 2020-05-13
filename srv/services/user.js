import { jsonify, User } from '../database';
import { TokenService } from '.';

export const UserService = {
  authenticate: async (username, password) => {
    try {
      const user = await UserService.getByUsername(username.toLowerCase());
      // if (!authResult) { throw new Error(); }
      delete user.password;
      return TokenService.generate({ user });
    } catch {
      throw new Error(`Invalid Username or Password`);
    }
  },

  create: (user) => User
    .forge()
    .save(user)
    .then(jsonify),

  getAdmins: () => User
    .fetchAll({
      withRelated: [ `role` ],
    })
    .then(jsonify),

  getByIds: (ids) => User
    .where(`id`, `IN`, ids)
    .fetchAll({ require: true })
    .then(jsonify),

  getByUsername: (username) => User
    .where({ username })
    .fetch({
      require: true,
      withRelated: [ `role` ],
    })
    .then(jsonify),

  getList: () => User
    .fetchAll({
      withRelated: [ `role` ],
    })
    .then(jsonify),
};
