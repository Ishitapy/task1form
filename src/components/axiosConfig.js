import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Update this with your backend URL
});

export default instance;
