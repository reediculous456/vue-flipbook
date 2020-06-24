import Axios from '@/plugins/http.config';

const BASE_URL = `/role`;

export class RoleService {
  static getByCodes(codes) {
    return Axios.get(`${BASE_URL}/codes`, {
      params: {
        codes,
      },
    })
      .then(response => response.data.data.roles);
  }
}
