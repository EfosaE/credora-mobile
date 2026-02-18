import { ApiResponse, isApiError, isApiSuccess } from "@/http-client/types/api";

export class ApiRequestError<T = unknown> extends Error {
  readonly response: ApiResponse<T>;

  constructor(response: ApiResponse<T>) {
    super(response.message);
    this.name = "ApiRequestError";
    this.response = response;
  }

  /**
   * Returns the full validation error map
   */
  get errors(): Record<string, string> | undefined {
    return this.response.error;
  }

  /**
   * Returns error for a specific field
   */
  getFieldError(field: string): string | undefined {
    return this.response.error?.[field];
  }

  /**
   * Whether this is a validation error
   */
  get isValidationError(): boolean {
    return !!this.response.error && Object.keys(this.response.error).length > 0;
  }
}

export function unwrapApiResponse<T>(body: ApiResponse<T>): ApiResponse<T> {
  console.log("API response:", body);
  if (isApiSuccess(body)) {
    return body;
  }

  if (isApiError(body)) {
    throw new ApiRequestError(body);
  }

  throw new Error("Unknown API response shape");
}
