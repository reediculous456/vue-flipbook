import { jsonify, Role } from '../database';

export class RoleService {
  static getByCodes(codes) {
    return Role
      .where(`code`, `IN`, codes)
      .fetchAll({ require: true })
      .then(jsonify);
  }
}
