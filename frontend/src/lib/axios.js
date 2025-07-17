import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "https://coffee-shopp.onrender.com/api",
  withCredentials: true, // important for cookies
});

export default axiosInstance;
