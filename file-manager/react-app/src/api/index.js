import axios from "axios";

export const API = {
  baseUrl: 'http://localhost:8080',

  registration(email, password) {
    axios({
      method: 'post',
      url: `${this.baseUrl}/registration`,
      data: {
        email: email,
        password: password
      }
    });
  }
}