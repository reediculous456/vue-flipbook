import { ImageConverter } from '../utils';
import { Page } from '../database';

export class PageService {
  static async bulkCreate(filepath, file_id) {
    const images = await ImageConverter.convertToBase64Bulk(filepath, -1);

    for (const image of images) {
      Page
        .forge()
        .save({
          file_id,
          image: image.base64,
          page_number: image.page,
        });
    }
  }
}
