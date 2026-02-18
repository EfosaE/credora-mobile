/* ---------------- PAGINATION META ---------------- */

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/* ---------------- CANONICAL API RESPONSE ---------------- */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
  error?: Record<string, string>;
}

/* ---------------- TYPE GUARDS ---------------- */

export function isApiSuccess<T>(
  response: ApiResponse<T>,
): response is ApiResponse<T> & { success: true; data: T } {
  return response.success === true;
}

export function isApiError<T>(
  response: ApiResponse<T>,
): response is ApiResponse<T> & {
  success: false;
  data: null;
  error: Record<string, string>;
} {
  return response.success === false;
}
