import axios from "axios";
const api = "http://localhost:8080/api/auth/users";
const customapi = "http://localhost:8080/api/auth";


class UserService {
  async getUsers() {
    return await axios.get(api);
  }

  async updateUser(userId, user) {
    return await axios.put(`${api}/${userId}`, user);
  }

  async deleteUser(userId) {
    return await axios.delete(`${api}/${userId}`);
  }

  async getUserById(userId){
    return await axios.get(`${api}/${userId}`);
  }

  async getNameByUsername(userName){
    return await axios.get(`${customapi}/name/${userName}`);
  }

  async getEmailByUsername(userName){
    return await axios.get(`${customapi}/email/${userName}`);
  }
}

export default new UserService();
