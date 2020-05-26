import { File, jsonify } from '../database';

export const FileService = {
  create: (file) => File
    .forge()
    .save(file)
    .then(jsonify),

  getByIds: (ids) => File
    .where(`id`, `IN`, ids)
    .fetchAll({ require: true })
    .then(jsonify),
};
