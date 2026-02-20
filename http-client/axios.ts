import { queryClient } from "@/app/_layout";
import { triggerLogout } from "@/features/authBridge";
import axios from "axios";

import * as SecureStore from "expo-secure-store";

const LOCAL_IP = "10.147.26.91";

export const API_BASE_URL = __DEV__
  ? `http://${LOCAL_IP}:8080/api/v1`
  : "https://api.credora.com/api/v1";

// console.log("API Base URL:", API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("session");
  console.log("Attaching token to request:", token?.trim().slice(0, 7) + "...");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("detected 401 response, logging out...");
      queryClient.clear();
      triggerLogout();

      // const refreshToken = await SecureStore.getItemAsync("refresh_token");

      // const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      //   refreshToken,
      // });
      // await SecureStore.deleteItemAsync("session");
      // await SecureStore.setItemAsync("session", res.data.accessToken);

      // error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
      // return api.request(error.config);
    }

    return Promise.reject(error);
  },
);
