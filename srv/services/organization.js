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
}
