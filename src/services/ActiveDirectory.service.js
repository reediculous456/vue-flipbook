import Axios from '@/plugins/http.config';

const BASE_URL = `/active-directory`;

export class ActiveDirectoryService {
  static search(searchTerm) {
    return Axios.get(`${BASE_URL}/search`, {
      params: {
        searchTerm,
      },
    })
      .then(response => response.data.data.users);
  }
}
