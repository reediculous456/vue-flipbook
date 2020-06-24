import Axios from '@/plugins/http.config';

const BASE_URL = `/flipbook`;

export class FlipbookService {
  static get({ org_code, url }) {
    return Axios.get(`${BASE_URL}/${org_code}/${url}`)
      .then(response => response.data.data.flipbook);
  }
}
