import arrify from 'arrify';
import { jsonify, User } from '../database';
import { RoleService } from './role';
import { ActiveDirectoryService, TokenService } from '.';

export class UserService {
  static async authenticate(username, password) {
    try {
      if (!username || !password) {
        throw new Error(`Invalid parameters provided`);
      }

      const user = await UserService.getByUsername({ username: username.toLowerCase() });

      if (!user) {
        throw new Error(`Wrong Username`);
      }

      await ActiveDirectoryService.authenticate(
        username,
        password,
      );

      UserService.setLastLogin(user.id, new Date());

      return TokenService.generate({
        user: {
          id: user.id,
          role: user.role,
          username: user.username,
        },
      });
    } catch {
      throw new Error(`Invalid Username or Password`);
    }
  }

  static assign({ id, organization_id, role_id }) {
    return User
      .where({ id })
      .save({ deleted_on: null, role_id }, { patch: true })
      .then(user => {
        RoleService.getByCodes(arrify(`USER`))
          .then(roles => {
            const [ userRole ] = roles;
            if (role_id === userRole.id) {
              user.organizations().attach(organization_id);
            } else {
              user.organizations().detach().catch(err => {
                if (!err.message.includes(`EmptyResponse`)) {
                  throw err;
                }
              });
            }
          });
      })
      .then(jsonify);
  }

  static deassign({ id, organization_id }) {
    return User
      .where({ id })
      .fetch({
        withRelated: [ `organizations` ],
      })
      .then(user => {
        RoleService.getByCodes(arrify(`USER`))
          .then(roles => {
            const [ userRole ] = roles;
            const userData = jsonify(user);

            if (userData.role_id === userRole.id) {
              user.organizations().detach(organization_id);
            }

            if (userData.organizations.length < 2) {
              return User
                .where({ id })
                .save({ deleted_on: new Date() }, { patch: true })
                .then(jsonify);
            }
          });
      })
      .then(jsonify);
  }

  static create(user) {
    return User
      .forge()
      .save(user)
      .then(jsonify);
  }

  static getByIds(ids) {
    return User
      .where(`id`, `IN`, ids)
      .fetchAll({
        require: true,
        withRelated: [ `organizations` ],
      })
      .then(jsonify);
  }

  static getByRole(role_id) {
    return User
      .where({ role_id })
      .fetchAll({ require: false })
      .then(jsonify);
  }

  static getByUsername({ activeOnly = true, require = true, username }) {
    return User
      .where({ username })
      .fetch({
        require,
        softDelete: activeOnly,
        withRelated: [ `role` ],
      })
      .then(jsonify);
  }

  static getByOrganization(organization_id) {
    return User
      .query(qb => {
        qb.innerJoin(`users_organizations`, `users.id`, `users_organizations.user_id`)
          .where(`users_organizations.organization_id`, organization_id);
      })
      .fetchAll({ require: false })
      .then(jsonify);
  }

  static getList() {
    return User
      .fetchAll({
        withRelated: [ `role` ],
      })
      .then(jsonify);
  }

  static setLastLogin(id, last_login) {
    return User
      .where({ id })
      .save({ last_login }, { patch: true })
      .then(jsonify);
  }
}
