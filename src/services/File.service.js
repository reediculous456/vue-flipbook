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
      .then(response => response.data.data.file);
  }

  static getList() {
    return Axios.get(`${BASE_URL}`)
      .then(response => response.data.data.files);
  }

  static getById(id) {
    return Axios.get(`${BASE_URL}/${id}`)
      .then(response => response.data.data.file);
  }

  static publish(id, file) {
    return Axios.put(`${BASE_URL}/${id}/publish`, {
      file,
    })
      .then(response => response.data.data.file);
  }

  static unpublish(id) {
    return Axios.put(`${BASE_URL}/${id}/unpublish`)
      .then(response => response.data.data.file);
  }
}
