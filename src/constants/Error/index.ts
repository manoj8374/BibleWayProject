export interface ErrorResponse {
    success: boolean;
    message: string;
    error?: string;
    error_code?: string;
}


export interface ApiError extends Error {
  status?: number;
  error_code?: string;
}
