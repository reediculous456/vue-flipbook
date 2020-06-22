import Axios from '@/plugins/http.config';

const BASE_URL = `/file`;

export class FileService {
  static upload({ organization_id, url }, file) {
    return Axios.post(`${BASE_URL}/${organization_id}/${url}`,
      file,
      {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
      .then(response => response.data.data.file);
  }

  static delete(id) {
    return Axios.delete(`${BASE_URL}/${id}`)
      .then(response => response.data.data);
  }

  static getList() {
    return Axios.get(`${BASE_URL}`)
      .then(response => response.data.data.files);
  }

  static getById(id) {
    return Axios.get(`${BASE_URL}/${id}`)
      .then(response => response.data.data.file);
  }

  static update(id, file) {
    return Axios.put(`${BASE_URL}/${id}`, {
      file,
    })
      .then(response => response.data.data.file);
  }

  static getByUrl({ organization_id, url }) {
    return Axios.get(`${BASE_URL}/url/${url}`, {
      params: {
        organization_id,
      },
    })
      .then(response => response.data.data.files);
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
