import axios from "axios";
import { getUserName } from "../Auth";
//const username = getUserName();

const ORDER_REST_API_BASE_URL = `http://localhost:8080/api/orders/${getUserName()}`
console.log(ORDER_REST_API_BASE_URL);

export const submitRecyclingForm = (registerObj) => axios.post(`http://localhost:8080/api/orders/${registerObj.user}`,registerObj);
  