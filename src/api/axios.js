import axios from "axios";

const instance = axios.create({
  baseURL: "https://online-food-api-gateway.onrender.com",
});

instance.interceptors.request.use((config) => {
  const authData = localStorage.getItem("auth");
  if (authData) {
    const auth = JSON.parse(authData);
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  }
  return config;
});

export default instance;