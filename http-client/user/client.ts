import { api } from "@/http-client/axios";
import { ApiRequestError, unwrapApiResponse } from "@/http-client/error";
import { ApiResponse } from "@/http-client/types/api";

import { isAxiosError } from "axios";

type UserBalanceResponse = {
  user: {
    id: string;
    name: string;
    balance: string;
  };
};

export const userClient = {
  async getUserBalance(): Promise<ApiResponse<UserBalanceResponse>> {
    try {
      const res =
        await api.get<ApiResponse<UserBalanceResponse>>("/user/balance");
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
  async getUserTransactionHistory(
    limit?: string,
    cursor?: string,
  ): Promise<ApiResponse<UserBalanceResponse>> {
    try {
      const res =
        await api.get<ApiResponse<UserBalanceResponse>>("/user/transactions");
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
