import { File, jsonify } from '../database';

export class FileService {
  static create(file) {
    return File
      .forge()
      .save(file)
      .then(jsonify);
  }

  static getByIds(ids) {
    return File
      .where(`id`, `IN`, ids)
      .fetchAll({ require: true })
      .then(jsonify);
  }
}
