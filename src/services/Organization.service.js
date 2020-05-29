import Axios from '@/plugins/http.config';

const BASE_URL = `/organization`;

export class OrganizationService {
  static getList() {
    return Axios.get(`${BASE_URL}`)
      .then(response => response.data.data.organizations);
  }
}
