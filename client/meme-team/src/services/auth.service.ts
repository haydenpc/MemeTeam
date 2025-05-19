import axios from "axios";
const BASE_URL = "http://localhost:3000"
 
class AuthService{
  async login(username: string, password:string){
    return await axios.post(BASE_URL + '/user/login', {
      "username": username,
        "password": password
    })
    
  }

  async signup(username: string, password:string){
    return await axios.post(BASE_URL + '/user/signup', {
      "username": username,
        "password": password
    })
    
  }
}

export default new AuthService();