import { api } from "@/http-client/axios";
import { ApiRequestError, unwrapApiResponse } from "@/http-client/error";
import { ApiResponse } from "@/http-client/types/api";
import { Transaction } from "@/http-client/types/transaction.type";

import { isAxiosError } from "axios";

type UserBalanceResponse = {
  user: {
    id: string;
    name: string;
    balance: string;
  };
};
export type TransactionHistoryResponse = {
  nextCursor: string | null;
  transactions: Transaction[];
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
    cursor: string | null,
    limit?: string,
  ): Promise<ApiResponse<TransactionHistoryResponse>> {
    try {
      const res = await api.get<ApiResponse<TransactionHistoryResponse>>(
        "/user/transactions",
        {
          params: {
            ...(limit ? { limit } : {}),
            ...(cursor ? { cursor } : {}),
          },
        },
      );
      console.log("Transaction History", res.data);
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
