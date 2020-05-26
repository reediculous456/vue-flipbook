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

  //   uploadForFiles: (file) => {
  //           const original = {
  //             originalname: file.originalname,
  //             mimetype: file.mimetype,
  //             size: file.size,
  //           }

  //           const uploadFile = fs.createReadStream(file.path);

  //           const options = {
  //             formData: {
  //               file: uploadFile,
  //             },
  //             headers:{
  //                "token": token,
  //             },
  //             json: true,
  //             method: `POST`,
  //             qs: original
  //           };

  //           request (options, (error, response, body) => {
  //             if (response.statusCode === 403) {
  //               return reject(`Unauthorized`);
  //             }

  //             if (response.statusCode !== 200) {
  //               return reject(`Request Error`);
  //             }
  //             resolve(body.data.file);
  //           }),
  //     })

};
