import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(username: any, password: any) {
    return api
      .post("/authenticate/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register(data: any) {
    return api.post("/authenticate/register", {data
    }).then(response => {
      if (response) {
        console.log(response)
      }
      return response;
    });
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}

export default new AuthService();
