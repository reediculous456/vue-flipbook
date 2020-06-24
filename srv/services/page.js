import { ImageConverter } from '../utils';
import { jsonify, Page } from '../database';

export class PageService {
  static async bulkCreate(filepath, file_id) {
    const images = await ImageConverter.convertToBase64Bulk(filepath, -1);

    for (const image of images) {
      await Page
        .forge()
        .save({
          file_id,
          image: image.base64,
          page_number: image.page,
        });
    }
  }

  static async update(id, page) {
    delete page.id;

    await Page
      .where({ id })
      .save(page, { patch: true })
      .then(jsonify);
  }
}
