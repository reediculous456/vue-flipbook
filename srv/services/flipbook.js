import { Flipbook, jsonify } from '../database';

export class FlipbookService {
  static get({ org_code, url }) {
    return Flipbook
      .where({ org_code, url })
      .fetch({
        require: false,
        withRelated: [ `file`, `file.pages` ],
      })
      .then(jsonify);
  }
}
