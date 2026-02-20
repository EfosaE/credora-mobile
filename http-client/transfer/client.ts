import { api } from "@/http-client/axios";
import { ApiRequestError, unwrapApiResponse } from "@/http-client/error";
import { ApiResponse } from "@/http-client/types/api";
import { isAxiosError } from "axios";

type RecipientInfo = {
  name: string;
  id: string;
  email: string;
};

type GetRecipientNameResponse = {
  user: RecipientInfo;
};

type MakeInternalTransferPayload = {
  toAccount: string;
  amount: string;
  currency: string;
  description: string;
};

type MakeInternalTransferResponse = {
  transferId: string;
  status: string;
  //   timestamp: string;
};

type GetTransferStatusResponse = {
  status: {
    idemKey: string;
    status: string;
    operationType: string;
    payload: {
      to: string;
      from: string;
      amount: string;
    };
  };
};

export const transferClient = {
  async getRecipientName(
    acctNum: string,
  ): Promise<ApiResponse<GetRecipientNameResponse>> {
    try {
      const res = await api.get<ApiResponse<GetRecipientNameResponse>>(
        `/recipient/internal/${acctNum}`,
      );
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
  async makeInternalTransfer(
    payload: MakeInternalTransferPayload,
    idempotencyKey: string,
  ): Promise<ApiResponse<MakeInternalTransferResponse>> {
    try {
      const res = await api.post<ApiResponse<MakeInternalTransferResponse>>(
        `/transfers/internal`,
        payload,
        {
          headers: {
            "Idempotency-Key": idempotencyKey,
          },
        },
      );

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

  async getTransferStatus(
    transferId: string,
  ): Promise<ApiResponse<GetTransferStatusResponse>> {
    try {
      const res = await api.get<ApiResponse<GetTransferStatusResponse>>(
        `/transfers/${transferId}/status`,
      );
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
