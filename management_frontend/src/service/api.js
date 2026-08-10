
// --------- Axios API Configuration
import axios from "axios";

const api = axios.create({
  // Backend base URL
  baseURL: import.meta.env.VITE_API_URL,

  // Send authentication cookies with requests
  withCredentials: true,
});

export default api;