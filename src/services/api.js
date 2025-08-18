import { toast } from '@pheralb/toast';
import axios from 'axios'


const apiClient = axios.create({
  baseURL: 'https://api-9hjd.onrender.com',
  timeout: 10000,
});

export async function getUserInfo(param) {
  const token = localStorage.getItem('token')
  try {
    const request = await apiClient.get(`/profiles/${param}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });

    return request.data
  }
  catch (err) {
    toast.error({ text: "Error", description: err.message || "Ha ocurrido un error inesperado. Inténtalo de nuevo." });
  }
}

export async function getPosts() {
  const token = localStorage.getItem('token')
  try {
    const posts_request = await apiClient.get("/posts/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true
      }
    })
    console.log(posts_request.data)

    return posts_request.data
  }
  catch (err) {
    let message = "Ha ocurrido un error inesperado. Inténtalo de nuevo.";
    if (err.message === "network_error") {
      message = "No se pudo conectar con el servidor. Verifica tu conexión a internet.";
    } 

    toast.error({ text: "Error", description: message });
  }
}

export async function login(formData) {
  try {
    const response = await apiClient.post("/user/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    });

    localStorage.setItem("token", response.data.access_token);
    console.log("Token:", response.data.access_token);

    return { success: true, token: response.data.access_token };
  } catch (err) {
    console.error("Error de login:", err);

    let message = "Ha ocurrido un error inesperado. Inténtalo de nuevo.";
    if (err.message === "network_error") {
      message = "No se pudo conectar con el servidor. Verifica tu conexión a internet.";
    } else if (err.message === "invalid_credentials") {
      message = "Usuario o contraseña incorrectos. Verifica tus credenciales.";
    }

    toast.error({ text: "Error", description: message });

    return { success: false, error: message };
  }
}



