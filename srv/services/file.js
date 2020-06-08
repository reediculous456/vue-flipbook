import { File, jsonify } from '../database';

export class FileService {
  static create(file) {
    return File
      .forge()
      .save(file)
      .then(jsonify);
  }

  static getList() {
    return File
      .fetchAll({
        require: false,
        withRelated: [ `organization` ],
      })
      .then(jsonify);
  }

  static getById(id) {
    return File
      .where({ id })
      .fetch({
        require: true,
        withRelated: [ `pages`, `organization`, `uploader` ],
      })
      .then(jsonify);
  }

  static async update(id, file) {
    delete file.id;

    await File
      .where({ id })
      .save(file, { patch: true })
      .then(jsonify);
  }
}
