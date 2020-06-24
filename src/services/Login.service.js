import Axios from '@/plugins/http.config';

const BASE_URL = `/login`;

export class LoginService {
  static authenticate(username, password) {
    return Axios.post(`${BASE_URL}`, {
      password,
      username,
    })
      .then(response => response.data.data);
  }
}
