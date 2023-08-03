class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user?.accessToken;
  }

  updateLocalAccessToken(accessToken:any) {
    let user = JSON.parse(localStorage.getItem("user")!);
    user.token = accessToken;
    localStorage.setItem("user", JSON.stringify(user));
  }

  updateLocalRefreshToken(refreshToken:any) {
    let user = JSON.parse(localStorage.getItem("user")!);
    user.refreshToken = refreshToken;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user")!);
  }

  setUser(user:any) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
