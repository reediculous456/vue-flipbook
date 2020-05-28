import Axios from '@/plugins/http.config';

const BASE_URL = `/user`;

export class UserService {
  static whoAmI() {

    return Axios.get(`${BASE_URL}/whoami`)
      .then(response => response.data.data.user);
  }
}
