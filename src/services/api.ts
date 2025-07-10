import axios from "axios";

const api = axios.create({
  // baseURL: 'http://localhost:3000'
  baseURL: 'http://192.168.1.12:3000'
});

export default api;