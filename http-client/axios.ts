import axios from "axios";

import * as SecureStore from "expo-secure-store";

const LOCAL_IP = "10.147.26.91";

export const API_BASE_URL = __DEV__
  ? `http://${LOCAL_IP}:8080/api/v1`
  : "https://api.credora.com/api/v1";

console.log("API Base URL:", API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = await SecureStore.getItemAsync("refresh_token");

      const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      await SecureStore.setItemAsync("access_token", res.data.accessToken);

      error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      return api.request(error.config);
    }

    return Promise.reject(error);
  },
);
