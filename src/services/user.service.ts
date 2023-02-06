import axios from "./axios"

class UserService {
  test(){
    return axios.get("/test")
  }
}

export default new UserService();