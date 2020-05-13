import Axios from '@/plugins/http.config';

const BASE_URL = `/login`;

export const LoginService = {
  authenticate: (username, password) => Axios.post(`${BASE_URL}`, {
    password,
    username,
  })
    .then(response => response.data.data)
    .catch(err => {
      throw new Error(err);
    }),
};
