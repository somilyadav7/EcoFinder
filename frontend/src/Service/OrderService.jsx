import axios from "axios";
const api = "http://localhost:8080/api/orders"


class OrderService {

  getOrderByUsername(username){
    return axios.get(`${api}/${username}`);
  }

  getOrderById(id){
    return axios.get(`${api}/order/${id}`)
  }

  deleteOrder(id){
    return axios.delete(`${api}/${id}`)
  }

  updateOrder(id,order){
    return axios.put(`${api}/${id}`,order)
  }

  getOrders(){
    return axios.get(`${api}/all`)
  }

  getOrderByUser(username){
    return axios.get(`${api}/username`)
  }
}

export default new OrderService();
