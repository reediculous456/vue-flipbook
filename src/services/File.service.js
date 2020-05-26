import Axios from '@/plugins/http.config';

const BASE_URL = `/file`;

export class FileService {
  // eslint-disable-next-line no-empty-pattern
  static upload({ }, file) {
    return Axios.post(`${BASE_URL}`,
      file,
      {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })

      .then(response => response.data.data);
  }
}
