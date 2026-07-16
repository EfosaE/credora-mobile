import { api } from "@/http-client/axios";
import { ApiRequestError, unwrapApiResponse } from "@/http-client/error";
import { ApiResponse } from "@/http-client/types/api";
import { LoginResponse } from "@/http-client/types/auth.type";
import { isAxiosError } from "axios";

export const authClient = {
  async login(input: {
    identifier: string;
    password: string;
  }): Promise<ApiResponse<LoginResponse>> {
    try {
      const res = await api.post<ApiResponse<LoginResponse>>(
        "/auth/login",
        input,
      );

      return unwrapApiResponse(res.data);
    } catch (error) {
      if (isAxiosError<ApiResponse<null>>(error)) {
        // Network error (server down, internet issue, DNS failure, timeout)
        if (!error.response) {
          throw new Error(
            "Unable to reach the server. Please check your connection and try again.",
          );
        }

        // API returned an error response
        throw new ApiRequestError(error.response.data);
      }

      throw error;
    }
  },
  async logout(): Promise<ApiResponse<LoginResponse>> {
    try {
      const res = await api.post<ApiResponse<LoginResponse>>(
        "/auth/logout",
        {},
      );
      // console.log("Login response:", res);
      return unwrapApiResponse(res.data);
    } catch (error: any) {
      if (isAxiosError<ApiResponse<null>>(error)) {
        console.log("Status:", error.response?.status);
        console.log("Response body:", error.response?.data);

        if (error.response?.data) {
          throw new ApiRequestError(error.response.data);
        }
      }

      throw error;
    }
  },
};
