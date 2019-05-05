import axios from "axios";

const api = axios.create({
  baseURL: "https://react-adonis.herokuapp.com/api"
});

export default api;
