import { jsonify, User } from '../database';
import { ActiveDirectoryService, TokenService } from '.';

export const UserService = {
  authenticate: async (username, password) => {
    try {
      if (!username || !password) {
        throw new Error(`Invalid parameters provided`);
      }

      const user = await UserService.getByUsername(username.toLowerCase());

      if (!user) {
        throw new Error(`Wrong Username`);
      }

      await ActiveDirectoryService.authenticate(
        username,
        password,
      );

      return TokenService.generate({
        user: {
          id: user.id,
          role: user.role,
        },
      });
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
