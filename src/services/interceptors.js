import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

// 🔹 Interceptor de request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request config: ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Interceptor de response
apiClient.interceptors.response.use(
  (response) => {
    console.log("Response: ", response);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("No Authorization");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
