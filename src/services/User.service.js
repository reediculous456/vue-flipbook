import Axios from '@/plugins/http.config';

const BASE_URL = `/user`;

export class UserService {
  static whoAmI() {
    return Axios.get(`${BASE_URL}/whoami`)
      .then(response => response.data.data.user);
  }

  static get({ ids, organization_id, role_ids, username }) {
    return Axios.get(`${BASE_URL}`, {
      params: {
        ids,
        organization_id,
        role_ids,
        username,
      },
    })
      .then(response => response.data.data.users);
  }

  static getByRole(role_id) {
    return Axios.get(`${BASE_URL}/role/${role_id}`)
      .then(response => response.data.data.users);
  }

  static getByOrganization(organization_id) {
    return Axios.get(`${BASE_URL}/org/${organization_id}`)
      .then(response => response.data.data.users);
  }

  static create(user) {
    return Axios.post(`${BASE_URL}`, { user })
      .then(response => response.data.data.user);
  }

  static assign({ organization_id, role_id, username }) {
    return Axios.post(`${BASE_URL}/assign`, {
      organization_id,
      role_id,
      username,
    })
      .then(response => response.data.data.user);
  }

  static deassign({ organization_id, user_id }) {
    return Axios.post(`${BASE_URL}/deassign`, {
      organization_id,
      user_id,
    })
      .then(response => response.data.data.user);
  }
}
