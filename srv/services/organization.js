import { jsonify, Organization } from '../database';

export class OrganizationService {
  static create(org) {
    return Organization
      .forge()
      .save(org)
      .then(jsonify);
  }

  static getList() {
    return Organization
      .fetchAll({ require: true })
      .then(jsonify);
  }

  static getById(id) {
    return Organization
      .where({ id })
      .fetch({
        require: true,
      })
      .then(jsonify);
  }
}
