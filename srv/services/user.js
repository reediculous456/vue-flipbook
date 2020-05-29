import { jsonify, User } from '../database';
import { ActiveDirectoryService, TokenService } from '.';

export class UserService {
  static async authenticate(username, password) {
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
  }

  static create(user) {
    return User
      .forge()
      .save(user)
      .then(jsonify);
  }

  static getAdmins() {
    return User
      .fetchAll({
        withRelated: [ `role` ],
      })
      .then(jsonify);
  }

  static getByIds(ids) {
    return User
      .where(`id`, `IN`, ids)
      .fetchAll({ require: true })
      .then(jsonify);
  }

  static getByUsername(username) {
    return User
      .where({ username })
      .fetch({
        require: true,
        withRelated: [ `role` ],
      })
      .then(jsonify);
  }

  static getList() {
    return User
      .fetchAll({
        withRelated: [ `role` ],
      })
      .then(jsonify);
  }
}
