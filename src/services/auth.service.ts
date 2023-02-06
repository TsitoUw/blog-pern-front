import axios from "./axios";
import TokenService from "./TokenService";

class AuthService {
  async signin(email: string, password: string) {
    const response = await axios
      .post("/auth/signin", {
        email,
        password
      });
    if (response.data.accessToken) {
      TokenService.setUser(response.data);
    }
    return response.data;
  }

  signout() {
    axios
      .post("/auth/signout", {
        token: TokenService.getLocalRefreshToken(),
      })
      .then(() => {
        TokenService.removeUser();
      })
      .catch((err) => {
        console.log(err)
      })
  }

}

export default new AuthService();