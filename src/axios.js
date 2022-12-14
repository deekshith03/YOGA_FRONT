import axios from "axios";

const Base_uri = import.meta.env.VITE_BASE_URL;
console.log(import.meta.env.VITE_BASE_URL);
export const axiosInstance = axios.create({
  baseURL: Base_uri,
  timeout: 3000,
});
