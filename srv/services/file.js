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

  static getByUrl({ org_code, organization_id, url, user_id }) {
    return File
      .where({
        organization_id,
        url,
        ...org_code === `PERSONAL` && { uploaded_by: user_id },
      })
      .fetchAll({ require: false })
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
